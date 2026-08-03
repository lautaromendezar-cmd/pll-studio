'use client'

import { useRef } from 'react'
import { Monogram } from '@/components/ui/Monogram'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { site } from '@/content/site'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'
import { onIntroDone } from '@/lib/intro'
import { scrollToTarget } from '@/lib/lenis'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_REDUCED, () => {
        gsap.set(el.querySelectorAll('[data-anim="hidden"]'), { opacity: 1 })
        gsap.set(el.querySelectorAll('[data-hero-line] > span'), { yPercent: 0 })
      })

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(el)

        // Entrada: arranca cuando termina la secuencia de carga. Si el intro ya
        // se vio en esta sesion, onIntroDone dispara en el acto.
        //
        // Todo va con `fromTo` y opacidad explicita en los dos extremos. Con
        // `from()` a secas, GSAP toma como valor final el que encuentra al
        // crear el tween — y como el CSS deja estos elementos en opacity 0
        // hasta que el JS toma el control, el "final" tambien era 0 y no se
        // veian nunca.
        const tl = gsap.timeline({ paused: true })

        tl.fromTo(
          q('[data-hero-eyebrow]'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9 },
        )
          .set(q('[data-hero-title]'), { opacity: 1 }, '-=0.65')
          .fromTo(
            q('[data-hero-line] > span'),
            { yPercent: 108 },
            { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.08 },
            '<',
          )
          .fromTo(
            q('[data-hero-rule]'),
            { opacity: 1, scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: 'expo.out' },
            '-=0.8',
          )
          .fromTo(
            q('[data-hero-sub]'),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 1 },
            '-=0.85',
          )
          // El contenedor arranca en opacity 0 por CSS y los hijos entran
          // escalonados: hay que encender el contenedor aparte, si no queda
          // invisible aunque los hijos hayan terminado de animar.
          .set(q('[data-hero-cta]'), { opacity: 1 }, '-=0.8')
          .fromTo(
            q('[data-hero-cta] > *'),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
            '<',
          )
          .fromTo(
            q('[data-hero-mono]'),
            { opacity: 0, xPercent: 8 },
            { opacity: 1, xPercent: 0, duration: 1.8, ease: 'expo.out' },
            0.15,
          )
          .fromTo(
            q('[data-hero-cue]'),
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            '-=0.5',
          )

        const off = onIntroDone(() => tl.play())

        // Parallax: tres velocidades reales sobre el mismo scroll.
        const parallax = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
        parallax
          .to(q('[data-hero-bg]'), { yPercent: 16, ease: 'none' }, 0)
          .to(q('[data-hero-mono]'), { yPercent: 9, ease: 'none' }, 0)
          .to(
            q('[data-hero-copy]'),
            { yPercent: -7, opacity: 0.25, ease: 'none' },
            0,
          )

        return () => {
          off()
          tl.kill()
          parallax.scrollTrigger?.kill()
          parallax.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-svh flex-col justify-end overflow-clip pb-14 pt-32 sm:pb-20"
    >
      {/* Capa 1 — el fondo. Un solo degradado tibio, sin textura de ruido:
          el grano sobre espresso a esta escala solo agrega peso al bundle. */}
      <div
        data-hero-bg
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_85%_at_78%_18%,var(--color-espresso)_0%,var(--color-espresso-deep)_78%)]"
      />

      {/* Capa 2 — el monograma. Sangra por derecha y por abajo a proposito:
          no entra entero, y esa es la idea. */}
      <div
        data-hero-mono
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18vw] bottom-[14vh] -z-10 w-[105vw] max-w-none sm:-right-[10vw] sm:bottom-[16vh] sm:w-[74vw] lg:bottom-[13vh] lg:w-[62vw]"
      >
        <div className="absolute inset-0 -z-10 scale-125 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-copper)_9%,transparent),transparent)]" />
        <Monogram tone="ghost" className="h-auto w-full" />
      </div>

      {/* Capa 3 — el texto. */}
      <div data-hero-copy className="shell relative">
        <p
          data-hero-eyebrow
          data-anim="hidden"
          className="eyebrow flex items-start gap-3 text-ash"
        >
          {/* items-start + offset: cuando el eyebrow se parte en dos lineas en
              mobile, `items-center` deja el punto flotando en el medio. */}
          <span
            aria-hidden="true"
            className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-copper"
          />
          {site.hero.eyebrow}
        </p>

        <h1
          data-hero-title
          data-anim="hidden"
          className="mt-8 max-w-[15ch] text-hero text-bone sm:mt-10"
        >
          {site.hero.titulo.map((linea) => (
            <span key={linea} data-hero-line className="reveal-mask">
              <span>{linea}</span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <div
              data-hero-rule
              aria-hidden="true"
              data-anim="hidden"
              className="h-px w-24 origin-left bg-copper"
            />
            <p
              data-hero-sub
              data-anim="hidden"
              className="measure mt-7 text-lead text-bone/75"
            >
              {site.hero.bajada}
            </p>
          </div>

          <div
            data-hero-cta
            data-anim="hidden"
            className="flex flex-wrap items-center gap-x-9 gap-y-5 lg:col-span-6 lg:justify-end"
          >
            <MagneticButton
              href={site.contacto.whatsapp}
              external
              cursorLabel="Escribir"
              // El aro de foco por defecto es cobre y sobre el relleno cobre se
              // pierde. Bone es el unico que se ve contra las dos cosas que
              // toca: 3.05:1 contra el boton y 14:1 contra el fondo espresso.
              className="eyebrow inline-block bg-copper px-8 py-4.5 text-espresso-deep transition-colors duration-400 hover:bg-copper-light focus-visible:outline-bone"
            >
              {site.hero.ctaPrimario}
            </MagneticButton>

            <a
              href="#areas"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#areas')
              }}
              data-cursor="label"
              data-cursor-label="Ver áreas"
              className="eyebrow group/link relative inline-flex items-center gap-3 py-2 text-bone/80 transition-colors duration-300 hover:text-bone"
            >
              {site.hero.ctaSecundario}
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-copper transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/link:w-12"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll: una hairline con un segmento cobre que baja.
          Sin flecha, sin la palabra "scroll". */}
      <div
        data-hero-cue
        data-anim="hidden"
        aria-hidden="true"
        className="shell relative mt-14 hidden sm:block"
      >
        <div className="relative h-14 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 block h-5 animate-[cue_2.6s_var(--ease-in-out-quart)_infinite] bg-copper" />
        </div>
      </div>
    </section>
  )
}
