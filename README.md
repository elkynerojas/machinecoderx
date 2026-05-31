## Plataforma de cursos MachineCoderX

Monolito Laravel 11 con Inertia + React como capa web, Filament para el panel administrativo y tooling Node/Vite + Vuetify (se usarán wrappers/estilos propios sobre React) según lo descrito en `Requirements.md`.

Este commit sólo instala el armazón. No hay funcionalidades ni UI definitivas todavía.

## Requisitos locales

- PHP 8.3+ con Composer
- Extensiones: `pdo_mysql`, `openssl`, `mbstring`, `fileinfo`
- Node.js 22 (el lock actual se generó con Node 18, pero Vite 8 y Tailwind 4 requieren Node ≥20.19; usa `nvm install 22` para evitar advertencias)
- npm 10+
- MySQL 8 (o MariaDB compatible)

## Instalación rápida

```bash
cp .env.example .env
composer install
php artisan key:generate

npm install

# Base sqlite temporal incluida por defecto. Para MySQL:
php artisan migrate
```

## Scripts de desarrollo

- `php artisan serve` arranca el backend.
- `npm run dev` levanta Vite con Inertia/React.
- `php artisan test` ejecuta la suite de pruebas.

## Próximos pasos previstos

1. Definir Docker (`app`, `mysql`, `phpmyadmin`, `node`) y documentar `docker compose up/down`.
2. Configurar wrapper/base theme Vuetify para React y limpiar Tailwind una vez estén los componentes.
3. Crear migraciones + modelos para cursos → secciones → lecciones, categorías, comentarios y suscripciones.
4. Integrar JWT/Auth + Filament y compartir servicios de dominio.

Consulta `Requirements.md` para el backlog funcional completo.
