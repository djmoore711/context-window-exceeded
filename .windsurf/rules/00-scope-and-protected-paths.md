# Scope and Protected Paths

## Project Scope

- MUST treat this repository as a Nuxt 4 (Vue 3) static site (GitHub Pages deployment).
- MUST preserve Nuxt Content usage for Markdown-driven pages.

## Allowed Modification Areas

- MAY modify source code under `app/`.
- MAY modify content under `content/`.
- MAY modify static assets under `public/`.
- MAY modify project configuration files when required by the task:
  - `nuxt.config.ts`
  - `content.config.ts`
  - `tsconfig.json`
  - `package.json`
  - `README.md`

## Protected / Do-Not-Touch Paths

- MUST NOT edit generated or build output directories/files:
  - `.nuxt/`
  - `.output/`
  - `.data/`
  - `.nitro/`
  - `.cache/`
  - `dist/`
- MUST NOT edit dependency installation outputs:
  - `node_modules/`
- MUST NOT edit local environment files:
  - `.env`
  - `.env.*`
- MUST NOT add or commit OS/editor artifacts:
  - `.DS_Store`

## High-Risk Areas (Ask First)

- MUST ask for explicit confirmation before editing CI/CD or deployment configuration:
  - `.github/workflows/deploy.yml`
- MUST ask for explicit confirmation before changing Nuxt routing behavior or base URL behavior:
  - `app/pages/[...slug].vue`
  - `nuxt.config.ts` (`app.baseURL`, `buildAssetsDir`)
