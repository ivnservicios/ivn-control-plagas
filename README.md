# IVN Servicios - Control de Plagas

Sitio web estatico para **IVN Servicios**, empresa de fumigacion y control de plagas en Santiago, Region Metropolitana y alrededores.

El sitio esta orientado a SEO local, generacion de contactos por WhatsApp, formulario de cotizacion con Formspree, medicion con GA4 y soporte para indexacion en Google Search Console.

## Estado actual

- Sitio publicado en `https://ivnservicios.cl/`.
- Dominio configurado en `CNAME`.
- Hosting mediante GitHub Pages.
- Sitemap enviado en Search Console: `https://ivnservicios.cl/sitemap.xml`.
- Sitemap actual con 24 URLs SEO publicables.
- Google Analytics 4 instalado con ID `G-GFX96N4X42`.
- Formulario principal conectado a Formspree.
- Google Business Profile existente y administrado por IVN Servicios.
- Perfil de negocio con fotos reales, resenas respondidas, areas de servicio y horario actualizado.

## Objetivo del sitio

1. Captar solicitudes de cotizacion por formulario y WhatsApp.
2. Posicionar paginas por comuna y por tipo de plaga.
3. Reforzar confianza con resenas, cobertura, servicios y contacto visible.
4. Facilitar que Google rastree e indexe todas las paginas importantes.

## Servicios destacados

- Desratizacion y control de ratones.
- Desinsectacion y control de cucarachas, hormigas, aranas, pulgas y moscas.
- Control de chinches.
- Sanitizacion y desinfeccion de espacios.
- Fumigacion y control preventivo.
- Atencion a hogares, empresas, condominios, restaurantes, locales, oficinas y bodegas.

## Paginas incluidas en sitemap

### Principal

- `index.html`

### Servicios base

- `desratizacion-santiago.html`
- `desinsectacion-santiago.html`
- `sanitizacion-santiago.html`
- `fumigacion-santiago.html`

### Paginas por plaga

- `control-de-ratones-santiago.html`
- `control-de-cucarachas-santiago.html`
- `control-de-chinches-santiago.html`
- `control-de-hormigas-santiago.html`
- `control-de-aranas-santiago.html`
- `control-de-pulgas-santiago.html`

### Paginas por comuna

- `control-de-plagas-maipu.html`
- `control-de-plagas-providencia.html`
- `control-de-plagas-las-condes.html`
- `control-de-plagas-santiago-centro.html`
- `control-de-plagas-nunoa.html`
- `control-de-plagas-la-florida.html`
- `control-de-plagas-puente-alto.html`
- `control-de-plagas-san-miguel.html`
- `control-de-plagas-macul.html`
- `control-de-plagas-recoleta.html`
- `control-de-plagas-independencia.html`
- `control-de-plagas-quilicura.html`
- `control-de-plagas-vitacura.html`

## Paginas auxiliares

- `gracias.html`: pagina posterior al envio correcto del formulario.
- `404.html`: pagina de error personalizada.

Estas paginas no se consideran landing SEO principales.

## Mejoras SEO implementadas

- Paginas locales por comuna.
- Paginas por tipo de plaga.
- Contenido unico reforzado en comunas importantes.
- Enlaces internos entre comunas y servicios por plaga.
- Sitemap XML actualizado y enviado en Search Console.
- Metadatos SEO por pagina.
- Open Graph para compartir mejor el sitio.
- Bloques de preguntas frecuentes y contenido orientado a busquedas locales.
- Se descarto por ahora crear `zonas-de-cobertura.html`; no existe en produccion.

## Conversiones y medicion

### GA4

El sitio carga GA4 desde `script.js` usando `G-GFX96N4X42`.

Eventos medidos:

- `click_whatsapp`
- `click_email`
- `click_whatsapp_form_helper`
- `form_validation_error`
- `generate_lead`
- `form_submit_error`

### Formulario

El formulario principal:

- Esta en la seccion `#contacto`.
- Envia a Formspree.
- Redirige a `gracias.html` si el envio fue correcto.
- Agrega campos ocultos para contexto del lead:
  - `page_title`
  - `page_path`
  - `page_url`
  - `page_h1`
  - `referrer`
  - `lead_source`

## Cambios recientes de diseno

- Mejorado el bloque superior de contacto directo.
- Mejorado el formulario de cotizacion con iconos, mejor jerarquia visual y estados de validacion.
- Reemplazado el texto repetido de WhatsApp/email/cobertura por una guia para completar mejor la cotizacion.
- Ajustes responsive para evitar desbordes en movil.

## Search Console

Sitemap activo:

```text
https://ivnservicios.cl/sitemap.xml
```

Al 24 de mayo de 2026, Search Console mostraba el sitemap como correcto y con 24 paginas descubiertas.

Paginas confirmadas como indexadas durante el trabajo:

- `https://ivnservicios.cl/`
- `https://ivnservicios.cl/desratizacion-santiago.html`
- `https://ivnservicios.cl/desinsectacion-santiago.html`
- `https://ivnservicios.cl/sanitizacion-santiago.html`
- `https://ivnservicios.cl/control-de-plagas-maipu.html`
- `https://ivnservicios.cl/control-de-plagas-providencia.html`
- `https://ivnservicios.cl/control-de-plagas-las-condes.html`
- `https://ivnservicios.cl/control-de-plagas-puente-alto.html`

Las demas paginas deben revisarse desde Search Console, en "Indexacion > Paginas" o usando "Inspeccion de URL".

## Google Business Profile

Perfil existente:

- Nombre: IVN Servicios
- Categoria: Empresa de fumigacion y control de plagas
- Telefono: `+56 9 5882 9194`
- WhatsApp: `https://wa.me/56958829194`
- Sitio web: `https://ivnservicios.cl/`
- Instagram: `https://www.instagram.com/fumigaciones.ivn/`
- Cobertura: Region Metropolitana y comunas agregadas en el perfil.

Acciones ya realizadas:

- Se confirmo que habia un perfil existente.
- Se evito continuar con un perfil duplicado.
- Se agregaron comunas/areas de servicio.
- Se subieron fotos reales.
- Se respondieron resenas.
- Se ajusto el horario de atencion.

## Desarrollo local

Desde la raiz del proyecto:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Luego abrir:

```text
http://127.0.0.1:8080/
```

## Publicacion

Flujo recomendado:

1. Crear una rama `codex/...`.
2. Probar localmente en `http://127.0.0.1:8080/`.
3. Revisar que no haya errores de consola ni desbordes en movil.
4. Hacer commit.
5. Fusionar a `main`.
6. Ejecutar `git push origin main`.
7. Verificar produccion en `https://ivnservicios.cl/`.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Formspree
- Google Analytics 4
- Google Search Console
- GitHub Pages

## Checklist antes de publicar cambios

- Revisar pagina local.
- Confirmar formulario y CTA de WhatsApp.
- Confirmar que `sitemap.xml` incluya solo URLs SEO publicables.
- Confirmar que los enlaces internos no apunten a paginas inexistentes.
- Revisar mobile.
- Despues del push, verificar produccion.

## Pendientes recomendados

- Seguir monitoreando indexacion de las 24 URLs en Search Console.
- Solicitar indexacion manual para paginas importantes no indexadas.
- Mantener Google Business Profile activo con fotos, publicaciones y respuestas a resenas.
- Agregar mas contenido unico si nuevas comunas empiezan a competir.
- Crear nuevas paginas solo cuando haya una intencion SEO clara.
