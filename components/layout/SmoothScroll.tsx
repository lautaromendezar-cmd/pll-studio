'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { setLenis } from '@/lib/lenis'

export function SmoothScroll() {
  useEffect(() => {
    // Con movimiento reducido no hay interpolacion: el scroll es el nativo.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) {
      document.documentElement.classList.add('anim-off')
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Curva larga y sin rebote. Un smooth scroll que "flota" se siente barato.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      // En tactil el scroll nativo ya se siente bien y Lenis agrega latencia.
      syncTouch: false,
    })

    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
