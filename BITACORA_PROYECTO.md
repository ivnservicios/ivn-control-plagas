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

## 2026-09-29 - Contacto directo en Nosotros

- Se rediseño el bloque de contacto del cierre de `nosotros.html` con encabezado, iconos y dos acciones directas: WhatsApp y correo.
- Los datos se mantienen como enlaces funcionales, con etiquetas accesibles y sin agregar promesas de respuesta no verificadas.
- Se actualizo la referencia de estilos de la pagina para evitar una vista antigua por cache.
- Validaciones ejecutadas: auditoria del sitio sin errores, FAQ sincronizadas, 13 pruebas aprobadas, sintaxis JavaScript valida, `git diff --check` y revision visual local.

## 2026-09-29 - Revision global de diseno

- Se revisaron las 87 paginas HTML para comprobar salto al contenido, navegacion, contenido principal, footer, H1, CSS y JavaScript.
- Se unifico la version de `styles.css` en todas las paginas para que el diseno actual no dependa de copias antiguas en cache.
- Se actualizo `404.html` al patron actual de navbar con menu movil y footer organizado.
- Revision visual representativa: 404 en movil, pagina por comuna, limpieza por aguas servidas y hub de servicios en escritorio; sin desbordamiento horizontal a 320 y 1280 px.
- Validaciones ejecutadas: auditoria del sitio sin errores, FAQ sincronizadas, 13 pruebas aprobadas, sintaxis JavaScript valida y `git diff --check`.

## 2026-09-29 - Tarjetas de atencion en paginas locales

- Se detecto que las tarjetas `Atencion coordinada` de paginas por comuna seguian usando el formato visual anterior.
- Se creo un componente comun para las tarjetas de cabecera cuyo titulo comienza con `Atencion`, con icono, etiqueta de contexto e iconos por tipo de dato (comuna, espacios, servicios, problema y contacto).
- La informacion local existente se conserva; el ajuste es exclusivamente visual y se aplica de forma consistente a las plantillas que usan ese patron.
- Se renovaron las referencias de CSS y JavaScript de las 87 paginas para evitar que el componente nuevo quede oculto por cache.
- Validaciones ejecutadas: auditoria del sitio sin errores, FAQ sincronizadas, 13 pruebas aprobadas, sintaxis JavaScript valida, `git diff --check` y revision visual local de Maipu.
