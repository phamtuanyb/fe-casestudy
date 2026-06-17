// URL canonical của site (dùng cho OG, canonical, share). NEXT_PUBLIC_ nên có ở cả client.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001').replace(/\/+$/, '');

export const SITE_NAME = 'MKT Showcase';

/** URL tuyệt đối của 1 case study (để share/OG). */
export const caseUrl = (slug: string): string => `${SITE_URL}/cau-chuyen/${slug}`;
