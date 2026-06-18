import type { Testimonial } from '@/lib/types';
import { initialsOf } from '@/lib/format';

const Star = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="#FFD700">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);

export default function WallOfLove({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section style={{ padding: 'clamp(32px,4vw,48px) 0', background: 'linear-gradient(180deg,#F4F8FD 0%,#EAF2FB 100%)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Wall of Love
          </span>
          <h2 className="balance" style={{ margin: '14px 0 12px', fontWeight: 900, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.12, color: 'var(--ink)' }}>
            Khách hàng nói gì về MKT?
          </h2>
        </div>
        <div style={{ columnWidth: 330, columnGap: 24 }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                animation: 'mktRise .6s cubic-bezier(.2,.7,.3,1) both',
                breakInside: 'avoid',
                display: 'inline-block',
                width: '100%',
                marginBottom: 24,
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-md)',
                padding: 24,
                boxShadow: 'var(--sh-sm)',
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p style={{ margin: '0 0 18px', fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink)' }}>&ldquo;{t.content}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#1565C0,#1E88E5)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 14,
                    flex: 'none',
                  }}
                >
                  {initialsOf(t.customerName)}
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--ink)' }}>{t.customerName}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>{t.customerRole}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
