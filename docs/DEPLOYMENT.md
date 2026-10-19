# Despliegue

## GitHub
Crear repositorio vacío, agregarlo como `origin` y hacer push de `main`.

## Vercel
1. Add New Project -> importar el repositorio.
2. Framework: Next.js (detección automática).
3. Desplegar en modo mock para demo.
4. Para integración real agregar variables de entorno y redeploy.

### Variables
- `VOTING_API_MODE`: `mock` o `live`.
- `PLACAPI_API_KEY`: secreto server-only.
- `PLACAPI_URL`: endpoint del proveedor, configurable.

Nunca convertir la API key en una variable `NEXT_PUBLIC_*`.
