'use client'

import Lenis from 'lenis'

let instance: Lenis | null = null

/**
 * Una sola instancia de Lenis para todo el sitio. La crea <SmoothScroll/> en el
 * layout; el resto la pide con getLenis() para pausarla (menu abierto, preloader)
 * o para hacer scrollTo desde el header.
 */
export function setLenis(next: Lenis | null) {
  instance = next
}

export function getLenis() {
  return instance
}

/** Scroll a un ancla respetando la altura del header contraido. */
export function scrollToTarget(target: string | HTMLElement, offset = -80) {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 })
    return
  }
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (el instanceof HTMLElement) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + offset,
      behavior: 'smooth',
    })
  }
}
