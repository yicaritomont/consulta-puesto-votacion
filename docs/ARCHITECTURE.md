# Arquitectura

`Browser -> Next.js UI -> POST /api/consultar-puesto -> src/lib/placapi.ts -> PlacApi`

## Capas
- `src/app`: App Router, estilos y Route Handler.
- `src/components`: experiencia responsive y estados UI.
- `src/config`: configuración de campaña.
- `src/lib`: acceso server-only al proveedor externo.
- `src/types`: contratos internos.
- `public/campaign`: recursos reemplazables de campaña.

## Estados
Formulario -> Cargando -> Resultado / No encontrado / Error de servicio.

No se persiste la cédula ni se requiere base de datos para el prototipo.
