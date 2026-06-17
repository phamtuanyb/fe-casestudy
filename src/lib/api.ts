// ============================================================
// API client SERVER-SIDE — gọi Backend Payload theo API Contract.
// - Gắn API_SERVICE_TOKEN (CHỈ server-side, không bao giờ ra browser).
// - Timeout + retry + xử lý lỗi → throw ApiError; tầng content.ts quyết định fallback.
// - Map document Payload → view model (types.ts) cho component dùng.
// ============================================================
import 'server-only';
import type {
  CaseStudy,
  Industry,
  Metric,
  Product,
  StatItem,
  Testimonial,
  VideoCategory,
  VideoReview,
} from './types';

const API_BASE_URL = process.env.API_BASE_URL ?? '';
const API_SERVICE_TOKEN = process.env.API_SERVICE_TOKEN ?? '';

/** BE chỉ được coi là khả dụng khi có đủ base URL + token. */
export const isBackendConfigured = (): boolean => Boolean(API_BASE_URL && API_SERVICE_TOKEN);

/** ISR mặc định cho nội dung công khai (giây). Webhook revalidate sẽ làm mới sớm hơn (F6). */
export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE_SECONDS ?? 300);

const TIMEOUT_MS = 6000;
const MAX_RETRY = 1; // tổng cộng 2 lần thử

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ---------- Shape thô từ Payload ----------
interface PayloadList<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}

type Rel<T> = T | string | null | undefined; // depth thấp có thể trả id (string)

interface RawProduct {
  id: string;
  name: string;
  slug: string;
  color?: string;
}
interface RawIndustry {
  id: string;
  name: string;
  slug: string;
}
interface RawMedia {
  url?: string;
}
interface RawCase {
  id: string;
  title: string;
  slug: string;
  quote?: string;
  problem?: unknown;
  solution?: unknown;
  result?: unknown;
  customerName?: string;
  customerRole?: string;
  customerAvatar?: Rel<RawMedia>;
  coverImage?: Rel<RawMedia>;
  coverColor?: string;
  metrics?: Metric[];
  industry?: Rel<RawIndustry>;
  products?: Rel<RawProduct>[];
  featured?: boolean;
  published?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}
interface RawVideo {
  id: string;
  title: string;
  slug: string;
  description?: string;
  youtubeId?: string;
  category?: string;
  durationLabel?: string;
  thumbnailColor?: string;
  industry?: Rel<RawIndustry>;
  products?: Rel<RawProduct>[];
  featured?: boolean;
  published?: boolean;
  order?: number;
}
interface RawTestimonial {
  id: string;
  customerName?: string;
  customerRole?: string;
  content?: string;
  rating?: number;
  published?: boolean;
  order?: number;
}
interface RawStat {
  id: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
  label?: string;
  order?: number;
}

// ---------- Lõi fetch ----------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Circuit breaker: sau 1 lần lỗi kết nối, "mở mạch" trong CIRCUIT_MS để không
// chờ timeout lặp lại ở mọi request (build/dev nhanh khi BE ngắt).
const CIRCUIT_MS = 30000;
let circuitOpenUntil = 0;
const circuitOpen = () => Date.now() < circuitOpenUntil;
const tripCircuit = () => {
  circuitOpenUntil = Date.now() + CIRCUIT_MS;
};
const resetCircuit = () => {
  circuitOpenUntil = 0;
};

interface FetchOpts {
  revalidate?: number;
  tags?: string[];
}

async function apiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  if (!isBackendConfigured()) {
    throw new ApiError('Backend chưa được cấu hình (thiếu API_BASE_URL/API_SERVICE_TOKEN)');
  }
  if (circuitOpen()) {
    throw new ApiError('BE đang tạm ngắt (circuit mở), bỏ qua gọi để fallback nhanh');
  }
  const url = `${API_BASE_URL}${path}`;

  // Chỉ retry với lỗi 5xx (server tạm thời). Lỗi mạng/timeout/4xx → không retry.
  for (let attempt = 0; attempt <= MAX_RETRY; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `users API-Key ${API_SERVICE_TOKEN}`,
          Accept: 'application/json',
        },
        signal: ctrl.signal,
        next: { revalidate: opts.revalidate ?? REVALIDATE_SECONDS, tags: opts.tags },
      });
      clearTimeout(timer);

      if (res.ok) {
        resetCircuit();
        return (await res.json()) as T;
      }
      // 4xx hoặc đã hết lượt retry → ném luôn.
      if (res.status < 500 || attempt === MAX_RETRY) {
        throw new ApiError(`BE trả ${res.status} cho ${path}`, res.status);
      }
      // 5xx còn lượt → backoff rồi thử lại.
      await sleep(250 * (attempt + 1));
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof ApiError) throw err; // lỗi HTTP đã phân loại ở trên
      // Lỗi mạng / timeout / abort → mở circuit, fail nhanh.
      tripCircuit();
      throw new ApiError(`Không kết nối được ${path}: ${(err as Error).message}`);
    }
  }
  throw new ApiError(`Không gọi được ${path}`);
}

// ---------- Helpers map ----------
const VIDEO_LABELS: Record<VideoCategory, string> = {
  'danh-gia': 'Đánh giá',
  'huong-dan': 'Hướng dẫn',
  'phong-van': 'Phỏng vấn',
  'case-study': 'Case study',
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

/** richText (Lexical / Slate / string) → plain text. F3 sẽ nâng cấp lên render giàu định dạng. */
function richTextToPlain(rt: unknown): string {
  if (!rt) return '';
  if (typeof rt === 'string') return rt;
  const blocks: string[] = [];
  const walkInline = (nodes: unknown[]): string =>
    nodes
      .map((n) => {
        if (!isObj(n)) return '';
        if (typeof n.text === 'string') return n.text;
        if (Array.isArray(n.children)) return walkInline(n.children);
        return '';
      })
      .join('');
  const walkBlocks = (nodes: unknown[]) => {
    for (const n of nodes) {
      if (!isObj(n)) continue;
      const children = Array.isArray(n.children) ? n.children : [];
      const text = walkInline(children).trim();
      if (text) blocks.push(text);
    }
  };
  if (isObj(rt) && isObj(rt.root) && Array.isArray(rt.root.children)) walkBlocks(rt.root.children);
  else if (Array.isArray(rt)) walkBlocks(rt);
  return blocks.join('\n\n');
}

const mediaUrl = (m: Rel<RawMedia>) => (isObj(m) && typeof m.url === 'string' ? { url: m.url } : null);

const mapProduct = (p: Rel<RawProduct>): Product | null => {
  if (!isObj(p)) return null;
  const r = p as unknown as RawProduct;
  return { id: String(r.id), name: r.name, slug: r.slug, color: r.color ?? '#1E88E5' };
};

const mapIndustry = (i: Rel<RawIndustry>): Industry => {
  if (!isObj(i)) return { id: '', name: '', slug: '' };
  const r = i as unknown as RawIndustry;
  return { id: String(r.id), name: r.name, slug: r.slug };
};

function mapCase(d: RawCase): CaseStudy {
  return {
    id: String(d.id),
    title: d.title,
    slug: d.slug,
    quote: d.quote ?? '',
    problem: richTextToPlain(d.problem),
    solution: richTextToPlain(d.solution),
    result: richTextToPlain(d.result),
    customerName: d.customerName ?? '',
    customerRole: d.customerRole ?? '',
    customerAvatar: mediaUrl(d.customerAvatar),
    coverImage: mediaUrl(d.coverImage),
    coverColor: d.coverColor || 'var(--grad-product)',
    metrics: Array.isArray(d.metrics) ? d.metrics : [],
    industry: mapIndustry(d.industry),
    products: (d.products ?? []).map(mapProduct).filter((p): p is Product => p !== null),
    featured: Boolean(d.featured),
    published: Boolean(d.published),
    order: d.order ?? 0,
    seoTitle: d.seoTitle,
    seoDescription: d.seoDescription,
  };
}

function mapVideo(d: RawVideo): VideoReview {
  const category = (d.category ?? 'danh-gia') as VideoCategory;
  return {
    id: String(d.id),
    title: d.title,
    slug: d.slug,
    description: d.description,
    youtubeId: d.youtubeId ?? '',
    category,
    categoryLabel: VIDEO_LABELS[category] ?? 'Đánh giá',
    durationLabel: d.durationLabel ?? '',
    thumbnailColor: d.thumbnailColor || 'var(--grad-product)',
    industry: isObj(d.industry) ? mapIndustry(d.industry) : undefined,
    products: (d.products ?? []).map(mapProduct).filter((p): p is Product => p !== null),
    featured: Boolean(d.featured),
    published: Boolean(d.published),
    order: d.order ?? 0,
  };
}

const mapTestimonial = (d: RawTestimonial): Testimonial => ({
  id: String(d.id),
  customerName: d.customerName ?? '',
  customerRole: d.customerRole ?? '',
  content: d.content ?? '',
  rating: d.rating ?? 5,
  published: Boolean(d.published),
  order: d.order ?? 0,
});

function mapStat(d: RawStat): StatItem {
  const raw = d.value ?? 0;
  const value = typeof raw === 'number' ? raw : Number(String(raw).replace(/[^\d]/g, '')) || 0;
  return {
    id: String(d.id),
    value,
    prefix: d.prefix,
    suffix: d.suffix,
    label: d.label ?? '',
    order: d.order ?? 0,
  };
}

// ---------- Query builder ----------
const PUBLISHED = 'where%5Bpublished%5D%5Bequals%5D=true';

// ---------- API public (typed, theo API Contract mục 4) ----------
export interface CaseQuery {
  productSlug?: string;
  industrySlug?: string;
  featured?: boolean;
}

export async function fetchCaseStudies(q: CaseQuery = {}): Promise<CaseStudy[]> {
  const parts = [PUBLISHED, 'sort=order', 'depth=1', 'limit=100'];
  if (q.productSlug) parts.push(`where%5Bproducts.slug%5D%5Bequals%5D=${encodeURIComponent(q.productSlug)}`);
  if (q.industrySlug) parts.push(`where%5Bindustry.slug%5D%5Bequals%5D=${encodeURIComponent(q.industrySlug)}`);
  if (q.featured) parts.push('where%5Bfeatured%5D%5Bequals%5D=true');
  const res = await apiFetch<PayloadList<RawCase>>(`/api/case-studies?${parts.join('&')}`, {
    tags: ['case-studies'],
  });
  return res.docs.map(mapCase);
}

export async function fetchCaseBySlug(slug: string): Promise<CaseStudy | null> {
  const path = `/api/case-studies?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(slug)}&depth=2&limit=1`;
  const res = await apiFetch<PayloadList<RawCase>>(path, { tags: ['case-studies', `case:${slug}`] });
  const doc = res.docs[0];
  return doc ? mapCase(doc) : null;
}

export async function fetchVideos(): Promise<VideoReview[]> {
  const res = await apiFetch<PayloadList<RawVideo>>(`/api/video-reviews?${PUBLISHED}&sort=order&depth=1&limit=100`, {
    tags: ['video-reviews'],
  });
  return res.docs.map(mapVideo);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await apiFetch<PayloadList<RawTestimonial>>(`/api/testimonials?${PUBLISHED}&sort=order&limit=100`, {
    tags: ['testimonials'],
  });
  return res.docs.map(mapTestimonial);
}

export async function fetchStats(): Promise<StatItem[]> {
  const res = await apiFetch<PayloadList<RawStat>>(`/api/stat-items?sort=order&limit=100`, { tags: ['stat-items'] });
  return res.docs.map(mapStat);
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await apiFetch<PayloadList<RawProduct>>(`/api/products?sort=order&limit=100`, { tags: ['products'] });
  return res.docs.map((p) => mapProduct(p)).filter((p): p is Product => p !== null);
}

export async function fetchIndustries(): Promise<Industry[]> {
  const res = await apiFetch<PayloadList<RawIndustry>>(`/api/industries?sort=order&limit=100`, { tags: ['industries'] });
  return res.docs.map(mapIndustry);
}
