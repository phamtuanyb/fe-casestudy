import Link from 'next/link';
import type { VideoReview } from '@/lib/types';
import VideoCard from '../VideoCard';
import styles from '../effects.module.css';

export default function FeaturedVideos({ videos }: { videos: VideoReview[] }) {
  return (
    <section style={{ padding: 'clamp(28px,4vw,44px) 0', background: 'var(--grad-hero-deep)', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.12,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,.55) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 32px' }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Video thực tế
          </span>
          <h2 style={{ margin: '14px 0 12px', fontWeight: 900, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.12, color: '#fff', whiteSpace: 'nowrap' }}>
            Nghe khách hàng kể, tận mắt xem kết quả
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,.82)' }}>
            Đánh giá, hướng dẫn và phỏng vấn trực tiếp từ người dùng MKT Software
          </p>
        </div>
        {/* Băng chuyền video trong khung — tự chạy phải → trái, lặp liền mạch */}
        <div className={styles.marqueeViewport} style={{ overflow: 'hidden', padding: '12px 0' }}>
          <div
            className={styles.marqueeTrack}
            style={{
              display: 'flex',
              width: 'max-content',
              alignItems: 'stretch',
              animationName: 'mktMarquee',
              animationDuration: `${Math.max(videos.length, 4) * 6}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            {[...videos, ...videos].map((v, i) => (
              <div key={`${v.id}-${i}`} style={{ flex: 'none', width: 360, marginRight: 40, display: 'grid' }}>
                <VideoCard video={v} variant="dark" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link
            href="/video"
            className={styles.ctaBtn}
            style={{
              border: 0,
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '.02em',
              fontSize: 16,
              color: '#fff',
              background: 'var(--grad-cta)',
              borderRadius: 'var(--r-pill)',
              padding: '17px 40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              animation: 'mktCtaBeacon 1.5s ease-in-out infinite',
            }}
          >
            <span aria-hidden="true" style={{ display: 'inline-block', fontSize: 22, animation: 'mktTap 0.85s ease-in-out infinite' }}>
              👆
            </span>
            Xem tất cả video
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
