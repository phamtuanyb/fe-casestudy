// Render nội dung body case (problem/solution/result).
// api.ts đã chuyển richText (Lexical/Slate/string) → text, các đoạn ngăn bằng "\n\n".
// Tách thành nhiều <p> đúng style thiết kế (an toàn, không dùng dangerouslySetInnerHTML).
export default function RichBody({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            margin: i === 0 ? 0 : '16px 0 0',
            fontSize: 17,
            lineHeight: 1.75,
            color: 'var(--ink-soft)',
          }}
        >
          {p}
        </p>
      ))}
    </>
  );
}
