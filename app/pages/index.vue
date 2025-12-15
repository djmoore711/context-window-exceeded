<script setup lang="ts">
const baseURL = useRuntimeConfig().app.baseURL
const portraitSrc = computed(() => `${baseURL}assets/portrait.png`)

useHead({
  title: 'DJ Moore | About',
  meta: [
    { name: 'description', content: 'Monochrome, minimalist About Me landing page.' },
  ],
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="hero-surface">
    <nav class="topbar" aria-label="Top">
      <div class="topbar__left">
        <span class="name">DJ Moore</span>
      </div>
      <div class="topbar__right">
        <a href="https://www.linkedin.com/in/mooredarrell/">LinkedIn</a>
        <a href="https://github.com/djmoore711">GitHub</a>
        <a class="cta" href="mailto:myself@darrellmoore.me">Email me</a>
      </div>
    </nav>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-inner">
          <p class="kicker">Security engineering</p>
          <h1 id="hero-title">I build security systems you can measure.</h1>
          <p class="lede">I help engineering teams ship secure cloud platforms with clear controls, high-signal detections, and automation that reduces operational drag.</p>
          <ul class="chips" aria-label="Proof points">
            <li>AWS and GCP</li>
            <li>Detection engineering</li>
            <li>Security automation</li>
          </ul>
        </div>
        <figure class="portrait">
          <img :src="portraitSrc" alt="Portrait of DJ Moore" loading="lazy" decoding="async" width="640" height="640" />
        </figure>
      </div>
    </section>
  </header>

  <main id="main" class="main" tabindex="-1">
    <section class="rail" aria-labelledby="how-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">How I work</p>
          <h2 id="how-title" class="rail-title">About</h2>
        </div>
      </div>
      <div class="rail__content">
        <p>I focus on building security foundations that scale with modern cloud platforms. I work close to the seams: identity, logging, policy, and automation that keeps them consistent. I prefer small, testable changes that improve signal-to-noise and shorten the path from finding to fixing. I write runbooks, dashboards, and guardrails so teams can move fast with fewer surprises. I value clear ownership, measurable outcomes, and systems that keep working after launch.</p>
      </div>
    </section>

    <section class="rail" aria-labelledby="what-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">Capabilities</p>
          <h2 id="what-title" class="rail-title">What I do</h2>
        </div>
      </div>
      <div class="rail__content">
        <div class="capabilities" role="list">
          <article class="capability" role="listitem">
            <h3>Platform Security</h3>
            <p>Design identity, network, and policy controls that are easy to operate and hard to bypass.</p>
            <ul>
              <li>Threat modeling for platform changes</li>
              <li>Guardrails via policy-as-code</li>
              <li>Service hardening checklists</li>
            </ul>
          </article>

          <article class="capability" role="listitem">
            <h3>Detection and Logging</h3>
            <p>Increase coverage and reduce alert fatigue by making telemetry consistent and queries maintainable.</p>
            <ul>
              <li>Log pipelines and normalization</li>
              <li>Detection content lifecycle and review</li>
              <li>Triage playbooks and tuning</li>
            </ul>
          </article>

          <article class="capability" role="listitem">
            <h3>Automation and IaC</h3>
            <p>Automate repeatable security work and reduce drift with code-first workflows.</p>
            <ul>
              <li>Terraform modules and standards</li>
              <li>CI checks and drift detection</li>
              <li>Self-service security tooling</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="rail" aria-labelledby="work-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">Proof</p>
          <h2 id="work-title" class="rail-title">Selected work</h2>
        </div>
      </div>
      <div class="rail__content">
        <article class="case" aria-labelledby="case-1">
          <h3 id="case-1">Unified cloud audit logging</h3>
          <dl>
            <dt>Problem</dt>
            <dd>Telemetry was fragmented across accounts and teams, and investigations started with manual data pulls.</dd>
            <dt>What I built or changed</dt>
            <dd>Standardized ingestion and normalization, defined retention and access patterns, and shipped dashboards for investigation workflows.</dd>
            <dt>Result</dt>
            <dd>Reduced investigation startup time from N hours to N minutes and increased detection coverage by X%.</dd>
            <dt>Tools</dt>
            <dd class="tools">Cloud audit logs, SIEM, Terraform</dd>
          </dl>
        </article>

        <article class="case" aria-labelledby="case-2">
          <h3 id="case-2">Identity guardrails with policy-as-code</h3>
          <dl>
            <dt>Problem</dt>
            <dd>Privilege patterns varied by team, and high-risk permissions accumulated over time.</dd>
            <dt>What I built or changed</dt>
            <dd>Introduced reusable IAM modules, preventive policies, and CI checks to block unsafe changes before deploy.</dd>
            <dt>Result</dt>
            <dd>Reduced high-risk permissions by X% and shortened approval cycles by N days.</dd>
            <dt>Tools</dt>
            <dd class="tools">Terraform, OPA, CI pipelines</dd>
          </dl>
        </article>

        <article class="case" aria-labelledby="case-3">
          <h3 id="case-3">Detection content lifecycle</h3>
          <dl>
            <dt>Problem</dt>
            <dd>Alerts were noisy and stale, ownership was unclear, and tuning was inconsistent.</dd>
            <dt>What I built or changed</dt>
            <dd>Created a versioned detection repo with review gates, promotion stages, and simple tests for query logic.</dd>
            <dt>Result</dt>
            <dd>Reduced false positives by X% and improved mean time to acknowledge by N minutes.</dd>
            <dt>Tools</dt>
            <dd class="tools">Detection rules, Python, SIEM</dd>
          </dl>
        </article>

        <article class="case" aria-labelledby="case-4">
          <h3 id="case-4">Incident response automation</h3>
          <dl>
            <dt>Problem</dt>
            <dd>Enrichment and containment steps were manual, slow, and varied between responders.</dd>
            <dt>What I built or changed</dt>
            <dd>Automated enrichment, ticket creation, and common containment actions with audit trails and safe defaults.</dd>
            <dt>Result</dt>
            <dd>Reduced time to contain from N hours to N minutes and improved consistency across responders.</dd>
            <dt>Tools</dt>
            <dd class="tools">Serverless functions, APIs, SOAR</dd>
          </dl>
        </article>
      </div>
    </section>

    <section class="rail" aria-labelledby="notes-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">Notes</p>
          <h2 id="notes-title" class="rail-title">Writing</h2>
        </div>
      </div>
      <div class="rail__content">
        <ul class="notes">
          <li>
            <a href="https://example.com/notes/detection-tuning">Field notes: detection tuning</a>
            <p>A checklist for reducing noise without losing coverage.</p>
          </li>
          <li>
            <a href="https://example.com/notes/policy-as-code">Policy-as-code patterns</a>
            <p>Guardrails that teams can adopt incrementally.</p>
          </li>
          <li>
            <a href="https://example.com/notes/security-automation">Automation that respects humans</a>
            <p>Where to automate, and where to keep a human in the loop.</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="rail" aria-labelledby="contact-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">Contact</p>
          <h2 id="contact-title" class="rail-title">Reach out</h2>
        </div>
      </div>
      <div class="rail__content">
        <div class="contact">
          <p><a href="mailto:myself@darrellmoore.me">myself@darrellmoore.me</a></p>
          <p class="muted">America/Chicago</p>
          <p>Best way to reach me: email with a short summary and any relevant constraints.</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p class="muted">About Me</p>
  </footer>
</template>

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
  padding:var(--space-5) var(--space-4) var(--space-4);
}

.name{font-weight:650; letter-spacing:.02em; font-size:var(--fs-3);}

.topbar__right{
  display:flex;
  align-items:center;
  gap:var(--space-3);
  flex-wrap:wrap;
  justify-content:flex-end;
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
  padding:var(--space-6) var(--space-4) var(--space-7);
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
  text-transform:uppercase;
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
  padding:var(--space-7) var(--space-4) var(--space-9);
}

.rail{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-5);
  padding:var(--space-8) 0;
  border-top:1px solid var(--border);
}

.rail:first-child{border-top:none; padding-top:var(--space-6);}

.rail__label{min-width:0;}

.sticky{
  position:static;
}

.rail-kicker{
  margin:0 0 var(--space-2);
  text-transform:uppercase;
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

.portrait img{
  display:block;
  width:100%;
  height:auto;
  border-radius:999px;
  border:1px solid var(--border);
  box-shadow:0 18px 40px var(--shadow);
  background:var(--card);
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
  padding:0 var(--space-4) var(--space-7);
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
}
</style>
