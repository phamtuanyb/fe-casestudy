/** @type {import('next').NextConfig} */

// Suy ra remotePattern cho domain ảnh BE từ API_BASE_URL (chỉ server-side).
const remotePatterns = [
  { protocol: 'https', hostname: 'cdn.simpleicons.org' },
];

if (process.env.API_BASE_URL) {
  try {
    const u = new URL(process.env.API_BASE_URL);
    remotePatterns.push({
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
    });
  } catch {
    // API_BASE_URL không hợp lệ → bỏ qua, dùng mặc định bên dưới.
  }
}

// Domain ảnh production (khi BE prod khác host với API_BASE_URL dev).
remotePatterns.push({ protocol: 'https', hostname: 'api.casestudy.mktsoftware.vn' });

const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns },
};

export default nextConfig;
