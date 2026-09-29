# Auditoria SEO IVN Servicios

Fecha: 29 de septiembre de 2026

## Alcance y limites

Auditoria local del repositorio estatico que publica `https://ivnservicios.cl/` mediante GitHub Pages. Se revisaron estructura, metadatos, sitemap, robots, datos estructurados, enlaces internos, FAQ y activos declarados.

No se realizaron pruebas de entrega de Formspree, solicitudes de formulario ni mediciones nuevas de rendimiento de campo. Esta auditoria no sustituye las herramientas de rendimiento ni los informes de Search Console.

## Arquitectura actual

| Grupo | Cantidad | Estado |
| --- | ---: | --- |
| HTML totales | 85 | Incluye paginas auxiliares y dos rutas con `index.html` |
| URLs SEO en sitemap | 83 | Publicables e indexables |
| Portada | 1 | `index.html` |
| Servicios base | 5 | Desratizacion, desinsectacion, sanitizacion, fumigacion y limpieza de oficinas |
| Servicios por plaga | 6 | Ratones, cucarachas, chinches, hormigas, arañas y pulgas |
| Hubs de servicio | 2 | `/control-de-plagas/` y `/control-de-termitas/` |
| Comunas de control de plagas | 34 | Conservan sus URLs existentes |
| Aguas servidas | 35 | Santiago y comunas publicadas |
| Auxiliares | 2 | `404.html` y `gracias.html`, fuera del sitemap |

El sitio usa HTML, CSS y JavaScript estaticos; Formspree recibe solicitudes y GA4 mide eventos sin enviar textos libres ni datos personales. Los recursos locales principales estan en `assets/`; `styles.css` y `script.js` son compartidos.

## SEO tecnico actual

- Cada URL del sitemap tiene title, meta description, canonical absoluto HTTPS, robots indexable y un H1.
- Los 83 canonicals corresponden a sus propias rutas. Las rutas de directorio resuelven a sus `index.html` locales y a URLs publicas con barra final.
- Los titulos y descripciones de las URLs indexables no presentan duplicados segun la auditoria local.
- Hay Open Graph, Twitter Cards y JSON-LD en las paginas de servicio y locales revisadas. El JSON-LD es analizable localmente; no sustituye una validacion externa de resultados enriquecidos.
- La FAQ visible y el marcado FAQPage coinciden: 334 preguntas revisadas, 0 paginas fuera de sincronizacion.
- Las imagenes declaradas tienen texto alternativo y dimensiones. No se incorporaron fotos nuevas; las fotos reales quedan fuera de este lote.
- Los enlaces internos, anclas y destinos locales fueron comprobados: 0 errores y sin URLs indexables huerfanas.

## Indexacion, sitemap y robots

- `sitemap.xml` contiene 83 URLs SEO publicables y no incluye `404.html`, `gracias.html` ni archivos tecnicos.
- `robots.txt` permite el rastreo publico e incluye el sitemap absoluto.
- `security.txt`, CSP mediante meta y politica `referrer` mediante meta estan presentes en el proyecto. Los encabezados HTTP de GitHub Pages deben revisarse por separado si se requiere una evaluacion de cabeceras del servidor.
- Segun el historial local, 81 URLs anteriores se confirmaron indexadas y las dos rutas nuevas de servicio tienen solicitud de indexacion enviada. Una solicitud no confirma indexacion ni posicionamiento.

## Contenido y enlazado

- La portada conserva su orientacion principal hacia control de plagas en Santiago y Region Metropolitana.
- Las paginas por comuna enlazan a servicios relacionados; los servicios enlazan a paginas locales cuando aporta contexto.
- El hub `/control-de-plagas/` concentra servicios por plaga sin sustituir las rutas existentes.
- El hub `/control-de-termitas/` incorpora una intencion de servicio adicional sin promesas de diagnostico o resultados absolutos.
- La revision ortografica local del 29 de septiembre corrige tildes en contenido visible, metadatos y JSON-LD; conserva URLs, slugs, IDs, clases y claves tecnicas.

## Accesibilidad y experiencia

- Se mantienen enlace para saltar al contenido, foco visible, menu navegable por teclado y respeto por movimiento reducido.
- Los campos de telefono usan `type=tel`; los campos moviles conservan un tamano de texto apto para evitar zoom involuntario.
- La auditoria automatica verifica estructura, imagenes, enlaces y fragmentos. Una revision visual por viewport sigue siendo necesaria antes de cambios de diseno o plantillas.

## Hallazgos que no se deben modificar a ciegas

1. No hay una pagina `nosotros.html`, `cobertura-santiago.html` ni `consejos.html`. Antes de crearlas, hay que comprobar la navegacion y el enlazado para evitar rutas aisladas o contenido que compita con los hubs actuales.
2. La cobertura ya se declara por comunas y en el Perfil de Google. Una pagina central puede ordenar esa informacion, pero no debe afirmar sucursales ni cobertura garantizada por comuna.
3. No se dispone en este repositorio de datos actuales de impresiones, CTR, consultas o conversiones por URL. No conviene reescribir mas titulos de forma masiva sin un periodo comparable de Search Console.
4. El historial de indexacion no prueba posicionamiento ni resultados comerciales. GA4 y Formspree miden etapas distintas de un contacto.
5. Rendimiento real, Core Web Vitals y cabeceras HTTP requieren herramientas externas y mediciones sobre produccion.

## Prioridad recomendada

1. Publicar primero la revision ortografica ya validada, en un commit independiente.
2. Crear una pagina de cobertura solo si se enlaza desde portada, footer y/o navegacion de manera compacta, conservando todos los enlaces actuales.
3. Crear `nosotros.html` con contenido comercial verificable y enlaces a servicios y cobertura.
4. Posponer el centro de consejos hasta definir tres articulos utiles respaldados por servicios reales y un plan de mantenimiento.
5. Antes de ajustar snippets o ampliar comunas, revisar Search Console por URL, consulta, dispositivo, impresiones, clics y CTR.

## Verificaciones ejecutadas

```text
scripts/audit_site.py
  85 HTML, 83 URLs del sitemap, 0 errores

scripts/sync_faq_schema.py
  334 preguntas, 0 paginas fuera de sincronizacion

node --test tests/*.test.cjs
  13 pruebas aprobadas

node --check script.js
  Correcto
```
