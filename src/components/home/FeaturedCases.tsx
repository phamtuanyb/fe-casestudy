import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import CaseCard from '../CaseCard';
import styles from '../effects.module.css';

export default function FeaturedCases({ cases }: { cases: CaseStudy[] }) {
  return (
    <section style={{ padding: 'clamp(56px,7vw,96px) 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Câu chuyện nổi bật
          </span>
          <h2 className="balance" style={{ margin: '14px 0 12px', fontWeight: 900, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.12, color: 'var(--ink)' }}>
            Kết quả thật, không phải lời hứa
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            Mỗi câu chuyện là một con số đo được — chọn ngành của bạn và xem họ đã làm thế nào.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 26 }}>
          {cases.map((c) => (
            <CaseCard key={c.id} caseStudy={c} variant="full" reveal />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link
            href="/cau-chuyen"
            className={styles.outlineBtn}
            style={{
              border: '1px solid var(--blue-700)',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 15,
              color: 'var(--blue-700)',
              background: '#fff',
              borderRadius: 'var(--r-pill)',
              padding: '15px 32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            Xem tất cả câu chuyện
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
