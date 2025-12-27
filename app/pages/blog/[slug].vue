<script setup lang="ts">
import { useRuntimeConfig, useHead } from '#imports'

// TypeScript interfaces for type safety
interface BlogPostMeta {
  date?: string
  description?: string
  title?: string
}

interface BlogPost {
  _path: string
  title?: string
  description?: string
  date?: string
  meta?: BlogPostMeta
  cover?: string
  [key: string]: any // Allow additional properties for ContentRenderer
}

const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL

const safeBaseURL = computed(() => {
  // Ensure consistent base URL to prevent hydration mismatches
  const base = baseURL || '/'
  return base.endsWith('/') ? base : `${base}/`
})

const { data: post, error: postError } = await useAsyncData('blog-post-' + route.params.slug, async () => {
  try {
    return await queryCollection('blog').path(route.path).first()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null as BlogPost | null
  }
}, {
  // Add error handling and caching
  server: true,
  default: () => null as BlogPost | null
})

const { data: allPosts } = await useAsyncData('blog-posts-nav', async () => {
  try {
    return await queryCollection('blog').all()
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return [] as BlogPost[]
  }
}, {
  // Add error handling and caching
  server: true,
  default: () => [] as BlogPost[]
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found', fatal: true })
}

// Type assertion to our BlogPost interface
const blogPost = post.value as unknown as BlogPost
const blogPosts = allPosts.value as unknown as BlogPost[]

const formattedDate = computed(() => {
  if (!blogPost || (!blogPost.date && !blogPost.meta?.date)) return ''
  let postDate: string | Date | undefined = blogPost.date || blogPost.meta?.date
  if (!postDate) return ''
  // Normalize Date objects to YYYY-MM-DD (avoid instanceof on union types)
  if (postDate && typeof postDate !== 'string') {
    postDate = (postDate as Date).toISOString().split('T')[0]
  }
  if (typeof postDate !== 'string') return ''
  const [year, month, day] = postDate.split('-').map(Number)
  if (!year || !month || !day) return ''
  const localDate = new Date(year, month - 1, day)
  return localDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const publishedDate = computed(() => {
  let postDate: string | Date | undefined = blogPost?.date || blogPost?.meta?.date
  if (!postDate) return ''
  if (typeof postDate !== 'string') {
    return (postDate as Date).toISOString().split('T')[0]
  }
  return postDate
})

// Sort posts by date in descending order (newest first)
// Memoized to avoid re-sorting on every computation
const sortedPosts = computed(() => {
  if (!blogPosts) return []
  // Create a copy only when allPosts changes to avoid unnecessary operations
  const posts = [...blogPosts]
  return posts.sort((a: BlogPost, b: BlogPost) => {
    const normalizeDate = (d: string | Date | undefined): string => {
      if (!d) return ''
      if (typeof d === 'string') return d as string
      return (d.toISOString().split('T')[0] ?? '') as string
    }
    const dateA = normalizeDate(a.date || a.meta?.date)
    const dateB = normalizeDate(b.date || b.meta?.date)
    return dateB.localeCompare(dateA) // Sort newest first (descending)
  })
})

const currentIndex = computed(() => {
  if (!sortedPosts.value || !blogPost || !blogPost._path) return -1
  return sortedPosts.value.findIndex((p: BlogPost) => p._path === blogPost._path)
})

// Note: Since posts are sorted newest first, "previous" means newer post (higher in list)
const previousPost = computed(() => {
  const idx = currentIndex.value
  if (idx <= 0 || !sortedPosts.value) return null
  return sortedPosts.value[idx - 1] || null
})

// Note: Since posts are sorted newest first, "next" means older post (lower in list)
const nextPost = computed(() => {
  const idx = currentIndex.value
  if (idx < 0 || !sortedPosts.value) return null
  return sortedPosts.value[idx + 1] || null
})

// Define layout metadata
definePageMeta({
  layout: 'default'
})

useHead({
  title: `${blogPost?.title || 'Blog Post'} | DJ Moore`,
  meta: [
    { name: 'description', content: blogPost?.description || '' },
    { property: 'og:title', content: blogPost?.title || '' },
    { property: 'og:description', content: blogPost?.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: publishedDate.value },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: `${safeBaseURL.value}favicon.ico` },
  ],
})
</script>

<template>
  <NuxtLayout :title="blogPost?.title">
    <article class="blog-post">
      <div class="container">
        <div class="blog-post__back-top">
          <NuxtLink :to="`${safeBaseURL}blog`">← Back to Blog</NuxtLink>
        </div>

        <div v-if="blogPost?.cover" class="blog-post__cover">
          <img 
            :src="safeBaseURL + blogPost.cover.replace(/^\//, '')" 
            :alt="blogPost?.title"
            loading="lazy"
          />
        </div>

        <p v-if="formattedDate" class="blog-post__meta-inline">
          <time :datetime="publishedDate">
            {{ formattedDate }}
          </time>
        </p>

        <div class="blog-post__content">
          <ContentRenderer :value="blogPost" />
        </div>

        <nav class="blog-post__navigation" aria-label="Post navigation">
          <div class="nav-links">
            <div v-if="previousPost && previousPost._path" class="nav-link nav-link--prev">
              <NuxtLink :to="previousPost._path">
                <span class="nav-label">← Previous</span>
                <span class="nav-title">{{ previousPost.title }}</span>
              </NuxtLink>
            </div>
            
            <div class="nav-link nav-link--center">
              <NuxtLink :to="`${safeBaseURL}blog`">← Back to Blog</NuxtLink>
            </div>
            
            <div v-if="nextPost && nextPost._path" class="nav-link nav-link--next">
              <NuxtLink :to="nextPost._path">
                <span class="nav-label">Next →</span>
                <span class="nav-title">{{ nextPost.title }}</span>
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </article>
  </NuxtLayout>
</template>

<style scoped>
.blog-post {
  padding-top: var(--space-6);
}

.container {
  max-width: 46rem;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.breadcrumb {
  margin-bottom: var(--space-4);
  font-size: var(--fs-0);
  color: var(--muted);
}

.breadcrumb a {
  color: var(--muted);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.divider {
  margin: 0 var(--space-2);
}

.current {
  color: var(--fg);
  font-weight: 600;
}

.blog-post__header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.blog-post__title {
  font-size: var(--fs-5);
  font-weight: 650;
  line-height: 1.2;
  margin: 0 0 var(--space-2);
  letter-spacing: -0.02em;
}

.blog-post__meta {
  font-size: var(--fs-1);
  color: var(--muted);
}

.blog-post__date {
  font-family: var(--font-mono);
}

.blog-post__cover {
  margin-bottom: var(--space-6);
  text-align: center;
}

.blog-post__cover img {
  max-width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  box-shadow: 0 16px 48px var(--shadow);
  border: 1px solid var(--border);
}

.blog-post__content {
  font-size: var(--fs-1);
  line-height: 1.7;
  color: var(--fg);
  margin-bottom: var(--space-7);
}

.blog-post__content :deep(img) {
  display: block;
  max-width: 40rem;
  width: 100%;
  margin: var(--space-5) auto;
  border-radius: var(--radius);
  box-shadow: 0 16px 48px var(--shadow);
  border: 1px solid var(--border);
}

.blog-post__content :deep(h1),
.blog-post__content :deep(h2),
.blog-post__content :deep(h3),
.blog-post__content :deep(h4),
.blog-post__content :deep(h5),
.blog-post__content :deep(h6) {
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
  font-weight: 650;
  line-height: 1.3;
  color: var(--fg);
}

.blog-post__content :deep(h1) { font-size: var(--fs-4); }
.blog-post__content :deep(h2) { font-size: var(--fs-3); }
.blog-post__content :deep(h3) { font-size: var(--fs-2); }

.blog-post__content :deep(h1:first-of-type) {
  display: none;
}

.blog-post__content :deep(p) {
  margin-bottom: var(--space-4);
}

.blog-post__content :deep(ul),
.blog-post__content :deep(ol) {
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

.blog-post__content :deep(li) {
  margin-bottom: var(--space-2);
}

.blog-post__content :deep(blockquote) {
  margin: var(--space-6) 0;
  padding: var(--space-4);
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--fg);
  border-radius: var(--radius);
  font-style: italic;
}

.blog-post__content :deep(code) {
  background: #1c1f27;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.95em;
  color: #f5f5f5;
}

.blog-post__content :deep(code[class*="language-"]) {
  color: #f8fafc;
}

.blog-post__content :deep(pre) {
  background: #14161d;
  padding: var(--space-5);
  border-radius: var(--radius);
  overflow-x: auto;
  margin: var(--space-6) 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f5f5f5;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 36px rgba(0, 0, 0, 0.45);
}

.blog-post__content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
  font-family: var(--font-mono);
  font-size: 0.95em;
}

.blog-post__content :deep(pre code[class*="language-"]) {
  color: #f8fafc;
}

.blog-post__content :deep(.token.comment),
.blog-post__content :deep(.token.prolog),
.blog-post__content :deep(.token.doctype),
.blog-post__content :deep(.token.cdata) {
  color: #8b949e;
}

.blog-post__content :deep(.token.punctuation) {
  color: #c9d1d9;
}

.blog-post__content :deep(.token.property),
.blog-post__content :deep(.token.tag),
.blog-post__content :deep(.token.constant),
.blog-post__content :deep(.token.symbol) {
  color: #f6c177;
}

.blog-post__content :deep(.token.boolean),
.blog-post__content :deep(.token.number) {
  color: #9cdcfe;
}

.blog-post__content :deep(.token.selector),
.blog-post__content :deep(.token.attr-name),
.blog-post__content :deep(.token.string),
.blog-post__content :deep(.token.char),
.blog-post__content :deep(.token.builtin),
.blog-post__content :deep(.token.inserted) {
  color: #7ee787;
}

.blog-post__content :deep(.token.operator),
.blog-post__content :deep(.token.entity),
.blog-post__content :deep(.token.url) {
  color: #f0a6d3;
}

.blog-post__content :deep(.token.atrule),
.blog-post__content :deep(.token.attr-value),
.blog-post__content :deep(.token.keyword) {
  color: #7dd3fc;
}

.blog-post__content :deep(.token.regex),
.blog-post__content :deep(.token.important),
.blog-post__content :deep(.token.variable) {
  color: #f472b6;
}

.blog-post__content :deep(.token.deleted) {
  color: #ff7b72;
}

.blog-post__content :deep(a) {
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: .12em;
}

.blog-post__content :deep(a:hover) {
  text-decoration-thickness: .2em;
}

.blog-post__back-top {
  margin-bottom: var(--space-4);
  font-weight: 600;
}

.blog-post__back-top a {
  color: var(--fg);
  text-decoration: none;
}

.blog-post__back-top a:hover {
  text-decoration: underline;
}

.blog-post__navigation {
  border-top: 1px solid var(--border);
  padding-top: var(--space-5);
  margin-top: var(--space-4);
}

.nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-3);
  align-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-link--prev {
  justify-content: flex-start;
}

.nav-link--next {
  justify-content: flex-end;
  text-align: right;
}

.nav-link a {
  display: flex;
  flex-direction: column;
  color: var(--fg);
  text-decoration: none;
  font-weight: 600;
}

.nav-link--next a {
  align-items: flex-end;
}

.nav-link a:hover {
  color: var(--fg);
  text-decoration: underline;
}

.nav-label {
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 0.25rem;
}

.nav-title {
  font-weight: 500;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .blog-post__title {
    font-size: 2rem;
  }
  
  .nav-links {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  
  .nav-link--prev,
  .nav-link--next {
    justify-content: center;
  }
  
  .nav-link--next a {
    align-items: center;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
