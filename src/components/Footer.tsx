import Link from 'next/link';
import Logo from './Logo';
import styles from './effects.module.css';

const PRODUCT_LINKS = ['MKT UID', 'MKT Zalo', 'MKT Care', 'MKT Post'];

export default function Footer() {
  return (
    <footer style={{ background: '#0A1A30', color: 'rgba(255,255,255,.7)', padding: 'clamp(48px,6vw,72px) 0 32px' }}>
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
            <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.7 }}>
              Phần mềm Marketing AI đa kênh #1 Việt Nam. Tự động hoá để bạn chốt đơn thả ga.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: 'facebook', alt: 'Facebook' },
                { icon: 'youtube', alt: 'YouTube' },
                { icon: 'tiktok', alt: 'TikTok' },
              ].map((s) => (
                <span
                  key={s.icon}
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
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 16px', color: '#fff', fontWeight: 800, fontSize: 15 }}>Sản phẩm</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}>
              {PRODUCT_LINKS.map((p) => (
                <a key={p} className={styles.footerLink} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                  {p}
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
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                1900 9999
              </span>
              <span>phanmemmkt.vn</span>
              <span>Toà nhà MKT, Hà Nội</span>
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
          <span>© 2026 Phần mềm MKT. Bảo lưu mọi quyền.</span>
          <span>HIỆU QUẢ – NHANH – DỄ DÙNG</span>
        </div>
      </div>
    </footer>
  );
}
