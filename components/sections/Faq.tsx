'use client'

import { useId, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { faq } from '@/content/faq'

/**
 * Acordeon sobrio: hairlines, sin cajas, sin sombras, sin iconos de libreria.
 * El indicador es una cruz de dos reglas de 1px; al abrir, la vertical se
 * colapsa y queda un guion.
 *
 * La apertura se anima con `grid-template-rows: 0fr -> 1fr`, que es la unica
 * forma de transicionar a altura automatica con soporte real en todos lados.
 */
export function Faq() {
  const [abierta, setAbierta] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section
      id="faq"
      aria-labelledby="faq-titulo"
      className="bg-espresso py-[var(--space-section-lg)]"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="faq-titulo" className="eyebrow text-ash">
            Preguntas frecuentes
          </h2>
          <Reveal
            as="p"
            className="measure-tight mt-8 font-display text-d2 text-bone"
            stagger={0.07}
          >
            Lo que nos preguntan siempre, contestado sin vueltas.
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul>
            {faq.map((item, i) => {
              const open = abierta === i
              const panelId = `${baseId}-panel-${i}`
              const botonId = `${baseId}-boton-${i}`
              return (
                <li key={item.pregunta} className="border-t border-line last:border-b">
                  <h3>
                    <button
                      id={botonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setAbierta(open ? null : i)}
                      className="group/faq flex w-full items-center justify-between gap-8 py-6 text-left transition-colors duration-300 hover:text-copper"
                    >
                      <span className="font-display text-d3 text-bone transition-colors duration-300 group-hover/faq:text-copper">
                        {item.pregunta}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative block h-3.5 w-3.5 shrink-0"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-copper" />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-copper transition-transform duration-500 ease-[var(--ease-in-out-quart)] ${
                            open ? 'scale-y-0' : 'scale-y-100'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={botonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-600 ease-[var(--ease-in-out-quart)] ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="measure pb-8 pr-10 text-body text-bone/70">
                        {item.respuesta}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
