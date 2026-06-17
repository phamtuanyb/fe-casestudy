import Script from 'next/script';

// Nạp GA4 khi có NEXT_PUBLIC_GA_ID. strategy afterInteractive → không chặn render/LCP.
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
