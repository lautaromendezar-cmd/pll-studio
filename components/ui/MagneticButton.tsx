'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, MOTION_OK, POINTER_FINE } from '@/lib/gsap'

/** Desplazamiento maximo del iman. Mas que esto y el boton "resbala". */
const PULL = 8

type Props = {
  children: ReactNode
  href: string
  className?: string
  external?: boolean
  cursorLabel?: string
  onClick?: () => void
}

/**
 * Solo para los dos CTA principales. Si todo es magnetico, nada lo es.
 * Se apaga en tactil y con movimiento reducido.
 */
export function MagneticButton({
  children,
  href,
  className,
  external,
  cursorLabel,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      const label = inner.current
      if (!el || !label) return

      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
        const moveEl = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
        const moveElY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
        // La etiqueta va la mitad: da sensacion de profundidad sin despegarse.
        const moveLabel = gsap.quickTo(label, 'x', { duration: 0.6, ease: 'power3.out' })
        const moveLabelY = gsap.quickTo(label, 'y', { duration: 0.6, ease: 'power3.out' })

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          const cx = gsap.utils.clamp(-1, 1, dx) * PULL
          const cy = gsap.utils.clamp(-1, 1, dy) * PULL
          moveEl(cx)
          moveElY(cy)
          moveLabel(cx * 0.5)
          moveLabelY(cy * 0.5)
        }

        const onLeave = () => {
          moveEl(0)
          moveElY(0)
          moveLabel(0)
          moveLabelY(0)
        }

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          gsap.set([el, label], { x: 0, y: 0 })
        }
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      data-cursor={cursorLabel ? 'label' : undefined}
      data-cursor-label={cursorLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span ref={inner} className="pointer-events-none block">
        {children}
      </span>
    </a>
  )
}
