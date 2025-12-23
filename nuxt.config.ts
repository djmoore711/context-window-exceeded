// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: 'assets', // Helps keeps your build folder clean
    // Global page transition configuration
    pageTransition: { name: 'page', mode: 'default' },
    layoutTransition: { name: 'layout', mode: 'default' }
  }
})
