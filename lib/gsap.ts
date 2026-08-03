'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

/**
 * Registro central. Cualquier componente que anime importa desde aca y nunca
 * llama a gsap.registerPlugin por su cuenta: registrarlo dos veces en dos
 * bundles distintos duplica el codigo del plugin.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

  gsap.defaults({ ease: 'power3.out', duration: 0.9 })

  // El header fijo mide 80px contraido: los anchors no deben quedar tapados.
  ScrollTrigger.defaults({ toggleActions: 'play none none none' })
}

/** Query de matchMedia que usa todo el sitio. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'
export const POINTER_FINE = '(pointer: fine)'

export { gsap, ScrollTrigger, SplitText, useGSAP }
