import Link from 'next/link'
import { Monogram } from '@/components/ui/Monogram'
import { areas } from '@/content/areas'
import { site } from '@/content/site'

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-clip bg-espresso py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[16vw] bottom-0 w-[80vw] lg:w-[48vw]"
      >
        <Monogram tone="ghost" className="h-auto w-full" />
      </div>

      <div className="shell relative">
        <p className="eyebrow text-copper">Error 404</p>
        <h1 className="mt-8 max-w-[16ch] text-d1 text-bone">
          Esta página no existe. El estudio sí.
        </h1>
        <p className="measure mt-8 text-lead text-bone/70">
          Puede que el enlace esté viejo o mal escrito. Volvé al inicio o entrá
          directo al área que estabas buscando.
        </p>

        <ul className="mt-14 max-w-2xl">
          <li className="border-t border-line">
            <Link
              href="/"
              className="group/nf flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-copper"
            >
              <span className="font-display text-d3 text-bone transition-colors duration-300 group-hover/nf:text-copper">
                Inicio
              </span>
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-copper transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/nf:w-16"
              />
            </Link>
          </li>
          {areas.map((a) => (
            <li key={a.slug} className="border-t border-line last:border-b">
              <Link
                href={`/areas/${a.slug}`}
                className="group/nf flex items-center justify-between gap-6 py-5 transition-colors duration-300"
              >
                <span className="font-display text-d3 text-bone transition-colors duration-300 group-hover/nf:text-copper">
                  {a.titulo}
                </span>
                <span
                  aria-hidden="true"
                  className="block h-px w-10 bg-copper transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/nf:w-16"
                />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={site.contacto.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-14 inline-block bg-copper px-8 py-4 text-espresso-deep transition-colors duration-400 hover:bg-copper-light focus-visible:outline-bone"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  )
}
