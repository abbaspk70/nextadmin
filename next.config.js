/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: '3mb',
      },

}

module.exports = nextConfig
