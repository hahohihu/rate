/** @type {import('next').NextConfig} */
let nextConfig = {
    eslint: {
        dirs: ['app', 'data', 'lib', 'ui']
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

if (process.env.NODE_ENV === 'test') {
    nextConfig.output = "standalone";
}

export default nextConfig;
