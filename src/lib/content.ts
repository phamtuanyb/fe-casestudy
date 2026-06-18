// Tầng truy xuất nội dung — gọi BE qua lib/api.ts, TỰ ĐỘNG fallback mock nếu BE lỗi/ngắt.
// Pages chỉ import từ đây nên không cần biết nguồn dữ liệu. Token chỉ nằm ở api.ts (server-only).
import 'server-only';
import * as api from './api';
import { isBackendConfigured } from './api';
import * as mock from './mock-data';
import type { CaseStudy, Industry, Product, StatItem, Testimonial, VideoReview } from './types';

const sortByOrder = <T extends { order: number }>(arr: T[]): T[] => [...arr].sort((a, b) => a.order - b.order);
const publishedMock = <T extends { published: boolean; order: number }>(arr: T[]): T[] =>
  sortByOrder(arr.filter((x) => x.published));

/** Gọi BE; nếu BE chưa cấu hình hoặc lỗi → trả mock (trang không vỡ). */
async function withFallback<T>(label: string, primary: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!isBackendConfigured()) return fallback();
  try {
    return await primary();
  } catch (err) {
    console.warn(`[content] "${label}" lỗi BE → dùng mock fallback:`, (err as Error).message);
    return fallback();
  }
}

// ----- Cases -----
const loadCases = (): Promise<CaseStudy[]> =>
  withFallback('cases', () => api.fetchCaseStudies({}), () => publishedMock(mock.caseStudies));

export async function getFeaturedCases(limit = 3): Promise<CaseStudy[]> {
  const all = await loadCases();
  const featured = all.filter((c) => c.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  // Chưa đủ số lượng → đổ thêm case published khác (ưu tiên featured trước).
  const rest = all.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, limit);
}

export interface CaseFilter {
  product?: string; // lọc theo name (đồng bộ với filter client). F3 chuyển sang slug server-side.
  industry?: string;
}

export async function getCaseStudies(filter: CaseFilter = {}): Promise<CaseStudy[]> {
  const all = await loadCases();
  return all.filter(
    (c) =>
      (!filter.product || c.products.some((p) => p.name === filter.product)) &&
      (!filter.industry || c.industry.name === filter.industry),
  );
}

export async function getCaseBySlug(slug: string): Promise<CaseStudy | null> {
  return withFallback(
    `case:${slug}`,
    () => api.fetchCaseBySlug(slug),
    () => mock.caseStudies.find((c) => c.slug === slug && c.published) ?? null,
  );
}

export async function getRelatedCases(base: CaseStudy, limit = 3): Promise<CaseStudy[]> {
  const all = (await loadCases()).filter((c) => c.slug !== base.slug);
  let related = all.filter(
    (c) => c.industry.id === base.industry.id || c.products.some((p) => base.products.some((bp) => bp.id === p.id)),
  );
  if (related.length < limit) related = related.concat(all.filter((c) => !related.includes(c)));
  return related.slice(0, limit);
}

// ----- Videos -----
const loadVideos = (): Promise<VideoReview[]> =>
  withFallback('videos', () => api.fetchVideos(), () => publishedMock(mock.videoReviews));

export async function getFeaturedVideos(limit = 3): Promise<VideoReview[]> {
  return (await loadVideos()).slice(0, limit);
}

export async function getVideos(): Promise<VideoReview[]> {
  return loadVideos();
}

// ----- Others -----
export async function getTestimonials(): Promise<Testimonial[]> {
  return withFallback('testimonials', () => api.fetchTestimonials(), () => publishedMock(mock.testimonials));
}

export async function getStats(): Promise<StatItem[]> {
  return withFallback('stats', () => api.fetchStats(), () => sortByOrder(mock.statItems));
}

export async function getProducts(): Promise<Product[]> {
  return withFallback('products', () => api.fetchProducts(), () => mock.products);
}

export async function getIndustries(): Promise<Industry[]> {
  return withFallback('industries', () => api.fetchIndustries(), () => mock.industries);
}
