'use client';

import { useEffect, useRef, useState } from 'react';
import type { StatItem } from '@/lib/types';
import { fmtNumber, statDisplay } from '@/lib/format';

// Stat strip đè lên hero + counters đếm động khi cuộn tới (port hành vi thiết kế).
export default function StatStrip({ stats }: { stats: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 -> 1
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;
      const dur = 1500;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setProgress(eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ maxWidth: 1100, margin: '-72px auto 0', padding: '0 24px', position: 'relative', zIndex: 5 }}>
      <div
        ref={ref}
        style={{
          animation: 'mktRise .7s cubic-bezier(.2,.7,.3,1) both',
          background: '#fff',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--sh-lg)',
          padding: 'clamp(22px,3vw,34px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          gap: 14,
        }}
      >
        {stats.map((s) => {
          const current = Math.round(s.value * progress);
          const display = progress >= 1 ? statDisplay(s) : (s.prefix ?? '') + fmtNumber(current) + (s.suffix ?? '');
          return (
            <div key={s.id} style={{ textAlign: 'center', padding: '8px 6px' }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(30px,3.6vw,42px)',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg,#1565C0,#1E88E5)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {display}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)' }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
