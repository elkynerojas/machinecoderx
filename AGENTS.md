# AGENTS.md

## Repo Reality
- Source code not yet scaffolded; `Requirements.md` and `Requirements.txt` are the only specs. Treat `Requirements.md` as canonical when making product/architecture decisions.
- CodeGraph index lives in `.codegraph/` (gitignored). Use `codegraph sync` for incremental updates after a pull or local edits, and `codegraph index -f` for a full re-index after large refactors. The opencode MCP server in `~/.config/opencode/opencode.jsonc` picks it up automatically.

## Stack Expectations (from Requirements)
- Single Laravel 11 monolith (PHP 8.3+) using Inertia.js with React components; no split backend/frontend deployments.
- Node.js 22 powers Vite/build tooling for the React layer. Vuetify is the required component library, so plan wrappers/adapters for React usage.
- Database must be MySQL with Eloquent models; avoid MongoDB/NoSQL assumptions.
- Auth uses JWT; budget in Laravel-compatible packages (e.g., `tymon/jwt-auth`) or equivalent implementation.
- Admin surface must be built with Filament; don’t roll a custom admin unless Filament can’t cover the need.

## Domain Shape to Preserve
- Courses group into **sections**, and each section owns multiple **video lessons**. Lessons may include text/exercise materials but video is primary.
- Video content supports two ingestion paths: provide an external link (streaming) or upload the file directly. Any implementation or schema should keep both flows viable.
- Students and instructors share the same monolith via role-based access; instructors need CRUD over courses/sections/lessons plus insight into enrollments/progress.
- Admin responsibilities (moderation, categories, payments oversight) live in Filament. Keep business logic reusable so both Inertia pages and Filament resources share the same services.
- Services/domains should not embed UI-specific logic; ensure Filament actions and Inertia controllers call shared service classes so behavior stays in sync.

## Missing Tooling (to be defined)
- No Composer, npm, or artisan scripts exist yet. When adding them, document startup/lint/test commands here or in README so later agents don’t guess.
- No CI or env examples are present; add `.env.example`, migration steps, and any queue/storage requirements once the app materializes.
- Target runtime is Docker. Provide a `docker-compose.yml` with at least four services:
  1. `app` for the Laravel monolito (PHP-FPM + nginx as needed).
  2. `mysql` backing store with persistent volume and shared env vars.
  3. `phpmyadmin` wired to the MySQL container for DB administration.
  4. `node` (Node.js 22) running Vite in watch mode to auto-compilar los assets de React/Vuetify.
- Document `docker compose up`/`down` workflows once the compose file exists so future agents can run the stack without guesswork.
