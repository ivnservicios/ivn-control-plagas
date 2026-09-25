# Auditoría integral y plan de crecimiento — IVN Servicios

Fecha: 25 de septiembre de 2026.
Sitio: https://ivnservicios.cl/

## 1. Diagnóstico ejecutivo

IVN tiene una base técnica apta para crecer: HTML estático rastreable, dominio HTTPS, páginas de servicios, sitemap, enlaces internos, formularios y contacto por WhatsApp. No necesita cambiar de framework ni rehacer el sitio. El principal margen de mejora está en la calidad y diferenciación del contenido, la coherencia de los datos estructurados, la fiabilidad de los formularios y la medición comercial.

La estrategia recomendada es consolidar las URLs existentes y convertir mejor sus visitas antes de multiplicar páginas por comuna. No se ha demostrado una penalización ni una caída de posiciones: no se dispone de datos actuales de Search Console, GA4 o ventas.

Las fotografías reales de limpieza de oficinas quedan pendientes de que el usuario las entregue. No se recomienda sustituirlas con imágenes que aparenten trabajos de IVN que no se han realizado.

## 2. Alcance y método

- Revisión automatizada de los 83 HTML del repositorio, CSS, JavaScript, robots, sitemap y documentación.
- Rastreo HTTP de las 81 URLs SEO del sitemap publicado. Todas devolvieron 200 y canonical coincidente con su URL.
- Comprobación del sitemap y robots publicados, HTTP/HTTPS, www y una URL inexistente.
- Análisis de enlaces y fragmentos locales, metadatos, encabezados, JSON-LD y semejanza de contenido.
- Navegador: ocho páginas representativas en 320, 390, 768 y 1280 px; 32 combinaciones. Inicio, oficinas, desratización, sanitización, control de plagas Maipú y Lo Prado, aguas servidas general y Lo Prado.
- Pruebas de navegación móvil, espacios en campos, selección de frecuencia, email inválido y doble clic de envío.
- Las peticiones externas de las pruebas de navegador se interceptaron: no se enviaron cotizaciones ni eventos reales. Esto permite revisar comportamiento y maquetación, pero no medir velocidad real ni verificar iconos externos. Las capturas de prueba pueden mostrar espacios de iconos vacíos por esa interceptación.
- Se conservaron los cambios SEO locales pendientes de publicación. La auditoría no implementa ni publica el plan.

**Límites:** no se verificó la indexación actual en Search Console, ni posiciones, backlinks, tráfico, tasa comercial, configuración privada de Formspree o perfil de Google Business. No se ejecutó Lighthouse ni se obtuvieron datos de campo de Core Web Vitals. No se asigna una puntuación SEO inventada.

## 3. Inventario y estado técnico

| Elemento | Resultado |
|---|---|
| HTML locales | 83 |
| URLs del sitemap publicado | 81 |
| Páginas SEO HTTP 200 | 81 de 81 |
| Inicio | 1 |
| Servicios base tradicionales | 4 |
| Páginas por tipo de plaga | 6 |
| Control de plagas por comuna | 34 |
| Aguas servidas | 35: general y 34 comunas |
| Limpieza de oficinas | 1 |
| Páginas auxiliares | Gracias y 404, ambas con noindex |
| H1 | Uno por HTML revisado |
| Title, description y canonical | Presentes en todos los HTML |
| Títulos/descripciones exactamente duplicados | Ninguno |
| Rutas internas o fragmentos rotos | Ninguno en el análisis local |
| Páginas SEO huérfanas | Ninguna según enlaces locales |
| JSON-LD | Analizable como JSON; no equivale a validar resultados enriquecidos de Google |
| Imágenes sin atributo alt | Ninguna |
| Páginas con alguna imagen sin width/height | 80 |

HTTP y www terminan en la versión HTTPS sin www. `/index.html` responde 200 y declara como canonical `/`; no es un bloqueo, pero conviene que los nuevos enlaces al inicio usen una convención coherente. La URL inexistente de prueba devolvió 404 real, no una falsa página de éxito.

El rastreador inicial no interpretó el XML del sitemap por una limitación del parser HTML. Una segunda comprobación independiente confirmó HTTP 200 y 81 URLs: ese error de herramienta no es un defecto del sitio.

## 4. SEO técnico y datos estructurados

### Lo que debe conservarse

Las rutas actuales, contenido HTML accesible sin renderizado complejo, canonical por página, sitemap, robots abierto, etiquetas de idioma, jerarquía H1/H2/H3 y enlaces rastreables son una buena base. No hay fundamento para migrar tecnologías ni cambiar URLs por estética.

### FAQ: sincronizar contenido y marcado — prioridad alta

Hay FAQPage en 81 páginas. En 80 se detectó al menos una pregunta o respuesta que no aparece con el mismo texto en el contenido principal, incluso normalizando tildes y puntuación. Es una señal de revisión, no una declaración automática de 80 infracciones: algunas diferencias son paráfrasis.

Ejemplo: aguas servidas de Lo Prado declara en JSON-LD «Atienden limpieza por aguas servidas en Lo Prado?», mientras el bloque visible pregunta «¿Atienden edificios y comunidades?». Las respuestas también difieren. El inicio tiene diferencias similares. Limpieza de Oficinas sí conserva la correspondencia en la revisión actual.

Acción: usar la misma fuente para el texto visible y JSON-LD, o eliminar el marcado de FAQ donde no aporte valor mientras se mantienen las preguntas útiles para los visitantes. No hay necesidad de retirar todas las FAQ del contenido.

Google limita los resultados enriquecidos de FAQ a sitios gubernamentales y de salud reconocidos. Para IVN no conviene invertir en FAQ esperando ocupar más espacio en Google. [Google: cambios en FAQ](https://developers.google.com/search/blog/2023/08/howto-faq-changes), [coherencia de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

### Reseñas y reputación — prioridad alta

El inicio muestra 20 opiniones y 5,0 estrellas, escritas manualmente. Las referencias «Hace 3 meses» también son estáticas. No se cotejaron esos valores con Google Business en esta auditoría.

Además, los textos de algunas reseñas dentro del JSON-LD contienen frases que no aparecen en las tarjetas visibles. Por ejemplo, el reviewBody de Fernanda incluye «Buscaba control de plagas cerca de mi» y otras frases ausentes del extracto visible. Esto exige cotejar la fuente original; no se debe agregar lenguaje SEO a una reseña atribuida a un cliente.

Acción: verificar las reseñas originales, reproducirlas fielmente o identificar claramente sus extractos, reemplazar fechas relativas estáticas por fechas verificadas y mantener el contador actualizado. Valorar retirar Review/AggregateRating del LocalBusiness propio, conservando reseñas reales visibles: Google no concede estrellas de reseñas autorreferentes a LocalBusiness/Organization. No se afirma que exista una sanción. [Política de reseñas de Google](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful).

### Metadatos y entidad del negocio — prioridad media

23 HTML tienen títulos de más de 65 caracteres y 14 descripciones superan 170. Son criterios de revisión editorial, no límites oficiales ni errores automáticos; Google recorta según presentación y puede reescribir los fragmentos. Priorizar las páginas con impresiones y CTR bajo, preservando servicio y localidad al inicio.

El LocalBusiness vive en el inicio y muchas páginas repiten proveedores con pocos datos. Conviene mantener identificadores y datos de contacto coherentes, sin inventar direcciones, sucursales, licencias ni horarios. El tipo Service describe la oferta, pero no garantiza un resultado enriquecido propio.

Las últimas mejoras de oficinas están preparadas localmente: catálogo del inicio, enlace descriptivo, enlace desde sanitización, identificador común del servicio, Open Graph tipo website y lastmod. Falta publicarlas tras revisión. No añadir ofertas de precio ficticias para completar validadores.

## 5. Arquitectura, intención y crecimiento local

### Mucha cobertura, diferenciación desigual — prioridad alta

Hay 68 páginas por comuna. La medición exploratoria comparó conjuntos de secuencias de cinco palabras del contenido principal, excluyendo navegación y formulario/contacto. Las comparaciones conservan contenido común restante y nombres de comunas.

- Control de plagas: 16 de 561 pares superan un 70 % de similitud de Jaccard. Cerrillos/Lo Espejo llega aproximadamente a 74,5 %.
- Aguas servidas: 4 de 561 pares superan un 70 %. Cerro Navia/Lo Prado llega a 72,2 %.

Estos porcentajes no son métricas de Google, no miden plagio y no prueban canibalización ni una penalización. Identifican páginas para revisión humana. Variar calles, nombres de comuna y adjetivos aporta menos valor que mostrar necesidades, casos y condiciones reales de atención.

Acción por URL: combinar consultas e impresiones de Search Console con relevancia comercial y evidencia disponible; decidir si conservar, enriquecer o, solo con datos, consolidar. No aplicar noindex masivo ni borrar páginas indexadas por similitud. Toda consolidación requiere redirección permanente, actualización de enlaces y sitemap, y capacidad real del hosting para servirla.

Google advierte sobre páginas puerta y contenido escalado creado principalmente para captar búsquedas. El objetivo es que cada página resuelva una necesidad propia, no aumentar el contador de URLs. [Políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies).

### Posibles solapamientos que deben comprobarse

- Inicio y fumigación Santiago.
- Desratización y control de ratones.
- Desinsectación y páginas de insectos.
- Servicio general y sus variantes por comuna.

Asignar intención principal: el inicio presenta IVN y sus familias; la página de servicio explica contratación y alcance; la de plaga ayuda a reconocer el problema y actuar; la local aporta detalles útiles de atención. No unir páginas únicamente porque compartan palabras. Confirmar competencia entre URLs en Search Console.

### Limpieza de oficinas

Tiene una propuesta clara, tres frecuencias, alcances, materiales y formulario contextual. Debe crecer primero como página principal del servicio. Los enlaces desde inicio y sanitización tienen sentido; se evitarán enlaces forzados desde las 68 páginas locales.

Pendientes comerciales a confirmar antes de redactar: duración/alcance de visitas, coordinación en semanas adicionales, horarios, exclusiones, condiciones de acceso, reposición de consumibles y contratación. La relación 1/2/3 visitas semanales y 4/8/12 mensuales merece explicación operativa: algunos meses contienen más semanas. No se cambian condiciones sin validación de IVN.

## 6. Experiencia y conversión

### Inicio

Tiene contactos visibles y servicios rastreables, pero el H1 y la introducción se centran en plagas aunque IVN ya ofrece más servicios. Se recomienda mantener la relevancia ganada en plagas y añadir una presentación secundaria clara de limpieza para empresas; no reemplazar de golpe el posicionamiento central.

La página reúne reseñas, servicios y un directorio extenso de comunas. En móvil esto produce un recorrido largo. Reorganizar primero servicios y cotización, y presentar cobertura de forma más compacta conservando enlaces HTML rastreables y contenido útil. No esconder enlaces detrás de JavaScript sin necesidad.

La etiqueta «Disponible hoy» es fija y no consulta una agenda. Reemplazarla por una frase verificable, por ejemplo «Consulta disponibilidad», salvo que se implemente disponibilidad real.

### Formularios — prioridad alta

La recepción real del formulario de oficinas en producción fue confirmada por el usuario. Las pruebas locales verificaron espacios en nombre/comuna, rechazo de email inválido y selección de las tres frecuencias.

Se reprodujeron **dos solicitudes de red al hacer doble clic** en Enviar, utilizando una respuesta simulada y sin enviar datos reales. Falta un estado de envío que bloquee nuevos intentos mientras hay una petición pendiente.

Propuesta: botón «Enviando…», bloqueo de doble envío, recuperación del botón ante fallo, errores claros dentro del formulario y alternativa de contacto. No tratar la aceptación del proveedor como confirmación de entrega de email. Medir por separado solicitud aceptada, lead recibido y venta.

80 formularios usan novalidate y validación propia basada principalmente en campos no vacíos. Uniformar progresivamente tipos tel/email, autocomplete y validación accesible. Evitar restricciones de teléfono que rechacen formatos válidos.

En sanitización quedan textos que hablan de «plaga detectada». Revisar textos heredados por servicio para que formulario y promesa comercial coincidan.

### WhatsApp y contacto

Conservar el número actual. Añadir contexto de servicio a los mensajes genéricos cuando ayude a responder. La presencia y posición del botón flotante varían por pantalla; revisar que ningún CTA quede tapado. Un clic en WhatsApp no demuestra que el usuario haya enviado el mensaje.

## 7. Medición y confianza

GA4 carga desde script.js y registra contactos, errores y generate_lead. Los planes de oficinas tienen eventos propios. Son útiles, pero no se auditó la configuración del panel ni qué eventos cuentan como conversiones.

El código antiguo del asistente sendWA enviaría contact_place y contact_problem a GA4. **No existe un elemento con id sendWA en los HTML actuales**, por lo que no se comprobó que esta rama se ejecute. Se recomienda retirarla o impedir la transmisión de texto libre antes de reutilizarla. También revisar page_url, referrer y link_url para no enviar parámetros con datos personales. [Política de datos personales de Analytics](https://support.google.com/analytics/answer/6366371).

Plan de medición: servicio, plan, canal, página de entrada y etapa del contacto mediante valores controlados. Los datos personales deben quedarse en el canal de cotización, no en Analytics. Evitar sumar click_whatsapp y click_whatsapp_limpieza como si fueran dos leads: actualmente el mismo clic puede producir ambos eventos.

No se encontró una página dedicada de privacidad entre los HTML. Conviene explicar de forma accesible qué datos se solicitan, para qué, qué proveedores intervienen y cómo contactar a IVN. La definición legal de avisos y consentimiento requiere una revisión específica; este informe no determina obligaciones legales.

## 8. Móvil, accesibilidad y rendimiento

Las 32 combinaciones de páginas y anchuras revisadas no presentaron desbordamiento horizontal ni errores JavaScript. El menú móvil abrió en las ocho páginas. Esto no constituye una certificación completa de accesibilidad.

Se detectan oportunidades concretas:

- Texto blanco sobre el verde #16a34a: contraste calculado aproximado 3,30:1; insuficiente para texto normal según WCAG AA. En el botón Cotizar de la navegación general, el color #475569 sobre ese verde da aproximadamente 2,30:1. La página de oficinas ya usa un verde más oscuro en sus botones. Extender una solución coherente sin cambiar la identidad.
- El carrusel de reseñas avanza automáticamente cada cinco segundos. Se detiene temporalmente con hover/foco, pero falta un control explícito persistente y respetar movimiento reducido en su JavaScript.
- Generalizar focus-visible, añadir enlace para saltar al contenido y revisar que el encabezado fijo no tape destinos o foco.
- 80 páginas tienen alguna imagen sin dimensiones declaradas. Añadir width/height o una relación de aspecto estable donde corresponda. Esto es un riesgo de desplazamiento de contenido, no una medición de CLS fallido.

[W3C: contraste](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum), [W3C: pausar contenido en movimiento](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).

El sitio tiene ventajas: no hay framework de ejecución pesado, usa tipografía del sistema y recursos pequeños. El logo PNG pesa unos 101 KB y la imagen social unos 205 KB; esta última no debe contarse como carga visible de todas las páginas solo por estar en Open Graph. Valorar WebP/AVIF y SVG según el recurso, sin perder calidad.

Font Awesome depende de un CDN externo. Valorar iconos SVG locales para los pocos iconos utilizados y medir el beneficio. Medir PageSpeed/Core Web Vitals reales antes de priorizar más optimizaciones; no instalar una nueva arquitectura para perseguir una puntuación. [Google: experiencia de página](https://developers.google.com/search/docs/appearance/page-experience).

## 9. Mantenimiento y control de calidad

Los 83 HTML repiten encabezados, formularios, proveedores y bloques SEO. Esta duplicación explica diferencias como FAQ desincronizadas y textos heredados. Un generador ligero con datos comunes puede ser útil, conservando HTML estático y las rutas actuales; no hace falta migrar a React.

Incorporar comprobaciones automáticas de sitemap, enlaces, H1, canonical, JSON-LD y correspondencia FAQ, más pruebas de formulario y menú. Hacerlo antes de una refactorización general.

README e historial de indexación siguen indicando 80 URLs. El historial tiene fecha 13 de agosto y estados de indexación que no se verificaron ahora. Actualizar a 81 y fechar cada comprobación; nunca convertir estados históricos en afirmaciones actuales.

## 10. Plan priorizado de ejecución

Las duraciones son estimaciones de trabajo, no promesas de posicionamiento. Publicar por lotes pequeños y observar cada cambio.

| Orden | Trabajo | Esfuerzo orientativo | Criterio de aceptación |
|---|---|---|---|
| 1 | Publicar las mejoras SEO locales ya preparadas de oficinas tras revisión | 0,5 día | Producción coincide con lo revisado; sitemap y enlaces correctos |
| 2 | Bloquear doble envío y mejorar estados/errores de formulario | 0,5–1 día | Un doble clic genera una sola petición; recuperación ante error; envío real controlado |
| 3 | Cotejar reseñas y corregir o retirar marcado incoherente | 1–2 días, depende de fuente original | Ninguna frase añadida a citas; datos verificables; sin expectativa de estrellas propias |
| 4 | Sincronizar FAQ visibles y JSON-LD | 1–3 días | Comprobación automática de todas las preguntas y respuestas mantenidas |
| 5 | Revisar medición, eliminar código de riesgo y actualizar documentación | 1–2 días | Sin texto libre/personal en GA4; eventos diferenciados; inventario actual |
| 6 | Contraste, foco, movimiento reducido y pausa del carrusel | 1–2 días | Controles legibles, teclado utilizable y animación controlable |
| 7 | Medir rendimiento y corregir dimensiones/recursos prioritarios | 1–2 días | Comparación antes/después con metodología equivalente, sin regresiones |
| 8 | Matriz de consultas y URLs; priorizar 5–10 páginas con datos | 1–2 días con acceso a Search Console | Intención principal y decisión documentada por URL |
| 9 | Enriquecer servicios y primeras páginas locales prioritarias | 2–4 semanas por lotes | Contenido específico, verdadero y útil; consultas/CTR/leads monitorizados |
| 10 | Fotografías y casos reales | Pendiente del usuario | Fotos propias autorizadas, optimizadas y contextualizadas |

**Primeros 7 días:** fiabilidad, datos estructurados, reseñas y medición; desplegar mejoras de oficinas pendientes.

**Días 8–30:** mejoras de navegación/accesibilidad y primera revisión editorial, elegida con datos.

**Días 31–60:** enriquecer las páginas prioritarias, revisar Google Business y mantener coherencia de servicio/contacto. Incorporar fotos solo cuando se reciban.

**Días 61–90:** evaluar resultados, ajustar títulos con impresiones y CTR, profundizar temas con demanda. Crear URLs nuevas únicamente si resuelven una intención distinta y hay capacidad de aportar información propia.

## 11. Medición del crecimiento

Antes del primer lote, guardar una línea base de 28 días y una referencia de 90 días, considerando estacionalidad. Separar búsquedas de marca y sin marca, móvil/escritorio y familias de servicio.

| Indicador | Fuente | Uso |
|---|---|---|
| Estado y canonical elegido por Google | Search Console | Detectar exclusiones y duplicados reales |
| Impresiones, clics y CTR por consulta/URL | Search Console | Priorizar oportunidades y revisar títulos |
| Posición media con contexto de consulta | Search Console | Señal orientativa, no único objetivo |
| Solicitudes aceptadas y errores | GA4 y Formspree | Fiabilidad del formulario |
| Recepción, spam y leads válidos | Formspree y seguimiento comercial | Distinguir envío técnico de contacto útil |
| Clics de WhatsApp/correo por servicio | GA4 | Intención de contacto, no venta confirmada |
| Cotizaciones y trabajos cerrados | Registro comercial | Resultado del negocio |
| LCP, INP, CLS cuando haya datos | Search Console/CrUX y pruebas de laboratorio | Experiencia real y regresiones |

No establecer una meta porcentual de crecimiento sin línea base. El criterio principal será aumentar contactos útiles y trabajos contratados, no solamente páginas indexadas.

## 12. Reglas para proteger el SEO existente

- Mantener URLs que funcionan; no cambiar slugs ni canonical de forma masiva.
- No eliminar páginas locales, reseñas o bloques de cobertura sin evaluar sus datos y función.
- No crear 34 páginas de oficinas por cambiar nombres de comuna.
- No repetir palabras clave artificialmente ni comprar enlaces.
- No prometer seguridad, certificaciones, disponibilidad o resultados sin respaldo.
- Conservar el formulario, WhatsApp, analytics y sitemap funcionales durante cada lote.
- Mantener fotos de oficinas como pendiente explícito y no bloquear otras mejoras por ello.
- Registrar fecha, alcance y resultado de cada publicación; volver a probar las plantillas afectadas.

La primera inversión debe reforzar lo existente. La expansión editorial vendrá después, guiada por búsquedas reales y por la experiencia de IVN en terreno. [Google: contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
