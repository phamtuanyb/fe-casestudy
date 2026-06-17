'use client';

import { useEffect } from 'react';
import { track } from '@/lib/tracking';

// Bắn event case_view khi mở trang chi tiết (server component không tự track được).
export default function CaseViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track('case_view', { slug });
  }, [slug]);
  return null;
}
