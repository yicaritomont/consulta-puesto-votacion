# Consulta de puesto de votación

Prototipo responsive y configurable para consultar el puesto/mesa de votación y mostrar identidad visual de campaña. Frontend y backend viven en un único proyecto Next.js; la API key nunca se expone al navegador.

## Requisitos
- Node.js 24+
- npm 10+ (o pnpm)

## Ejecutar localmente
```bash
cp .env.example .env.local
npm install
npm run dev
```
Abrir `http://localhost:3000`.

## Modo mock
Por defecto `VOTING_API_MODE=mock`.
- Cualquier cédula válida: éxito.
- Cédula terminada en `00`: no encontrada.
- Cédula terminada en `99`: error temporal.

## Personalizar campaña
Editar `src/config/campaign.ts`. Sustituir `public/campaign/candidate.svg` y `public/campaign/ballot.svg` conservando las rutas o actualizar la configuración. Allí están nombre, cargo, número, slogan y colores.

## Activar PlacApi
1. Configurar `VOTING_API_MODE=live`.
2. Configurar `PLACAPI_API_KEY` solo en servidor.
3. Confirmar `PLACAPI_URL` y el esquema de autenticación/respuesta con la documentación vigente de PlacApi antes de producción.
4. Reiniciar/re-desplegar.

> `src/lib/placapi.ts` concentra la integración para que cualquier ajuste del proveedor quede aislado.

## GitHub
```bash
git init
git add .
git commit -m "feat: voting place prototype"
git branch -M main
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

## Vercel
Importar el repositorio de GitHub. Vercel detecta Next.js automáticamente. Para mock no hace falta ningún secreto. Para live agregar `VOTING_API_MODE=live` y `PLACAPI_API_KEY` como variable secreta y redeploy.

## Seguridad antes de producción
- No registrar cédulas en logs/analytics.
- Añadir rate limiting/anti-abuso antes de una campaña pública.
- Revisar aviso/política de tratamiento de datos y condiciones del proveedor.
- Mantener la API key como secreto de servidor.

Más detalle: `docs/ARCHITECTURE.md`, `docs/CONFIGURATION.md`, `docs/DEPLOYMENT.md` y `docs/API.md`.
