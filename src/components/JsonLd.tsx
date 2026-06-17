// Render JSON-LD schema.org (server component). Dữ liệu do server kiểm soát nên an toàn.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
