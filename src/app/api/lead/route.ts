// Proxy nội bộ tạo Lead: validate + honeypot + rate-limit + đính sourceSlug/UTM,
// rồi mới gọi BE kèm token (token CHỈ ở server, không lộ ra browser).
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---- Rate limit đơn giản theo IP (in-memory). Lưu ý: chỉ hiệu lực trong 1 instance;
// môi trường serverless/nhiều instance nên thay bằng store dùng chung (Redis) ở F6. ----
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const phoneOk = (p: string) => /^[0-9][0-9\s.+()-]{7,}$/.test(p.trim());
const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.trim());

const clientIp = (req: NextRequest): string =>
  (req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'local').trim();

interface LeadInput {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  industry?: string;
  productInterest?: string;
  sourceSlug?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  _hp?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadInput;
  try {
    body = (await req.json()) as LeadInput;
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  // 1) Honeypot: bot điền ô ẩn → giả vờ thành công, KHÔNG gọi BE.
  if (typeof body._hp === 'string' && body._hp.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 2) Rate limit theo IP.
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json({ error: 'Bạn gửi quá nhanh, vui lòng thử lại sau ít phút.' }, { status: 429 });
  }

  // 3) Validate.
  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  if (!name) return NextResponse.json({ error: 'Vui lòng nhập họ tên của bạn.' }, { status: 400 });
  if (!phoneOk(phone)) return NextResponse.json({ error: 'Số điện thoại chưa hợp lệ.' }, { status: 400 });
  const email = body.email ? String(body.email).trim() : undefined;
  if (email && !emailOk(email)) return NextResponse.json({ error: 'Email chưa hợp lệ.' }, { status: 400 });

  const base = process.env.API_BASE_URL;
  const token = process.env.API_SERVICE_TOKEN;
  if (!base || !token) {
    console.error('[lead] thiếu API_BASE_URL / API_SERVICE_TOKEN');
    return NextResponse.json({ error: 'Hệ thống chưa sẵn sàng. Vui lòng thử lại sau.' }, { status: 503 });
  }

  // 4) Chuẩn hoá payload theo API Contract (industry gộp vào message để tránh field lạ ở BE).
  const industry = body.industry ? String(body.industry).trim() : '';
  const note = body.message ? String(body.message).trim() : '';
  const message = [note, industry ? `Ngành nghề: ${industry}` : ''].filter(Boolean).join(' — ') || undefined;
  const utm =
    body.utm && (body.utm.source || body.utm.medium || body.utm.campaign)
      ? { source: body.utm.source, medium: body.utm.medium, campaign: body.utm.campaign }
      : undefined;

  const payload = {
    name,
    phone,
    email,
    message,
    productInterest: body.productInterest ? String(body.productInterest) : undefined,
    sourceSlug: body.sourceSlug ? String(body.sourceSlug) : undefined,
    utm,
    _hp: '',
  };

  // 5) Gọi BE (timeout 12s — chừa thời gian cho BE phản hồi, gồm cả khi route mới khởi động).
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(`${base}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${token}`,
      },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.error('[lead] BE trả lỗi', res.status);
      return NextResponse.json(
        { error: 'Không gửi được thông tin. Vui lòng thử lại hoặc gọi hotline 1900 9999.' },
        { status: 502 },
      );
    }
    const data = (await res.json().catch(() => ({}))) as { doc?: { id?: string } };
    return NextResponse.json({ ok: true, id: data?.doc?.id ?? null }, { status: 201 });
  } catch (err) {
    clearTimeout(timer);
    console.error('[lead] lỗi kết nối BE:', (err as Error).message);
    return NextResponse.json({ error: 'Lỗi kết nối. Vui lòng thử lại sau giây lát.' }, { status: 502 });
  }
}
