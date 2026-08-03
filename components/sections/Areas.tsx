'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { Reveal, RevealBlock, RevealList } from '@/components/ui/Reveal'
import { areas } from '@/content/areas'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * ELEMENTO FIRMA DEL SITIO.
 *
 * Las tres areas son tres planos `sticky` que se pisan al hacer scroll,
 * replicando la logica del monograma: la P y la primera L comparten trazo, y la
 * segunda L nace de la anterior. Ninguna letra esta al lado de la otra, se
 * superponen — y aca las secciones hacen lo mismo.
 *
 * Cada plano arranca un poco mas abajo que el anterior y tiene el borde
 * superior cortado en el angulo del logo (12.7 grados), con una hairline cobre
 * de 1px siguiendo ese contorno. El plano que queda debajo retrocede: baja de
 * escala y de opacidad. Eso es lo que le da profundidad al apilado.
 *
 * En pantallas chicas el `sticky` se apaga: apilar planos de 100svh en un
 * telefono deja el contenido inalcanzable.
 */
export function Areas() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const planos = gsap.utils.toArray<HTMLElement>('[data-plano]', el)
        const triggers = planos.slice(0, -1).map((plano, i) => {
          const contenido = plano.querySelector('[data-plano-contenido]')
          const siguiente = planos[i + 1]
          // Termina en `top 55%`: el plano de abajo tiene que estar apagado
          // *antes* de que el borde del siguiente le pase por encima del texto.
          // Si no, el recorte parece un bug de layout en vez de profundidad.
          return gsap.to(contenido, {
            scale: 0.94,
            opacity: 0.18,
            ease: 'none',
            scrollTrigger: {
              trigger: siguiente,
              start: 'top bottom',
              end: 'top 55%',
              scrub: 0.6,
            },
          })
        })

        return () => {
          for (const t of triggers) {
            t.scrollTrigger?.kill()
            t.kill()
          }
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="areas" aria-labelledby="areas-titulo" className="relative bg-espresso">
      <div className="shell pb-[clamp(3rem,7vh,6rem)] pt-[var(--space-section)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="areas-titulo" className="eyebrow text-ash">
            Áreas de trabajo
          </h2>
          <Reveal
            as="p"
            className="measure-tight font-display text-d3 text-bone/70 sm:text-right"
          >
            Tres áreas. La misma forma de trabajar en las tres.
          </Reveal>
        </div>
      </div>

      <div ref={root}>
        {areas.map((area, i) => (
          <article
            key={area.slug}
            data-plano
            // El desfase va en el <article>, que es border-box: asi el plano
            // arranca mas abajo de verdad y queda una banda del de atras a la
            // vista. Puesto como padding del plano, el fondo tapaba la banda.
            style={{
              zIndex: i + 1,
              paddingTop: `calc(${i} * clamp(1.25rem, 2.6vw, 3rem))`,
            }}
            className="relative lg:sticky lg:top-0 lg:h-svh"
          >
            {/* La hairline cobre es el plano de atras asomando 1px por el borde
                superior recortado. No existe `border` que siga una diagonal, asi
                que se resuelve apilando dos recortes identicos. */}
            <div className="swash-frame h-full">
              <div className="swash-cut h-full bg-copper/40">
                <div className="swash-cut h-full translate-y-px bg-espresso">
                  {/* El fondo del plano NO se anima: si se le baja la opacidad
                      al contenedor que lo pinta, el plano se vuelve traslucido
                      y se ve el de mas atras. Solo retrocede el contenido. */}
                  <div
                    data-plano-contenido
                    className="h-full origin-top will-change-transform"
                  >
                    <PlanoContenido area={area} indice={i} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PlanoContenido({
  area,
  indice,
}: {
  area: (typeof areas)[number]
  indice: number
}) {
  // El derecho deportivo es el diferencial del estudio: se le da mas aire y el
  // parrafo del posgrado, que en las otras dos areas no va.
  const esDestacada = area.slug === 'deportivo'

  return (
    <div
      className={`shell flex h-full flex-col justify-center pb-[var(--space-section)] ${
        esDestacada
          ? 'pt-[calc(var(--space-section)+5vw)]'
          : 'pt-[calc(var(--space-section)+3vw)]'
      }`}
    >
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        {/* El numero vive en la banda izquierda, fuera de la caja de texto. */}
        <RevealBlock
          className="font-display text-d2 leading-none text-copper lg:col-span-1"
          y={12}
        >
          {area.numero}
        </RevealBlock>

        <div className={esDestacada ? 'lg:col-span-7' : 'lg:col-span-6'}>
          <Reveal
            as="h3"
            className={`text-bone ${esDestacada ? 'text-d1' : 'text-d1'}`}
          >
            {area.titulo}
          </Reveal>

          <Reveal
            as="p"
            className="measure mt-7 text-lead text-bone/75"
            stagger={0.05}
          >
            {area.bajada}
          </Reveal>

          {esDestacada && (
            <Reveal
              as="p"
              className="measure mt-8 font-display text-d3 italic text-copper-light"
              stagger={0.05}
            >
              {area.diferencial}
            </Reveal>
          )}

          <RevealBlock className="mt-10" y={14}>
            <Link
              href={`/areas/${area.slug}`}
              data-cursor="label"
              data-cursor-label="Ver área"
              className="group/area eyebrow inline-flex items-center gap-4 border-b border-line pb-3 text-bone transition-colors duration-300 hover:border-copper hover:text-copper"
            >
              Ver el área completa
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-copper transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/area:w-16"
              />
            </Link>
          </RevealBlock>
        </div>

        {/* Materias: sin bullets. Cada una separada por una hairline. */}
        <div
          className={
            esDestacada ? 'lg:col-span-3 lg:col-start-10' : 'lg:col-span-4 lg:col-start-9'
          }
        >
          <p className="eyebrow text-ash">
            {indice === 1 ? 'Trabajadores y empresas' : 'Qué resolvemos'}
          </p>
          <RevealList as="ul" className="mt-6">
            {area.materias.slice(0, esDestacada ? 6 : 5).map((m) => (
              <li
                key={m}
                className="border-t border-line py-2.5 text-body text-bone/70 last:border-b"
              >
                {m}
              </li>
            ))}
          </RevealList>
        </div>
      </div>
    </div>
  )
}
