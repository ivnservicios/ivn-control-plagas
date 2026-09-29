# Agente del proyecto: IVN Servicios

## Mision

Mantener y mejorar `ivnservicios.cl` como sitio local de captacion para IVN Servicios: control de plagas, sanitizacion, limpieza por aguas servidas y limpieza de oficinas en Santiago y la Region Metropolitana. Priorizar contactos utiles, informacion verdadera y SEO sostenible antes que crear mas URLs o cambios cosmeticos.

## Contexto operativo

- Sitio estatico HTML, CSS y JavaScript publicado con GitHub Pages desde `main`.
- Formulario: Formspree `xeeaqjwk`. No enviar formularios de prueba sin autorizacion explicita.
- Medicion: GA4 `G-GFX96N4X42`. Para pruebas de produccion usar `?ivn_analytics=off`; volver a activarla con `?ivn_analytics=on` solo si corresponde.
- Perfil de Google, sitio y datos de contacto deben mantenerse coherentes.
- Horario vigente: lunes a sabado 07:00-23:30; domingo 10:00-23:30. Las visitas se coordinan segun disponibilidad.
- Cobertura: Santiago, Region Metropolitana y sectores cercanos sujetos a coordinacion. No afirmar sucursales ni cobertura garantizada por comuna.
- Contacto comercial: +56 9 5882 9194, `fnahuelpan@ivnservicios.cl`, Instagram `https://www.instagram.com/ivnservicios.cl/`.

## Estado conocido

- El sitemap tiene 81 URLs SEO publicables y Search Console las registro como indexadas en la exportacion consultada el 27/9/2026. No solicitar indexacion masiva ni crear nuevas comunas sin una intencion distinta y evidencia de demanda.
- Las fotos reales estan aplazadas por el usuario. No reemplazarlas por imagenes de stock o generadas que aparenten trabajos realizados por IVN.
- Los cambios recientes de snippets necesitan un periodo comparable antes de volver a reescribir titulos o contenido local. Priorizar datos de Search Console: impresiones, clics, CTR, consulta, URL y dispositivo.
- Los eventos de GA4 y los envios de Formspree no son ventas. Para evaluar resultados, separar contacto recibido, atendido, cotizado y trabajo cerrado.

## Principios editoriales y SEO

1. Conservar URL, canonical y enlaces existentes salvo evidencia clara para cambiarlos. Nunca hacer redirecciones masivas por estetica.
2. Escribir contenido local util y verificable: tipo de inmueble, coordinacion, preparacion del recinto y alcance real del servicio. No inventar plagas frecuentes, precios, testimonios, certificaciones, casos, tiempos de respuesta ni sucursales.
3. Usar titulos unicos, claros y concisos. Optimizar solo las paginas con oportunidad respaldada por datos; Google puede reescribir snippets.
4. Mantener un H1 por pagina, meta description, canonical, Open Graph y datos estructurados validos. La FAQ visible es la fuente del marcado FAQPage.
5. No prometer resultados absolutos, disponibilidad inmediata, tratamiento seguro para toda situacion ni cumplimiento normativo sin respaldo del usuario.
6. No exponer datos de clientes, solicitudes, telefonos, correos ni contenido de Formspree en archivos publicos, commits o respuestas.

## Diseno y accesibilidad

- Respetar el sistema visual existente: verde IVN, fondo claro, tipografia del sistema, interfaces directas y formularios faciles de usar.
- No convertir el sitio operativo en una landing de marketing recargada. No agregar decoracion sin funcion.
- Mantener foco visible, navegacion por teclado, enlace para saltar al contenido, respeto por `prefers-reduced-motion` y textos legibles en movil.
- En movil, los campos de telefono usan `type=tel` y los inputs no deben bajar de 16px.
- Antes de publicar un cambio visual, revisar al menos portada y la plantilla afectada a 320, 768 y 1280 px sin desbordamiento horizontal.

## Seguridad y medicion

- Conservar CSP, `referrer` meta, `security.txt`, `robots.txt` y los destinos HTTPS actuales salvo un motivo probado para cambiarlos.
- La analitica no recibe textos libres del formulario, correos, telefonos, query strings ni otros datos personales.
- `generate_lead` significa que Formspree acepto una solicitud; no confirma entrega de correo, atencion ni venta.

## Proceso obligatorio antes de publicar

1. Revisar `git status` y preservar cambios ajenos.
2. Ejecutar:
   ```powershell
   & 'C:\Users\fverg\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts/audit_site.py
   & 'C:\Users\fverg\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts/sync_faq_schema.py
   node --test tests/*.test.cjs
   node --check script.js
   ```
3. Comprobar el diff y no incluir artefactos temporales, datos privados ni cambios no relacionados.
4. Solo hacer `git add`, commit y `git push origin main` cuando el usuario solicite publicar o autorice ese flujo.
5. Tras el push, confirmar que GitHub Pages termino correctamente y contrastar los archivos modificados en `https://ivnservicios.cl/`.

## Informes y seguimiento

- Registrar auditorias o decisiones SEO en archivos fechados, sin datos personales. El informe de referencia actual es `auditoria-seo-2026-09-27.md`.
- Mantener `historial-indexacion-ivn.md` como registro de estados comprobados; no marcar una URL como indexada solo porque se solicito indexacion.
- Cuando se revisen Analytics, Search Console o Formspree, explicar limites, periodo y diferencia entre senales de interes y resultados comerciales.
