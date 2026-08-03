/**
 * Constantes compartidas entre server y client.
 *
 * Va en su propio archivo, sin `'use client'`: si se importa desde un modulo de
 * cliente, el servidor recibe una referencia opaca en lugar del string, y el
 * script inline del layout queda con una funcion pegada adentro de una comilla
 * simple. Se rompe el parseo entero.
 */

/** Marca de sessionStorage: la secuencia de carga ya se vio en esta sesion. */
export const INTRO_KEY = 'pll:intro-visto'
