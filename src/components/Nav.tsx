'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { track } from '@/lib/tracking';
import Logo from './Logo';
import styles from './effects.module.css';

const NAV_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Câu chuyện', href: '/cau-chuyen' },
  { label: 'Thư viện video', href: '/video' },
];

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: 'rgba(255,255,255,.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--line)',
        boxShadow: 'var(--sh-sm)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '11px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flex: 'none' }} onClick={() => setMenuOpen(false)}>
          <Logo height={38} priority />
        </Link>

        <nav data-desktop-nav style={{ display: 'flex', gap: 4, marginLeft: 14 }}>
          {NAV_LINKS.map((lnk) => (
            <Link
              key={lnk.href}
              href={lnk.href}
              className={styles.navLink}
              style={{
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 14.5,
                padding: '8px 14px',
                borderRadius: 'var(--r-pill)',
                color: isActive(pathname, lnk.href) ? 'var(--orange)' : 'var(--ink-soft)',
                background: 'transparent',
              }}
            >
              {lnk.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link
            data-desktop-nav
            href="/#mkt-lead"
            className={styles.textLink}
            style={{ textDecoration: 'none', color: 'var(--blue-700)', fontWeight: 700, fontSize: 14 }}
          >
            Đăng Ký Ngay
          </Link>
          <Link
            data-desktop-nav
            href="/#mkt-lead"
            onClick={() => track('cta_click', { location: 'nav' })}
            className={styles.ctaBtn}
            style={{
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '.02em',
              fontSize: 13,
              color: '#fff',
              background: 'var(--grad-cta)',
              boxShadow: 'var(--sh-cta)',
              borderRadius: 'var(--r-pill)',
              padding: '11px 20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Nhận tư vấn miễn phí
          </Link>
          <button
            data-hamburger
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Mở menu"
            style={{
              display: 'none',
              border: 0,
              cursor: 'pointer',
              background: 'var(--surface)',
              width: 42,
              height: 42,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          data-mobile-menu
          style={{
            borderTop: '1px solid var(--line)',
            background: '#fff',
            padding: '12px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_LINKS.map((lnk) => (
            <Link
              key={lnk.href}
              href={lnk.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 16,
                padding: '13px 12px',
                borderRadius: 12,
                color: isActive(pathname, lnk.href) ? 'var(--orange)' : 'var(--ink-soft)',
              }}
            >
              {lnk.label}
            </Link>
          ))}
          <Link
            href="/#mkt-lead"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 8,
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: 14,
              color: '#fff',
              background: 'var(--grad-cta)',
              boxShadow: 'var(--sh-cta)',
              borderRadius: 'var(--r-pill)',
              padding: 15,
              width: '100%',
            }}
          >
            Nhận tư vấn miễn phí
          </Link>
        </div>
      )}
    </header>
  );
}
