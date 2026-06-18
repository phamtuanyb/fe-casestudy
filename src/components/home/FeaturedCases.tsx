import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import CaseCard from '../CaseCard';
import styles from '../effects.module.css';

export default function FeaturedCases({ cases }: { cases: CaseStudy[] }) {
  return (
    <section style={{ padding: 'clamp(56px,7vw,96px) 0', background: '#fff', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Câu chuyện nổi bật
          </span>
          <h2 style={{ margin: '14px 0 12px', fontWeight: 900, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.12, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
            Kết quả thật, không phải lời hứa
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
            Mỗi câu chuyện là một con số đo được - chọn ngành của bạn và xem họ đã làm thế nào.
          </p>
        </div>

        {/* Băng chuyền trong khung (không full màn) — tự chạy phải → trái, lặp liền mạch */}
        <div className={styles.marqueeViewport} style={{ overflow: 'hidden', padding: '12px 0' }}>
          <div
            className={styles.marqueeTrack}
            style={{
              display: 'flex',
              width: 'max-content',
              alignItems: 'stretch',
              animationName: 'mktMarquee',
              animationDuration: `${Math.max(cases.length, 4) * 6}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            {[...cases, ...cases].map((c, i) => (
              <div key={`${c.id}-${i}`} style={{ flex: 'none', width: 360, marginRight: 40, display: 'grid' }}>
                <CaseCard caseStudy={c} variant="full" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link
            href="/cau-chuyen"
            className={styles.ctaBtn}
            style={{
              border: 0,
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '.02em',
              fontSize: 16,
              color: '#fff',
              background: 'var(--grad-cta)',
              borderRadius: 'var(--r-pill)',
              padding: '17px 40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              animation: 'mktCtaBeacon 1.5s ease-in-out infinite',
            }}
          >
            <span aria-hidden="true" style={{ display: 'inline-block', fontSize: 22, animation: 'mktTap 0.85s ease-in-out infinite' }}>
              👆
            </span>
            Xem tất cả câu chuyện
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
