import Image from 'next/image';

// Logo chính: design/logo.png (đã copy sang public/logo.png). Tỷ lệ gốc 912×202.
const LOGO_RATIO = 912 / 202;

export default function Logo({
  height = 38,
  priority = false,
}: {
  height?: number;
  /** giữ tương thích chữ ký cũ — logo dùng chung một file cho mọi nền */
  light?: boolean;
  priority?: boolean;
}) {
  const width = Math.round(height * LOGO_RATIO);
  return (
    <Image
      src="/logo.png"
      alt="MKT Software — Phần mềm Marketing AI đa kênh"
      width={width}
      height={height}
      priority={priority}
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
