# Configuración de campaña

Toda la personalización principal vive en `src/config/campaign.ts`.

Campos: `candidate.name`, `position`, `number`, `photo`; y `branding.primaryColor`, `secondaryColor`, `accentColor`, `title`, `subtitle`, `slogan`, `logo`.

Los colores iniciales son `#06458E`, `#0878E8` y `#EAF4FF`.

Para reutilizar el proyecto con otro candidato, cambie esa configuración y los assets de `public/campaign/` sin tocar la lógica de consulta.
