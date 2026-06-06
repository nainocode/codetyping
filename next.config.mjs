/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
   serverExternalPackages: ["mongoose"],

  allowedDevOrigins: ['127.0.0.1'],

}

export default nextConfig
