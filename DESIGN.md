# PLL Estudio Jurídico — Plan de diseño

Documento de dirección de arte. Se escribió antes que el código y el sitio se construyó contra
esto. Si algo del sitio contradice este documento, el que está mal es el sitio.

---

## 1. El concepto: trazo compartido

El monograma no es tres letras puestas al lado. Es tres letras **pisándose**.

Al abrir el PDF original de la tarjeta y separar los trazos, aparece el detalle que define todo:
dentro de la panza de la P hay un fragmento de cobre. No es un error de impresión, es la L recta
que pasa por debajo y se ve a través del contorno de la P. Las dos letras **comparten trazo**. Y
la L itálica nace desde abajo de la L recta, con el remate saliendo por la derecha.

Ese es el concepto del sitio: **nada empieza donde termina lo anterior**.

Traducción a arquitectura:

- Las secciones se solapan en lugar de apilarse. Los bloques entran por debajo del anterior, no
  después.
- Las tres áreas de práctica son tres planos `sticky` que se pisan al hacer scroll — la misma
  lógica del monograma, a escala de página. **Este es el elemento firma.**
- El corte entre planos no es horizontal. Es diagonal, en el ángulo del logo (abajo).

## 2. El ángulo: 12.7°

Medido, no elegido. El remate de la L itálica del archivo original va de `(-2.488, -14.048)` a
`(0.69, -0.001)` en unidades del PDF: `atan(3.178 / 14.047) = 12.75°` respecto de la vertical.

Es el ángulo de inclinación de la itálica del logo. Sigue siendo el único ángulo diagonal del
sitio, pero **el alcance se recortó fuerte en la revisión 2**.

Dónde vive hoy:

- inclinación de la marca de posición en el diagrama de Alcance
- inclinación de las iniciales en el retrato tipográfico del equipo

Dónde vivía y **ya no**: el borde de los planos apilados de Áreas y el corte entre el hero y el
manifiesto. En pantalla ese corte se leía como un recorte mal hecho, no como una decisión, y le
robaba atención a lo único que importa en esa sección, que es el apilado. Todos los bordes de
sección son rectos. El apilado ahora se marca con una hairline cobre de 1px, que hace el mismo
trabajo sin ruido.

Nunca 45°. Nunca 0°. Cuando hay diagonal, 12.7°. Token: `--angle-swash`.

## 3. Paleta

Del logo real. Los hex del PDF son `#3a140f` y `#a96d3e` (CMYK convertido); los tokens de marca
definidos para pantalla son levemente más saturados y se usan estos:

| Token | Hex | Uso | Proporción |
|---|---|---|---|
| `--color-espresso` | `#2E120C` | Fondo dominante | ~65% del alto de página |
| `--color-espresso-deep` | `#1B0A06` | Planos de fondo, footer, preloader | ~12% |
| `--color-bone` | `#EDE7DE` | Texto sobre espresso + 2 bloques de respiro | ~23% |
| `--color-copper` | `#B0763C` | Acento **único** | < 3% de superficie |
| `--color-copper-light` | `#D2A06A` | Hover, degradado de texto | puntual |
| `--color-ash` | `#A3948A` ⚠ | Secundario, metadatos | puntual |
| `--color-copper-deep` | `#8A5A2A` ⚠ | Cobre como **texto** sobre bone | puntual |

⚠ **Dos desvíos respecto de la tabla del brief, los dos por contraste medido.** El brief define
`--color-ash: #8A7B70` y lo destina a "texto secundario, captions, metadatos" — o sea, texto de
11–13px. Medido contra los fondos reales del sitio da **4.26:1 sobre espresso y 3.32:1 sobre
bone**, por debajo del 4.5:1 que exige WCAG AA para ese tamaño. Se aclaró al mínimo necesario
manteniendo el matiz: 5.93:1 sobre espresso. El mismo problema al revés con el cobre, que sobre
bone da 3.11:1: por eso existe `copper-deep`, que **solo se usa como texto en bloques claros** —
como línea o keyline sobre bone se sigue usando el cobre de marca, que al ser decorativo no tiene
requisito. La tabla del brief se respeta en todo lo demás; estos dos valores no se podían dejar
como estaban sin dejar texto ilegible en el sitio.

Regla operativa: **el cobre no rellena superficies**. Es línea, es una letra, es un subrayado, es
un punto. La única excepción en todo el sitio es el botón primario del hero — un rectángulo de
~250×56px. Todo lo demás que sea cobre es de 1px de espesor. Si el cobre se vuelve fondo, deja de
ser el punto de luz y pasa a ser "terracota de plantilla".

Corolario que costó una iteración: el CTA gigante de contacto arrancó con `hover:bg-copper`. En
pantalla es un plano cobre de 1300×290px — exactamente lo que esta regla prohíbe, disfrazado de
estado de hover. Se cambió por una keyline que se dibuja sobre el borde superior.

Los únicos dos bloques bone son **Manifiesto** y **El proceso**. Están puestos a propósito en el
tercio superior y el medio de la página, para que el scroll tenga respiración y para que la vuelta
al espresso se sienta. El resto es oscuro.

Derivados permitidos (no colores nuevos, opacidades de bone): `--line` (bone 12%) para hairlines,
`--line-strong` (bone 22%) para bordes activos.

## 4. Tipografía

Auto-hospedada con `next/font/local`. Cero requests a Google.

| Rol | Familia | Pesos | Detalle |
|---|---|---|---|
| Display | **Sentient** | 300, 300 italic, 400 | `letter-spacing: -0.03em`, `line-height: 0.9` en tamaños grandes |
| Cuerpo | **Switzer** | 400, 500 | `line-height: 1.6`, medida máx. 62ch |
| Utilitaria | **Switzer 500** | 500 | `uppercase`, `letter-spacing: 0.14em`, 11–13px |

Descarté Cabinet Grotesk. El brief lo daba como opción junto a "Switzer 500 tracked", y una tercera
familia para texto de 11px no se justifica: son 20 KB más para un rol que Switzer cubre. Tres
familias solo se pagan si cada una tiene un trabajo que las otras no pueden hacer.

La itálica de Sentient tiene un trabajo específico: **rima con la L itálica del logo**. Se usa
únicamente en los tres "diferenciales" (uno por área) y en el cierre del proceso. En ningún otro
lado.

Escala con `clamp()`, sin breakpoints tipográficos:

```
--text-hero:  clamp(2.75rem, 7.5vw, 7.5rem)
--text-d0:    clamp(2.5rem, 5.5vw, 6rem)
--text-d1:    clamp(1.875rem, 4vw, 3.75rem)
--text-d2:    clamp(1.5rem, 2.4vw, 2.25rem)
--text-d3:    clamp(1.125rem, 1.5vw, 1.4375rem)
--text-num:   clamp(2.75rem, 6vw, 5.5rem)
--text-body:  clamp(1rem, 1.05vw, 1.0625rem)
--text-util:  clamp(0.6875rem, 0.8vw, 0.8125rem)
```

`--text-d0` es el escalón que faltaba entre el titular del hero y los display de sección. Lo pidió el
manifiesto cuando su frase pasó a ser corta: a `d1` no llenaba la columna y quedaba un hueco, y a
`hero` gritaba igual que el titular de arriba. Es el único lugar donde se usa.

**Bajada un escalón completo en la revisión 2.** La primera versión llegaba a 12rem (192px) en el
titular y 6rem en los display: en un monitor de 1920 el hero ocupaba el viewport entero y el sitio
se leía como un afiche, no como un estudio jurídico. Los topes de ahora dan ~108px de titular a
1440px y no pasan de 120px por ancho que sea la pantalla. Los titulares siguen siendo grandes; lo
que se corrigió es que competían con el contenido en vez de introducirlo.

## 5. Layout

### Home

```
┌────────────────────────────────────────────────────────────────┐
│ ⬤ PLL          áreas   estudio   alcance   contacto   [WA →]   │  header, se contrae
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ESTUDIO JURÍDICO · MONTE GRANDE                    ╲          │  hero 100svh
│                                                      ╲   P     │  monograma sangrado:
│  Detrás de cada                                 ╲     L L      │  se corta por derecha
│  expediente hay                                  ╲             │  y por abajo, escala
│  una persona.                                     ╲            │  ~120vh. Parallax lento.
│  ──────                                            ╲           │
│  Más de 30 años en daños, laboral y deportivo.      ╲          │
│                                                      ╲         │
│  [Consultar por WhatsApp]   Ver áreas →                        │
│  ⌄                                          ╲ 12.7°            │
├────────────────────────────────────────╲───────────────────────┤  ← corte diagonal
│                                                                │
│   BLOQUE BONE. Manifiesto a dos columnas desiguales (7/4),     │
│   sin imagen. Display 300 en d0. La segunda columna arranca    │
│   24% más abajo y las dos se centran entre sí: con la frase    │
│   corta, el 38% de antes dejaba media sección vacía.           │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓ ÁREAS — 3 planos sticky que se pisan ▓▓▓▓▓▓▓▓▓▓▓▓  │  ← ELEMENTO FIRMA
│                                                                │
│   plano 01 ─────────────────────────────────╲                  │
│     (queda fijo)                             ╲                 │
│        plano 02 entra desde abajo y le tapa   ╲                │
│        el borde inferior a 12.7°               ╲               │
│           plano 03 entra y tapa al 02                          │
│           (deportivo: más aire, tipografía más grande)         │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  BLOQUE BONE. EL PROCESO — scroll horizontal de 4 pasos        │
│  01 ── 02 ── 03 ── 04   pin + scrub. Numeración en Sentient    │
│  a 8rem, texto chico al lado. Línea de progreso cobre.         │
├────────────────────────────────────────────────────────────────┤
│  ALCANCE                          ▒▒ mapa mundial de puntos    │  grilla rota: texto 6
│  Trabajamos en toda la PBA...     ▒▒ Argentina en cobre,       │  cols izq, mapa
│                                   ▒▒ marca en Monte Grande     │  desbordando por der.
│                                      (rev. 3: antes arcos)     │
├────────────────────────────────────────────────────────────────┤
│  EL ESTUDIO                                                    │
│   Dr. Diego Fernando Pérez ─────────────────────  30+  años    │  números a distinta
│   Dr. Agustín Llamera ──────────────────  5  abogados          │  altura, no en fila
│   El equipo ─────────────  2  colaboradores                    │
├────────────────────────────────────────────────────────────────┤
│  PREGUNTAS   ¿Tengo un reclamo?                            +   │  acordeón, hairlines,
│  FRECUENTES  ¿Cuánto puede demorar?                        +   │  sin cajas, sin sombras
│              ...                                               │
├────────────────────────────────────────────────────────────────┤
│  Contanos qué te pasó.                                         │  espresso-deep
│  [ CONSULTAR POR WHATSAPP ]  ← botón a ancho casi completo     │
│  11 3678-5201 · (011) 4290-6416 · Dardo Rocha 123              │
├────────────────────────────────────────────────────────────────┤
│  P L L      IG  FB  IN            © 2026 · Matrícula federal   │
└────────────────────────────────────────────────────────────────┘
```

### Rupturas de grilla deliberadas

1. **Hero** — el monograma se sangra fuera del viewport por derecha y por abajo. No entra entero
   a propósito.
2. **Manifiesto** — dos columnas 7/5 con la segunda desplazada 40% hacia abajo.
3. **Alcance** — el diagrama desborda el contenedor por la derecha y se corta con el viewport.
4. **El estudio** — columnas 4/7 con un hueco de una columna entera entre la imagen y las fichas.
5. **Áreas** — el número de área vive fuera de la caja de texto, sangrado a la izquierda del
   contenedor.

En la revisión 2 se sacó una sexta que estaba de más: los tres números del estudio arrancaron a
tres alturas distintas y, sumados a los dos socios también desfasados, el bloque no leía como
asimetría sino como desorden. La asimetría del estudio ahora está en el ancho de las columnas, que
es donde no se confunde con un error de maquetado.

### Páginas de área (`/areas/[slug]`)

Misma lógica, un plano solo: título oversized, bajada, cuerpo, diferencial en itálica, y la
navegación al área siguiente ocupando el 100% del ancho al pie. Sirven para SEO de cola larga
("abogado laboral zona sur", "derecho deportivo Argentina").

## 6. Movimiento

Todo bajo `gsap.matchMedia()` con rama `(prefers-reduced-motion: reduce)` que deja el sitio
estático y legible.

| Momento | Qué hace |
|---|---|
| Carga | Overlay espresso-deep. El monograma se dibuja con `stroke-dasharray` (~1.1s), el overlay sube revelando el hero. Una vez por sesión (`sessionStorage`). |
| Hero | Tres velocidades reales: fondo `y: 0→12%`, monograma `y: 0→-22%`, titular `y: 0→6%`. `scrub: 1`. |
| Texto | Revelado por líneas: `overflow:hidden` + `translateY(105%)`, stagger `0.06`. Nunca letra por letra. |
| Imágenes | `clip-path: inset(0 0 100% 0)` → `inset(0)` + `scale(1.08 → 1)` interno. Nunca fade solo. |
| Áreas | Planos `sticky` + `clip-path` con la diagonal de 12.7° que se abre con `scrub`. |
| Proceso | `pin` + scroll horizontal con `scrub`. Línea de progreso cobre. |
| Números | Contador al entrar en viewport, una vez, sin loop. |
| Cursor | Punto cobre de 8px, crece a 56px y muestra etiqueta sobre elementos interactivos. Solo `(pointer: fine)`. |
| Botones | Magnéticos, desplazamiento máx. 8px, solo los dos CTA principales. |
| Rutas | View Transitions API entre home y páginas de área. |

Lo que **no** hay: nada que se mueva en loop, ningún carrusel automático, ningún parallax de
`background-attachment`, ninguna entrada por rotación o escala grande, ningún easing rebotante.

## 7. Autocrítica — qué cambié respecto del default

Lo que hubiera salido "solo", y por qué no está:

1. **Fondo crema + serif de alto contraste + acento terracota.** Es el combo exacto que produce
   cualquier generador para un estudio jurídico. Invertí la relación: la madera oscura de la
   tarjeta manda y el cobre es el único punto de luz. La tarjeta ya tiene un dorso espresso —
   la marca estaba pidiendo esto.
2. **Tres cards de áreas con ícono en círculo.** Reemplazadas por los planos apilados. Además de
   no parecer plantilla, resuelve un problema real: las tres áreas no tienen el mismo peso
   comercial, y el formato card las iguala. Apiladas, deportivo puede quedarse más tiempo en
   pantalla y con más aire.
3. **Sección "Nuestros valores" con tres íconos.** Eliminada. Lo que diría está en el manifiesto,
   en una sola frase larga, que es como habla el cliente.
4. **Barra de 4 estadísticas.** Los únicos números verdaderos son 30+ años, 5 abogados y 2
   colaboradores. No hay "casos ganados" ni "% de éxito" — además de inventado, la ley de ética
   profesional lo prohíbe. Los tres números que sí existen están desalineados entre sí para que
   no lean como barra de stats.
5. **Mapa de Google embebido.** Reemplazado por un diagrama de arcos concéntricos desde Monte
   Grande. Un `iframe` de Google Maps en una sección de "alcance nacional e internacional" es
   contradictorio: muestra una cuadra cuando el mensaje es un país.
6. **Balanza / martillo / columnas / estantería de libros.** Cero. La única forma del sitio es el
   monograma.
7. **Formulario de contacto.** El cliente pidió WhatsApp directo. Un formulario acá agrega
   fricción y una expectativa de respuesta por mail que el estudio no maneja.
8. **Timeline vertical con puntitos para el proceso.** Es una secuencia real de 4 pasos, así que
   la numeración se justifica — pero en horizontal con pin, no en la vertical de siempre.

## 8. Imágenes

Las cinco imágenes del sitio (`public/img/`) están generadas con IA y son **atmosféricas, no
documentales**. Ninguna afirma ser un lugar del estudio ni un caso concreto:

| Archivo | Dónde | Qué es |
|---|---|---|
| `hero.jpg` | Fondo del hero, a sangre | Sala revestida en madera, casi toda en sombra |
| `estudio.jpg` | Bloque El estudio, encuadrada | Escritorio de madera con una lámpara, en penumbra |
| `area-danos.jpg` | Fondo del plano 01 + su página | Calle mojada de noche vista desde un auto |
| `area-laboral.jpg` | Fondo del plano 02 + su página | Nave industrial vacía al final del día |
| `area-deportivo.jpg` | Fondo del plano 03 + su página | Túnel de vestuarios hacia una cancha vacía |

**Van a sangre, no encajonadas.** La primera versión las puso en una caja al costado del texto y
se veían pegadas encima, como stock. Como fondo del plano entero, la sección *es* la imagen y el
texto vive adentro.

Eso obliga a que la legibilidad esté garantizada, no supuesta. Cada fondo lleva dos capas encima:
un velo espresso parejo y un degradado horizontal que deja la mitad izquierda —donde va todo el
texto— prácticamente en espresso sólido. Medido sobre los píxeles reales del render, escondiendo
el texto para muestrear el fondo puro, el punto más claro de cada zona de texto da:

| | bone | bone/70 | ash |
|---|---|---|---|
| Plano 01 | 13.0:1 | 6.8:1 | 5.5:1 |
| Plano 02 | 14.0:1 | 7.4:1 | 5.9:1 |
| Plano 03 | 13.7:1 | 7.2:1 | 5.7:1 |
| Hero | 14.0:1 | 7.4:1 | 5.9:1 |

Todo por encima del 4.5:1 de AA. Si se cambia una imagen, hay que volver a medir: una foto más
clara puede tirar abajo el ash sin que se note a ojo.

Reglas que cumplen todas: sin personas ni caras, sin gente en traje, sin balanza, sin martillo,
sin columnas, sin estantería de libros de derecho, sin texto ni logos legibles. Paleta forzada a
espresso / cobre / bone, con lo que entran en el sitio sin parecer stock pegado encima.

**Lo que deliberadamente NO se generó: los retratos del equipo.** El Dr. Pérez y el Dr. Llamera
son personas reales; una cara inventada publicada con su nombre falsifica su imagen. El componente
`<TeamPortrait>` está armado y espera la foto real: en cuanto exista, se carga la ruta en
`content/team.ts` y la sección cambia sola a la versión con retratos.

## 9. Lo que quedó fuera y por qué

- **Fotos reales del equipo y del estudio.** El cliente todavía no las mandó. Ver arriba.
- **Número de matrícula y colegio.** El cliente dejó esa pregunta sin responder en el documento.
  El footer dice "matrícula federal" porque eso sí está confirmado, pero no lleva número inventado.
- **Primera consulta sin cargo.** Confirmada por el cliente, pero pidió expresamente no publicarla
  por la ley de ética profesional. No aparece en ningún lado del sitio ni en el metadata.
- **Redes sociales.** Los íconos están maquetados y ocultos hasta que existan las URLs. Se activan
  poniendo el link en `content/site.ts`.
