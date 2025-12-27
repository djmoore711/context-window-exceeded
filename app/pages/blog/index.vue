<script setup lang="ts">
import { useRuntimeConfig, useHead } from '#imports'

const baseURL = useRuntimeConfig().app.baseURL

const { data: posts } = await useAsyncData('blog-posts', async () => {
  try {
    return await queryCollection('blog').all()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return [] as any[]
  }
}, {
  // Add error handling and caching
  server: true,
  default: () => []
})

const formattedPosts = computed(() => {
  if (!posts.value) return []
  
  const result = (posts.value as any[])
    .filter((post: any) => post.path || post._path) // Filter out posts without paths
    .map((post: any) => {
      // Extract date from frontmatter
      let postDate = (post as any).date || (post as any).meta?.date || '2024-01-01'
      
      // Handle both string and Date formats
      if (postDate instanceof Date) {
        postDate = postDate.toISOString().split('T')[0]
      } else if (typeof postDate === 'string') {
        // Ensure consistent format
        postDate = postDate.trim()
      }
      
      // Parse date as local date to avoid timezone issues
      const [year, month, day] = postDate.split('-').map(Number)
      const localDate = new Date(year, month - 1, day)
      
      return {
        ...post,
        _path: post._path || post.path, // Use path if _path doesn't exist
        date: postDate,
        formattedDate: localDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    })
    .sort((a: any, b: any) => {
      // Parse both dates as local dates for consistent sorting
      const [aYear, aMonth, aDay] = a.date.split('-').map(Number)
      const [bYear, bMonth, bDay] = b.date.split('-').map(Number)
      const aLocal = new Date(aYear, aMonth - 1, aDay)
      const bLocal = new Date(bYear, bMonth - 1, bDay)
      return bLocal.getTime() - aLocal.getTime()
    })
  
  return result
})

// Disable auto layout because we render NuxtLayout manually in the template
definePageMeta({
  layout: false
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
  <NuxtLayout 
    name="default"
    kicker="Security Engineering Blog" 
    title="Thoughts on security, automation, and cloud engineering" 
    lede="Practical insights from building security systems in messy environments. Real-world experiences with platform security, compliance, and automation."
  >
    
    <template #hero-actions>
      <div class="hero-actions">
        <NuxtLink :to="baseURL" class="button">← Back to About</NuxtLink>
      </div>
    </template>

    <section class="blog-section">
      <div class="blog-container">
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
            <NuxtLink
              class="blog-card__overlay"
              :to="post._path"
              :aria-label="`Open ${post.title}`"
            />
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
                  <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
                </h3>
                <time :datetime="post.date" class="blog-card__date">
                  {{ post.formattedDate }}
                </time>
              </header>
              
              <p class="blog-card__description">{{ post.description }}</p>
              
              <footer class="blog-card__footer">
                <NuxtLink :to="post._path" class="blog-card__link">
                  Read more →
                </NuxtLink>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.blog-section {
  padding: var(--space-6) 0 var(--space-7);
}

.blog-container {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.section-title {
  font-size: var(--fs-4);
  font-weight: 650;
  margin: 0 0 var(--space-5);
  letter-spacing: -0.02em;
  color: var(--fg);
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
  margin-top: var(--space-5);
}

.blog-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 12px 40px var(--shadow);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
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

/* Full-card clickable overlay */
.blog-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}

/* Keep inner links focusable and above overlay */
.blog-card__title a,
.blog-card__link {
  position: relative;
  z-index: 2;
}

.blog-card__content {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
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
  padding-top: var(--space-2);
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

.hero-actions {
  margin-top: var(--space-5);
}

.button {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  padding: calc(var(--space-2) + 1px) var(--space-3);
  border-radius: 999px;
  border: 1px solid var(--fg);
  background: var(--fg);
  color: var(--bg);
  font-weight: 600;
  transition: background-color .18s ease, color .18s ease, border-color .18s ease;
}

.button:hover {
  background: rgba(255,255,255,.88);
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .section-title {
    font-size: var(--fs-3);
  }

  .blog-container {
    padding: 0 var(--space-3);
  }

  .blog-card__content {
    padding: var(--space-3);
  }
}
</style>
