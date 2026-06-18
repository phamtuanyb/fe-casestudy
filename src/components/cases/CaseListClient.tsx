'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { CaseStudy } from '@/lib/types';
import { track } from '@/lib/tracking';
import CaseCard from '../CaseCard';

interface Opt {
  name: string;
  slug: string;
}

const chipStyle = (active: boolean) => ({
  bg: active ? 'var(--grad-hero)' : '#fff',
  color: active ? '#fff' : 'var(--ink-soft)',
  border: active ? '1px solid transparent' : '1px solid var(--line)',
  shadow: active ? 'var(--sh-md)' : 'none',
});

export default function CaseListClient({
  cases,
  products,
  industries,
  initialProductSlug = '',
  initialIndustrySlug = '',
}: {
  cases: CaseStudy[];
  products: Opt[];
  industries: Opt[];
  initialProductSlug?: string;
  initialIndustrySlug?: string;
}) {
  const pathname = usePathname();
  const [productSlug, setProductSlug] = useState(initialProductSlug);
  const [industrySlug, setIndustrySlug] = useState(initialIndustrySlug);
  const [industryOpen, setIndustryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!industryOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIndustryOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndustryOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [industryOpen]);

  // Đồng bộ URL query KHÔNG reload/refetch (history API) → deep-link được, lọc tức thì.
  const syncUrl = (nextProduct: string, nextIndustry: string) => {
    const qs = new URLSearchParams();
    if (nextProduct) qs.set('product', nextProduct);
    if (nextIndustry) qs.set('industry', nextIndustry);
    const q = qs.toString();
    window.history.replaceState(null, '', q ? `${pathname}?${q}` : pathname);
  };

  const pickProduct = (slug: string) => {
    setProductSlug(slug);
    syncUrl(slug, industrySlug);
    track('filter_used', { type: 'product', value: slug || 'all' });
  };
  const pickIndustry = (slug: string) => {
    setIndustrySlug(slug);
    setIndustryOpen(false);
    syncUrl(productSlug, slug);
    track('filter_used', { type: 'industry', value: slug || 'all' });
  };
  const reset = () => {
    setProductSlug('');
    setIndustrySlug('');
    window.history.replaceState(null, '', pathname);
  };

  const industryLabel = industries.find((i) => i.slug === industrySlug)?.name ?? 'Tất cả ngành';

  const filtered = cases.filter(
    (c) =>
      (!productSlug || c.products.some((p) => p.slug === productSlug)) &&
      (!industrySlug || c.industry.slug === industrySlug),
  );

  const productChips: Opt[] = [{ name: 'Tất cả', slug: '' }, ...products];
  const industryItems: Opt[] = [{ name: 'Tất cả ngành', slug: '' }, ...industries];

  return (
    <section style={{ padding: 'clamp(36px,5vw,56px) 0 clamp(56px,7vw,96px)', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 34 }}>
          {/* product chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flex: 1, minWidth: 0 }}>
            {productChips.map((p) => {
              const cs = chipStyle(p.slug === productSlug);
              return (
                <button
                  key={p.slug || 'all'}
                  onClick={() => pickProduct(p.slug)}
                  style={{
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 700,
                    fontSize: 14,
                    padding: '10px 18px',
                    borderRadius: 'var(--r-pill)',
                    transition: 'all .15s',
                    background: cs.bg,
                    color: cs.color,
                    border: cs.border,
                    boxShadow: cs.shadow,
                  }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* industry dropdown — đưa lên đầu tiên bên trái cho nổi bật */}
          <div ref={dropdownRef} style={{ position: 'relative', flex: 'none', order: -1 }}>
            <button
              onClick={() => setIndustryOpen((v) => !v)}
              style={{
                border: '1px solid var(--line)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: 14,
                padding: '11px 18px',
                borderRadius: 'var(--r-pill)',
                background: '#fff',
                color: 'var(--ink)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
              }}
            >
              {industryLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {industryOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  zIndex: 20,
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  boxShadow: 'var(--sh-lg)',
                  padding: 7,
                  minWidth: 200,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {industryItems.map((im) => {
                  const active = im.slug === industrySlug;
                  return (
                    <button
                      key={im.slug || 'all'}
                      onClick={() => pickIndustry(im.slug)}
                      style={{
                        border: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        fontWeight: active ? 800 : 600,
                        fontSize: 14,
                        padding: '10px 13px',
                        borderRadius: 9,
                        background: active ? 'var(--surface)' : 'transparent',
                        color: active ? 'var(--blue-700)' : 'var(--ink-soft)',
                      }}
                    >
                      {im.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 26 }}>
            {filtered.map((c) => (
              <CaseCard key={c.id} caseStudy={c} variant="full" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '72px 24px' }}>
            <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--surface)', display: 'grid', placeItems: 'center', margin: '0 auto 22px', color: 'var(--blue-300)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 21, color: 'var(--ink)' }}>Chưa có câu chuyện cho lựa chọn này</h3>
            <p style={{ margin: '0 0 20px', fontSize: 15, color: 'var(--ink-soft)' }}>Thử đổi bộ lọc sản phẩm hoặc ngành nghề khác nhé.</p>
            <button
              onClick={reset}
              style={{
                border: '1px solid var(--blue-700)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 800,
                fontSize: 14,
                color: 'var(--blue-700)',
                background: '#fff',
                borderRadius: 'var(--r-pill)',
                padding: '12px 24px',
              }}
            >
              Xoá bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
