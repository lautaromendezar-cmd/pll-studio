'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, POINTER_FINE } from '@/lib/gsap'

/**
 * Cursor custom: un punto cobre de 9px que crece a 60px y muestra una etiqueta
 * sobre los elementos que la declaran con `data-cursor-label`.
 *
 * Solo en punteros finos y con movimiento normal. Si el JS no corre, la clase
 * `cursor-custom` nunca se agrega y el cursor del sistema queda intacto.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const el = dot.current
    const text = label.current
    if (!el || !text) return

    const mm = gsap.matchMedia()

    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      const root = document.documentElement
      root.classList.add('cursor-custom')

      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 })

      const toX = gsap.quickTo(el, 'x', { duration: 0.32, ease: 'power3.out' })
      const toY = gsap.quickTo(el, 'y', { duration: 0.32, ease: 'power3.out' })

      let visible = false
      const onMove = (e: PointerEvent) => {
        if (!visible) {
          visible = true
          gsap.set(el, { x: e.clientX, y: e.clientY })
          gsap.to(el, { opacity: 1, duration: 0.4 })
        }
        toX(e.clientX)
        toY(e.clientY)
      }

      const onOver = (e: PointerEvent) => {
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
          '[data-cursor], a, button',
        )
        const wanted = target?.dataset.cursorLabel
        if (!target) {
          shrink()
          return
        }
        if (wanted) {
          text.textContent = wanted
          gsap.to(el, {
            width: 'auto',
            height: 34,
            duration: 0.45,
            ease: 'expo.out',
          })
          gsap.to(text, { opacity: 1, duration: 0.3, delay: 0.05 })
          el.dataset.state = 'label'
        } else {
          gsap.to(el, { width: 34, height: 34, duration: 0.45, ease: 'expo.out' })
          gsap.to(text, { opacity: 0, duration: 0.15 })
          el.dataset.state = 'grow'
        }
      }

      const shrink = () => {
        gsap.to(el, { width: 9, height: 9, duration: 0.45, ease: 'expo.out' })
        gsap.to(text, { opacity: 0, duration: 0.15 })
        el.dataset.state = 'idle'
      }

      const onLeaveWindow = () => gsap.to(el, { opacity: 0, duration: 0.25 })
      const onEnterWindow = () => gsap.to(el, { opacity: 1, duration: 0.25 })

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.addEventListener('pointerleave', onLeaveWindow)
      document.addEventListener('pointerenter', onEnterWindow)

      return () => {
        root.classList.remove('cursor-custom')
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        document.removeEventListener('pointerleave', onLeaveWindow)
        document.removeEventListener('pointerenter', onEnterWindow)
      }
    })

    return () => mm.revert()
  })

  return (
    <div
      ref={dot}
      aria-hidden="true"
      data-state="idle"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] h-[9px] w-[9px] items-center justify-center overflow-hidden rounded-full bg-copper px-0 opacity-0 will-change-transform data-[state=label]:px-4"
    >
      <span
        ref={label}
        className="eyebrow whitespace-nowrap text-[0.625rem] text-espresso-deep opacity-0"
      />
    </div>
  )
}
