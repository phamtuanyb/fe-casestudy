import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CaseCard from '@/components/CaseCard';
import DetailShareRow from '@/components/cases/DetailShareRow';
import RichBody from '@/components/RichBody';
import JsonLd from '@/components/JsonLd';
import CaseViewTracker from '@/components/analytics/CaseViewTracker';
import TrackedLink from '@/components/analytics/TrackedLink';
import { initialsOf } from '@/lib/format';
import { getCaseBySlug, getCaseStudies, getRelatedCases } from '@/lib/content';
import { SITE_NAME, caseUrl } from '@/lib/site';

export const revalidate = 300;
// Cho phép slug mới (publish sau build) được render on-demand rồi cache (ISR).
export const dynamicParams = true;

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await getCaseBySlug(params.slug);
  if (!c) return { title: 'Không tìm thấy câu chuyện' };

  const title = c.seoTitle ?? c.title;
  const description = c.seoDescription ?? c.quote;
  const path = `/cau-chuyen/${c.slug}`;
  const images = c.coverImage?.url ? [{ url: c.coverImage.url, alt: c.title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      images: images?.map((i) => i.url),
    },
  };
}

export default async function CaseDetailPage({ params }: { params: { slug: string } }) {
  const c = await getCaseBySlug(params.slug);
  if (!c) notFound();

  const related = await getRelatedCases(c, 3);
  const product = c.products[0]?.name ?? '';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.seoDescription ?? c.quote,
    inLanguage: 'vi-VN',
    mainEntityOfPage: caseUrl(c.slug),
    image: c.coverImage?.url ? [c.coverImage.url] : undefined,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <CaseViewTracker slug={c.slug} />
      {/* HERO */}
      <section style={{ background: 'var(--grad-hero-deep)', padding: 'clamp(40px,5vw,64px) 0 clamp(72px,8vw,104px)', position: 'relative', overflow: 'hidden' }}>
        {c.coverImage?.url && (
          <>
            <Image
              src={c.coverImage.url}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', opacity: 0.28 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,46,99,.55),rgba(10,46,99,.78))', pointerEvents: 'none' }} />
          </>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.14,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(255,255,255,.55) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
          <Link
            href="/cau-chuyen"
            style={{
              background: 'rgba(255,255,255,.12)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '9px 16px',
              borderRadius: 'var(--r-pill)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 24,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Tất cả câu chuyện
          </Link>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <span style={{ background: 'rgba(255,255,255,.92)', color: 'var(--blue-700)', fontWeight: 800, fontSize: 12.5, padding: '7px 14px', borderRadius: 'var(--r-pill)' }}>
              {c.industry.name}
            </span>
            <span style={{ background: 'rgba(255,255,255,.14)', color: '#fff', fontWeight: 700, fontSize: 12.5, padding: '7px 14px', borderRadius: 'var(--r-pill)', border: '1px solid rgba(255,255,255,.3)' }}>
              {product}
            </span>
          </div>
          <h1 className="balance" style={{ margin: '0 0 24px', fontWeight: 900, fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: 1.12, color: '#fff' }}>
            {c.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            {c.customerAvatar?.url ? (
              <Image
                src={c.customerAvatar.url}
                alt={c.customerName}
                width={52}
                height={52}
                style={{ borderRadius: '50%', objectFit: 'cover', flex: 'none', border: '2px solid rgba(255,255,255,.5)' }}
              />
            ) : (
              <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#FF9D2E,#FF8C00)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 900, fontSize: 18, flex: 'none' }}>
                {initialsOf(c.customerName)}
              </span>
            )}
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>{c.customerName}</div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.75)' }}>{c.customerRole}</div>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC STRIP */}
      <section style={{ maxWidth: 880, margin: '-56px auto 0', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--sh-lg)',
            padding: 'clamp(20px,3vw,30px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
            gap: 14,
          }}
        >
          {c.metrics.map((m, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 8 }}>
              <div style={{ fontWeight: 900, fontSize: 'clamp(30px,4vw,44px)', color: 'var(--orange)', lineHeight: 1 }}>{m.value}</div>
              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BODY */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* 1. Vấn đề */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,64,129,.12)', color: 'var(--pink)', display: 'grid', placeItems: 'center', fontWeight: 900, flex: 'none' }}>1</span>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 24, color: 'var(--ink)' }}>Vấn đề</h2>
            </div>
            <RichBody text={c.problem} />
          </div>

          {/* 2. Giải pháp */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(21,101,192,.12)', color: 'var(--blue-700)', display: 'grid', placeItems: 'center', fontWeight: 900, flex: 'none' }}>2</span>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 24, color: 'var(--ink)' }}>Giải pháp với {product}</h2>
            </div>
            <div style={{ marginBottom: 18 }}>
              <RichBody text={c.solution} />
            </div>
            <div style={{ background: 'var(--grad-product)', borderRadius: 'var(--r-md)', padding: 26, display: 'flex', alignItems: 'center', gap: 16, boxShadow: 'var(--sh-md)' }}>
              <span style={{ fontWeight: 900, fontSize: 40, color: 'var(--gold)', lineHeight: 1, flex: 'none' }}>&ldquo;</span>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#fff', fontWeight: 600, fontStyle: 'italic' }}>{c.quote}</p>
            </div>
          </div>

          {/* 3. Kết quả */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(46,204,113,.14)', color: 'var(--green-600)', display: 'grid', placeItems: 'center', fontWeight: 900, flex: 'none' }}>3</span>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 24, color: 'var(--ink)' }}>Kết quả</h2>
            </div>
            <RichBody text={c.result} />
          </div>

          {/* SHARE */}
          <DetailShareRow slug={c.slug} title={c.title} />

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg,#FFF6E9,#FFEAD2)', border: '1px solid #FFD9A8', borderRadius: 'var(--r-md)', padding: 30, textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', fontWeight: 900, fontSize: 22, color: 'var(--ink)' }}>Ngành của bạn cũng làm được điều này</h3>
            <p style={{ margin: '0 0 20px', fontSize: 15.5, color: 'var(--ink-soft)' }}>Nhận tư vấn lộ trình automation riêng cho doanh nghiệp của bạn.</p>
            <TrackedLink
              href={`/?source=${c.slug}#mkt-lead`}
              event="cta_click"
              eventParams={{ location: 'case_detail', slug: c.slug }}
              style={{
                textDecoration: 'none',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '.02em',
                fontSize: 15,
                color: '#fff',
                background: 'var(--grad-cta)',
                boxShadow: 'var(--sh-cta)',
                borderRadius: 'var(--r-pill)',
                padding: '15px 32px',
                display: 'inline-block',
              }}
            >
              Nhận tư vấn cho ngành của bạn
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ margin: '0 0 30px', fontWeight: 900, fontSize: 'clamp(24px,3vw,34px)', color: 'var(--ink)', textAlign: 'center' }}>
            Câu chuyện liên quan
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 26 }}>
            {related.map((rc) => (
              <CaseCard key={rc.id} caseStudy={rc} variant="related" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
