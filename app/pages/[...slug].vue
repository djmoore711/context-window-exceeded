<script setup lang="ts">
import { queryCollection, useHead, useRuntimeConfig } from '#imports'

const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL

// Don't interfere with blog routes
if (route.path.startsWith('/blog')) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: page } = await useAsyncData('page-' + route.path, async () => {
  return queryCollection('content').path(route.path).first()
}, {
  server: true,
  default: () => null
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead({
  title: `${page.value?.title || 'Page'} | DJ Moore`,
  meta: [
    { name: 'description', content: page.value?.description || '' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
  ],
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>