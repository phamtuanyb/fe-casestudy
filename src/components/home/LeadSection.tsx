import LeadForm from './LeadForm';

const Check = () => (
  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--green)', display: 'grid', placeItems: 'center', flex: 'none' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

export default function LeadSection({
  industryOptions,
  productOptions,
}: {
  industryOptions: string[];
  productOptions: { name: string; slug: string }[];
}) {
  return (
    <section id="mkt-lead" style={{ padding: 'clamp(36px,5vw,56px) 0', background: 'var(--grad-hero-deep)', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,140,0,.34),transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 980,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 'clamp(44px,6vw,72px)',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Bắt đầu hôm nay
          </span>
          <h2 style={{ margin: '14px 0 16px', fontWeight: 900, fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1.1, color: '#fff', whiteSpace: 'nowrap' }}>
            Sẵn sàng trở thành
            <br />
            câu chuyện tiếp theo?
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,.86)' }}>
            Để lại thông tin, đội ngũ MKT Software sẽ tư vấn lộ trình triển khai phù hợp cho đúng ngành của bạn hoàn toàn miễn phí.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 600, fontSize: 15 }}>
              <Check />
              Bảo hành trọn đời · Hoàn tiền 100%
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 600, fontSize: 15 }}>
              <Check />
              Hỗ trợ 24/7 · Cập nhật miễn phí
            </span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-lg)', padding: 28 }}>
          <LeadForm industryOptions={industryOptions} productOptions={productOptions} />
        </div>
      </div>
    </section>
  );
}
