/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first, WebP as the fallback for anything that cannot take it. The
    // source set is JPEG that already came through WhatsApp once, so it is
    // compressed twice over and re-encoding it costs little — AVIF still takes
    // 40-60% off what the browser downloads.
    formats: ['image/avif', 'image/webp'],
    // Thought Room covers are served from Sanity's CDN. Without this, next/image
    // refuses the host outright — the allowlist is the point of the setting.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
};

export default nextConfig;
