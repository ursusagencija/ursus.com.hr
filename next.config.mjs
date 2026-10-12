import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.prismic.io", "images.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/owners-landing",
        destination: "/for-renters",
        permanent: true,
      },
      {
        source: "/hr/owners-landing",
        destination: "/hr/for-renters",
        permanent: true,
      },
      {
        source: "/en/owners-landing",
        destination: "/for-renters",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
