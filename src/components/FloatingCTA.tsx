import TrackedLink from './analytics/TrackedLink';

// CTA nổi (chỉ hiện ở mobile — ẩn ở desktop qua media query [data-floating-cta]).
export default function FloatingCTA() {
  return (
    <TrackedLink
      data-floating-cta
      href="/#mkt-lead"
      event="cta_click"
      eventParams={{ location: 'floating' }}
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 80,
        textDecoration: 'none',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '.02em',
        fontSize: 15,
        color: '#fff',
        background: 'var(--grad-cta)',
        boxShadow: 'var(--sh-cta)',
        borderRadius: 'var(--r-pill)',
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      Nhận tư vấn miễn phí
    </TrackedLink>
  );
}
