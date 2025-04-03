/** @type { import('next').NextConfig } */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "d22sszzt99v0q9.cloudfront.net",
                port: "",
                pathname: "/**",
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/images/:path*", // Proxy all /images/... requests
                destination: "https://d22sszzt99v0q9.cloudfront.net/images/:path*",
            },
        ];
    }
}

module.exports = nextConfig;