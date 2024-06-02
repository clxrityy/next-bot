/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    REGISTER_COMMANDS_KEY: process.env.REGISTER_COMMANDS_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    NEXT_PUBLIC_APPLICATION_ID: process.env.NEXT_PUBLIC_APPLICATION_ID,
  },
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true
  //   };
  //   return config;
  // },
}

module.exports = nextConfig
