'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'

/**
 * Encuadre de imagen. Entra con `clip-path: inset()` animado + un scale interno
 * de 1.08 a 1. Nunca un fade solo: el fade es lo que hace que todas las webs
 * entren igual.
 */
export function Frame({
  src,
  alt,
  className,
  sizes = '(max-width: 900px) 100vw, 50vw',
  priority,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const media = el.querySelector('[data-frame-media]')
      if (!media) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
        tl.set(el, { opacity: 1 })
          .fromTo(
            el,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'expo.out' },
          )
          .fromTo(
            media,
            { scale: 1.08 },
            { scale: 1, duration: 1.6, ease: 'expo.out' },
            0,
          )
        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { opacity: 1, clipPath: 'none' })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`frame ${className ?? ''}`} data-anim="hidden">
      <Image
        data-frame-media
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}
