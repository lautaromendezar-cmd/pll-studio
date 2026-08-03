'use client'

import { useRef } from 'react'
import { Reveal, RevealBlock, RevealList } from '@/components/ui/Reveal'
import { site } from '@/content/site'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * Origen del diagrama: Monte Grande, abajo a la izquierda.
 *
 * Los arcos abren desde ahi hacia arriba y a la derecha en lugar de ser
 * semicircunferencias completas: centrado, el arco mas grande se cortaba contra
 * el borde izquierdo de la seccion y parecia un error de recorte.
 */
const CX = 48
const CY = 412
const RADIOS = [104, 182, 278, 396]
const DESDE = -96
const HASTA = -2
/**
 * Los numeros de cada anillo se apoyan sobre un rayo inclinado 12.7 grados de la
 * vertical — el angulo de la italica del logo. Van solo los numeros: los nombres
 * ya estan en la lista de la izquierda y repetirlos ensucia el dibujo.
 */
const RAYO = -77.3

const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

const arco = (r: number, desde: number, hasta: number) => {
  const a = polar(r, desde)
  const b = polar(r, hasta)
  const largo = Math.abs(hasta - desde) > 180 ? 1 : 0
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${largo} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`
}

/**
 * Alcance geografico. Reemplaza al iframe de Google Maps: mostrar una cuadra de
 * Monte Grande en la seccion que habla de alcance nacional e internacional dice
 * exactamente lo contrario de lo que se quiere decir.
 *
 * Cuatro arcos concentricos desde el estudio. El cuarto va punteado porque el
 * alcance internacional es solo para derecho deportivo, no para todo.
 */
export function Alcance() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const trazos = el.querySelectorAll('[data-arco]')
        const punteado = el.querySelectorAll('[data-arco-punteado]')
        const marcas = el.querySelectorAll('[data-marca]')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 65%', once: true },
        })

        tl.fromTo(
          trazos,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power2.inOut',
            stagger: 0.14,
          },
        )
          .fromTo(
            punteado,
            { opacity: 0 },
            { opacity: 1, duration: 1.1, ease: 'power2.out' },
            '-=0.9',
          )
          .fromTo(
            marcas,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.12 },
            '-=1.4',
          )

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="alcance"
      aria-labelledby="alcance-titulo"
      className="relative overflow-clip bg-espresso py-[var(--space-section-lg)]"
    >
      <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 id="alcance-titulo" className="eyebrow text-ash">
            {site.alcance.eyebrow}
          </h2>

          <Reveal as="p" className="mt-8 font-display text-d1 text-bone">
            {site.alcance.titulo}
          </Reveal>

          <Reveal as="p" className="measure mt-8 text-lead text-bone/70">
            {site.alcance.texto}
          </Reveal>

          <RevealList as="ul" className="mt-12">
            {site.alcance.anillos.map((a, i) => (
              <li
                key={a.label}
                className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
              >
                <span className="flex items-baseline gap-4">
                  <span className="eyebrow text-copper">{`0${i + 1}`}</span>
                  <span className="text-body text-bone">{a.label}</span>
                </span>
                <span className="text-util tracking-[0.02em] text-ash">
                  {a.detalle}
                </span>
              </li>
            ))}
          </RevealList>
        </div>

        {/* El diagrama desborda el contenedor por la derecha: la grilla se rompe
            a proposito y el arco mas grande se corta con el viewport. El ancho
            esta calibrado para que su alto quede parejo con el de la columna de
            texto — mas grande, la seccion se desbalancea. */}
        <RevealBlock
          className="relative lg:col-span-6 lg:col-start-7 lg:-mr-[8vw] lg:pl-6"
          y={30}
        >
          <svg
            viewBox="0 0 520 440"
            className="h-auto w-full"
            role="img"
            aria-label="Diagrama de alcance: Provincia de Buenos Aires, CABA, todo el país con matrícula federal e internacional en derecho deportivo."
          >
            <g fill="none" strokeLinecap="round">
              {RADIOS.slice(0, 3).map((r, i) => (
                <path
                  key={r}
                  data-arco
                  pathLength={1}
                  d={arco(r, DESDE, HASTA)}
                  stroke="var(--color-copper)"
                  strokeOpacity={0.72 - i * 0.13}
                  strokeWidth={1.4}
                />
              ))}
              {/* El anillo internacional va punteado — el alcance fuera del pais
                  es solo para derecho deportivo, no para todo. Se anima aparte:
                  el `stroke-dasharray` del dibujado pisaria el punteado. */}
              <path
                data-arco-punteado
                d={arco(RADIOS[3], DESDE, HASTA)}
                stroke="var(--color-copper)"
                strokeOpacity={0.7}
                strokeWidth={1}
                strokeDasharray="2 8"
              />
            </g>

            {/* Marca de posicion del estudio, inclinada en el angulo del logo. */}
            <g transform={`rotate(12.7 ${CX} ${CY})`}>
              <line
                x1={CX}
                y1={CY - 26}
                x2={CX}
                y2={CY + 10}
                stroke="var(--color-copper)"
                strokeWidth={1.25}
              />
            </g>
            <circle cx={CX} cy={CY} r={4.5} fill="var(--color-copper)" />

            {RADIOS.map((r, i) => {
              const p = polar(r, RAYO)
              return (
                <g key={`m-${r}`} data-marca>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={13}
                    fill="var(--color-espresso)"
                  />
                  <text
                    x={p.x}
                    y={p.y + 4}
                    textAnchor="middle"
                    fill="var(--color-bone)"
                    fillOpacity={0.75}
                    className="font-body text-[12px] font-medium tracking-[0.14em]"
                  >
                    {`0${i + 1}`}
                  </text>
                </g>
              )
            })}

            <text
              x={CX + 16}
              y={CY + 8}
              fill="var(--color-copper)"
              className="font-body text-[12px] font-medium uppercase tracking-[0.14em]"
            >
              Monte Grande
            </text>
          </svg>
        </RevealBlock>
      </div>
    </section>
  )
}
