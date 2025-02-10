import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "itlegend.net",
            },
            {
                protocol: "https",
                hostname: "img.freepik.com",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
            },
            {
                protocol: "https",
                hostname: "yt3.googleusercontent.com",
            },
        ],
    },
    compiler: {
        removeConsole: false,
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
                destination: "http://49.13.77.125:1118/Endpoint/api/:path*",
            },
        ];
    },
    transpilePackages: ["@tanstack/react-query", "@tanstack/query-core"],
};

export default withNextIntl(nextConfig);
