'use client';

import type { VideoReview } from '@/lib/types';
import { track } from '@/lib/tracking';
import { useUI } from './UIProvider';
import styles from './effects.module.css';

export default function VideoCard({
  video,
  variant = 'light',
  reveal = false,
}: {
  video: VideoReview;
  variant?: 'dark' | 'light';
  reveal?: boolean;
}) {
  const { openVideo } = useUI();
  const v = video;
  const product = v.products[0]?.name ?? '';
  const dark = variant === 'dark';

  return (
    <div
      onClick={() => {
        track('video_play', { id: v.id, title: v.title });
        openVideo(v);
      }}
      className={dark ? styles.videoCardDark : styles.videoCardLight}
      style={{
        cursor: 'pointer',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        ...(dark
          ? {
              background: 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.16)',
              backdropFilter: 'blur(4px)',
            }
          : {
              background: '#fff',
              border: '1px solid var(--line)',
              boxShadow: 'var(--sh-sm)',
            }),
        ...(reveal ? { animation: 'mktRise .6s cubic-bezier(.2,.7,.3,1) both' } : null),
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          background: v.thumbnailColor,
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'var(--orange)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 11.5,
            padding: '5px 11px',
            borderRadius: 'var(--r-pill)',
          }}
        >
          {v.categoryLabel}
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(0,0,0,.55)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 12,
            padding: '4px 9px',
            borderRadius: 7,
          }}
        >
          {v.durationLabel}
        </span>
        <span
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.95)',
            display: 'grid',
            placeItems: 'center',
            boxShadow: 'var(--sh-lg)',
            color: 'var(--blue-700)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <h3 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 16.5, lineHeight: 1.4, color: dark ? '#fff' : 'var(--ink)' }}>
          {v.title}
        </h3>
        <span style={{ fontSize: 13, fontWeight: 600, color: dark ? 'rgba(255,255,255,.7)' : 'var(--ink-faint)' }}>{product}</span>
      </div>
    </div>
  );
}
