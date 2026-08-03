'use client'

import { useRef } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { proceso, procesoCierre } from '@/content/proceso'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/lib/gsap'

/**
 * Cuatro pasos en scroll horizontal con `pin`.
 *
 * Aca la numeracion si esta justificada: es una secuencia real y ordenada, no
 * tres features numeradas para que parezca que hay un metodo.
 *
 * En pantallas chicas el pin se apaga y queda un carrusel de scroll nativo con
 * snap: secuestrar el scroll vertical en un telefono es la forma mas rapida de
 * que alguien cierre la pestaña.
 */
export function Proceso() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const track = el.querySelector<HTMLElement>('[data-track]')
      const barra = el.querySelector<HTMLElement>('[data-barra]')
      if (!track) return

      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        // Contra el ancho del propio track, no contra el del viewport: el track
        // vive dentro del `shell`, que tiene padding lateral. Midiendo contra el
        // viewport, el recorrido queda corto justo ese padding y el ultimo panel
        // nunca termina de entrar.
        const distancia = () => Math.max(0, track.scrollWidth - track.clientWidth)

        const tween = gsap.to(track, {
          x: () => -distancia(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barra) gsap.set(barra, { scaleX: self.progress })
            },
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(track, { x: 0 })
          if (barra) gsap.set(barra, { scaleX: 0 })
          ScrollTrigger.refresh()
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="on-bone">
      <div ref={root} className="relative overflow-hidden lg:h-svh">
        <div className="shell flex h-full flex-col justify-center pb-[var(--space-section)] pt-[calc(var(--space-section)+2rem)] lg:pb-[clamp(3rem,6vh,5rem)]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="proceso-titulo" className="eyebrow text-espresso/70">
              El proceso
            </h2>
            <Reveal
              as="p"
              className="measure-tight font-display text-d3 text-espresso/80 sm:text-right"
            >
              De la primera consulta a la sentencia, sin sorpresas.
            </Reveal>
          </div>

          {/* Linea de progreso. En desktop la mueve el scrub; en mobile marca
              simplemente el largo de la secuencia. */}
          <div
            aria-hidden="true"
            className="relative mt-12 h-px w-full bg-line lg:mt-16"
          >
            <span
              data-barra
              className="absolute inset-0 block origin-left scale-x-0 bg-copper"
            />
          </div>

          <div
            data-track
            className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 lg:mt-16 lg:snap-none lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {proceso.map((paso, i) => (
              <article
                key={paso.numero}
                className="relative w-[min(78vw,22rem)] shrink-0 snap-start lg:w-[clamp(21rem,28vw,28rem)]"
              >
                {/* La cifra arranco en espresso/12 y quedaba lindisima, pero
                    daba 1.27:1 contra el bone: ilegible para baja vision. A
                    /50 llega a 3.29:1, el minimo de AA para texto grande. Se
                    achico el solape para que no pelee con el titulo. */}
                <span
                  aria-hidden="true"
                  className="block font-display text-num text-espresso/50"
                >
                  {paso.numero}
                </span>
                <div className="-mt-[0.16em] pl-[0.12em]">
                  <h3 className="font-display text-d2 text-espresso">
                    {paso.titulo}
                  </h3>
                  <p className="mt-4 max-w-[34ch] text-body text-espresso/70">
                    {paso.texto}
                  </p>
                </div>
                {i < proceso.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 top-[3.2em] hidden h-px w-8 bg-copper/45 lg:block"
                  />
                )}
              </article>
            ))}

            {/* El cierre es el quinto panel, no un bloque suelto abajo: la
                secuencia termina donde termina el movimiento. */}
            <article className="flex w-[min(80vw,24rem)] shrink-0 snap-start flex-col justify-center border-l border-line pl-8 lg:w-[clamp(24rem,32vw,32rem)] lg:pl-12">
              <hr className="hairline w-16" />
              <p className="mt-8 font-display text-d2 italic text-espresso">
                {procesoCierre}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
