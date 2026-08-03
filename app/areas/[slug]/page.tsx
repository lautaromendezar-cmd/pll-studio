import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Monogram } from '@/components/ui/Monogram'
import { Reveal, RevealBlock, RevealList } from '@/components/ui/Reveal'
import { areas, getArea } from '@/content/areas'
import { site } from '@/content/site'
import { jsonLdArea, jsonLdBreadcrumb, jsonLdScript } from '@/lib/jsonld'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const area = getArea(slug)
  if (!area) return {}
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      type: 'article',
      locale: 'es_AR',
      url: `${site.url}/areas/${area.slug}`,
      title: area.metaTitle,
      description: area.metaDescription,
    },
  }
}

export default async function AreaPage({ params }: Params) {
  const { slug } = await params
  const area = getArea(slug)
  if (!area) notFound()

  const indice = areas.findIndex((a) => a.slug === area.slug)
  const siguiente = areas[(indice + 1) % areas.length]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLdArea(area.slug)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            jsonLdBreadcrumb([
              { nombre: 'Inicio', url: site.url },
              { nombre: area.titulo, url: `${site.url}/areas/${area.slug}` },
            ]),
          ),
        }}
      />

      {/* Encabezado */}
      <section className="relative overflow-clip bg-espresso pb-[var(--space-section)] pt-40 sm:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18vw] top-[8vh] w-[70vw] opacity-70 lg:w-[46vw]"
        >
          <Monogram tone="ghost" className="h-auto w-full" />
        </div>

        <div className="shell relative">
          <nav aria-label="Miga de pan" className="eyebrow flex items-center gap-3 text-ash">
            <Link href="/" className="transition-colors duration-300 hover:text-copper">
              Inicio
            </Link>
            <span aria-hidden="true" className="block h-px w-6 bg-line" />
            <span className="text-copper">Área {area.numero}</span>
          </nav>

          <Reveal
            as="h1"
            className="mt-10 max-w-[14ch] text-hero text-bone"
            stagger={0.08}
          >
            {/* Los cortes de linea son a mano: el ritmo del titular no se deja
                librado a donde caiga el wrap. */}
            {area.tituloLineas.map((linea) => (
              <span key={linea} className="block">
                {linea}
              </span>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div aria-hidden="true" className="h-px w-24 bg-copper" />
              <Reveal as="p" className="measure mt-7 text-lead text-bone/80">
                {area.bajada}
              </Reveal>

              {/* La accion arriba de todo: en una pagina de area larga, obligar a
                  bajar hasta el final para encontrar el WhatsApp es friccion. */}
              <a
                href={site.contacto.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="label"
                data-cursor-label="Escribir"
                className="group/wa eyebrow mt-10 inline-flex items-center gap-4 border-b border-line pb-3 text-bone transition-colors duration-300 hover:border-copper hover:text-copper"
              >
                Consultar por WhatsApp
                <span
                  aria-hidden="true"
                  className="block h-px w-10 bg-copper transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/wa:w-16"
                />
              </a>
            </div>
            {area.situacion && (
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="eyebrow text-ash">Situación típica</p>
                <Reveal
                  as="p"
                  className="measure mt-5 text-body text-bone/70"
                  stagger={0.05}
                >
                  {area.situacion}
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="on-bone py-[var(--space-section-lg)]">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <h2 className="eyebrow text-espresso/70">Qué hacemos</h2>
            {area.cuerpo.map((p, i) => (
              <Reveal
                key={i}
                as="p"
                className={`measure text-espresso/85 ${
                  i === 0 ? 'mt-9 font-display text-d2 text-espresso' : 'mt-7 text-lead'
                }`}
                stagger={0.06}
              >
                {p}
              </Reveal>
            ))}
          </div>

          {/* Materias: numeracion tipografica y hairlines. Sin bullets. */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
            <h2 className="eyebrow text-espresso/70">Materias</h2>
            <RevealList as="ul" className="mt-7">
              {area.materias.map((m, i) => (
                <li
                  key={m}
                  className="flex items-baseline gap-5 border-t border-line py-3.5 last:border-b"
                >
                  {/* copper-deep, no copper: sobre bone el cobre de marca da
                      3.11:1 y esto es texto de 12px. */}
                  <span className="eyebrow text-copper-deep">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-body text-espresso/80">{m}</span>
                </li>
              ))}
            </RevealList>
          </div>
        </div>
      </section>

      {/* Bloque destacado (solo laboral) */}
      {area.destacado && (
        <section className="bg-espresso-deep py-[var(--space-section-lg)]">
          <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <Reveal as="h2" className="font-display text-d1 text-bone">
                {area.destacado.titulo}
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <RevealList as="ol">
                {area.destacado.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-6 border-t border-line py-5 last:border-b"
                  >
                    <span className="eyebrow shrink-0 text-copper">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lead text-bone/80">{item}</span>
                  </li>
                ))}
              </RevealList>
              <Reveal
                as="p"
                className="measure mt-10 font-display text-d3 italic text-copper-light"
                stagger={0.05}
              >
                {area.destacado.cierre}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Diferencial */}
      <section className="bg-espresso py-[var(--space-section-lg)]">
        <div className="shell">
          <RevealBlock y={14}>
            <hr className="hairline w-24" />
          </RevealBlock>
          <Reveal
            as="p"
            className="measure mt-10 font-display text-d2 italic text-bone"
            stagger={0.07}
          >
            {area.diferencial}
          </Reveal>

          <RevealBlock className="mt-16" y={18}>
            <MagneticButton
              href={site.contacto.whatsapp}
              external
              cursorLabel="Escribir"
              className="eyebrow inline-block bg-copper px-9 py-5 text-espresso-deep transition-colors duration-400 hover:bg-copper-light focus-visible:outline-bone"
            >
              Consultar por WhatsApp
            </MagneticButton>
          </RevealBlock>
        </div>
      </section>

      {/* Area siguiente, a ancho completo */}
      <section className="bg-espresso-deep">
        <Link
          href={`/areas/${siguiente.slug}`}
          data-cursor="label"
          data-cursor-label="Ver área"
          className="group/next block border-t border-line py-[clamp(3.5rem,9vh,7rem)] transition-colors duration-500 hover:bg-espresso"
        >
          <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ash">Área siguiente · {siguiente.numero}</p>
              <p className="mt-5 font-display text-d1 text-bone transition-colors duration-500 group-hover/next:text-copper">
                {siguiente.titulo}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="block h-px w-20 bg-copper transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover/next:w-32"
            />
          </div>
        </Link>
      </section>
    </>
  )
}
