import { Monogram } from '@/components/ui/Monogram'
import { Reveal, RevealBlock } from '@/components/ui/Reveal'
import { site } from '@/content/site'

/**
 * Primer bloque de respiro. Es el unico lugar del sitio donde el estudio habla
 * de si mismo, y se resuelve con una sola frase larga: sin imagen, sin iconos,
 * sin tres columnas de "valores".
 *
 * El borde superior es recto. Antes subia en diagonal a 12.7 grados; se saco
 * porque en pantalla leia como un recorte mal hecho.
 *
 * Revision 3: la version pelada quedaba plana — una pagina de texto, no una
 * seccion. Se le devolvio profundidad con las herramientas que el sistema ya
 * permite: el monograma fantasma sangrado por la derecha (la unica forma del
 * sitio) y las tres palabras que importan de la frase pintadas en cobre.
 */

/** Pinta en cobre lo que en el contenido va entre asteriscos. */
function conDestacados(texto: string) {
  return texto.split(/\*([^*]+)\*/g).map((parte, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic text-copper-deep">
        {parte}
      </em>
    ) : (
      parte
    ),
  )
}

export function Manifiesto() {
  return (
    <div className="relative">
      <section
        id="manifiesto"
        aria-labelledby="manifiesto-titulo"
        className="on-bone relative overflow-clip pb-[var(--space-section-lg)] pt-[var(--space-section-lg)]"
      >
        {/* Marca de agua: el mismo gesto del hero, espejado — alla el monograma
            sangra en claro sobre oscuro, aca en oscuro sobre bone. El fragmento
            de la L recta asoma en cobre al 15%: es el trazo compartido del
            logo, no un sello. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[14vw] top-1/2 hidden w-[52vw] -translate-y-1/2 lg:block"
        >
          <Monogram tone="ghostOnBone" className="h-auto w-full" />
        </div>

        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <h2
              id="manifiesto-titulo"
              className="eyebrow flex items-start gap-3 text-espresso/70"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-copper"
              />
              {site.manifiesto.eyebrow}
            </h2>

            <Reveal
              as="p"
              className="mt-9 max-w-[19ch] font-display text-d1 text-espresso"
              stagger={0.07}
            >
              {conDestacados(site.manifiesto.parrafos[0])}
            </Reveal>
          </div>

          {/* Segunda columna desplazada hacia abajo: la grilla no es simetrica. */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-[38%]">
            <RevealBlock>
              <hr className="hairline w-16" />
            </RevealBlock>
            <Reveal as="p" className="mt-7 text-lead text-espresso/75">
              {site.manifiesto.parrafos[1]}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
