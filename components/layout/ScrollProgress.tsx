'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/lib/gsap'

/**
 * Hairline cobre al pie del header. Es el unico indicador de progreso del sitio:
 * no hay barra lateral ni numeracion de secciones flotando.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(el, { scaleX: self.progress })
        },
      })
      return () => st.kill()
    })

    return () => mm.revert()
  })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-copper"
      />
    </div>
  )
}
