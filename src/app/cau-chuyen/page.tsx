import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CaseListClient from '@/components/cases/CaseListClient';
import { getCaseStudies, getIndustries, getProducts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Câu chuyện khách hàng MKT',
  description: 'Lọc theo sản phẩm hoặc ngành để xem chính xác kết quả của những người giống bạn.',
};

// Đọc searchParams (deep-link bộ lọc) → render động phía server (vẫn có nội dung sẵn cho SEO).
export default async function CaseListPage({
  searchParams,
}: {
  searchParams: { product?: string; industry?: string };
}) {
  const [cases, products, industries] = await Promise.all([
    getCaseStudies(),
    getProducts(),
    getIndustries(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Thư viện câu chuyện"
        title="Câu chuyện khách hàng MKT"
        subtitle="Lọc theo sản phẩm hoặc ngành để xem chính xác kết quả của những người giống bạn."
      />
      <CaseListClient
        cases={cases}
        products={products.map((p) => ({ name: p.name, slug: p.slug }))}
        industries={industries.map((i) => ({ name: i.name, slug: i.slug }))}
        initialProductSlug={searchParams.product ?? ''}
        initialIndustrySlug={searchParams.industry ?? ''}
      />
    </>
  );
}
