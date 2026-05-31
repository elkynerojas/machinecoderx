# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start all dev services (Laravel server + queue + pail logs + Vite) concurrently
composer dev

# Run test suite
composer test

# Run a single test or filter by name
php artisan test --filter NombreDelTest

# Build frontend assets
npm run build

# First-time setup (installs deps, copies .env, migrates, builds)
composer setup
```

## Architecture

Single Laravel 11 monolith. No split backend/frontend deployments — everything is served from this repo.

### Request flow

1. Any request hits Laravel routes (`routes/web.php`, `routes/auth.php`).
2. Controllers call `Inertia::render('PageName', $props)` — the string maps to `resources/js/Pages/PageName.jsx`.
3. `HandleInertiaRequests` middleware (`app/Http/Middleware/HandleInertiaRequests.php`) injects shared props (currently `auth.user`) into every page.
4. The single Blade template `resources/views/app.blade.php` bootstraps the React app; Inertia hydrates the correct page component.
5. Vite entry point is `resources/js/app.jsx`.

### Frontend conventions

- Pages live under `resources/js/Pages/` and are auto-resolved by name.
- Shared UI pieces go in `resources/js/Components/`; layout wrappers in `resources/js/Layouts/`.
- Route helpers are available via Ziggy's `route()` function in React.
- **Vuetify 3** is the required component library. Since it's Vue-native, use wrappers/adapters to integrate with React — don't build raw custom components when Vuetify covers the need.

### Backend conventions

- Laravel 11 PHP attributes style for models: `#[Fillable([...])]`, `#[Hidden([...])]` instead of `$fillable`/`$hidden` arrays (see `app/Models/User.php`).
- Auth uses `tymon/jwt-auth` for JWT issuance; roles are student, instructor, admin.
- Admin panel is built with **Filament 5** — don't roll custom admin UIs for anything Filament can cover.

### Domain shape (pending implementation)

Course → Section → Lesson hierarchy. Lessons support two video ingestion paths: external URL (streaming) or direct file upload. Both paths must remain viable in any schema or service design.

### Service layer rule

Business logic must live in shared service classes — **not** inside controllers or Filament resources. Both Inertia controllers and Filament actions call the same services so behavior stays in sync across surfaces.

## Docker

```bash
# Primera vez — copiar .env para MySQL y arrancar
cp .env.example .env      # ya tiene DB_HOST=127.0.0.1; docker-compose lo override a mysql
docker compose up -d

# Detener sin borrar volúmenes
docker compose down

# Borrar todo (incluye volúmenes de BD)
docker compose down -v

# Artisan dentro del contenedor
docker compose exec app php artisan <comando>

# Correr tests
docker compose exec app php artisan test

# Logs
docker compose logs -f app
```

URLs en local:
- App: http://localhost:8080
- phpMyAdmin: http://localhost:8081
- Vite HMR: http://localhost:5173

## Infrastructure

Docker is not yet configured. Target setup (to be added):
- `app` — PHP-FPM + nginx
- `mysql` — persistent volume
- `phpmyadmin` — wired to mysql
- `node` — Vite in watch mode

Currently using SQLite for local dev (via `database/database.sqlite`). Target production DB is MySQL; write migrations that are MySQL-compatible.
