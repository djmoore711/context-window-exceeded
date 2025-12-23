<script setup lang="ts">
import { computed, useRuntimeConfig, useHead } from '#imports'

const baseURL = useRuntimeConfig().app.baseURL

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').sort({ date: -1 }).all()
})

const formattedPosts = computed(() => {
  return posts.value?.map(post => ({
    ...post,
    formattedDate: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  })) || []
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
.blog-section {
  padding: 4rem 0;
  background: var(--color-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--color-text-primary);
}

.no-posts {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-secondary);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.blog-card {
  background: var(--color-surface);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.blog-card__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card__content {
  padding: 1.5rem;
}

.blog-card__header {
  margin-bottom: 1rem;
}

.blog-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.blog-card__title a {
  color: var(--color-text-primary);
  text-decoration: none;
}

.blog-card__title a:hover {
  color: var(--color-accent);
}

.blog-card__date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}

.blog-card__description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.blog-card__footer {
  margin-top: auto;
}

.blog-card__link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
}

.blog-card__link:hover {
  text-decoration: underline;
}

.footer {
  background: var(--color-surface);
  padding: 2rem 0;
  text-align: center;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
