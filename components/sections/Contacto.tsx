import { MagneticButton } from '@/components/ui/MagneticButton'
import { Reveal, RevealBlock } from '@/components/ui/Reveal'
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

export function Contacto() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="bg-espresso-deep pb-[var(--space-section)] pt-[var(--space-section-lg)]"
    >
      <div className="shell">
        <p className="eyebrow text-ash">{site.contactoSeccion.eyebrow}</p>

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

        {/* El CTA ocupa casi todo el ancho: es la unica accion del sitio.
            En hover NO se rellena de cobre — un plano cobre de 1300px de ancho
            convierte el acento en fondo y el sitio entero se vuelve terracota.
            El feedback es una keyline que se dibuja sobre el borde superior. */}
        <RevealBlock className="mt-14" y={20}>
          <MagneticButton
            href={site.contacto.whatsapp}
            external
            cursorLabel="Escribir"
            className="group/cta relative block w-full border border-copper/35 px-7 py-9 transition-colors duration-500 hover:border-copper/70 sm:px-12 sm:py-14"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 block h-px origin-left scale-x-0 bg-copper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/cta:scale-x-100"
            />
            <span className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <span className="font-display text-d1 text-bone transition-colors duration-500 group-hover/cta:text-copper">
                Consultar por WhatsApp
              </span>
              <span
                aria-hidden="true"
                className="eyebrow flex shrink-0 items-center gap-4 whitespace-nowrap pb-2 text-copper"
              >
                {site.contacto.celular}
                <span className="block h-px w-10 bg-current transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/cta:w-20" />
              </span>
            </span>
          </MagneticButton>
        </RevealBlock>

        <dl className="mt-20 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {datos.map((d) => (
            <div key={d.etiqueta} className="border-t border-line py-6">
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
