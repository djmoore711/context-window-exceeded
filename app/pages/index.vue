<script setup lang="ts">
import { computed, useRuntimeConfig, useHead } from '#imports'

const baseURL = useRuntimeConfig().app.baseURL
const portraitSrc = `${baseURL}images/portrait.png`
const signatureSrc = `${baseURL}images/DJ_Moore_signature_transparent_tight.png`
const year = new Date().getFullYear()

useHead({
  title: 'DJ Moore | About',
  meta: [
    { name: 'description', content: 'Monochrome, minimalist About Me landing page.' },
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
        <a :href="baseURL + 'blog'">Blog</a>
        <a href="https://www.linkedin.com/in/mooredarrell/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/djmoore711" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="cta" href="mailto:owner@darrellmoore.me">Email Me</a>
      </div>
    </nav>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-inner">
          <p class="kicker">Security Engineering</p>
          <h1 id="hero-title">I build security systems that reduce risk and prove it.</h1>
          <p class="lede">
            I’m a GCP and AWS platform security engineer. I like messy environments, unclear ownership, and noisy telemetry,
            because that’s where real security work lives. I build the pipelines, controls, and tooling that turn “we think we’re okay”
            into "we can prove it," without making engineering feel like a paper mill.
          </p>
          <ul class="chips" aria-label="Proof points">
            <li>AWS and GCP</li>
            <li>Platform Security and IAM</li>
            <li>Detection and DFIR Enablement</li>
            <li>Security Automation</li>
            <li>Compliance Reality: SOC 2 and PCI</li>
            <li>Insider Threat and Investigations</li>
          </ul>
        </div>
        <figure class="portrait">
          <img class="portrait-photo" :src="portraitSrc" alt="Portrait of DJ Moore" loading="lazy" decoding="async" width="640" height="640" />
          <img class="signature" :src="signatureSrc" alt="Signature of DJ Moore" loading="lazy" decoding="async" width="320" height="120" />
        </figure>
      </div>
    </section>
  </header>

  <main id="main" class="main" tabindex="-1">
    <section class="rail" aria-labelledby="how-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">How I Work</p>
          <h2 id="how-title" class="rail-title">About</h2>
        </div>
      </div>
      <div class="rail__content">
        <p>
          I prioritize a few key security problems that actually move risk, build systems that reduce the problem
          permanently, and then make it easy for other teams to do the right thing without needing security in the room.
          I work close to the seams where things break: identity, logging, CI/CD, policy, and the “who owns this?” problem.
        </p>
        <br />
        <p>
          I’m not interested in security theater. I like controls you can verify, telemetry you can trust, and workflows that don’t depend
          on heroics. When I ship something, I want it to keep working after launch: documented, automated where it should be, and measurable enough that both leadership and engineers understand the outcome.
        </p>
        <br />
        <p>
          I’ve done this in regulated environments where PCI and audit requirements are real, and in places where privacy and legal constraints
          matter just as much as detection. I’ve also lived the small team reality where you can’t scale by doing more manual work, so you scale by
          building better systems and teaching others how to use them.
        </p>
      </div>
    </section>

    <section class="rail" aria-labelledby="what-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">Capabilities</p>
          <h2 id="what-title" class="rail-title">What I Do</h2>
        </div>
      </div>
      <div class="rail__content">
        <div class="capabilities" role="list">
          <article class="capability" role="listitem">
            <h3>Platform Security</h3>
            <p>
              I design the control plane for cloud environments: identity, segmentation, and guardrails that are easy to operate and hard to bypass.
              The goal is consistent access patterns, smaller blast radius, and fewer “special cases” that turn into future incidents.
            </p>
            <ul>
              <li>Cloud identity design across GCP and AWS (roles, groups, approvals, governance)</li>
              <li>Network segmentation and scoped environments for compliance and risk reduction</li>
              <li>Threat modeling for platform changes and sensitive code paths</li>
            </ul>
          </article>

          <article class="capability" role="listitem">
            <h3>Detection, DFIR, and Logging</h3>
            <p>
              I care about signal. I like clean pipelines, stable schemas, and detections that someone will still trust at 2 a.m.
              I build triage patterns, tuning workflows, and playbooks so response stays calm and repeatable.
            </p>
            <ul>
              <li>SIEM migrations and operations (Chronicle, Splunk), plus log routing and normalization</li>
              <li>Detection tuning that reduces noise without throwing away real signal</li>
              <li>Incident response workflows: clear triage, enrichment, and consistent steps for responders</li>
            </ul>
          </article>

          <article class="capability" role="listitem">
            <h3>Automation and IaC</h3>
            <p>
              If something is repeatable, I want it coded. I use automation to reduce drift, reduce manual toil, and keep the “right way”
              easy to adopt. I’m comfortable writing the glue code that turns tools into a system.
            </p>
            <ul>
              <li>Terraform modules and standards for identity and platform security</li>
              <li>Python and Bash automation for ETL, workflows, and repeatable operations</li>
              <li>Self-service patterns that move security from “ticket queue” to “review and governance”</li>
            </ul>
          </article>

          <article class="capability" role="listitem">
            <h3>Insider Threat and Investigations</h3>
            <p>
              I’ve built and operated insider threat capabilities in regulated environments, balancing security, privacy, and legal constraints.
              The work is less about “monitor everything” and more about scoped, justified triggers that create defensible evidence when something is off.
            </p>
            <ul>
              <li>Partnering with legal, privacy, GRC, and policy teams to define what’s allowed and why</li>
              <li>Investigation workflows that focus on anomaly detection, evidence collection, and least-privilege access</li>
              <li>Controls around sensitive records and high-profile access patterns in healthcare environments</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="rail" aria-labelledby="github-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">GitHub</p>
          <h2 id="github-title" class="rail-title">GitHub Projects</h2>
        </div>
      </div>
      <div class="rail__content">
        <GithubRepoShowcase />
      </div>
    </section>

    <section class="rail" aria-labelledby="work-title">
      <div class="rail__label">
        <div class="sticky">
          <p class="rail-kicker">Proof</p>
          <h2 id="work-title" class="rail-title">Selected Work</h2>
        </div>
      </div>
      <div class="rail__content">
        <article class="case" aria-labelledby="case-1">
          <h3 id="case-1">Vulnerability Management Program Built From Scratch</h3>
          <dl>
            <dt>Problem</dt>
            <dd>
              We started with visibility shock: millions of vulnerability findings across the environment and no scalable way to assign ownership,
              track remediation, or produce clean evidence for PCI. Early efforts relied on manual spreadsheets and ad-hoc follow-ups.
            </dd>
            <dt>What I built or changed</dt>
            <dd>
              Sequestered PCI resources into a segmented environment to shrink scope and focus effort. Built a BigQuery-backed vulnerability
              inventory by pulling Prisma Cloud data via Python ETL and combining it with repository ownership mapping. Layered in GitHub security
              signals (SAST and dependency findings) and built a dashboard so teams could self-serve: “what is mine, where did it come from, and how do I fix it?”
            </dd>
            <dt>Result</dt>
            <dd>
              Took PCI vulnerability state from “chaos and manual tracking” to a single pane of glass with ownership and evidence, driving PCI
              vulnerabilities (low through critical) down to zero in under six months. Reduced audit thrash and made remediation a repeatable workflow.
            </dd>
            <dt>Tools</dt>
            <dd class="tools">GCP, Prisma Cloud, BigQuery, Python, GitHub Advanced Security, ClickUp</dd>
          </dl>
        </article>

        <article class="case" aria-labelledby="case-2">
          <h3 id="case-2">GCP IAM Privilege Reduction With Governance and Cleanup</h3>
          <dl>
            <dt>Problem</dt>
            <dd>
              Migration to GCP left behind overly broad, inconsistent permission models: primitive roles, custom roles with huge permission sets,
              and console-created access patterns that caused drift and privilege creep.
            </dd>
            <dt>What I built or changed</dt>
            <dd>
              Used Security Command Center IAM analysis to identify permissions actually used over time, then rebuilt access through Terraform-managed
              groups and bindings. Introduced a governance model where access changes flowed through PR review, and aligned identity workflows across
              Okta, Google Workspace, and GCP so access didn’t require constant manual moves.
            </dd>
            <dt>Result</dt>
            <dd>
              Reduced unused permissions by 50% across major groups while keeping teams productive, shrinking blast radius and replacing
              console drift with reviewable, self-documenting infrastructure-as-code.
            </dd>
            <dt>Tools</dt>
            <dd class="tools">GCP IAM, Security Command Center, Terraform, Okta, Google Workspace, GitHub PR workflows</dd>
          </dl>
        </article>

        <article class="case" aria-labelledby="case-3">
          <h3 id="case-3">SIEM Migration and Strong Signal to Noise Improvement</h3>
          <dl>
            <dt>Problem</dt>
            <dd>
              A legacy SIEM created operational drag and noisy alert streams. Separately, a single SCC alert type was generating tens of thousands
              of events that responders were close to ignoring entirely.
            </dd>
            <dt>What I built or changed</dt>
            <dd>
              Migrated from AlienVault to Chronicle, moving core integrations (forwarders, Pub/Sub sources, webhooks) and adding new coverage where it mattered.
              For the high-noise SCC alert, partnered with engineering to isolate the exact benign pattern and implemented targeted suppression logic
              that removed the noise without losing real signal.
            </dd>
            <dt>Result</dt>
            <dd>
              Modernized SIEM operations by reducing care and feeding and improving reliability. Tuned a single detection stream down by ~89k events,
              preserving trust and preventing responders from blanket-ignoring a whole alert category.
            </dd>
            <dt>Tools</dt>
            <dd class="tools">Chronicle, SCC, Pub/Sub, forwarders, detection tuning, cloud integrations</dd>
          </dl>
        </article>

        <article class="case" aria-labelledby="case-4">
          <h3 id="case-4">Splunk Consolidation and Entra ID SSO</h3>
          <dl>
            <dt>Problem</dt>
            <dd>
              Splunk was fragmented across accounts with monolithic servers, inconsistent access controls, and user sprawl. Admin work was not scalable,
              and offboarding required touching too many systems.
            </dd>
            <dt>What I built or changed</dt>
            <dd>
              Re-architected Splunk into components (indexers, search head, heavy forwarders) and replaced monoliths with a centralized model.
              Built CloudFormation templates for repeatable server foundations and wrote Bash automation to migrate configs and data, including
              validation checks. Implemented Entra ID SSO via SAML to consolidate identity and role mapping.
            </dd>
            <dt>Result</dt>
            <dd>
              Reduced account sprawl and made access management centralized and sane. Automation cut hours of migration babysitting per server,
              improved repeatability, and enabled scalable growth across accounts.
            </dd>
            <dt>Tools</dt>
            <dd class="tools">AWS, Splunk, CloudFormation, Bash, Entra ID (SAML), SSM/systemd workflows</dd>
          </dl>
        </article>
      </div>
    </section>
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
