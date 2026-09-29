# Bitacora del proyecto IVN Servicios

Registro de cambios, validaciones y decisiones tecnicas relevantes. No incluye datos personales de solicitudes ni clientes.

## 2026-09-29 - Enlazado interno contextual

- Se reviso la malla de enlaces internos sin crear rutas ni enlaces repetitivos.
- `nosotros.html` incorpora accesos contextuales a `control-de-termitas/` y a `cobertura-santiago.html`.
- `control-de-ratones-santiago.html` enlaza la respuesta sobre zonas atendidas con `cobertura-santiago.html`.
- Se actualizo el JSON-LD FAQPage de la pagina de ratones para mantenerlo igual al contenido visible.
- Validaciones ejecutadas: `scripts/sync_faq_schema.py`, `scripts/audit_site.py`, `node --test tests/*.test.cjs`, `node --check script.js` y `git diff --check`.
- Resultado: auditoria sin errores, 334 respuestas FAQ sincronizadas y 13 pruebas aprobadas.
