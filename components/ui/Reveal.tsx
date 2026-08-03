'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  MOTION_OK,
  MOTION_REDUCED,
} from '@/lib/gsap'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  start?: string
}

/**
 * Revelado de texto por lineas: mascara `overflow:hidden` + `translateY`.
 * Nunca letra por letra — con parrafos largos se vuelve ruido y encima rompe
 * la lectura de los screen readers.
 *
 * `autoSplit` vuelve a partir las lineas cuando cambia el ancho o cuando
 * terminan de cargar las fuentes; sin eso, las lineas se calculan con la
 * fallback y quedan cortadas donde no va.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.06,
  start = 'top 88%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        let split: SplitText | null = null

        const crearSplit = () => {
          split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            // Por defecto SplitText copia el texto a un `aria-label` en el
            // contenedor y esconde las lineas. Sobre un <p> sin `role`, ese
            // aria-label es un atributo prohibido por la spec de ARIA y lo
            // marca cualquier auditoria. Como aca el corte es por LINEAS y no
            // por caracteres, el texto queda intacto y en orden en el DOM: los
            // lectores de pantalla lo leen bien sin la etiqueta.
            aria: 'none',
            onSplit(self) {
              gsap.set(el, { opacity: 1 })
              return gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.05,
                ease: 'expo.out',
                stagger,
                delay,
                scrollTrigger: { trigger: el, start, once: true },
              })
            },
          })
        }

        // Partir en lineas obliga a medir, y medir fuerza reflow. Con ~16
        // bloques de texto haciendolo junto a la hidratacion, el main thread se
        // bloquea 200ms largos en un telefono de gama media. Cada bloque se
        // parte recien cuando esta a un cuarto de pantalla de entrar.
        const disparador = ScrollTrigger.create({
          trigger: el,
          start: 'top bottom+=25%',
          once: true,
          onEnter: crearSplit,
        })

        return () => {
          disparador.kill()
          split?.revert()
        }
      })

      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { opacity: 1 })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} data-anim="hidden">
      {children}
    </Tag>
  )
}

/**
 * Revelado de bloques que no son texto (imagenes, tarjetas, keylines).
 * Desplazamiento corto: 24px. Nada entra desde muy lejos.
 */
export function RevealBlock({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 24,
  start = 'top 90%',
}: Omit<RevealProps, 'stagger'> & { y?: number }) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const tween = gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start, once: true },
          },
        )
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { opacity: 1, y: 0 })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} data-anim="hidden">
      {children}
    </Tag>
  )
}

/**
 * Revelado escalonado de una lista de hijos directos.
 * Se usa en las materias de cada area y en los items del bloque destacado.
 */
export function RevealList({
  children,
  as: Tag = 'div',
  className,
  stagger = 0.05,
  start = 'top 88%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = Array.from(el.children)
      if (!items.length) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        gsap.set(el, { opacity: 1 })
        const tween = gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger,
            scrollTrigger: { trigger: el, start, once: true },
          },
        )
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { opacity: 1 })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} data-anim="hidden">
      {children}
    </Tag>
  )
}
