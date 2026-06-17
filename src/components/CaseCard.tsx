'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/types';
import { initialsOf } from '@/lib/format';
import { track } from '@/lib/tracking';
import { useUI } from './UIProvider';
import styles from './effects.module.css';

export default function CaseCard({
  caseStudy,
  variant = 'full',
  reveal = false,
}: {
  caseStudy: CaseStudy;
  variant?: 'full' | 'related';
  reveal?: boolean;
}) {
  const { showToast } = useUI();
  const c = caseStudy;
  const href = `/cau-chuyen/${c.slug}`;
  const bigValue = c.metrics[0]?.value ?? '';
  const product = c.products[0]?.name ?? '';
  const cardMetrics = c.metrics.slice(0, 2);

  const onShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}${href}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    track('case_share_click', { slug: c.slug, via: 'copy' });
    showToast('Đã sao chép liên kết!');
  };

  const coverHeight = variant === 'full' ? 170 : 150;
  const bigFont = variant === 'full' ? 108 : 96;

  return (
    <div
      className={styles.card}
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--sh-sm)',
        ...(reveal ? { animation: 'mktRise .6s cubic-bezier(.2,.7,.3,1) both' } : null),
      }}
    >
      <Link
        href={href}
        style={{
          position: 'relative',
          height: coverHeight,
          padding: 16,
          overflow: 'hidden',
          background: c.coverColor,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textDecoration: 'none',
        }}
      >
        {c.coverImage?.url && (
          <>
            <Image
              src={c.coverImage.url}
              alt=""
              fill
              sizes="(max-width:768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,rgba(10,46,99,.25),rgba(10,46,99,.6))',
              }}
            />
          </>
        )}
        <div
          style={{
            position: 'absolute',
            right: -8,
            bottom: -26,
            fontWeight: 900,
            fontSize: bigFont,
            lineHeight: 1,
            color: 'rgba(255,255,255,.12)',
            pointerEvents: 'none',
          }}
        >
          {bigValue}
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span
            style={{
              background: 'rgba(255,255,255,.92)',
              color: 'var(--blue-700)',
              fontWeight: 800,
              fontSize: 12,
              padding: '6px 12px',
              borderRadius: 'var(--r-pill)',
            }}
          >
            {c.industry.name}
          </span>
          <span
            style={{
              background: 'rgba(10,46,99,.55)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 12,
              padding: '6px 12px',
              borderRadius: 'var(--r-pill)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {product}
          </span>
        </div>
        {variant === 'full' && (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              color: 'rgba(255,255,255,.92)',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
            Xem câu chuyện
          </div>
        )}
      </Link>

      {variant === 'full' ? (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          <Link
            href={href}
            style={{ textDecoration: 'none', margin: 0, fontWeight: 800, fontSize: 18.5, lineHeight: 1.32, color: 'var(--ink)' }}
          >
            {c.title}
          </Link>
          <p style={{ margin: 0, fontStyle: 'italic', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-soft)', flex: 1 }}>
            &ldquo;{c.quote}&rdquo;
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {cardMetrics.map((m, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontWeight: 900, fontSize: 24, color: 'var(--orange)', lineHeight: 1 }}>{m.value}</div>
                <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: 'var(--ink-faint)' }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, borderTop: '1px solid var(--line)', paddingTop: 14 }}>
            {c.customerAvatar?.url ? (
              <Image
                src={c.customerAvatar.url}
                alt={c.customerName}
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover', flex: 'none' }}
              />
            ) : (
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#FF9D2E,#FF8C00)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 14,
                  flex: 'none',
                }}
              >
                {initialsOf(c.customerName)}
              </span>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>{c.customerName}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{c.customerRole}</div>
            </div>
            <button
              onClick={onShare}
              title="Chia sẻ"
              className={styles.shareBtn}
              style={{
                border: 0,
                cursor: 'pointer',
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'var(--surface)',
                color: 'var(--ink-soft)',
                display: 'grid',
                placeItems: 'center',
                flex: 'none',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
                <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <Link
            href={href}
            style={{ textDecoration: 'none', margin: 0, fontWeight: 800, fontSize: 17, lineHeight: 1.34, color: 'var(--ink)' }}
          >
            {c.title}
          </Link>
          <div style={{ display: 'flex', gap: 14, marginTop: 'auto' }}>
            {cardMetrics.map((m, i) => (
              <div key={i}>
                <span style={{ fontWeight: 900, fontSize: 20, color: 'var(--orange)' }}>{m.value}</span>{' '}
                <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 600 }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
