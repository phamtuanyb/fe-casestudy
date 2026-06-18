import Link from 'next/link';
import TrackedLink from '../analytics/TrackedLink';
import styles from '../effects.module.css';

const Star = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFD700">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);

export default function HomeHero() {
  return (
    <section style={{ position: 'relative', background: 'var(--grad-hero-deep)', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,rgba(255,255,255,.16) 0%,rgba(255,255,255,0) 55%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.16,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,.55) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: -80,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(100,181,246,.6),transparent 70%)',
          filter: 'blur(20px)',
          animation: 'mktBlob 16s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -140,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,140,0,.34),transparent 70%)',
          filter: 'blur(22px)',
          animation: 'mktBlob 19s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(32px,4vw,52px) 24px clamp(44px,5vw,68px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))',
          gap: 48,
          alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <div style={{ animation: 'mktRise .7s cubic-bezier(.2,.7,.3,1) both' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,.12)',
              border: '1px solid rgba(255,255,255,.28)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              padding: '7px 15px',
              borderRadius: 'var(--r-pill)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 4px rgba(46,204,113,.28)' }} />
            100.000+ doanh nghiệp đã thành công cùng MKT Software
          </span>
          <h1
            className="balance"
            style={{
              margin: '18px 0 18px',
              fontWeight: 900,
              fontSize: 'clamp(23px,3.4vw,40px)',
              lineHeight: 1.24,
              letterSpacing: '-.01em',
              textTransform: 'uppercase',
              color: '#fff',
            }}
          >
            Hàng nghìn người đã bứt phá ở đây
            <br />
            <span style={{ color: 'var(--orange)', whiteSpace: 'nowrap' }}>và bạn kiểm chứng được</span>
          </h1>
          <p
            style={{
              margin: '0 0 24px',
              fontSize: 'clamp(16px,1.6vw,19px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,.86)',
              fontWeight: 500,
              maxWidth: 520,
            }}
          >
            Câu chuyện thật, số liệu thật, gương mặt thật từ khách hàng dùng giải pháp của MKT Software.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <TrackedLink
              href="/cau-chuyen"
              event="cta_click"
              eventParams={{ location: 'hero_primary' }}
              className={styles.ctaBtn}
              style={{
                textDecoration: 'none',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '.02em',
                fontSize: 15,
                color: '#fff',
                background: 'var(--grad-cta)',
                borderRadius: 'var(--r-pill)',
                padding: '16px 30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                animation: 'mktPulse 2.8s ease-in-out infinite',
              }}
            >
              Xem câu chuyện thành công
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </TrackedLink>
            <Link
              href="/video"
              className={styles.ghostBtn}
              style={{
                border: '1px solid rgba(255,255,255,.42)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 15,
                color: '#fff',
                background: 'rgba(255,255,255,.14)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'var(--r-pill)',
                padding: '16px 26px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              Xem video thực tế
            </Link>
          </div>
        </div>

        {/* RIGHT — proof collage */}
        <div style={{ animation: 'mktRise .8s .12s cubic-bezier(.2,.7,.3,1) both', position: 'relative', minHeight: 400, display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 420, height: 400 }}>
            <div style={{ position: 'absolute', top: '8%', left: 0, width: 248, background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-lg)', padding: 18, animation: 'mktFloat 7s ease-in-out infinite' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 13 }}>
                <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#FF9D2E,#FF8C00)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 900, fontSize: 15, flex: 'none' }}>LA</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>Chị Lan Anna</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Shop Mẹ &amp; Bé</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                <span style={{ fontWeight: 900, fontSize: 34, color: 'var(--orange)', lineHeight: 1 }}>x3</span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600 }}>đơn hàng / ngày</span>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '2%', right: 0, width: 214, background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-lg)', padding: 16, animation: 'mktFloat 8.5s ease-in-out infinite .6s' }}>
              <div style={{ display: 'flex', gap: 1, marginBottom: 9 }}>
                <Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} />
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-soft)', fontWeight: 500 }}>
                &ldquo;Tự động nhắn tin kết bạn, tiết kiệm 8 tiếng mỗi ngày. Quá đáng tiền!&rdquo;
              </p>
            </div>
            <div style={{ position: 'absolute', bottom: '1%', right: 0, width: 226, background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-lg)', padding: 16, animation: 'mktFloat 7.8s ease-in-out infinite .9s' }}>
              <div style={{ display: 'flex', gap: 1, marginBottom: 9 }}>
                <Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} />
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-soft)', fontWeight: 500 }}>
                &ldquo;Đăng bài seeding giúp tôi tăng mạnh hiệu quả livestream&rdquo;
              </p>
            </div>
            <div style={{ position: 'absolute', bottom: '13%', left: '4%', background: 'var(--grad-gold)', color: 'var(--navy-900)', fontWeight: 800, fontSize: 14, padding: '13px 20px', borderRadius: 'var(--r-pill)', boxShadow: 'var(--sh-gold)', display: 'inline-flex', alignItems: 'baseline', gap: 7, animation: 'mktFloat 7.5s ease-in-out infinite .3s' }}>
              <span style={{ fontWeight: 900, fontSize: '1.3em' }}>+76%</span> Doanh số
            </div>
            <span style={{ position: 'absolute', top: '42%', left: '-2%', width: 56, height: 56, borderRadius: '50%', background: '#1877F2', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 3px #fff,0 16px 30px rgba(10,46,99,.34)', animation: 'mktBob 6s ease-in-out infinite' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/facebook/ffffff" width={26} height={26} alt="Facebook" />
            </span>
            <span style={{ position: 'absolute', top: '54%', right: '6%', width: 52, height: 52, borderRadius: '50%', background: '#0068FF', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 3px #fff,0 16px 30px rgba(10,46,99,.34)', animation: 'mktBob2 6.5s ease-in-out infinite' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/zalo/ffffff" width={24} height={24} alt="Zalo" />
            </span>
            <span style={{ position: 'absolute', bottom: '3%', left: '20%', width: 48, height: 48, borderRadius: '50%', background: '#000', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 3px #fff,0 16px 30px rgba(10,46,99,.34)', animation: 'mktBob 7s ease-in-out infinite .4s' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/tiktok/ffffff" width={22} height={22} alt="TikTok" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
