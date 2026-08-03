'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'

/**
 * Contador de una sola pasada al entrar en viewport. Sin loop, sin repeticion
 * al volver a subir. `tabular-nums` evita que el ancho baile mientras cuenta.
 */
export function Counter({
  value,
  suffix = '',
  className,
  duration = 1.6,
}: {
  value: number
  suffix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const out = el.querySelector('[data-count]')
      if (!out) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const state = { n: 0 }
        const tween = gsap.to(state, {
          n: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            out.textContent = String(Math.round(state.n))
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          out.textContent = String(value)
        }
      })

      mm.add(MOTION_REDUCED, () => {
        out.textContent = String(value)
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={className}>
      {/* El valor final va renderizado en el HTML: sin JS el numero igual esta. */}
      <span data-count className="tabular-nums">
        {value}
      </span>
      {suffix}
    </span>
  )
}
