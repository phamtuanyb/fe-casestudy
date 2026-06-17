'use client';

import { caseUrl } from '@/lib/site';
import { track } from '@/lib/tracking';
import { useUI } from '../UIProvider';
import styles from '../effects.module.css';

// Share thật: Copy link (clipboard), Zalo & Facebook mở popup chia sẻ.
export default function DetailShareRow({ slug, title }: { slug: string; title: string }) {
  const { showToast } = useUI();
  const url = caseUrl(slug);

  const copyLink = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    track('case_share_click', { slug, via: 'copy' });
    showToast('Đã sao chép liên kết!');
  };

  const openPopup = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=640,height=640');
  };

  const shareZalo = () => {
    track('case_share_click', { slug, via: 'zalo' });
    openPopup(`https://sp.zalo.me/plugins/share?u=${encodeURIComponent(url)}`);
  };

  const shareFb = () => {
    track('case_share_click', { slug, via: 'facebook' });
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '24px 0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink)', marginRight: 4 }}>Chia sẻ câu chuyện:</span>
      <button
        onClick={shareZalo}
        aria-label={`Chia sẻ "${title}" lên Zalo`}
        className={styles.socialBtn}
        style={{ border: 0, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, color: '#fff', background: '#0068FF', borderRadius: 10, padding: '11px 18px', display: 'inline-flex', alignItems: 'center', gap: 9 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://cdn.simpleicons.org/zalo/ffffff" width={17} height={17} alt="" />
        Zalo
      </button>
      <button
        onClick={shareFb}
        aria-label={`Chia sẻ "${title}" lên Facebook`}
        className={styles.socialBtn}
        style={{ border: 0, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, color: '#fff', background: '#1877F2', borderRadius: 10, padding: '11px 18px', display: 'inline-flex', alignItems: 'center', gap: 9 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://cdn.simpleicons.org/facebook/ffffff" width={17} height={17} alt="" />
        Facebook
      </button>
      <button
        onClick={copyLink}
        className={styles.copyBtn}
        style={{ border: '1px solid var(--line)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, color: 'var(--ink-soft)', background: '#fff', borderRadius: 10, padding: '11px 18px', display: 'inline-flex', alignItems: 'center', gap: 9 }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Sao chép link
      </button>
    </div>
  );
}
