import { useRuntimeConfig, useState, useRouter } from '#imports'

export default defineNuxtPlugin(() => {
  const direction = useState<'forward' | 'back'>('pageDirection', () => 'forward')
  const router = useRouter()
  const baseURL = useRuntimeConfig().app.baseURL

  const blogPrefix = `${baseURL}blog`
  const isLanding = (path: string) => path === baseURL || path === baseURL.replace(/\/$/, '')
  const isBlog = (path: string) => path.startsWith(blogPrefix)

  router.beforeEach((to, from) => {
    const toBlog = isBlog(to.path)
    const fromBlog = isBlog(from.path || '')
    const toLanding = isLanding(to.path)
    const fromLanding = isLanding(from.path || '')

    if (fromLanding && toBlog) {
      direction.value = 'forward'
    } else if (fromBlog && toLanding) {
      direction.value = 'back'
    } else {
      direction.value = 'forward'
    }
  })
})
