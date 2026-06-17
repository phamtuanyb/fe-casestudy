'use client';

import { useEffect } from 'react';
import type { VideoReview } from '@/lib/types';
import styles from './effects.module.css';

// Modal video — nhúng iframe YouTube LAZY: iframe chỉ được tạo khi modal mở
// (component trả null khi đóng). Đóng modal → iframe unmount → video dừng.
export default function VideoModal({
  video,
  onClose,
}: {
  video: VideoReview | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(7,20,40,.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 840, animation: 'mktModalIn .26s cubic-bezier(.2,.8,.3,1)' }}
      >
        <button
          onClick={onClose}
          aria-label="Đóng video"
          className={styles.modalClose}
          style={{
            position: 'absolute',
            top: -52,
            right: 0,
            border: 0,
            cursor: 'pointer',
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.16)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              background: video.youtubeId ? '#000' : video.thumbnailColor,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {video.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.12,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,.6) 1px,transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                  <span
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.95)',
                      display: 'grid',
                      placeItems: 'center',
                      margin: '0 auto 16px',
                      color: 'var(--blue-700)',
                      boxShadow: 'var(--sh-lg)',
                    }}
                  >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 4 }}>
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </span>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, opacity: 0.85 }}>
                    Video demo • {video.durationLabel}
                  </p>
                </div>
              </>
            )}
          </div>
          <div style={{ background: '#0F2540', padding: '20px 24px' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--orange)',
                color: '#fff',
                fontWeight: 800,
                fontSize: 11.5,
                padding: '4px 11px',
                borderRadius: 'var(--r-pill)',
                marginBottom: 10,
              }}
            >
              {video.categoryLabel}
            </span>
            <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18, lineHeight: 1.4, color: '#fff' }}>
              {video.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
