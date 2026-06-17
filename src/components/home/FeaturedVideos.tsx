import Link from 'next/link';
import type { VideoReview } from '@/lib/types';
import VideoCard from '../VideoCard';
import styles from '../effects.module.css';

export default function FeaturedVideos({ videos }: { videos: VideoReview[] }) {
  return (
    <section style={{ padding: 'clamp(56px,7vw,96px) 0', background: 'var(--grad-hero-deep)', position: 'relative', overflow: 'hidden' }}>
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
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Video thực tế
          </span>
          <h2 className="balance" style={{ margin: '14px 0 12px', fontWeight: 900, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.12, color: '#fff' }}>
            Nghe khách hàng kể, tận mắt xem kết quả
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,.82)' }}>
            Đánh giá, hướng dẫn và phỏng vấn trực tiếp từ người dùng MKT.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 26 }}>
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} variant="dark" reveal />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link
            href="/video"
            className={styles.ghostPillBtn}
            style={{
              border: '1px solid rgba(255,255,255,.5)',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 15,
              color: '#fff',
              background: 'rgba(255,255,255,.12)',
              backdropFilter: 'blur(4px)',
              borderRadius: 'var(--r-pill)',
              padding: '15px 32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            Xem tất cả video
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
