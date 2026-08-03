import { Reveal, RevealBlock, RevealList } from '@/components/ui/Reveal'
import { site } from '@/content/site'

/**
 * Alcance geografico. Reemplaza al iframe de Google Maps: mostrar una cuadra de
 * Monte Grande en la seccion que habla de alcance nacional e internacional dice
 * exactamente lo contrario de lo que se quiere decir.
 *
 * Revision 3: los arcos concentricos se reemplazaron por un mapa mundial de
 * puntos — Argentina en cobre, el resto del mundo en bone tenue, el estudio
 * marcado en Monte Grande. Los arcos leian como un adorno abstracto; el mapa
 * dice "el mapa es mas grande" literalmente. El SVG es estatico, generado por
 * script desde un GeoJSON real (celdas de 2 grados, proyeccion equirectangular)
 * y pesa ~95 KB; no suma nada al bundle de JS.
 *
 * La marca de posicion conserva la linea inclinada 12.7 grados: el angulo de la
 * italica del logo, el unico angulo diagonal del sitio.
 */

/** Posicion de Monte Grande en el viewBox del mapa, calculada por el script. */
const MARCA = { left: '31.87%', top: '83.71%' }

export function Alcance() {
  return (
    <section
      id="alcance"
      aria-labelledby="alcance-titulo"
      className="relative overflow-clip bg-espresso py-[var(--space-section-lg)]"
    >
      <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2
            id="alcance-titulo"
            className="eyebrow flex items-start gap-3 text-ash"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-copper"
            />
            {site.alcance.eyebrow}
          </h2>

          <Reveal as="p" className="mt-8 font-display text-d1 text-bone">
            {site.alcance.titulo}
          </Reveal>

          <Reveal as="p" className="measure mt-8 text-lead text-bone/70">
            {site.alcance.texto}
          </Reveal>

          <RevealList as="ul" className="mt-12">
            {site.alcance.anillos.map((a, i) => (
              <li
                key={a.label}
                className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
              >
                <span className="flex items-baseline gap-4">
                  <span className="eyebrow text-copper">{`0${i + 1}`}</span>
                  <span className="text-body text-bone">{a.label}</span>
                </span>
                <span className="text-util tracking-[0.02em] text-ash">
                  {a.detalle}
                </span>
              </li>
            ))}
          </RevealList>
        </div>

        {/* El mapa sangra un poco por la derecha: la grilla se rompe a
            proposito, igual que antes con los arcos. */}
        <RevealBlock
          className="relative lg:col-span-6 lg:col-start-7 lg:-mr-[6vw]"
          y={30}
        >
          <div
            role="img"
            aria-label="Mapa mundial de puntos con la Argentina destacada en cobre y el estudio marcado en Monte Grande."
            className="relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG estatico, no hay nada que optimizar */}
            <img
              src="/img/mapa-puntos.svg"
              alt=""
              className="h-auto w-full"
              loading="lazy"
            />

            {/* Marca del estudio: punto cobre con la linea a 12.7 grados. */}
            <span
              aria-hidden="true"
              className="absolute flex -translate-y-1/2 items-center gap-3"
              style={MARCA}
            >
              <span className="relative block h-2 w-2 -translate-x-1/2">
                <span className="absolute bottom-1 left-1/2 h-7 w-px origin-bottom rotate-[12.7deg] bg-copper" />
                <span className="absolute inset-0 rounded-full bg-copper shadow-[0_0_14px_3px_rgba(176,118,60,0.45)]" />
              </span>
              <span className="eyebrow whitespace-nowrap text-copper">
                Monte Grande
              </span>
            </span>
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}
