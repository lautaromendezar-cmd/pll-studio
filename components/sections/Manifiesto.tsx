import { Reveal, RevealBlock } from '@/components/ui/Reveal'
import { site } from '@/content/site'

/**
 * Primer bloque de respiro. Es el unico lugar del sitio donde el estudio habla
 * de si mismo, y se resuelve con una sola frase larga: sin imagen, sin iconos,
 * sin tres columnas de "valores".
 *
 * El borde superior sube en el angulo del logo. La subida es 7.21% del ancho
 * del contenedor — ver `swash-cut` en globals.css.
 */
export function Manifiesto() {
  return (
    <div className="swash-frame relative -mt-[7.5vw]">
      <section
        id="manifiesto"
        aria-labelledby="manifiesto-titulo"
        className="on-bone swash-cut relative pb-[var(--space-section-lg)] pt-[calc(var(--space-section)+7vw)]"
      >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <h2 id="manifiesto-titulo" className="eyebrow text-espresso/70">
              {site.manifiesto.eyebrow}
            </h2>

            <Reveal
              as="p"
              className="mt-9 max-w-[19ch] font-display text-d1 text-espresso"
              stagger={0.07}
            >
              {site.manifiesto.parrafos[0]}
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
