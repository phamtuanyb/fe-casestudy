'use client';

import { useState } from 'react';
import { useUI } from '../UIProvider';
import { track } from '@/lib/tracking';
import styles from '../effects.module.css';

interface FormState {
  name: string;
  phone: string;
  industry: string;
  product: string; // slug sản phẩm quan tâm
}
interface FormErr {
  name?: string;
  phone?: string;
}

// Đọc sourceSlug (?source=) + UTM (?utm_*) từ URL tại thời điểm submit.
function readContext(): { sourceSlug?: string; utm?: { source?: string; medium?: string; campaign?: string } } {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  const sourceSlug = q.get('source') || undefined;
  const source = q.get('utm_source') || undefined;
  const medium = q.get('utm_medium') || undefined;
  const campaign = q.get('utm_campaign') || undefined;
  const utm = source || medium || campaign ? { source, medium, campaign } : undefined;
  return { sourceSlug, utm };
}

// Form lead → POST proxy nội bộ /api/lead (validate + rate-limit + honeypot + sourceSlug/UTM → BE).
export default function LeadForm({
  industryOptions,
  productOptions,
}: {
  industryOptions: string[];
  productOptions: { name: string; slug: string }[];
}) {
  const { showToast } = useUI();
  const [form, setForm] = useState<FormState>({ name: '', phone: '', industry: '', product: '' });
  const [err, setErr] = useState<FormErr>({});
  const [hp, setHp] = useState(''); // honeypot — người thật để trống
  const [submitting, setSubmitting] = useState(false);

  const baseField: React.CSSProperties = {
    width: '100%',
    fontFamily: 'inherit',
    fontSize: 15,
    padding: '13px 15px',
    borderRadius: 10,
    outline: 'none',
    background: 'var(--surface)',
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const next: FormErr = {};
    if (!form.name.trim()) next.name = 'Vui lòng nhập họ tên của bạn';
    if (!/^[0-9][0-9\s.+()-]{7,}$/.test(form.phone.trim())) next.phone = 'Số điện thoại chưa hợp lệ';
    if (Object.keys(next).length) {
      setErr(next);
      return;
    }

    setSubmitting(true);
    try {
      const { sourceSlug, utm } = readContext();
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          industry: form.industry || undefined,
          productInterest: form.product || undefined,
          sourceSlug,
          utm,
          _hp: hp,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        showToast(data.error || 'Có lỗi xảy ra, vui lòng thử lại.');
        return;
      }
      setForm({ name: '', phone: '', industry: '', product: '' });
      setErr({});
      track('lead_submit', { sourceSlug, productInterest: form.product || undefined });
      showToast('Đã gửi! Đội ngũ MKT sẽ liên hệ bạn sớm.');
    } catch {
      showToast('Lỗi kết nối. Vui lòng thử lại sau giây lát.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Honeypot ẩn — bot điền sẽ bị chặn. Người thật không thấy. */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label>
          Đừng điền ô này
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 7 }}>Họ và tên</label>
        <input
          value={form.name}
          onChange={(e) => {
            setForm((s) => ({ ...s, name: e.target.value }));
            setErr((s) => ({ ...s, name: undefined }));
          }}
          placeholder="Nguyễn Văn A"
          className={styles.field}
          style={{ ...baseField, border: err.name ? '1px solid #E5484D' : '1px solid var(--line)' }}
        />
        {err.name && <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 600, color: '#E5484D' }}>{err.name}</div>}
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 7 }}>Số điện thoại / Zalo</label>
        <input
          value={form.phone}
          onChange={(e) => {
            setForm((s) => ({ ...s, phone: e.target.value }));
            setErr((s) => ({ ...s, phone: undefined }));
          }}
          placeholder="09xx xxx xxx"
          inputMode="tel"
          className={styles.field}
          style={{ ...baseField, border: err.phone ? '1px solid #E5484D' : '1px solid var(--line)' }}
        />
        {err.phone && <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 600, color: '#E5484D' }}>{err.phone}</div>}
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 7 }}>Ngành nghề</label>
        <select
          value={form.industry}
          onChange={(e) => setForm((s) => ({ ...s, industry: e.target.value }))}
          className={styles.field}
          style={{ ...baseField, border: '1px solid var(--line)', color: 'var(--ink)', cursor: 'pointer' }}
        >
          <option value="">— Chọn ngành của bạn —</option>
          {industryOptions.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 7 }}>Phần mềm quan tâm</label>
        <select
          value={form.product}
          onChange={(e) => setForm((s) => ({ ...s, product: e.target.value }))}
          className={styles.field}
          style={{ ...baseField, border: '1px solid var(--line)', color: 'var(--ink)', cursor: 'pointer' }}
        >
          <option value="">— Chọn phần mềm —</option>
          {productOptions.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={styles.ctaBtn}
        style={{
          border: 0,
          cursor: submitting ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '.02em',
          fontSize: 15,
          color: '#fff',
          background: 'var(--grad-cta)',
          boxShadow: 'var(--sh-cta)',
          borderRadius: 'var(--r-pill)',
          padding: 16,
          width: '100%',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Đang gửi…' : 'Nhận tư vấn miễn phí'}
      </button>
      <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: 'var(--ink-faint)' }}>Cam kết bảo mật thông tin. Không spam.</p>
    </form>
  );
}
