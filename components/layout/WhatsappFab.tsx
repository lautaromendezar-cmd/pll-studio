'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'
import { WhatsappIcon } from '@/components/ui/WhatsappIcon'
import { site } from '@/content/site'

/**
 * Boton flotante, en todos los anchos. Entra despues del primer scroll, no de
 * entrada: aparecer encima del hero antes de que el visitante lea nada es lo
 * que hace que estos botones se sientan de plantilla.
 *
 * Se esconde cuando el bloque de contacto entra en pantalla — ahi ya hay un CTA
 * a ancho completo y dos botones haciendo lo mismo es ruido. En escritorio
 * convive con el del header, que recien aparece en `lg`: entre 768 y 1023 el
 * header muestra solo la hamburguesa y este es el unico WhatsApp a la vista.
 */
export function WhatsappFab() {
  const ref = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    /**
     * Las dos ramas comparten los mismos disparadores; lo unico que cambia es
     * si el cambio de estado se anima o es seco. Con movimiento reducido el
     * boton sigue sin pisar el hero, que es el punto — no es que este siempre.
     */
    const bind = (anima: boolean) => {
      const show = () =>
        anima
          ? gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' })
          : gsap.set(el, { autoAlpha: 1, y: 0 })

      const hide = () =>
        anima
          ? gsap.to(el, { autoAlpha: 0, y: 24, duration: 0.4, ease: 'power2.in' })
          : gsap.set(el, { autoAlpha: 0, y: 24 })

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
    }

    mm.add(MOTION_OK, () => bind(true))
    mm.add(MOTION_REDUCED, () => bind(false))

    return () => mm.revert()
  })

  return (
    <a
      ref={ref}
      href={site.contacto.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="label"
      data-cursor-label="Escribir"
      className="eyebrow invisible fixed bottom-5 right-5 z-30 flex items-center gap-2.5 border border-copper/50 bg-espresso-deep/95 px-5 py-3.5 text-copper backdrop-blur-sm transition-colors duration-400 hover:bg-copper hover:text-espresso-deep md:bottom-8 md:right-8"
    >
      <WhatsappIcon className="h-4 w-4 shrink-0" />
      Consultar
      <span className="sr-only"> por WhatsApp</span>
    </a>
  )
}
