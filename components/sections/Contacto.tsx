import { MagneticButton } from '@/components/ui/MagneticButton'
import { Reveal, RevealBlock } from '@/components/ui/Reveal'
import { WhatsappIcon } from '@/components/ui/WhatsappIcon'
import { site } from '@/content/site'

const datos = [
  { etiqueta: 'WhatsApp', valor: site.contacto.celular, href: site.contacto.whatsapp, externo: true },
  { etiqueta: 'Teléfono', valor: site.contacto.fijo, href: `tel:${site.contacto.fijoTel}` },
  { etiqueta: 'Mail', valor: site.contacto.email, href: `mailto:${site.contacto.email}` },
  {
    etiqueta: 'Estudio',
    valor: `${site.direccion.calle}, ${site.direccion.localidad}`,
    href: null,
  },
  { etiqueta: 'Horario', valor: site.horarios.texto, href: null },
]

/**
 * Cierre de la pagina. Dos columnas: el mensaje y la accion a la izquierda,
 * los datos apilados a la derecha.
 *
 * Revision 3: el CTA gigante a todo el ancho se reemplazo por el mismo boton
 * cobre del hero. El panel enorme con la keyline en hover leia como un bloque
 * decorativo raro, no como un boton — y la accion mas importante del sitio no
 * puede ser el elemento mas confuso. Un boton que ya aprendiste a usar arriba
 * es un boton que reconoces aca abajo.
 */
export function Contacto() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="bg-espresso-deep pb-[var(--space-section)] pt-[var(--space-section-lg)]"
    >
      <div className="shell grid gap-x-14 gap-y-16 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-start gap-3 text-ash">
            <span
              aria-hidden="true"
              className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-copper"
            />
            {site.contactoSeccion.eyebrow}
          </p>

          <Reveal
            as="h2"
            className="mt-9 max-w-[16ch] text-hero text-bone"
            stagger={0.08}
          >
            <span id="contacto-titulo">{site.contactoSeccion.titulo}</span>
          </Reveal>

          <Reveal as="p" className="measure mt-9 text-lead text-bone/70">
            {site.contactoSeccion.bajada}
          </Reveal>

          <RevealBlock className="mt-12" y={20}>
            <MagneticButton
              href={site.contacto.whatsapp}
              external
              cursorLabel="Escribir"
              className="eyebrow inline-block bg-copper px-8 py-4.5 text-espresso-deep transition-colors duration-400 hover:bg-copper-light focus-visible:outline-bone"
            >
              <span className="flex items-center justify-center gap-3 whitespace-nowrap">
                <WhatsappIcon className="h-4 w-4 shrink-0" />
                Consultar por WhatsApp
              </span>
            </MagneticButton>
          </RevealBlock>
        </div>

        {/* Los datos en una sola columna con hairlines: leen como la ficha del
            estudio, no como una grilla de features. */}
        <dl className="lg:col-span-4 lg:col-start-9">
          {datos.map((d) => (
            <div
              key={d.etiqueta}
              className="border-t border-line py-5 first:border-t-0 first:pt-0 last:border-b"
            >
              <dt className="eyebrow text-ash">{d.etiqueta}</dt>
              <dd className="mt-3 text-body text-bone">
                {d.href ? (
                  <a
                    href={d.href}
                    className="transition-colors duration-300 hover:text-copper"
                    {...(d.externo
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {d.valor}
                  </a>
                ) : (
                  d.valor
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
