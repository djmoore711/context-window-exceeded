import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        // Accept string or Date; normalize elsewhere if needed
        date: z.union([z.string(), z.date()]).optional(),
        cover: z.string().optional(),
      })
    }),
  },
})
