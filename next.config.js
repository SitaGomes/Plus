/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    GOOGLE_CLIENT_SECRET: "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",
    GOOGLE_CLIENT_ID: "412258101923-8iamjmal32mrsi1nque2gqjf99np530b.apps.googleusercontent.com"
  }
}

module.exports = nextConfig
