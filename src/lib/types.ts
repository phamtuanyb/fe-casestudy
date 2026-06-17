// Types khớp API Contract (mục 4–5). Dùng chung cho mock (F1) và data thật (F2+).

export interface Product {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Media {
  url: string;
}

/**
 * Trang chi tiết bind problem/solution/result.
 * API trả richText; ở F1 mock là string, F3 sẽ chuyển richText → render.
 */
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  quote: string;
  problem: string;
  solution: string;
  result: string;
  customerName: string;
  customerRole: string;
  customerAvatar?: Media | null;
  coverImage?: Media | null;
  /** Màu HOẶC gradient CSS — FE dùng làm coverBg */
  coverColor: string;
  metrics: Metric[];
  industry: Industry;
  products: Product[];
  featured: boolean;
  published: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export type VideoCategory = 'danh-gia' | 'huong-dan' | 'phong-van' | 'case-study';

export interface VideoReview {
  id: string;
  title: string;
  slug: string;
  description?: string;
  youtubeId: string;
  category: VideoCategory;
  /** Nhãn hiển thị của category (vd "Đánh giá") */
  categoryLabel: string;
  durationLabel: string;
  thumbnailColor: string;
  industry?: Industry;
  products: Product[];
  featured: boolean;
  published: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerRole: string;
  content: string;
  rating: number;
  published: boolean;
  order: number;
}

export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  order: number;
}
