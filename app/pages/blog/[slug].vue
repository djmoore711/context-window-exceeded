<script setup lang="ts">
import { computed, useRuntimeConfig, useHead } from '#imports'

const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL

const { data: post } = await useAsyncData('blog-post-' + route.params.slug, () => {
  return queryCollection('blog').path('/blog/' + route.params.slug).first()
})

const { data: allPosts } = await useAsyncData('blog-posts-nav', () => {
  return queryCollection('blog').all()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found', fatal: true })
}

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  return new Date((post.value as any).date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const currentIndex = computed(() => {
  if (!allPosts.value || !post.value) return -1
  return (allPosts.value as any[]).findIndex((p: any) => p._path === (post.value as any)._path)
})

const previousPost = computed(() => {
  if (currentIndex.value < 0 || !allPosts.value) return null
  const posts = allPosts.value as any[]
  if (currentIndex.value < posts.length - 1) {
    const prevPost = posts[currentIndex.value + 1]
    return prevPost?._path ? prevPost : null
  }
  return null
})

const nextPost = computed(() => {
  if (currentIndex.value <= 0 || !allPosts.value) return null
  const posts = allPosts.value as any[]
  if (currentIndex.value > 0) {
    const nextPost = posts[currentIndex.value - 1]
    return nextPost?._path ? nextPost : null
  }
  return null
})

useHead({
  title: `${(post.value as any)?.title || 'Blog Post'} | DJ Moore`,
  meta: [
    { name: 'description', content: (post.value as any)?.description || '' },
    { property: 'og:title', content: (post.value as any)?.title || '' },
    { property: 'og:description', content: (post.value as any)?.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: (post.value as any)?.date || '' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
  ],
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <header id="top" class="hero-surface">
    <nav class="topbar" aria-label="Top">
      <div class="topbar__left">
        <span class="name">DJ Moore</span>
      </div>
      <div class="topbar__right">
        <a href="https://www.linkedin.com/in/mooredarrell/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/djmoore711" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="cta" href="mailto:owner@darrellmoore.me">Email Me</a>
      </div>
    </nav>
  </header>

  <main id="main" class="content">
    <article class="blog-post">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a :href="baseURL">Home</a>
          <span class="divider">/</span>
          <a :href="baseURL + 'blog'">Blog</a>
          <span class="divider">/</span>
          <span class="current">{{ (post as any)?.title }}</span>
        </nav>

        <header class="blog-post__header">
          <h1 class="blog-post__title">{{ (post as any)?.title }}</h1>
          <div class="blog-post__meta">
            <time :datetime="(post as any)?.date" class="blog-post__date">
              {{ formattedDate }}
            </time>
          </div>
        </header>

        <div v-if="(post as any)?.cover" class="blog-post__cover">
          <img 
            :src="baseURL + (post as any).cover.replace(/^\//, '')" 
            :alt="(post as any)?.title"
            loading="lazy"
          />
        </div>

        <div class="blog-post__content">
          <ContentRenderer :value="(post as any)" />
        </div>

        <nav class="blog-post__navigation" aria-label="Post navigation">
          <div class="nav-links">
            <div v-if="previousPost && previousPost._path" class="nav-link nav-link--prev">
              <a :href="baseURL + previousPost._path">
                <span class="nav-label">← Previous</span>
                <span class="nav-title">{{ previousPost.title }}</span>
              </a>
            </div>
            
            <div class="nav-link nav-link--center">
              <a :href="baseURL + 'blog'">← Back to Blog</a>
            </div>
            
            <div v-if="nextPost && nextPost._path" class="nav-link nav-link--next">
              <a :href="baseURL + nextPost._path">
                <span class="nav-label">Next →</span>
                <span class="nav-title">{{ nextPost.title }}</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </article>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} DJ Moore. Built with Nuxt.</p>
    </div>
  </footer>
</template>

<style scoped>
.blog-post {
  padding: 2rem 0 4rem;
  background: var(--color-background);
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--color-accent);
}

.divider {
  margin: 0 0.5rem;
}

.current {
  color: var(--color-text-primary);
  font-weight: 500;
}

.blog-post__header {
  margin-bottom: 3rem;
  text-align: center;
}

.blog-post__title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.blog-post__meta {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.blog-post__date {
  font-family: var(--font-mono);
}

.blog-post__cover {
  margin-bottom: 3rem;
  text-align: center;
}

.blog-post__cover img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.blog-post__content {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-primary);
  margin-bottom: 4rem;
}

.blog-post__content :deep(h1),
.blog-post__content :deep(h2),
.blog-post__content :deep(h3),
.blog-post__content :deep(h4),
.blog-post__content :deep(h5),
.blog-post__content :deep(h6) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text-primary);
}

.blog-post__content :deep(h1) {
  font-size: 2rem;
}

.blog-post__content :deep(h2) {
  font-size: 1.5rem;
}

.blog-post__content :deep(h3) {
  font-size: 1.25rem;
}

.blog-post__content :deep(p) {
  margin-bottom: 1.5rem;
}

.blog-post__content :deep(ul),
.blog-post__content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.blog-post__content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-post__content :deep(blockquote) {
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  background: var(--color-surface);
  border-left: 4px solid var(--color-accent);
  border-radius: 0 4px 4px 0;
  font-style: italic;
}

.blog-post__content :deep(code) {
  background: var(--color-surface);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.875em;
}

.blog-post__content :deep(pre) {
  background: var(--color-surface);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 2rem 0;
}

.blog-post__content :deep(pre code) {
  background: none;
  padding: 0;
}

.blog-post__content :deep(a) {
  color: var(--color-accent);
  text-decoration: none;
}

.blog-post__content :deep(a:hover) {
  text-decoration: underline;
}

.blog-post__content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}

.blog-post__content :deep(th),
.blog-post__content :deep(td) {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.blog-post__content :deep(th) {
  font-weight: 600;
  color: var(--color-text-primary);
}

.blog-post__navigation {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
  margin-top: 4rem;
}

.nav-links {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
}

.nav-link--center {
  justify-content: center;
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
  color: var(--color-text-primary);
  text-decoration: none;
}

.nav-link--next a {
  align-items: flex-end;
}

.nav-link a:hover {
  color: var(--color-accent);
}

.nav-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.nav-title {
  font-weight: 500;
  line-height: 1.3;
}

.footer {
  background: var(--color-surface);
  padding: 2rem 0;
  text-align: center;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
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
