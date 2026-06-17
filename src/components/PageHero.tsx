// Hero dạng tối dùng chung cho trang Danh sách & Video (layout giống hệt trong thiết kế).
export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section
      style={{
        background: 'var(--grad-hero-deep)',
        padding: 'clamp(44px,6vw,72px) 0 clamp(36px,5vw,56px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          {eyebrow}
        </span>
        <h1
          className="balance"
          style={{
            margin: '14px 0 12px',
            fontWeight: 900,
            fontSize: 'clamp(30px,4vw,52px)',
            lineHeight: 1.08,
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          {title}
        </h1>
        <p style={{ margin: '0 auto', maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,.84)' }}>{subtitle}</p>
      </div>
    </section>
  );
}
