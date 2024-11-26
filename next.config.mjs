// import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // run in client side
//   // i18n: {
//   //   locales: ['en','ar'],
//   //   defaultLocale: 'ar',
//   // },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '*',
//       },
//     ],
//   },
  
//   // images: {
//   //   remotePatterns: [
//   //     {
//   //       protocol: "https",
//   //       hostname: "images.unsplash.com",
//   //     },
//   //   ],
//   // },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable', // Cache for one year
//           },
//         ],
//       },
//     ];
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
//       },
//     ];
//   },
// };

// export default withNextIntl(nextConfig);


import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["49.13.77.125"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "49.13.77.125",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache for one year
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
