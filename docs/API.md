# API interna

## POST `/api/consultar-puesto`
Request:
```json
{"document":"1234567890"}
```

Éxito:
```json
{"ok":true,"data":{"department":"Tolima","municipality":"Ibagué","place":"Institución Educativa San Simón","table":"12","address":"Cra. 5 # 19-32, Ibagué, Tolima"}}
```

Errores normalizados: `INVALID_REQUEST`, `NOT_FOUND`, `RATE_LIMITED`, `SERVICE_UNAVAILABLE`.

La normalización evita que la UI dependa del contrato exacto del proveedor externo.
