# Revisión ortográfica - 29 de septiembre de 2026

## Alcance

Se revisaron los textos HTML visibles, metadatos y datos estructurados de las rutas publicables de IVN Servicios.

## Correcciones aplicadas

- Tildes en textos de servicios, formularios, encabezados, metadescripciones y JSON-LD.
- Nombres de comunas: Conchalí, Ñuñoa, Peñalolén y Maipú.
- Vocabulario recurrente, incluyendo atención, cotización, sanitización, desratización, desinsectación, inspección, señales, aplicación, áreas y eliminación.
- Casos puntuales reportados: baños, desagües, electrodomésticos y títulos "Cómo se trabaja" / "Señales comunes".

## Criterios de seguridad

- Se conservaron URLs, slugs, canonicals, IDs, clases CSS, claves técnicas y eventos de analítica.
- La clave estándar `geo.region` se mantuvo sin tilde.
- No se modificaron datos de clientes ni se enviaron formularios.

## Verificación

- `scripts/audit_site.py`: 85 HTML y 83 URLs del sitemap, 0 errores.
- `scripts/sync_faq_schema.py`: 334 preguntas, 0 páginas fuera de sincronía.
- `node --test tests/*.test.cjs`: 13 pruebas aprobadas.
- `node --check script.js`: correcto.
