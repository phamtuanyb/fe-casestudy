import HomeHero from '@/components/home/HomeHero';
import StatStrip from '@/components/home/StatStrip';
import FeaturedCases from '@/components/home/FeaturedCases';
import FeaturedVideos from '@/components/home/FeaturedVideos';
import WallOfLove from '@/components/home/WallOfLove';
import LeadSection from '@/components/home/LeadSection';
import {
  getFeaturedCases,
  getFeaturedVideos,
  getIndustries,
  getProducts,
  getStats,
  getTestimonials,
} from '@/lib/content';

// ISR: render tĩnh, làm mới định kỳ (webhook BE sẽ revalidate sớm hơn ở F6).
export const revalidate = 300;

export default async function HomePage() {
  const [stats, featuredCases, featuredVideos, testimonials, industries, products] = await Promise.all([
    getStats(),
    getFeaturedCases(10),
    getFeaturedVideos(10),
    getTestimonials(),
    getIndustries(),
    getProducts(),
  ]);

  return (
    <>
      <HomeHero />
      {/* Mỗi section chỉ render khi CMS có dữ liệu → thêm nội dung trong CMS là section tự hiện,
          không để lại khối rỗng/vỡ khi collection chưa có data. */}
      {stats.length > 0 && <StatStrip stats={stats} />}
      {featuredCases.length > 0 && <FeaturedCases cases={featuredCases} />}
      {featuredVideos.length > 0 && <FeaturedVideos videos={featuredVideos} />}
      {testimonials.length > 0 && <WallOfLove testimonials={testimonials} />}
      <LeadSection
        industryOptions={industries.map((i) => i.name)}
        productOptions={products.map((p) => ({ name: p.name, slug: p.slug }))}
      />
    </>
  );
}
