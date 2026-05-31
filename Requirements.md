debo# Plataforma de Cursos en Línea – Requisitos

## Objetivo
- Ofrecer una plataforma web donde estudiantes puedan registrarse, iniciar sesión, explorar cursos organizados por categorías, inscribirse y consumir contenido en video, texto y ejercicios prácticos.
- Permitir que instructores administren sus cursos desde un panel dedicado, incluyendo creación, edición y publicación.

## Roles y Flujos Iniciales
- **Estudiantes**: registro/login, exploración del catálogo, inscripción, acceso a contenidos, avance de módulos, envío de comentarios y valoraciones.
- **Instructores**: autenticación con rol, creación/edición de cursos, carga de lecciones y recursos, consulta de métricas básicas de alumnos.
- **Administración**: gestionada con Filament para moderar comentarios, administrar categorías, revisar métricas y supervisar pagos y suscripciones.

## Funcionalidades MVP
1. **Autenticación y Autorización**
   - Rutas/controladores en Laravel 11 para registro, login y recuperación de contraseña.
   - Emisión/refresco de JWT con roles (estudiante, instructor, admin).
   - Middleware y policies de Laravel para proteger rutas sensibles del monolito.
2. **Catálogo de Cursos**
   - Listado filtrable por categoría y búsqueda básica servido desde controladores Laravel + Inertia.
   - Página de detalle con descripción, programa de estudios, formato de contenido disponible y requisitos previos renderizada con componentes React.
3. **Consumo del Curso**
   - Navegación por secciones y lecciones, con reproductor de video y lector para texto/ejercicios integrado en las vistas Inertia.
   - Seguimiento de progreso por módulo y desbloqueo secuencial opcional persistido vía Eloquent.
4. **Comentarios y Valoraciones**
   - Publicación restringida a cursos completados.
   - Media visible y herramientas mínimas de moderación/denuncia.
5. **Panel de Instructor**
   - CRUD de cursos organizados por secciones; cada sección puede tener múltiples lecciones en video (subidos por archivo o URL) además de texto y ejercicios.
   - Formularios Inertia/React respaldados por controladores Laravel para gestionar secciones, lecciones y materiales.
   - Vista rápida de inscripciones, progreso agregado y feedback alimentada por consultas agrupadas en MySQL.
6. **Suscripciones y Pagos**
   - Integración inicial (p. ej. Stripe Checkout) para planes de acceso conectada al monolito Laravel.
   - Registro de estados de suscripción, renovaciones y cancelaciones vía webhooks que actualizan modelos Eloquent.
7. **Administración con Filament**
   - Panel administrativo construido con Filament para CRUD avanzado de usuarios, cursos, secciones, lecciones y categorías.
   - Moderación de comentarios/valoraciones y revisión rápida de métricas de negocio sin abandonar el monolito.

## Tecnologías Base
- Monolito Laravel 11 (PHP 8.3+) utilizando Inertia.js con React; no habrá frontend desacoplado.
- Node.js 22 como toolchain para Vite, pruebas frontend y empaquetado.
- Librería de componentes y estilos Vuetify aplicada al frontend React (vía wrappers/estilos adaptados).
- MySQL como base de datos principal gestionada mediante Eloquent ORM.
- Filament como framework administrativo para construir el panel interno.
- Autenticación y autorización con JWT soportada por paquetes Laravel compatibles.

## Infraestructura y Entorno
- Toda la aplicación se ejecutará en contenedores Docker orquestados con `docker-compose.yml`.
- Servicios mínimos:
  1. **app**: contenedor Laravel/PHP-FPM (más Nginx si se desea) con el código del monolito.
  2. **mysql**: servidor MySQL configurado con volúmenes persistentes y credenciales compartidas vía variables de entorno.
  3. **phpmyadmin**: interfaz web para administrar la base de datos apuntando al contenedor MySQL.
  4. **node**: contenedor Node.js 22 que ejecuta Vite/bundler en modo watch para compilar automáticamente los assets React/Vuetify cuando haya cambios.
- Documentar en `README` los comandos para levantar/detener el stack (`docker compose up`, `down`) y cualquier volumen o red personalizada cuando se creen.

## Datos y Contenido
- Cursos agrupados en categorías, cada uno con descripción extendida, temario y metadatos (formato, duración, nivel) almacenados en MySQL.
- Estructura jerárquica Curso → Secciones → Lecciones; cada sección agrupa múltiples lecciones.
- Lecciones en video admiten dos métodos: enlace externo (streaming) o carga directa del archivo para alojamiento propio; se acompañan de campos para recursos de texto/ejercicios.
- Registro de comentarios y valoraciones por usuario/curso con relaciones normalizadas.

## Requisitos No Funcionales
- Tiempo de respuesta promedio ≤300 ms para endpoints críticos.
- Diseño responsive y accesibilidad mínima WCAG 2.1 AA.
- Estrategia de monitoreo/telemetría básica (logs estructurados, métricas de salud).
- SEO inicial para páginas públicas de cursos.

## Métricas y KPIs Iniciales
- Cursos publicados activos.
- Usuarios registrados y alumnos con suscripción vigente.
- Tasa de finalización de cursos y participación en ejercicios.
- Valoración promedio y volumen de feedback por curso.

## Extensiones Post-MVP
1. Gamificación (insignias, puntos, retos semanales).
2. Bundles, cupones y ventas cruzadas en el marketplace.
3. Integraciones externas: LMS/LTI, calendarios o transmisiones en vivo.
