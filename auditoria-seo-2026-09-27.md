# Revision SEO, diseno y funcionamiento

Fecha: 27/9/2026. Fotografias fuera de alcance por solicitud del usuario.
Complementa la auditoria del 25/9; no repite sus hallazgos como si siguieran abiertos.

## Diagnostico

La prioridad ya no es incorporar URLs al indice. La exportacion de Search Console consultada el 27/9 contiene exactamente las 81 URLs del sitemap, con informe actualizado el 20/9. Indexacion no equivale a buenas posiciones ni a ventas. No se enviaron solicitudes nuevas.

La estructura estatica y los enlaces funcionan. El margen restante esta en claridad comercial, experiencia movil, correspondencia de datos del negocio y diferenciacion editorial respaldada por consultas reales. No se justifica migrar de plataforma, cambiar slugs ni ampliar indiscriminadamente las paginas por comuna.

## Hallazgos y cambios aplicados

1. **Horario inconsistente.** La portada declaraba 08:00-21:00 todos los dias. El usuario confirmo lunes a sabado 07:00-23:30 y domingo 10:00-23:30. Corregido en JSON-LD y mostrado en contacto, distinguiendo horario de atencion de visitas sujetas a coordinacion.
2. **Coordenadas no verificadas del negocio.** Se retiraron del LocalBusiness y de las etiquetas geograficas las coordenadas genericas del centro de Santiago. Se conserva areaServed; no se inventan coordenadas de oficina ni sucursales por comuna.
3. **Titulo de portada extenso.** Reducido a servicio, ubicacion y marca; descripcion mas directa. Se conservan H1, URL, canonical y los experimentos recientes de comunas sin volver a cambiarlos.
4. **Formulario movil.** Ochenta paginas usaban type=text para telefono. Ahora usan type=tel y autocomplete=tel; el nombre incorpora autocomplete=name. Oficinas ya lo tenia. Inputs y textarea heredan tipografia y los campos moviles tienen 16px, evitando texto diminuto. No se impuso una mascara restrictiva ni se cambio el destino de envio.
5. **Menu movil.** Su posicion fija de 58px no seguia la altura variable del encabezado. Ahora comienza al pie del header, limita altura y permite scroll. Escape devuelve el foco al boton; clic o foco fuera lo cierran. El nombre accesible cambia entre abrir/cerrar.
6. **Jerarquia tipografica.** H1/H2 tienen tamanos por breakpoint y ajuste de palabras largas, conservando estilos y paleta del sitio. No se rediseno la portada ni se retiraron enlaces de comunas.
7. **Carrusel.** El selector comunica cual resena esta activa con aria-current. Se conservan pausa, movimiento reducido y citas existentes.
8. **Control de regresiones.** Nuevo scripts/audit_site.py y cinco pruebas de navegacion. Historial actualizado: 81 casillas indexadas segun exportacion, cero pendientes en ese listado.

## Verificaciones realizadas

| Comprobacion | Resultado |
| --- | --- |
| HTML locales | 83 revisados |
| Sitemap | 81 URLs, sin duplicados |
| Enlaces internos y fragmentos | Sin destinos inexistentes detectados |
| Paginas SEO huerfanas | Ninguna |
| H1, title, description y canonical | Comprobaciones aprobadas |
| Titulos/descripciones identicos entre paginas SEO | Ninguno |
| JSON-LD | JSON analizable; no sustituye Rich Results Test |
| FAQ visibles y marcado | 326 preguntas, cero paginas desincronizadas |
| Dimensiones y alt de imagenes | Presentes |
| JavaScript | Sintaxis correcta; 13 pruebas unitarias aprobadas |
| Responsive | Inicio, Providencia, oficinas y aguas servidas Lo Prado a 320, 768 y 1280px: sin desbordamiento horizontal |
| Menu movil | Apertura bajo header y Escape/foco comprobados en navegador |
| Formulario vacio | Cuatro errores visibles y foco en nombre; no se envio una cotizacion |

Se revisaron capturas de portada movil/escritorio y formulario movil. Las comprobaciones no equivalen a una certificacion de accesibilidad ni a probar todos los dispositivos. No se envio una solicitud real, ni se verifico entrega de correo. No se midieron Lighthouse, INP o Core Web Vitals de campo; no se atribuye una mejora de velocidad sin medicion.

## Prioridades siguientes, sin fotografias

1. **Medir el lote publicado.** Comparar 28 dias posteriores con un periodo equivalente, separando marca/no marca, consultas, dispositivo y URL. Observar Puente Alto, Maipu, Providencia, La Florida, Quilicura y Santiago Centro. No atribuir cambios de posicion solo al titulo.
2. **Contenido local con evidencia.** Providencia repite ideas sobre oficinas, departamentos y coordinacion en varias secciones. En el siguiente lote editorial, consolidar repeticiones y agregar informacion operativa confirmada: preparacion del recinto, acceso a areas comunes, alcance de seguimiento y datos necesarios para cotizar. No inventar infestaciones tipicas, casos, certificaciones, precios ni sucursales.
3. **Titulos restantes.** Hay 17 titulos de mas de 65 caracteres. Es una senal editorial, no un error ni un limite obligatorio de Google. Priorizar los que tengan impresiones relevantes y CTR bajo; evitar cambios simultaneos en todas las URLs sin una linea base.
4. **Medicion comercial.** Registrar si cada consulta fue atendida, cotizada y contratada. Eventos GA4, mensajes almacenados y ventas son etapas diferentes. Revisar el posible falso positivo de Spam identificado en la revision interna, sin publicar datos personales.
5. **Rendimiento real.** Obtener PageSpeed/CrUX antes de modificar fuentes o sustituir Font Awesome. CSS de unos 28 KB y JS de unos 16 KB no demuestran por si solos rapidez o lentitud. La dependencia externa de iconos permanece.
6. **Mantenimiento.** Ejecutar auditoria, sincronizacion FAQ y pruebas antes de cada publicacion. Mantener horarios y contactos coherentes con el Perfil de Negocio. No hace falta crear nuevas comunas para resolver la indexacion actual.

## Fuentes y criterio

- [Google: titulos descriptivos y concisos](https://developers.google.com/search/docs/appearance/title-link).
- [Google: datos de empresa local, horarios y ubicacion](https://developers.google.com/search/docs/appearance/structured-data/local-business).
- Codigo local, listado exportado de Search Console y pruebas descritas arriba. No se hizo un nuevo estudio de competencia o backlinks ni se asigna una puntuacion SEO ficticia.
