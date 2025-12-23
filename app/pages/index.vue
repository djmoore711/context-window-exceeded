<script setup lang="ts">
import { computed, useRuntimeConfig, useHead } from '#imports'

const baseURL = useRuntimeConfig().app.baseURL
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

// Define layout metadata
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <NuxtLayout kicker="Security Engineering" title="I build security systems that reduce risk and prove it." 
    lede="I'm a GCP and AWS platform security engineer. I like messy environments, unclear ownership, and noisy telemetry, because that's where real security work lives. I build the pipelines, controls, and tooling that turn 'we think we're okay' into 'we can prove it,' without making engineering feel like a paper mill."
    :show-portrait="true">
    
    <template #hero-actions>
      <ul class="chips" aria-label="Proof points">
        <li>AWS and GCP</li>
        <li>Platform Security and IAM</li>
        <li>Detection and DFIR Enablement</li>
        <li>Security Automation</li>
        <li>Compliance Reality: SOC 2 and PCI</li>
        <li>Insider Threat and Investigations</li>
      </ul>
    </template>

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
          I work close to the seams where things break: identity, logging, CI/CD, policy, and the "who owns this?" problem.
        </p>
        <br />
        <p>
          I'm not interested in security theater. I like controls you can verify, telemetry you can trust, and workflows that don't depend
          on heroics. When I ship something, I want it to keep working after launch: documented, automated where it should be, and measurable enough that both leadership and engineers understand the outcome.
        </p>
        <br />
        <p>
          I've done this in regulated environments where PCI and audit requirements are real, and in places where privacy and legal constraints
          matter just as much as detection. I've also lived the small team reality where you can't scale by doing more manual work, so you scale by
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
              The goal is consistent access patterns, smaller blast radius, and fewer "special cases" that turn into future incidents.
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
              If something is repeatable, I want it coded. I use automation to reduce drift, reduce manual toil, and keep the "right way"
              easy to adopt. I'm comfortable writing the glue code that turns tools into a system.
            </p>
            <ul>
              <li>Terraform modules and standards for identity and platform security</li>
              <li>Python and Bash automation for ETL, workflows, and repeatable operations</li>
              <li>Self-service patterns that move security from "ticket queue" to "review and governance"</li>
            </ul>
          </article>

          <article class="capability" role="listitem">
            <h3>Insider Threat and Investigations</h3>
            <p>
              I've built and operated insider threat capabilities in regulated environments, balancing security, privacy, and legal constraints.
              The work is less about "monitor everything" and more about scoped, justified triggers that create defensible evidence when something is off.
            </p>
            <ul>
              <li>Partnering with legal, privacy, GRC, and policy teams to define what's allowed and why</li>
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
              signals (SAST and dependency findings) and built a dashboard so teams could self-serve: "what is mine, where did it come from, and how do I fix it?"
            </dd>
            <dt>Result</dt>
            <dd>
              Took PCI vulnerability state from "chaos and manual tracking" to a single pane of glass with ownership and evidence, driving PCI
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
              Okta, Google Workspace, and GCP so access didn't require constant manual moves.
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
  </NuxtLayout>
</template>

<style>
/* Page-specific styles that override layout */
</style>
