import { withPayload } from '@payloadcms/next/withPayload'

/**
 * Next.js configuration for Payload CMS
 * 
 * Note: This is a headless CMS project. Next.js is used only for:
 * - Admin panel infrastructure (served at /admin)
 * - API routes (served at /api)
 * 
 * There is no public-facing frontend - content is consumed via REST/GraphQL APIs.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
