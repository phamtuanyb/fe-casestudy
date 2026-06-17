// GA4 event helper (client-side). No-op nếu chưa cấu hình gtag/NEXT_PUBLIC_GA_ID.
export type GAEvent =
  | 'filter_used'
  | 'case_view'
  | 'case_share_click'
  | 'video_play'
  | 'cta_click'
  | 'lead_submit';

type Gtag = (command: 'event', event: string, params?: Record<string, unknown>) => void;

export function track(event: GAEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === 'function') gtag('event', event, params ?? {});
}
