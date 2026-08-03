'use client'

import { useRef } from 'react'
import { Monogram, MonogramOutline } from '@/components/ui/Monogram'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'
import { getLenis } from '@/lib/lenis'
import { markIntroDone } from '@/lib/intro'
import { INTRO_KEY } from '@/lib/keys'

/**
 * Secuencia de carga. Una sola vez por sesion.
 *
 * El script inline del layout ya leyo sessionStorage antes del primer pintado y,
 * si corresponde, marco <html class="intro-visto"> — por eso el overlay nunca
 * parpadea en la segunda visita. Este componente solo anima o se saca del medio.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const finish = () => {
        el.style.display = 'none'
        try {
          sessionStorage.setItem(INTRO_KEY, '1')
        } catch {
          /* modo privado: se vuelve a ver, no es grave */
        }
        getLenis()?.start()
        ScrollTrigger.refresh()
        markIntroDone()
      }

      // Ya se vio en esta sesion, o el navegador no ejecuto el script inline.
      if (document.documentElement.classList.contains('intro-visto')) {
        finish()
        return
      }

      const mm = gsap.matchMedia()

      mm.add(MOTION_REDUCED, () => {
        finish()
      })

      mm.add(MOTION_OK, () => {
        getLenis()?.stop()

        const outline = el.querySelectorAll('[data-draw]')
        const solid = el.querySelector('[data-solid]')
        const rule = el.querySelector('[data-rule]')

        const tl = gsap.timeline({ onComplete: finish })

        tl.set(outline, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 1 })
          .set(solid, { opacity: 0 })
          .to(outline, {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: 'power2.inOut',
            stagger: 0.04,
          })
          // El contorno cede paso al relleno: la marca "se cierra".
          .to(solid, { opacity: 1, duration: 0.36, ease: 'power2.out' }, '-=0.15')
          .to(outline, { opacity: 0, duration: 0.36 }, '<')
          .fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'expo.out' },
            '-=0.3',
          )
          .to({}, { duration: 0.08 })
          .to(
            el.querySelector('[data-intro-mark]'),
            { yPercent: -22, opacity: 0, duration: 0.65, ease: 'power2.in' },
            'salida',
          )
          // El hero arranca cuando el overlay empieza a subir, no cuando
          // termina. Ademas de encadenar mejor —la marca se corre y atras ya
          // hay algo vivo— adelanta casi un segundo el LCP: hasta que el
          // titular no tiene opacidad, para el navegador no hay nada pintado.
          .call(markIntroDone, undefined, 'salida')
          .to(
            el,
            { yPercent: -100, duration: 0.9, ease: 'expo.inOut' },
            'salida+=0.1',
          )

        return () => {
          tl.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso-deep"
    >
      <div data-intro-mark className="flex w-[min(58vw,26rem)] flex-col items-center">
        <div className="relative w-full">
          <MonogramOutline className="w-full stroke-copper" />
          <div data-solid className="absolute inset-0">
            <Monogram tone="onDark" className="h-full w-full" />
          </div>
        </div>
        <div
          data-rule
          className="mt-7 h-px w-full origin-left scale-x-0 bg-copper/45"
        />
      </div>
    </div>
  )
}
