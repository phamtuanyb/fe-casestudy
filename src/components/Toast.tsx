// Toast thành công — style giữ nguyên theo thiết kế (#mkt toast).
export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 28,
        zIndex: 120,
        transform: 'translateX(-50%)',
        background: '#0F2540',
        color: '#fff',
        fontWeight: 700,
        fontSize: 14.5,
        padding: '14px 22px',
        borderRadius: 'var(--r-pill)',
        boxShadow: '0 18px 40px rgba(0,0,0,.4)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 11,
        animation: 'mktToastIn .3s cubic-bezier(.2,.8,.3,1)',
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--green)',
          display: 'grid',
          placeItems: 'center',
          flex: 'none',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {message}
    </div>
  );
}
