<script setup lang="ts">
import { computed } from 'vue'

type Repo = {
  name: string
  description: string
  url: string
  stars: number
  forks: number
  language: string
  languageColor: string
  techStack: string[]
}

const repos = computed<Repo[]>(() => [
  {
    name: 'proxmox-terraform',
    description: 'A single VM configured for running 5-10 Docker containers.',
    url: 'https://github.com/djmoore711/proxmox-terraform',
    stars: 0,
    forks: 0,
    language: 'HCL',
    languageColor: '#844FBA',
    techStack: ['Terraform', 'Proxmox', 'Cloud-Init', 'Docker'],
  },
  {
    name: 'proxmox-upgrader',
    description: 'A utility designed to streamline and automate the upgrade process for Proxmox servers.',
    url: 'https://github.com/djmoore711/proxmox-upgrader',
    stars: 0,
    forks: 0,
    language: 'Python',
    languageColor: '#3572A5',
    techStack: ['Python', 'Proxmox', 'Automation'],
  },
  {
    name: 'oraclecloud-portainer-free-tier-terraform',
    description: 'Terraform setup for OCI Portainer for containerization.',
    url: 'https://github.com/djmoore711/oraclecloud-portainer-free-tier-terraform',
    stars: 0,
    forks: 0,
    language: 'HCL',
    languageColor: '#844FBA',
    techStack: ['Terraform', 'OCI', 'Tailscale', 'Docker', 'Portainer'],
  },
])

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}
</script>

<template>
  <section class="gh" aria-label="GitHub Repository Showcase">
    <div class="gh__grid" role="list">
      <article v-for="repo in repos" :key="repo.url" class="card" role="listitem">
        <header class="card__header">
          <h4 class="card__name">{{ repo.name }}</h4>
        </header>

        <p class="card__description">{{ repo.description }}</p>

        <div class="card__tags" aria-label="Tech stack">
          <span v-for="tag in repo.techStack" :key="`${repo.name}-${tag}`" class="tag">{{ tag }}</span>
        </div>

        <footer class="card__footer">
          <div class="card__stats" aria-label="Repository stats">
            <span class="stat" aria-label="Stars">
              <span class="stat__icon" aria-hidden="true">★</span>
              <span class="stat__value">{{ formatNumber(repo.stars) }}</span>
            </span>
            <span class="stat" aria-label="Forks">
              <span class="stat__icon" aria-hidden="true">⑂</span>
              <span class="stat__value">{{ formatNumber(repo.forks) }}</span>
            </span>
            <span class="stat" aria-label="Language">
              <span class="dot" aria-hidden="true" :style="{ background: repo.languageColor }" />
              <span class="stat__value">{{ repo.language }}</span>
            </span>
          </div>

          <a
            class="card__button"
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`View ${repo.name} on GitHub`"
          >
            View on GitHub
          </a>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped>
.gh{
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.gh__header{
  margin-bottom:1.25rem;
}

.gh__title{
  margin:0;
  font-size:1.25rem;
  font-weight:700;
  letter-spacing:-.01em;
  color:rgba(255,255,255,.92);
}

.gh__subtitle{
  margin:.4rem 0 0;
  color:rgba(255,255,255,.68);
  max-width:70ch;
}

.gh__grid{
  display:grid;
  grid-template-columns:1fr;
  gap:1rem;
}

/* Responsive grid: 1 col mobile, 2 cols desktop, 3 cols wide screens */
@media (min-width: 860px){
  .gh__grid{grid-template-columns:repeat(2, minmax(0, 1fr));}
}

@media (min-width: 1200px){
  .gh__grid{grid-template-columns:repeat(3, minmax(0, 1fr));}
}

.card{
  display:flex;
  flex-direction:column;
  gap:1rem;
  padding:1.25rem;
  border-radius:1rem;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 10px 30px rgba(0,0,0,.35);
  transition:transform .22s cubic-bezier(0.4, 0, 0.2, 1), box-shadow .22s cubic-bezier(0.4, 0, 0.2, 1), border-color .22s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover{
  transform:translateY(-4px);
  border-color:rgba(255,255,255,.30);
  box-shadow:0 14px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.12);
}

.card__header{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:1rem;
}

.card__name{
  margin:0;
  font-size:1.2rem;
  font-weight:700;
  color:rgba(255,255,255,.92);
  letter-spacing:-.01em;
}

.card__description{
  margin:0;
  color:rgba(255,255,255,.68);
  line-height:1.55;
}

.card__tags{
  display:flex;
  flex-wrap:wrap;
  gap:.5rem;
}

.tag{
  font-size:.82rem;
  color:rgba(255,255,255,.70);
  padding:.25rem .6rem;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.04);
}

.card__footer{
  margin-top:auto;
  display:flex;
  flex-direction:column;
  gap:1rem;
}

.card__stats{
  display:flex;
  align-items:center;
  gap:1rem;
  flex-wrap:wrap;
}

.stat{
  display:inline-flex;
  align-items:center;
  gap:.4rem;
  color:rgba(255,255,255,.70);
  font-size:.92rem;
}

.stat__icon{color:rgba(255,255,255,.80);}

.dot{
  width:.55rem;
  height:.55rem;
  border-radius:999px;
  display:inline-block;
}

.card__button{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  text-decoration:none;
  font-weight:650;
  padding:.75rem 1rem;
  border-radius:.85rem;
  background:rgba(255,255,255,.92);
  color:#0b0b0c;
  border:1px solid rgba(255,255,255,.20);
  transition:background-color .22s cubic-bezier(0.4, 0, 0.2, 1), transform .22s cubic-bezier(0.4, 0, 0.2, 1);
}

.card__button:hover{
  background:rgba(255,255,255,.80);
}

.card__button:focus-visible{
  outline:2px solid rgba(255,255,255,.92);
  outline-offset:3px;
}
</style>
