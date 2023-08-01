/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['upload.wikimedia.org', 'commons.wikimedia.org'],
        formats: ['image/avif', 'image/webp']
    }
}

module.exports = nextConfig;
