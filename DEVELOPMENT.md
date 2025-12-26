# Development Setup Guide

This document reflects the current, verified development and deployment setup for the project. <!-- Changed because documentation must reflect current state -->

## Environment Setup

- **Node.js**: `>=18.0.0` (CI uses Node 20) <!-- Changed because CI uses Node 20; engines allow >=18 -->
- **npm**: `>=9.0.0`
- **Package manager**: npm

### OpenSSL Legacy Provider

The development script already sets `NODE_OPTIONS=--openssl-legacy-provider`:

```bash
npm run dev
```

Use this script (or upgrade to Node 20+) if you hit OpenSSL errors. <!-- Changed because this is the only verified usage -->

## Configuration

### Environment Variables

Copy `.env.example` if you need overrides:

```bash
NUXT_APP_BASE_URL=/context-window-exceeded/  # GitHub Pages base path
```

- Local dev defaults to `/` via `nuxt.config.ts` when `NODE_ENV` is not `production`. <!-- Changed because nuxt.config.ts enforces "/" in dev -->
- No other environment variables are used. <!-- Changed because only NUXT_APP_BASE_URL is present -->

### Nuxt Configuration (key points from `nuxt.config.ts`)

- Modules: `@nuxt/content`
- SSR: enabled
- Base URL: `/` in dev; `process.env.NUXT_APP_BASE_URL || '/'` in production
- Assets dir: `assets`
- Prerendered routes: `/`, `/blog`
- Content watch: disabled (`content.watch.enabled = false`)
<!-- Changed because previous content config and baseURL description did not match nuxt.config.ts -->

### Content Configuration (from `content.config.ts`)

- Collections:
  - `content`: all pages (`**`)
  - `blog`: `blog/**/*.md`
<!-- Changed because prior config referenced experimental settings not present -->

## Development Workflow

### Local Development

1) Install dependencies
```bash
npm install
```
2) Start dev server (includes OpenSSL legacy flag)
```bash
npm run dev
```
3) Visit http://localhost:3000
4) Content watch is disabled (`content.watch.enabled = false`); restart the dev server after changing Markdown content. <!-- Changed to match content.watch.disabled -->

### Building

```bash
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview the production build
```

### Content & Assets

- Pages: `content/*.md`
- Blog posts: `content/blog/*.md` (with front matter)
- Images: place under `public/` (blog images are under `public/blog-images/...`)

## Deployment

### GitHub Pages (CI)

- Trigger: push to `main` or manual dispatch (`workflow_dispatch`)
- Node version: 20
- Install: `npm ci`
- Security scan: `snyk/actions/node@master` with `SNYK_TOKEN` secret required <!-- Changed because CI enforces Snyk scan -->
- Build: `npx --no-install nuxt build --preset github-pages`
- Artifact: `./.output/public`
- Deploy: `actions/deploy-pages@v4` to GitHub Pages
- Base URL must be `/context-window-exceeded/` for Pages

### Manual/Local Static Export

```bash
NUXT_APP_BASE_URL=/context-window-exceeded/ npm run build -- --preset github-pages
# or for a root-hosted export
NUXT_APP_BASE_URL=/ npm run generate
```
Deploy the resulting `.output/public` directory to your host.
<!-- Changed because previous branch name and steps were inaccurate -->

## Troubleshooting

- OpenSSL errors: use `npm run dev` or upgrade to Node 20+. <!-- Changed because this is the validated mitigation -->
- CI failing on Snyk: ensure `SNYK_TOKEN` secret is present and valid. <!-- Changed because CI includes Snyk -->
- Base path issues on Pages: set `NUXT_APP_BASE_URL=/context-window-exceeded/` for production builds.
- Missing content: verify Markdown front matter and placement under `content/` or `content/blog/`.

## Project Structure (trimmed to relevant items)

```
app/                   # Vue components/pages/layouts
content/               # Markdown content (pages + blog)
public/                # Static assets (incl. blog images)
.github/workflows/     # CI/CD (deploy.yml)
nuxt.config.ts         # Nuxt configuration
content.config.ts      # Nuxt Content collections
package.json           # Scripts and dependencies
```

## Security Notes

- Static output; no server-side secrets at runtime
- Build-time env only; do not commit secrets
- Snyk scan runs in CI (threshold: high severity)

## Development Reality Check

- Verify app runs: `npm install` → `npm run dev` → open http://localhost:3000 and load homepage/blog. <!-- Changed because required verification steps -->
- Confirm build artifact: `npm run build -- --preset github-pages` should produce `.output/public`.
- Confirm version/commit: check `git rev-parse HEAD` locally; GitHub Pages deployments come from CI on `main`.
- Common failure modes:
  - Missing `SNYK_TOKEN` in CI causes build failure.
  - Incorrect `NUXT_APP_BASE_URL` leads to broken asset links on Pages.
  - Using Node <18 or without legacy OpenSSL flag may break `npm run dev`.
