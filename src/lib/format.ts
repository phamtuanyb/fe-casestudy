import type { StatItem } from './types';

/** 100000 -> "100.000" (phân tách hàng nghìn kiểu Việt Nam). Port từ thiết kế. */
export const fmtNumber = (n: number): string =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/** Lấy initials 2 chữ từ tên khách (2 từ cuối) — vd "Trần Minh Quân" -> "MQ". */
export const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();

/** Chuỗi hiển thị của 1 stat: prefix + số có dấu chấm + suffix. */
export const statDisplay = (s: Pick<StatItem, 'prefix' | 'value' | 'suffix'>): string =>
  (s.prefix ?? '') + fmtNumber(s.value) + (s.suffix ?? '');
