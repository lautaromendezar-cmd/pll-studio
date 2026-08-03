import Link from 'next/link'
import { Monogram, Wordmark } from '@/components/ui/Monogram'
import { site } from '@/content/site'
import { areas } from '@/content/areas'

export function Footer() {
  const year = new Date().getFullYear()
  const redes = site.redes.filter((r) => r.href)

  return (
    <footer className="bg-espresso-deep pt-20 pb-10">
      <div className="shell">
        <div className="grid gap-14 border-t border-line pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Monogram tone="onDark" className="h-14 w-auto" title="PLL Estudio Jurídico" />
            <Wordmark className="mt-4 h-2.5 w-auto text-copper/70" />
            <p className="measure-tight mt-7 text-body text-ash">
              {site.direccion.calle}, {site.direccion.localidad},
              <br />
              {site.direccion.provincia}, {site.direccion.paisNombre}.
            </p>
          </div>

          <nav aria-label="Áreas de trabajo" className="md:col-span-3">
            <h2 className="eyebrow text-ash">Áreas</h2>
            <ul className="mt-6 space-y-3">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="text-body text-bone/80 transition-colors duration-300 hover:text-copper"
                  >
                    {a.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-5">
            <h2 className="eyebrow text-ash">Contacto</h2>
            <ul className="mt-6 space-y-3 text-body">
              <li>
                <a
                  href={site.contacto.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone transition-colors duration-300 hover:text-copper"
                  data-cursor="label"
                  data-cursor-label="Escribir"
                >
                  WhatsApp {site.contacto.celular}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contacto.fijoTel}`}
                  className="text-bone/80 transition-colors duration-300 hover:text-copper"
                >
                  {site.contacto.fijo}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contacto.email}`}
                  className="text-bone/80 transition-colors duration-300 hover:text-copper"
                >
                  {site.contacto.email}
                </a>
              </li>
              <li className="pt-2 text-ash">{site.horarios.texto}</li>
            </ul>

            {redes.length > 0 && (
              <ul className="mt-8 flex gap-5">
                {redes.map((r) => (
                  <li key={r.nombre}>
                    <a
                      href={r.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={r.nombre}
                      className="eyebrow text-ash transition-colors duration-300 hover:text-copper"
                    >
                      {r.abrev}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 text-util tracking-[0.02em] text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.nombre}
            {site.legal.matriculaNumero
              ? ` · ${site.legal.matricula} ${site.legal.matriculaNumero}`
              : ` · ${site.legal.matricula}`}
          </p>
          <p>
            Sitio por{' '}
            <a
              href="https://lautaromendez.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-copper"
            >
              Lautaro Méndez
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
