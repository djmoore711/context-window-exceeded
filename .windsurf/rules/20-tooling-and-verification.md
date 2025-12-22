# Tooling and Verification Rules

## Verification Order

- MUST verify behavior and conventions in this order:
  - local codebase (source + configs)
  - `README.md`
  - dependency documentation for the exact dependency versions in `package.json` / `package-lock.json`
  - web sources only when necessary

## Tool Usage (Anti-Hallucination)

- MUST use repository search (e.g., code search / grep) to locate the authoritative implementation before changing behavior.
- MUST read the relevant files before editing them.
- MUST NOT guess at existing APIs, file paths, or Nuxt module behavior when it can be verified locally.

## Commands

- MUST NOT run commands that change the working tree (installs/builds/generates) without user approval.
- If the user asks to validate changes, SHOULD use only the existing npm scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run generate`
  - `npm run preview`
- MUST NOT introduce new tooling (linters/formatters/test runners) unless explicitly requested.
