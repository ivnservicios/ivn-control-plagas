# Bitacora del proyecto IVN Servicios

Registro de cambios, validaciones y decisiones tecnicas relevantes. No incluye datos personales de solicitudes ni clientes.

## 2026-09-29 - Enlazado interno contextual

- Se reviso la malla de enlaces internos sin crear rutas ni enlaces repetitivos.
- `nosotros.html` incorpora accesos contextuales a `control-de-termitas/` y a `cobertura-santiago.html`.
- `control-de-ratones-santiago.html` enlaza la respuesta sobre zonas atendidas con `cobertura-santiago.html`.
- Se actualizo el JSON-LD FAQPage de la pagina de ratones para mantenerlo igual al contenido visible.
- Validaciones ejecutadas: `scripts/sync_faq_schema.py`, `scripts/audit_site.py`, `node --test tests/*.test.cjs`, `node --check script.js` y `git diff --check`.
- Resultado: auditoria sin errores, 334 respuestas FAQ sincronizadas y 13 pruebas aprobadas.

## 2026-09-29 - Navegacion de comunas

- Se rediseño el directorio de comunas de `cobertura-santiago.html` para que cada enlace sea una accion visual clara, sin cambiar sus destinos.
- Las comunas se muestran como enlaces tipo boton con borde verde, flecha, estados hover y foco visible; en movil pasan a una columna para conservar legibilidad y area tactil.
- Se actualizo la version de la hoja de estilos referenciada por esa pagina para evitar que una copia en cache oculte el cambio.
- Validaciones ejecutadas: auditoria del sitio sin errores, FAQ sincronizadas, 13 pruebas aprobadas, sintaxis JavaScript valida, `git diff --check` y revision visual local.

## 2026-09-29 - Navegacion principal y pagina Nosotros

- Se agrego de forma dinamica y consistente el enlace `Nosotros` antes de `Cotizar` en los menus principales que no lo incluian; en esa pagina se marca como seccion actual.
- Se actualizaron las referencias de `script.js` en los documentos HTML para evitar que el navegador conserve una version anterior del menu.
- Se rediseño la tarjeta `Atencion coordinada` de `nosotros.html` con jerarquia visual, icono de orientacion, descripcion breve e iconos funcionales para cobertura, espacios y contacto.
- Validaciones ejecutadas: auditoria del sitio sin errores, FAQ sincronizadas, 13 pruebas aprobadas, sintaxis JavaScript valida y revision responsive sin desbordamiento horizontal a 320, 768 y 1280 px.

## 2026-09-29 - Footer simplificado

- Se eliminaron enlaces repetidos a `Nosotros` y `Cobertura` del footer.
- El pie ahora organiza la informacion en tres grupos: identificacion de IVN, enlaces de servicios y acciones generales (Instagram y subir al inicio).
- Se verifico visualmente la lectura final: `IVN Servicios | Servicios | Control de plagas | Desratizacion | Sanitizacion | Instagram | Subir`.
- Validaciones ejecutadas: auditoria del sitio sin errores, FAQ sincronizadas, 13 pruebas aprobadas, sintaxis JavaScript valida y `git diff --check`.

## 2026-09-29 - CTA de cobertura

- Se reforzo el boton `Ver todas las comunas atendidas` de la portada con color verde IVN, sombra ligera y flecha direccional.
- Se actualizo la referencia de estilos de la portada para que el ajuste no dependa de cache del navegador.
- Validaciones ejecutadas: auditoria del sitio sin errores, 13 pruebas aprobadas, sintaxis JavaScript valida y `git diff --check`.
