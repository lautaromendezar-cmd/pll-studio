import { Counter } from '@/components/ui/Counter'
import { Reveal, RevealBlock } from '@/components/ui/Reveal'
import { TeamPortrait } from '@/components/ui/TeamPortrait'
import { equipo, equipoResto } from '@/content/team'
import { site } from '@/content/site'

/** Alturas distintas para cada cifra: no es una barra de estadisticas. */
const DESFASE = ['lg:mt-0', 'lg:mt-20', 'lg:mt-10']

export function Estudio() {
  // Mientras no haya fotos, el bloque se resuelve tipograficamente. En cuanto
  // se cargue una ruta en content/team.ts aparecen los retratos, sin tocar esto.
  const hayFotos = equipo.some((m) => m.foto)

  return (
    <section
      id="estudio"
      aria-labelledby="estudio-titulo"
      className="bg-espresso-deep py-[var(--space-section-lg)]"
    >
      <div className="shell">
        <h2 id="estudio-titulo" className="eyebrow text-ash">
          El estudio
        </h2>

        <Reveal
          as="p"
          className="measure mt-9 font-display text-d1 text-bone"
          stagger={0.07}
        >
          Un equipo chico, con nombre y apellido.
        </Reveal>

        <div className="mt-20 grid gap-x-12 gap-y-16 lg:grid-cols-12">
          {equipo.map((m, i) => (
            <article
              key={m.nombre}
              className={
                i === 0
                  ? 'lg:col-span-5'
                  : 'lg:col-span-5 lg:col-start-8 lg:mt-28'
              }
            >
              {hayFotos && (
                <div className="mb-9 max-w-sm">
                  <TeamPortrait miembro={m} />
                </div>
              )}
              <RevealBlock y={14}>
                <hr className="hairline" />
              </RevealBlock>
              <Reveal as="h3" className="mt-7 font-display text-d2 text-bone">
                {m.nombre}
              </Reveal>
              <p className="eyebrow mt-4 text-copper">{m.titulo}</p>
              <Reveal
                as="p"
                className="measure mt-5 text-body text-bone/70"
                stagger={0.05}
              >
                {m.detalle}
              </Reveal>
            </article>
          ))}

          <article className="lg:col-span-4 lg:col-start-1">
            <RevealBlock y={14}>
              <hr className="hairline" />
            </RevealBlock>
            <h3 className="mt-7 font-display text-d3 text-bone/85">
              {equipoResto.titulo}
            </h3>
            <Reveal
              as="p"
              className="measure mt-4 text-body text-bone/60"
              stagger={0.05}
            >
              {equipoResto.detalle}
            </Reveal>
          </article>
        </div>

        {/* Las tres cifras que el estudio puede sostener. Nada de "casos ganados"
            ni porcentajes de exito: ademas de inventado, la ley de etica
            profesional no lo permite. */}
        <ul className="mt-32 grid gap-x-12 gap-y-14 sm:grid-cols-3">
          {site.cifras.map((c, i) => (
            <RevealBlock as="li" key={c.etiqueta} className={DESFASE[i]} y={20}>
              <hr className="hairline w-full" />
              <p className="mt-6 font-display text-num text-bone">
                <Counter value={c.valor} suffix={c.sufijo} />
              </p>
              <p className="eyebrow mt-4 text-ash">{c.etiqueta}</p>
            </RevealBlock>
          ))}
        </ul>
      </div>
    </section>
  )
}
