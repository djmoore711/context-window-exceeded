<script setup lang="ts">
import { computed, useRuntimeConfig, useHead } from '#imports'

const baseURL = useRuntimeConfig().app.baseURL

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').all()
})

const formattedPosts = computed(() => {
  if (!posts.value) return []
  return (posts.value as any[])
    .filter((post: any) => post._path) // Filter out posts without paths
    .map((post: any) => ({
      ...post,
      formattedDate: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }))
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

useHead({
  title: 'Blog | DJ Moore',
  meta: [
    { name: 'description', content: 'Security engineering blog posts and articles by DJ Moore.' },
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
        <a :href="baseURL">About</a>
        <a :href="baseURL + 'blog'">Blog</a>
        <a href="https://www.linkedin.com/in/mooredarrell/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/djmoore711" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="cta" href="mailto:owner@darrellmoore.me">Email Me</a>
      </div>
    </nav>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-inner">
          <p class="kicker">Security Engineering Blog</p>
          <h1 id="hero-title">Thoughts on security, automation, and cloud engineering.</h1>
          <p class="lede">
            Practical insights from building security systems in messy environments. 
    Real-world experiences with platform security, compliance, and automation.
          </p>
          <div class="hero-actions">
            <a href="/" class="button">← Back to About</a>
          </div>
        </div>
      </div>
    </section>
  </header>

  <main id="main" class="content">
    <section class="blog-section">
      <div class="container">
        <h2 class="section-title">Latest Posts</h2>
        
        <div v-if="formattedPosts.length === 0" class="no-posts">
          <p>No posts yet. Check back soon!</p>
        </div>
        
        <div v-else class="blog-grid">
          <article 
            v-for="post in formattedPosts" 
            :key="post._path"
            class="blog-card"
          >
            <div v-if="post.cover" class="blog-card__image">
              <img 
                :src="baseURL + post.cover.replace(/^\//, '')" 
                :alt="post.title"
                loading="lazy"
              />
            </div>
            
            <div class="blog-card__content">
              <header class="blog-card__header">
                <h3 class="blog-card__title">
                  <a :href="baseURL + post._path">{{ post.title }}</a>
                </h3>
                <time :datetime="post.date" class="blog-card__date">
                  {{ post.formattedDate }}
                </time>
              </header>
              
              <p class="blog-card__description">{{ post.description }}</p>
              
              <footer class="blog-card__footer">
                <a :href="baseURL + post._path" class="blog-card__link">
                  Read more →
                </a>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} DJ Moore. Built with Nuxt.</p>
    </div>
  </footer>
</template>

<style scoped>
.content {
  max-width: var(--max);
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-7);
}

.blog-section {
  padding: var(--space-7) 0 var(--space-6);
  border-top: 1px solid var(--border);
}

.container {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.section-title {
  font-size: var(--fs-4);
  font-weight: 650;
  margin: 0 0 var(--space-5);
  letter-spacing: -0.02em;
}

.no-posts {
  text-align: center;
  padding: var(--space-7) 0;
  color: var(--muted);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-4);
}

.blog-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 12px 40px var(--shadow);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  border-color: rgba(255, 255, 255, 0.22);
}

.blog-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: radial-gradient(800px 600px at 20% 20%, rgba(255,255,255,.06), transparent 60%), #0f0f10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-card__content {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  height: 100%;
}

.blog-card__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.blog-card__title {
  font-size: var(--fs-2);
  margin: 0;
  letter-spacing: -0.01em;
}

.blog-card__title a {
  text-decoration: none;
}

.blog-card__title a:hover {
  text-decoration: underline;
}

.blog-card__date {
  font-size: var(--fs-0);
  color: var(--muted);
  font-family: var(--font-mono);
}

.blog-card__description {
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
}

.blog-card__footer {
  margin-top: auto;
}

.blog-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

.blog-card__link:hover {
  text-decoration: underline;
}

.footer {
  background: transparent;
  padding: var(--space-5) 0;
  text-align: center;
  color: var(--muted);
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .content {
    padding: var(--space-5) var(--space-3) var(--space-6);
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: var(--fs-3);
  }
}
</style>
