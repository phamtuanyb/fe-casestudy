'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { track, type GAEvent } from '@/lib/tracking';

type Props = ComponentProps<typeof Link> & {
  event: GAEvent;
  eventParams?: Record<string, unknown>;
};

// Link có gắn GA4 event onClick (dùng cho các CTA là server component).
export default function TrackedLink({ event, eventParams, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
