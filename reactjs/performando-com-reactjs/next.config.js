
const defaultConfig = {
  reactStrictMode: true,
}


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


module.exports = withBundleAnalyzer({})


// https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
