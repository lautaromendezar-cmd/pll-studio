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

Es el ángulo de inclinación de la itálica del logo, y es **el único ángulo diagonal que se usa en
todo el sitio**:

- borde de los planos apilados de Áreas
- `clip-path` de entrada de las imágenes
- subrayado del CTA primario
- keyline que separa el hero del manifiesto
- inclinación de la marca de posición en el diagrama de Alcance

Nunca 45°. Nunca 0°. Siempre 12.7°. Token: `--angle-swash`.

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
--step-hero:  clamp(3.5rem, 11vw, 12rem)
--step-1:     clamp(2.5rem, 6.5vw, 6rem)
--step-2:     clamp(1.75rem, 3.4vw, 3rem)
--step-3:     clamp(1.25rem, 2vw, 1.75rem)
--step-body:  clamp(1rem, 1.05vw, 1.125rem)
--step-util:  clamp(0.6875rem, 0.8vw, 0.8125rem)
```

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
│   BLOQUE BONE. Manifiesto a dos columnas desiguales (7/5),     │
│   sin imagen. Display 300. La segunda columna arranca 40%      │
│   más abajo que la primera. Sin ilustración, sin ícono.        │
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
│  ALCANCE                          ╱  arcos concéntricos SVG    │  grilla rota: texto 5
│  Trabajamos en toda la PBA...    ╱   desde Monte Grande        │  cols izq, diagrama
│                                 ╱    (PBA / CABA / país /      │  desbordando por der.
│                                      internacional)            │
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
│  11 3935-6458 · (011) 4290-6416 · Dardo Rocha 123              │
├────────────────────────────────────────────────────────────────┤
│  P L L      IG  FB  IN            © 2026 · Matrícula federal   │
└────────────────────────────────────────────────────────────────┘
```

### Rupturas de grilla deliberadas (mínimo 3, hay 5)

1. **Hero** — el monograma se sangra fuera del viewport por derecha y por abajo. No entra entero
   a propósito.
2. **Manifiesto** — dos columnas 7/5 con la segunda desplazada 40% hacia abajo.
3. **Alcance** — el diagrama desborda el contenedor por la derecha y se corta con el viewport.
4. **El estudio** — los tres números están a tres alturas distintas, no alineados.
5. **Áreas** — el número de área vive fuera de la caja de texto, sangrado a la izquierda del
   contenedor.

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

## 8. Lo que quedó fuera y por qué

- **Fotos del equipo y del estudio.** El cliente todavía no las mandó. No hay stock de gente en
  traje ni retratos generados. El componente `<TeamPortrait>` está armado y espera la imagen: en
  cuanto exista, se agrega la ruta en `content/team.ts` y aparece. Mientras tanto, el bloque se
  resuelve con tipografía y con el monograma.
- **Número de matrícula y colegio.** El cliente dejó esa pregunta sin responder en el documento.
  El footer dice "matrícula federal" porque eso sí está confirmado, pero no lleva número inventado.
- **Primera consulta sin cargo.** Confirmada por el cliente, pero pidió expresamente no publicarla
  por la ley de ética profesional. No aparece en ningún lado del sitio ni en el metadata.
- **Redes sociales.** Los íconos están maquetados y ocultos hasta que existan las URLs. Se activan
  poniendo el link en `content/site.ts`.
