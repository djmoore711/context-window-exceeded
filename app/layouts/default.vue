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
          <p class="kicker">{{ kicker }}</p>
          <h1 id="hero-title">{{ title }}</h1>
          <p class="lede" v-if="lede">{{ lede }}</p>
          <slot name="hero-actions" />
        </div>
        <figure class="portrait" v-if="showPortrait">
          <img class="portrait-photo" :src="portraitSrc" alt="Portrait of DJ Moore" loading="lazy" decoding="async" width="640" height="640" />
          <img class="signature" :src="signatureSrc" alt="Signature of DJ Moore" loading="lazy" decoding="async" width="320" height="120" />
        </figure>
      </div>
    </section>
  </header>

  <main id="main" class="main" tabindex="-1">
    <slot />
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <p class="site-footer__name">DJ Moore</p>
        <p class="site-footer__fineprint muted">© {{ year }} DJ Moore. All rights reserved.</p>
        <p class="site-footer__timezone muted">America/Chicago</p>
      </div>

      <div class="site-footer__nav" aria-label="Footer">
        <a class="cta" href="mailto:owner@darrellmoore.me">Email</a>
        <div class="site-footer__links">
          <a href="https://www.linkedin.com/in/mooredarrell/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/djmoore711" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://github.com/djmoore711/context-window-exceeded" target="_blank" rel="noopener noreferrer">Source</a>
          <a href="#top">Back to Top</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{
  kicker?: string
  title?: string
  lede?: string
  showPortrait?: boolean
}>()

// Set default values for blog pages
const kicker = computed(() => props.kicker || 'DJ Moore')
const title = computed(() => props.title || 'Security Engineering')
const lede = computed(() => props.lede)
const showPortrait = computed(() => props.showPortrait ?? false)

const baseURL = useRuntimeConfig().app.baseURL
const portraitSrc = `${baseURL}images/portrait.png`
const signatureSrc = `${baseURL}images/DJ_Moore_signature_transparent_tight.png`
const year = new Date().getFullYear()
</script>

<style>
/* Theme tokens */
:root{
  --bg:#0b0b0c;
  --fg:#f4f4f4;
  --muted:#b9b9b9;
  --border:rgba(255,255,255,.14);
  --card:rgba(255,255,255,.06);
  --shadow:rgba(0,0,0,.45);

  --space-1:.25rem;
  --space-2:.5rem;
  --space-3:.75rem;
  --space-4:1rem;
  --space-5:1.5rem;
  --space-6:2rem;
  --space-7:3rem;
  --space-8:4rem;
  --space-9:5.5rem;

  --fs-0:.95rem;
  --fs-1:1.05rem;
  --fs-2:1.25rem;
  --fs-3:1.6rem;
  --fs-4:2.2rem;
  --fs-5:3.1rem;

  --radius:14px;
  --max:80rem;

  --font:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  --font-mono:ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

/* Base element styles */
*{box-sizing:border-box;}
html{scroll-behavior:smooth; color-scheme:dark;}
body{
  margin:0;
  font-family:var(--font);
  background:var(--bg);
  color:var(--fg);
  line-height:1.55;
}

a{color:inherit; text-decoration-thickness:.08em; text-underline-offset:.18em;}
a:visited{color:inherit;}
a:hover{text-decoration-thickness:.14em;}
a:focus-visible{outline:2px solid var(--fg); outline-offset:3px;}

/* Accessibility */
.skip-link{
  position:absolute;
  left:-999px;
  top:var(--space-4);
  padding:var(--space-2) var(--space-3);
  background:var(--fg);
  color:var(--bg);
  border-radius:999px;
  z-index:10;
}
.skip-link:focus{left:var(--space-4);}

/* Hero surface (header wrapper) */
.hero-surface{
  background:radial-gradient(1200px 900px at 18% -10%, rgba(255,255,255,.10), transparent 60%), var(--bg);
  border-bottom:none;
}

/* Top navigation */
.topbar{
  max-width:var(--max);
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:var(--space-4);
  padding:var(--space-5) var(--space-4) var(--space-3);
}

.name{font-weight:650; letter-spacing:.02em; font-size:5rem; line-height:1;}

.topbar__right{
  display:flex;
  align-items:center;
  gap:var(--space-3);
  flex-wrap:wrap;
  justify-content:flex-end;
}

.topbar__right a:not(.cta){
  padding:calc(var(--space-2) + 1px) var(--space-3);
  border-radius:999px;
  border:1px solid transparent;
  background:transparent;
  transition: background-color .18s ease, color .18s ease, border-color .18s ease;
}

.topbar__right a:not(.cta):hover{
  background:var(--fg);
  color:var(--bg);
  border-color:var(--fg);
}

.topbar__right a:not(.cta):focus-visible{
  background:var(--fg);
  color:var(--bg);
  border-color:var(--fg);
}

.cta{
  text-decoration:none;
  padding:calc(var(--space-2) + 1px) var(--space-3);
  border-radius:999px;
  border:1px solid var(--fg);
  background:var(--fg);
  color:var(--bg);
}
.cta:hover{background:rgba(255,255,255,.88);}

/* Hero content */
.hero{
  max-width:var(--max);
  margin:0 auto;
  padding:var(--space-5) var(--space-4) var(--space-7);
  border-bottom:1px solid var(--border);
}

.hero-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-6);
  align-items:center;
}

.kicker{
  margin:0 0 var(--space-3);
  letter-spacing:.18em;
  font-size:var(--fs-0);
  color:var(--muted);
}

.hero h1{
  margin:0 0 var(--space-3);
  font-size:clamp(1.75rem, 3.2vw, 2.4rem);
  letter-spacing:-.02em;
  font-weight:650;
  max-width:22ch;
}

/* Main layout + section rails */
.main{
  max-width:var(--max);
  margin:0 auto;
  padding:var(--space-6) var(--space-4) var(--space-7);
}

.rail{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-5);
  padding:var(--space-8) 0;
  border-top:1px solid var(--border);
}

.rail:first-child{border-top:none; padding-top:var(--space-6);}

.rail:last-child{padding-bottom:var(--space-4);}

.rail__label{min-width:0;}

.sticky{
  position:static;
}

.rail-kicker{
  margin:0 0 var(--space-2);
  letter-spacing:.18em;
  font-size:var(--fs-0);
  color:var(--muted);
}

.rail-title{
  margin:0;
  font-size:var(--fs-3);
  letter-spacing:-.01em;
}

.rail-subtitle{
  margin:var(--space-2) 0 0;
  color:var(--muted);
}

.rail__content{
  min-width:0;
}

/* Hero portrait */
.portrait{
  margin:var(--space-4) 0;
  max-width:16rem;
}

.portrait-photo{
  display:block;
  width:100%;
  height:auto;
  border-radius:999px;
  border:1px solid var(--border);
  box-shadow:0 18px 40px var(--shadow);
  background:var(--card);
}

.signature{
  display:block;
  width:100%;
  max-width:16rem;
  height:auto;
  margin-top:var(--space-3);
  margin-inline:auto;
  border:none;
  border-radius:0;
  box-shadow:none;
  background:transparent;
  padding:0;
}

/* Hero chips */
.lede{
  margin:0;
  color:var(--muted);
  font-size:var(--fs-2);
  max-width:72ch;
}

.chips{
  list-style:none;
  padding:0;
  margin:var(--space-5) 0 0;
  display:flex;
  flex-wrap:wrap;
  gap:var(--space-2);
}

.chips li{
  border:1px solid var(--border);
  background:rgba(255,255,255,.04);
  border-radius:999px;
  padding:var(--space-2) var(--space-3);
  font-size:var(--fs-0);
  color:var(--muted);
}

/* Capabilities cards */
.rail__content p{
  margin:0;
  color:var(--muted);
  max-width:78ch;
  font-size:var(--fs-1);
}

.capabilities{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-4);
  margin-top:var(--space-4);
}

.capability{
  border:1px solid var(--border);
  background:var(--card);
  border-radius:var(--radius);
  padding:var(--space-5);
  box-shadow:0 18px 36px var(--shadow);
}

.capability h3{margin:0 0 var(--space-2); font-size:var(--fs-2); letter-spacing:-.01em;}
.capability p{margin:0 0 var(--space-3);}

.capability ul{margin:0; padding-left:1.1rem; color:var(--muted);}
.capability li{margin:0 0 var(--space-2);}

/* Selected work (cases) */
.case{
  margin-top:var(--space-4);
  padding-top:var(--space-5);
  border-top:1px solid var(--border);
}

.case:first-of-type{
  padding-top:0;
  border-top:none;
}

.case h3{margin:0 0 var(--space-4); font-size:var(--fs-2); letter-spacing:-.01em; color:var(--fg);}

.case dl{
  margin:0;
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-2) var(--space-6);
}

.case dt{
  margin:var(--space-3) 0 0;
  font-size:var(--fs-0);
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}

.case dd{
  margin:var(--space-1) 0 0;
  color:var(--muted);
  max-width:78ch;
}

.case .tools{font-size:var(--fs-0);}

@media (min-width: 860px){
  .case dl{grid-template-columns:12rem 1fr;}
  .case dt{margin:0;}
  .case dd{margin:0;}
}

/* Writing (notes list) */
.notes{list-style:none; padding:0; margin:var(--space-4) 0 0;}

.notes li{
  padding:var(--space-4) 0;
  border-top:1px solid var(--border);
}

.notes li:first-child{border-top:none; padding-top:0;}

.notes a{text-decoration:none; font-weight:650;}
.notes a:hover{text-decoration:underline;}

.notes p{margin:var(--space-2) 0 0; color:var(--muted);}

/* Contact */
.contact p{margin:0 0 var(--space-3);}

/* Footer + utilities */
.muted{color:var(--muted);}

.site-footer{
  max-width:var(--max);
  margin:0 auto;
  padding:var(--space-3) var(--space-4) var(--space-4);
  border-top:1px solid var(--border);
}

.site-footer__inner{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:var(--space-4);
  flex-wrap:wrap;
}

.site-footer__brand{
  display:flex;
  flex-direction:column;
  gap:var(--space-1);
}

.site-footer__name{
  margin:0;
  font-weight:650;
  letter-spacing:.02em;
}

.site-footer__nav{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:var(--space-3);
}

.site-footer__links{
  display:flex;
  align-items:center;
  gap:var(--space-3);
  flex-wrap:wrap;
}

.site-footer__fineprint{
  margin:0;
  font-size:var(--fs-0);
}

.site-footer__timezone{
  margin:0;
  font-size:var(--fs-0);
}

.visually-hidden{
  position:absolute;
  width:1px;
  height:1px;
  padding:0;
  margin:-1px;
  overflow:hidden;
  clip:rect(0,0,0,0);
  white-space:nowrap;
  border:0;
}

/* Responsive layout */
@media (min-width: 980px){
  .rail{grid-template-columns:18rem 1fr; gap:var(--space-7);}
  .sticky{position:sticky; top:var(--space-6);}
  .portrait{max-width:14rem; margin:0 0 var(--space-4);}
  .hero-grid{grid-template-columns:1fr auto;}
  .hero h1{max-width:none;}
}
</style>
