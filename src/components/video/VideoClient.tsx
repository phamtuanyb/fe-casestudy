'use client';

import { useState } from 'react';
import type { VideoReview } from '@/lib/types';
import { track } from '@/lib/tracking';
import VideoCard from '../VideoCard';

const ALL = 'Tất cả';

const chipStyle = (active: boolean) => ({
  bg: active ? 'var(--grad-hero)' : '#fff',
  color: active ? '#fff' : 'var(--ink-soft)',
  border: active ? '1px solid transparent' : '1px solid var(--line)',
  shadow: active ? 'var(--sh-md)' : 'none',
});

// Lấy danh sách giá trị duy nhất, giữ nguyên thứ tự xuất hiện.
const uniq = (arr: string[]) => Array.from(new Set(arr));

function ChipRow({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink-faint)', marginRight: 4 }}>{label}</span>
      {options.map((opt) => {
        const cs = chipStyle(opt === value);
        return (
          <button
            key={opt}
            onClick={() => onPick(opt)}
            style={{
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '9px 16px',
              borderRadius: 'var(--r-pill)',
              transition: 'all .15s',
              background: cs.bg,
              color: cs.color,
              border: cs.border,
              boxShadow: cs.shadow,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function VideoClient({ videos }: { videos: VideoReview[] }) {
  const [cat, setCat] = useState(ALL);
  const [product, setProduct] = useState(ALL);

  const cats = [ALL, ...uniq(videos.map((v) => v.categoryLabel))];
  const productNames = [ALL, ...uniq(videos.flatMap((v) => v.products.map((p) => p.name)))];

  const filtered = videos.filter(
    (v) =>
      (cat === ALL || v.categoryLabel === cat) &&
      (product === ALL || v.products.some((p) => p.name === product)),
  );

  const reset = () => {
    setCat(ALL);
    setProduct(ALL);
  };

  return (
    <section style={{ padding: 'clamp(36px,5vw,56px) 0 clamp(56px,7vw,96px)', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 14 }}>
          <ChipRow
            label="Chủ đề:"
            options={cats}
            value={cat}
            onPick={(v) => {
              setCat(v);
              track('filter_used', { type: 'video_category', value: v });
            }}
          />
        </div>
        <div style={{ marginBottom: 34 }}>
          <ChipRow
            label="Sản phẩm:"
            options={productNames}
            value={product}
            onPick={(v) => {
              setProduct(v);
              track('filter_used', { type: 'video_product', value: v });
            }}
          />
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 26 }}>
            {filtered.map((v) => (
              <VideoCard key={v.id} video={v} variant="light" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '72px 24px' }}>
            <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--surface)', display: 'grid', placeItems: 'center', margin: '0 auto 22px', color: 'var(--blue-300)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 21, color: 'var(--ink)' }}>Chưa có video cho lựa chọn này</h3>
            <p style={{ margin: '0 0 20px', fontSize: 15, color: 'var(--ink-soft)' }}>Thử đổi chủ đề hoặc sản phẩm khác nhé.</p>
            <button
              onClick={reset}
              style={{
                border: '1px solid var(--blue-700)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 800,
                fontSize: 14,
                color: 'var(--blue-700)',
                background: '#fff',
                borderRadius: 'var(--r-pill)',
                padding: '12px 24px',
              }}
            >
              Xoá bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
