import {
  MONOGRAM_VIEWBOX,
  WORDMARK_VIEWBOX,
  PATH_L1,
  PATH_L2,
  PATH_P,
  PATH_WORDMARK,
} from '@/lib/monogram-paths'

/**
 * El monograma como data URI, para las imagenes generadas con next/og.
 *
 * Se arma desde los mismos paths que usa el sitio en lugar de leer un .svg del
 * disco: nada de `fs` en tiempo de request, y el favicon nunca puede quedar
 * desincronizado del logo del header.
 */
export function monogramaDataUri(letra: string, acento: string) {
  const g = (paths: readonly string[], fill: string) =>
    `<g fill="${fill}">${paths.map((d) => `<path d="${d}"/>`).join('')}</g>`

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MONOGRAM_VIEWBOX}">` +
    g(PATH_L2, letra) +
    g(PATH_L1, acento) +
    g(PATH_P, letra) +
    `</svg>`

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

export function wordmarkDataUri(color: string) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEWBOX}">` +
    `<g fill="${color}">${PATH_WORDMARK.map((d) => `<path d="${d}"/>`).join('')}</g>` +
    `</svg>`

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/** Relacion de aspecto del monograma, para no deformarlo al escalarlo. */
export const MONOGRAM_RATIO = (() => {
  const [, , w, h] = MONOGRAM_VIEWBOX.split(' ').map(Number)
  return w / h
})()

export const WORDMARK_RATIO = (() => {
  const [, , w, h] = WORDMARK_VIEWBOX.split(' ').map(Number)
  return w / h
})()

export const MARCA = {
  espresso: '#2E120C',
  espressoDeep: '#1B0A06',
  copper: '#B0763C',
  bone: '#EDE7DE',
  ash: '#8A7B70',
} as const
