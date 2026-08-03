import { Counter } from '@/components/ui/Counter'
import { Frame } from '@/components/ui/Frame'
import { Reveal, RevealBlock } from '@/components/ui/Reveal'
import { TeamPortrait } from '@/components/ui/TeamPortrait'
import { equipo, equipoResto } from '@/content/team'
import { site } from '@/content/site'

/**
 * El estudio.
 *
 * Version reescrita: la primera tenia a los dos socios a alturas distintas y a
 * "El equipo" colgando en una fila nueva, y quedaba un hueco enorme en el medio
 * derecho. Se leia como desorden, no como asimetria.
 *
 * Ahora: imagen a la izquierda y las tres fichas apiladas a la derecha,
 * arrancando todas a la misma altura y separadas por hairlines. La ruptura de
 * grilla queda en el ancho de las columnas (4 / 7), no en desfasajes verticales.
 * Las cifras van en una fila pareja al pie.
 */
export function Estudio() {
  // Mientras no haya fotos del equipo, el bloque se resuelve con la imagen de
  // ambiente y tipografia. En cuanto se cargue una ruta en content/team.ts,
  // aparecen los retratos, sin tocar esto.
  const hayFotos = equipo.some((m) => m.foto)

  const fichas = [
    ...equipo.map((m) => ({
      nombre: m.nombre,
      rol: m.titulo,
      detalle: m.detalle,
      miembro: m,
    })),
    {
      nombre: equipoResto.titulo,
      rol: null,
      detalle: equipoResto.detalle,
      miembro: null,
    },
  ]

  return (
    <section
      id="estudio"
      aria-labelledby="estudio-titulo"
      className="bg-espresso-deep py-[var(--space-section-lg)]"
    >
      <div className="shell">
        <h2
          id="estudio-titulo"
          className="eyebrow flex items-start gap-3 text-ash"
        >
          <span
            aria-hidden="true"
            className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-copper"
          />
          El estudio
        </h2>

        <Reveal
          as="p"
          className="measure mt-7 font-display text-d1 text-bone"
          stagger={0.07}
        >
          Un estudio con nombre y apellido.
        </Reveal>

        <div className="mt-16 grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* La keyline cobre corrida hace de marco desfasado: la foto deja
                de ser un rectangulo suelto sin sumar ninguna forma nueva —
                cobre de 1px, como manda la regla de la paleta. */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 border border-copper/35"
              />
              <Frame
                src={site.estudioImagen.src}
                alt={site.estudioImagen.alt}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="aspect-[4/5] w-full"
              />
            </div>
            <p className="mt-8 text-util tracking-[0.02em] text-ash">
              {site.direccion.calle} · {site.direccion.localidad}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {fichas.map((f) => (
              <article
                key={f.nombre}
                className="border-t border-line py-8 first:border-t-0 first:pt-0 last:border-b"
              >
                {hayFotos && f.miembro?.foto && (
                  <div className="mb-7 max-w-[16rem]">
                    <TeamPortrait miembro={f.miembro} />
                  </div>
                )}
                <Reveal as="h3" className="font-display text-d2 text-bone">
                  {f.nombre}
                </Reveal>
                {f.rol && <p className="eyebrow mt-3 text-copper">{f.rol}</p>}
                <Reveal
                  as="p"
                  className="measure mt-4 text-body text-bone/70"
                  stagger={0.05}
                >
                  {f.detalle}
                </Reveal>
              </article>
            ))}
          </div>
        </div>

        {/* Las tres cifras que el estudio puede sostener. Nada de "casos ganados"
            ni porcentajes de exito: ademas de inventado, la ley de etica
            profesional no lo permite. */}
        <ul className="mt-24 grid gap-x-12 gap-y-12 sm:grid-cols-3">
          {site.cifras.map((c) => (
            <RevealBlock as="li" key={c.etiqueta} y={20}>
              <hr className="hairline w-full" />
              <p className="mt-6 font-display text-num text-bone">
                <Counter value={c.valor} suffix={c.sufijo} />
              </p>
              <p className="eyebrow mt-3 text-ash">{c.etiqueta}</p>
            </RevealBlock>
          ))}
        </ul>
      </div>
    </section>
  )
}
