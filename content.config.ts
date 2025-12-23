import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  experimental: {
    nativeSqlite: true
  },
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
    }),
  },
})
