<script setup lang="ts">
import { queryCollection } from '#imports'

const route = useRoute()

// Don't interfere with blog routes
if (route.path.startsWith('/blog')) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: page } = await useAsyncData('page-' + route.path, () => {
  try {
    return queryCollection('content').path(route.path).first()
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}, {
  // Add error handling and caching
  server: true,
  default: () => null
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>