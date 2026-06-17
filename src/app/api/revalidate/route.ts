// Webhook BE → FE: publish/unpublish nội dung → revalidate path/tag tương ứng.
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RevalidateBody {
  secret?: string;
  collection?: string;
  slug?: string;
}

export async function POST(req: NextRequest) {
  let body: RevalidateBody;
  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  if (!process.env.REVALIDATE_SECRET || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Sai secret.' }, { status: 401 });
  }

  const collection = String(body.collection ?? '');
  const slug = body.slug ? String(body.slug) : undefined;
  const done: string[] = [];
  const tag = (t: string) => {
    revalidateTag(t);
    done.push(`tag:${t}`);
  };
  const path = (p: string) => {
    revalidatePath(p);
    done.push(`path:${p}`);
  };

  switch (collection) {
    case 'case-studies':
      tag('case-studies');
      path('/');
      path('/cau-chuyen');
      if (slug) {
        tag(`case:${slug}`);
        path(`/cau-chuyen/${slug}`);
      }
      break;
    case 'video-reviews':
      tag('video-reviews');
      path('/');
      path('/video');
      break;
    case 'testimonials':
      tag('testimonials');
      path('/');
      break;
    case 'stat-items':
      tag('stat-items');
      path('/');
      break;
    case 'products':
      tag('products');
      path('/cau-chuyen');
      path('/video');
      break;
    case 'industries':
      tag('industries');
      path('/cau-chuyen');
      break;
    default:
      // Không rõ collection → làm mới các trang chính cho an toàn.
      path('/');
      path('/cau-chuyen');
      path('/video');
  }

  return NextResponse.json({ revalidated: true, now: Date.now(), done });
}
