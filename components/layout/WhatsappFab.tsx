'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'
import { site } from '@/content/site'

/**
 * Boton flotante, solo en pantallas chicas. Entra despues del primer scroll,
 * no de entrada: aparecer encima del hero antes de que el visitante lea nada es
 * lo que hace que estos botones se sientan de plantilla.
 *
 * Se esconde cuando el bloque de contacto entra en pantalla — ahi ya hay un CTA
 * a ancho completo y dos botones haciendo lo mismo es ruido.
 */
export function WhatsappFab() {
  const ref = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    const show = () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' })
    const hide = () => gsap.to(el, { autoAlpha: 0, y: 24, duration: 0.4, ease: 'power2.in' })

    mm.add('(max-width: 767px)', () => {
      gsap.set(el, { autoAlpha: 0, y: 24 })

      const contacto = document.querySelector('#contacto')

      const aparece = ScrollTrigger.create({
        start: '400',
        end: 'max',
        onEnter: show,
        onLeaveBack: hide,
      })

      const desaparece = contacto
        ? ScrollTrigger.create({
            trigger: contacto,
            start: 'top 80%',
            end: 'max',
            onEnter: hide,
            onLeaveBack: show,
          })
        : null

      return () => {
        aparece.kill()
        desaparece?.kill()
      }
    })

    // Con movimiento reducido no hay entrada animada: esta o no esta.
    mm.add(`${MOTION_REDUCED} and (max-width: 767px)`, () => {
      gsap.set(el, { autoAlpha: 1, y: 0 })
    })

    mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
      gsap.set(el, { autoAlpha: 0 })
    })

    return () => mm.revert()
  })

  return (
    <a
      ref={ref}
      href={site.contacto.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="eyebrow invisible fixed bottom-5 right-5 z-40 flex items-center gap-2.5 border border-copper/50 bg-espresso-deep/95 px-5 py-3.5 text-copper backdrop-blur-sm md:hidden"
    >
      <span
        aria-hidden="true"
        className="block h-1.5 w-1.5 rounded-full bg-copper"
      />
      Consultar
      <span className="sr-only"> por WhatsApp</span>
    </a>
  )
}
