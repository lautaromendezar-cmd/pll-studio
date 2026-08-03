import {
  MONOGRAM_VIEWBOX,
  WORDMARK_VIEWBOX,
  PATH_L1,
  PATH_L2,
  PATH_P,
  PATH_WORDMARK,
} from '@/lib/monogram-paths'

type Tone = 'onDark' | 'onLight' | 'ghost' | 'ghostOnBone' | 'copper'

const TONES: Record<Tone, { letra: string; acento: string }> = {
  // Dorso de la tarjeta: P y L italica en bone, L recta en cobre.
  onDark: { letra: 'fill-bone', acento: 'fill-copper' },
  // Frente de la tarjeta.
  onLight: { letra: 'fill-espresso', acento: 'fill-copper' },
  // Marca de agua del hero: apenas un tono por encima del fondo.
  ghost: { letra: 'fill-espresso-deep', acento: 'fill-espresso-deep' },
  // Marca de agua sobre los bloques bone. La L recta va un pelo mas marcada
  // y en cobre: es el trazo compartido del logo asomando, no un sello gris.
  ghostOnBone: { letra: 'fill-espresso/5', acento: 'fill-copper/15' },
  copper: { letra: 'fill-copper', acento: 'fill-copper' },
}

/**
 * Monograma PLL, vectorizado del PDF original de la tarjeta.
 *
 * Las tres letras van en grupos separados y en este orden de pintado —
 * L italica, L recta, P — porque asi se pisan en el original: dentro de la
 * panza de la P hay un fragmento de la L recta en cobre. Ese trazo compartido
 * es el concepto del sitio y no se puede perder aplanando el SVG.
 */
export function Monogram({
  className,
  tone = 'onDark',
  title,
}: {
  className?: string
  tone?: Tone
  title?: string
}) {
  const c = TONES[tone]
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g className={c.letra} data-mono="l2">
        {PATH_L2.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className={c.acento} data-mono="l1">
        {PATH_L1.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className={c.letra} data-mono="p">
        {PATH_P.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}

/**
 * Version de contorno para la secuencia de carga: se dibuja trazo por trazo con
 * stroke-dasharray. `pathLength={1}` normaliza todos los contornos para que el
 * offset sea el mismo numero en todos, midan lo que midan.
 */
export function MonogramOutline({ className }: { className?: string }) {
  const all = [...PATH_L2, ...PATH_L1, ...PATH_P]
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeWidth={0.5} strokeLinejoin="round">
        {all.map((d, i) => (
          <path key={i} d={d} pathLength={1} data-draw="" />
        ))}
      </g>
    </svg>
  )
}

/** "ESTUDIO JURIDICO" en versalitas, tal cual el archivo original. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {PATH_WORDMARK.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}

/** Lockup completo para header y footer. */
export function Lockup({
  className,
  tone = 'onDark',
}: {
  className?: string
  tone?: Tone
}) {
  return (
    <span className={`flex items-center gap-3 ${className ?? ''}`}>
      <Monogram tone={tone} className="h-7 w-auto" title="PLL Estudio Jurídico" />
      <span className="sr-only">PLL Estudio Jurídico</span>
    </span>
  )
}
