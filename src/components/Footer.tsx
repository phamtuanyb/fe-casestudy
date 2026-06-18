import Link from 'next/link';
import Logo from './Logo';
import styles from './effects.module.css';

export default function Footer() {
  return (
    <footer style={{ background: '#112B4D', color: 'rgba(255,255,255,.72)', padding: 'clamp(48px,6vw,72px) 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
            gap: 36,
            marginBottom: 44,
          }}
        >
          <div>
            <div style={{ marginBottom: 14 }}>
              <Logo height={40} light />
            </div>
            <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.7 }}>Phần mềm Marketing AI đa kênh</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: 'facebook', alt: 'Facebook', href: 'https://www.facebook.com/mktsoftware.com.vn' },
                { icon: 'youtube', alt: 'YouTube', href: 'https://www.youtube.com/@phanmemmktvn' },
                { icon: 'tiktok', alt: 'TikTok', href: 'https://www.tiktok.com/@kenhmkt0dong' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.alt}
                  className={styles.socialBtn}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,.08)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://cdn.simpleicons.org/${s.icon}/ffffff`} width={18} height={18} alt={s.alt} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 16px', color: '#fff', fontWeight: 800, fontSize: 15 }}>Khám phá</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}>
              <Link href="/cau-chuyen" className={styles.footerLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                Câu chuyện khách hàng
              </Link>
              <Link href="/video" className={styles.footerLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                Thư viện video
              </Link>
              <a className={styles.footerLink} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                Bảng giá
              </a>
              <a className={styles.footerLink} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                Blog
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 16px', color: '#fff', fontWeight: 800, fontSize: 15 }}>Liên hệ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}>
              <a
                href="tel:0941113119"
                className={styles.footerLink}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', color: 'inherit' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0941 113 119
              </a>
              <a
                href="https://mktsoftware.vn"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', color: 'inherit' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                mktsoftware.vn
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                35 Lê Văn Thiêm, Thanh Xuân, HN
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.1)',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12,
            fontSize: 13,
          }}
        >
          <span>© 2026 MKT Software. Bảo lưu mọi quyền.</span>
          <span>HIỆU QUẢ – NHANH – DỄ DÙNG</span>
        </div>
      </div>
    </footer>
  );
}
