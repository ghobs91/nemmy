const withPWA = require('next-pwa')({
    dest: "public",
    register: true,
    mode: "production"
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lemmy.**"
            }
        ]
    },
    reactStrictMode: true
}

module.exports = withPWA( nextConfig ) 
