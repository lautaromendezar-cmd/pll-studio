# PLL Estudio Jurídico

Sitio institucional del estudio. Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP.
Estático: sin base de datos, sin CMS, sin backend. Todo el contenido vive en `content/`.

La dirección de arte está documentada aparte, en [DESIGN.md](./DESIGN.md). Si vas a tocar
algo visual, leelo primero: explica de dónde sale cada decisión y qué no hay que hacer.

---

## Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros scripts:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build (para probar antes de deployar) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |

---

## Cambiar textos y datos sin tocar componentes

**Todo lo editable está en `content/`.** Si algo hay que cambiar y no está en uno de estos
cinco archivos, es un bug — avisá en vez de editar el componente.

| Archivo | Qué contiene |
|---|---|
| `content/site.ts` | Teléfonos, mail, dirección, horarios, redes, URL del sitio, copy del hero, del manifiesto, del alcance y del bloque de contacto, y las cifras del estudio |
| `content/areas.ts` | Las tres áreas: títulos, bajadas, cuerpo, materias, bloque destacado, y el `metaTitle` / `metaDescription` de cada página |
| `content/team.ts` | Integrantes del estudio y la ruta de sus fotos |
| `content/faq.ts` | Preguntas frecuentes (alimentan también el JSON-LD de `FAQPage`) |
| `content/proceso.ts` | Los cuatro pasos del proceso y la frase de cierre |

### Cosas concretas

**Cambiar un teléfono o el WhatsApp** → `content/site.ts`. El link de WhatsApp se arma solo a
partir de `WHATSAPP_NUMERO_INTL` (arriba de todo, formato internacional sin `+`) y del mensaje
prellenado. Cambiás el número ahí y se actualiza en el header, el hero, el botón flotante, el
bloque de contacto, el footer y las tres páginas de área.

**Activar las redes sociales** → en `content/site.ts`, poner la URL en el campo `href` de cada
red (hoy están en `null`). Los íconos aparecen solos: mientras `href` sea `null`, la red no se
renderiza. Sin URLs, no se muestra la fila.

**Poner el número de matrícula** → `site.legal.matriculaNumero`. Mientras sea `null`, el footer
dice solo "Matrícula federal". No inventar un número.

**Agregar las fotos del equipo** → poner los `.jpg` en `public/equipo/` y cargar la ruta en el
campo `foto` de `content/team.ts`, más un `fotoAlt` descriptivo. El componente `<TeamPortrait>`
ya está armado: en cuanto haya al menos una foto, la sección "El estudio" cambia sola a la
versión con retratos. Mientras no haya ninguna, se resuelve con tipografía.

**Agregar un área nueva** → agregar un objeto a `content/areas.ts`. Aparece sola en la home
(como cuarto plano apilado), en el footer, en el sitemap y como página propia en
`/areas/<slug>`. No hay que registrarla en ningún otro lado.

**Cambiar el dominio** → `site.url` en `content/site.ts`. De ahí salen el `metadataBase`, los
canonicals, el `sitemap.xml`, el `robots.txt` y todos los `@id` del JSON-LD.

---

## Estructura

```
app/
  layout.tsx              metadata global, JSON-LD del estudio, script anti-parpadeo
  page.tsx                home: arma las ocho secciones
  globals.css             TOKENS (color, tipografía, ángulo, ritmo) + base + utilidades
  fonts.ts                Sentient y Switzer auto-hospedadas con next/font/local
  fonts/                  los .woff2
  areas/[slug]/page.tsx   una página por área, generadas estáticamente
  not-found.tsx           404
  sitemap.ts robots.ts
  icon.tsx apple-icon.tsx opengraph-image.tsx   generados con next/og desde el monograma

components/
  ui/         Monogram, Reveal, MagneticButton, Counter, Frame, TeamPortrait
  layout/     Header, Footer, Cursor, ScrollProgress, SmoothScroll, Preloader, WhatsappFab
  sections/   Hero, Manifiesto, Areas, Proceso, Alcance, Estudio, Faq, Contacto

content/      los cinco archivos de arriba
lib/
  gsap.ts             registro central de plugins (nadie más llama a registerPlugin)
  lenis.ts            instancia única de smooth scroll
  intro.ts            coordina el fin de la carga con el arranque del hero
  keys.ts             constantes compartidas entre server y client
  monogram-paths.ts   el monograma vectorizado — GENERADO, no editar a mano
  og-mark.ts          arma el monograma como data URI para las imágenes de next/og
  jsonld.ts           LegalService + LocalBusiness, FAQPage, Service, BreadcrumbList

_material/    PDF de la tarjeta y cuestionario del cliente — NO versionado, ver abajo
```

`_material/` está en `.gitignore` a propósito: el repo es público y el cuestionario que respondió
el estudio incluye cosas que pidieron no publicar. Vive solo en la carpeta local del proyecto.

### El logo

`lib/monogram-paths.ts` sale de vectorizar el PDF original de la tarjeta
(`_material/Tarjetas2-REFERENCIA.pdf`). Las tres letras están en grupos separados y en el orden
de pintado correcto, porque en el original se pisan: dentro de la panza de la P hay un fragmento
de la L recta en cobre. **No aplanar el SVG ni reemplazarlo por un PNG**: ese trazo compartido es
el concepto del sitio.

De ahí salen también el favicon, el apple-touch-icon y la imagen de OpenGraph, así que nunca se
pueden desincronizar del logo del header.

---

## Deploy en Vercel

```bash
git init
git add .
git commit -m "Sitio PLL Estudio Jurídico"
git branch -M main
git remote add origin https://github.com/<usuario>/pll-estudio-juridico.git
git push -u origin main
```

En Vercel:

1. **Add New → Project → Import Git Repository** y elegir el repo.
2. Vercel detecta Next.js solo. **No hay que configurar nada**: ni build command, ni output
   directory, ni variables de entorno. El sitio no tiene backend.
3. **Deploy.**

Después del primer deploy:

4. **Settings → Domains** → agregar el dominio y apuntar el DNS donde esté registrado
   (`A` a `76.76.21.21` o `CNAME` a `cname.vercel-dns.com`, según lo que pida Vercel).
5. Cambiar `site.url` en `content/site.ts` por el dominio definitivo y volver a pushear. Esto es
   necesario: hasta que no esté, los canonicals, el sitemap y el JSON-LD apuntan al dominio
   provisorio.
6. Dar de alta el sitio en Google Search Console y mandar `https://<dominio>/sitemap.xml`.

Cada push a `main` redeploya.

---

## Decisiones que conviene conocer antes de tocar

- **`content/*` es la única fuente de verdad.** Ningún componente tiene texto hardcodeado.
- **Ningún hex suelto.** Todo el color sale de los tokens de `@theme` en `globals.css`.
- **Un solo ángulo diagonal: 12.7°**, medido del remate de la L itálica del logo. Está en el
  token `--angle-swash`. No agregar diagonales a 45°.
- **El cobre no rellena superficies.** Es línea, letra, subrayado o punto. La única excepción es
  el botón primario del hero.
- **Todo el movimiento pasa por `gsap.matchMedia()`** con rama de `prefers-reduced-motion`. Si
  agregás una animación, agregá la rama. Sin eso, el sitio se mueve para gente que pidió que no.
- **El cursor custom solo existe en punteros finos.** La clase `cursor-custom` la agrega el JS;
  si el bundle falla, el cursor del sistema queda intacto.
- **`no-motion` y anti-parpadeo:** un script inline en el `<head>` del layout marca `<html>` con
  `js`, `anim-off` e `intro-visto` antes del primer pintado. Si necesitás una constante ahí,
  ponela en `lib/keys.ts` — un módulo con `'use client'` no sirve, el servidor recibe una
  referencia opaca en lugar del string y rompe el parseo del script.

---

## Medido, no estimado

Lighthouse sobre el build de producción (`npm run build && npm run start`):

| | Perf | Access. | Best pract. | SEO |
|---|---|---|---|---|
| **Desktop** — home | 98–100 | 100 | 100 | 100 |
| **Desktop** — `/areas/*` | 100 | 100 | 100 | 100 |
| **Mobile** — home | 92 | 100 | 100 | 100 |
| **Mobile** — `/areas/*` | 93 | 100 | 100 | 100 |

Desktop: FCP 0,4 s · LCP 0,6 s · CLS 0 · TBT 0–100 ms.
Mobile (Moto G Power emulado, 4G lento, CPU ×4): FCP 0,9–1,7 s · LCP 3,0 s · CLS ≤0,03 · TBT
50–60 ms. El CLS y el TBT puntúan 1,0 igual: están holgadamente dentro del umbral bueno.

**Por qué mobile se queda en 92 y no en 95+:** el elemento de LCP es la primera línea del titular
del hero, y no se pinta hasta que la secuencia de carga la revela — 2,1 s de *element render
delay* contra 45 ms de *time to first byte*. Es el precio de tener secuencia de carga, no un
problema de peso: son 103 KB de JS compartido y 89 KB de tipografías, y todo lo demás puntúa
perfecto. Se verificó que pasa lo mismo en las páginas de área, que no tienen hero animado.

Si en algún momento se prioriza el número sobre la puesta en escena, se saca `<Preloader />` de
`app/layout.tsx`: el LCP pasa a ser el primer pintado real y mobile sube a ~99, sin tocar nada
más. Es una línea. La decisión es de dirección, no técnica.
