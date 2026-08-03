import { Frame } from '@/components/ui/Frame'
import { Monogram } from '@/components/ui/Monogram'
import type { Miembro } from '@/content/team'

/**
 * Retrato del equipo.
 *
 * El cliente todavia no mando fotos. Hasta que existan, el bloque se resuelve
 * con las iniciales en Sentient y el monograma al pie — no con stock de gente
 * en traje, que se nota a un kilometro.
 *
 * Para activarlo: poner la ruta en `foto` dentro de content/team.ts y listo.
 */
export function TeamPortrait({ miembro }: { miembro: Miembro }) {
  if (miembro.foto) {
    return (
      <Frame
        src={miembro.foto}
        alt={miembro.fotoAlt ?? miembro.nombre}
        sizes="(max-width: 900px) 100vw, 33vw"
        className="aspect-[4/5] w-full rounded-[3px]"
      />
    )
  }

  const iniciales = miembro.nombre
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[4/5] w-full items-end overflow-hidden bg-espresso-deep px-6 pb-6"
    >
      <span
        className="absolute -top-[0.12em] left-4 font-display text-[9rem] leading-none tracking-[-0.04em] text-copper/12 select-none sm:text-[12rem]"
        style={{ transform: 'skewX(calc(var(--angle-swash) * -1))' }}
      >
        {iniciales}
      </span>
      <Monogram tone="copper" className="relative h-5 w-auto opacity-45" />
    </div>
  )
}
