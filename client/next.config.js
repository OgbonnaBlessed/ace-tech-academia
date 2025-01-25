/** @type { import('next').NextConfig } */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                hostname: "media.istockphoto.com",
                port: "",
                pathname: "/**",
            }
        ]
    }
}

module.exports = nextConfig;