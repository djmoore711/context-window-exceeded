// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  ssr: true,
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? (process.env.NUXT_APP_BASE_URL || '/') : '/',
    // Global page transition configuration
    pageTransition: { name: 'page', mode: 'default' },
    layoutTransition: { name: 'layout', mode: 'default' }
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        '/blog'
      ]
    }
  },
  // Configure content module with minimal settings
  content: {
    watch: {
      enabled: false
    }
  }
})
