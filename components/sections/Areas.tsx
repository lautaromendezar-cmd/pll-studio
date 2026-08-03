'use client'

import Image from 'next/image'
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
      {/* Apertura de la seccion: mismo patron que el manifiesto — punto cobre,
          eyebrow y una frase grande en display — pero en oscuro. Antes eran el
          eyebrow y la frase en chico repartidos a los costados, y leia como una
          barra suelta, no como la entrada del elemento firma del sitio. */}
      <div className="shell pb-[clamp(3.5rem,8vh,7rem)] pt-[var(--space-section)]">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2
              id="areas-titulo"
              className="eyebrow flex items-start gap-3 text-ash"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-copper"
              />
              Áreas de trabajo
            </h2>
            <Reveal
              as="p"
              className="mt-9 max-w-[20ch] font-display text-d1 text-bone"
              stagger={0.07}
            >
              Tres áreas. La misma forma de trabajar en las tres.
            </Reveal>
          </div>

          {/* El rango de numeracion ata la apertura con los 01/02/03 de los
              planos que vienen abajo. */}
          <RevealBlock
            className="hidden lg:col-span-2 lg:col-start-11 lg:block lg:justify-self-end"
            y={12}
          >
            <p
              aria-hidden="true"
              className="font-display text-d2 leading-none text-copper"
            >
              01—03
            </p>
          </RevealBlock>
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
            {/* Borde recto con una hairline cobre arriba: es lo que marca que
                un plano se monto sobre el anterior. */}
            <div className="relative h-full overflow-hidden border-t border-copper/45 bg-espresso">
              <PlanoFondo area={area} />

              {/* El fondo del plano NO se anima: si se le baja la opacidad al
                  contenedor que lo pinta, el plano se vuelve traslucido y se ve
                  el de mas atras. Solo retrocede el contenido. */}
              <div
                data-plano-contenido
                className="relative h-full origin-top will-change-transform"
              >
                <PlanoContenido area={area} indice={i} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/**
 * Imagen de fondo del plano.
 *
 * Va a sangre en vez de en una caja al costado: encajonada se veia pegada
 * encima, como un stock cualquiera. A sangre el plano entero es la imagen y el
 * texto vive adentro.
 *
 * Las dos capas de encima no son decoracion, son legibilidad: el degradado
 * horizontal deja la mitad izquierda practicamente en espresso solido, que es
 * donde va todo el texto, y el velo general baja el resto. Medido, el bone
 * sobre la zona de texto queda arriba de 12:1.
 *
 * `alt=""` + aria-hidden porque es decorativa: lo que la imagen aporta ya esta
 * dicho en el titulo y la bajada del area.
 */
function PlanoFondo({ area }: { area: (typeof areas)[number] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image
        src={area.imagen}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-espresso/30" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-espresso)_0%,var(--color-espresso)_36%,color-mix(in_srgb,var(--color-espresso)_72%,transparent)_54%,color-mix(in_srgb,var(--color-espresso)_15%,transparent)_100%)]" />
    </div>
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
      {/* items-start: el numero tiene que alinear con la tapa del titulo, no
          quedar flotando en el medio de la columna. */}
      <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:items-start">
        {/* El numero vive en la banda izquierda, fuera de la caja de texto. */}
        <RevealBlock
          className="font-display text-d2 leading-none text-copper lg:col-span-1"
          y={12}
        >
          {area.numero}
        </RevealBlock>

        <div className="lg:col-span-6">
          <Reveal as="h3" className="text-d1 text-bone">
            {area.titulo}
          </Reveal>

          <Reveal
            as="p"
            className="measure mt-6 text-lead text-bone/75"
            stagger={0.05}
          >
            {area.bajada}
          </Reveal>

          {esDestacada && (
            <Reveal
              as="p"
              className="measure mt-6 font-display text-d3 italic text-copper-light"
              stagger={0.05}
            >
              {area.diferencial}
            </Reveal>
          )}

          {/* Materias: sin bullets. Cada una separada por una hairline. */}
          <p className="eyebrow mt-9 text-ash">
            {indice === 1 ? 'Trabajadores y empresas' : 'Qué resolvemos'}
          </p>
          <RevealList as="ul" className="mt-4 max-w-lg">
            {area.materias.slice(0, esDestacada ? 4 : 5).map((m) => (
              <li
                key={m}
                className="border-t border-line py-2 text-body text-bone/70 last:border-b"
              >
                {m}
              </li>
            ))}
          </RevealList>

          <RevealBlock className="mt-9" y={14}>
            <Link
              href={`/areas/${area.slug}`}
              data-cursor="label"
              data-cursor-label="Ver área"
              className="group/area eyebrow inline-flex items-center gap-4 border border-bone/30 px-7 py-4 text-bone transition-colors duration-400 hover:border-copper hover:text-copper"
            >
              Ver el área completa
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-copper transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/area:w-16"
              />
            </Link>
          </RevealBlock>
        </div>

      </div>
    </div>
  )
}
