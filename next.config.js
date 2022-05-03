/** @type {import('next').NextConfig} */
module.exports = {
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      constants: false,
    }
    return config
  },
}
