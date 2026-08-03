'use client'

/**
 * Coordina el final de la secuencia de carga con el arranque del hero.
 *
 * No importa quien monte primero: si el intro ya termino, el callback se
 * ejecuta en el acto; si todavia no, queda encolado.
 */

let done = false
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  for (const cb of listeners) cb()
  listeners.clear()
}

export function onIntroDone(cb: () => void) {
  if (done) {
    cb()
    return () => {}
  }
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
