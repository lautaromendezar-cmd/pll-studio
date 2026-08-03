'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Monogram } from '@/components/ui/Monogram'
import { WhatsappIcon } from '@/components/ui/WhatsappIcon'
import { site } from '@/content/site'
import { getLenis, scrollToTarget } from '@/lib/lenis'

export function Header() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cerrar el menu al cambiar de ruta.
  useEffect(() => setOpen(false), [pathname])

  // Con el menu abierto: se frena el scroll y el foco no puede salirse del panel.
  useEffect(() => {
    const lenis = getLenis()
    if (!open) {
      lenis?.start()
      document.documentElement.style.removeProperty('overflow')
      return
    }

    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button')
    focusables?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const goToAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split('#')[1]
      if (!hash || pathname !== '/') return
      e.preventDefault()
      setOpen(false)
      scrollToTarget(`#${hash}`)
      history.replaceState(null, '', `#${hash}`)
    },
    [pathname],
  )

  return (
    <>
      <header
        data-compact={compact}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 data-[compact=true]:bg-espresso/80 data-[compact=true]:backdrop-blur-md"
      >
        <div className="shell flex items-center justify-between transition-[padding] duration-500 ease-[var(--ease-out-expo)] py-6 group-data-[compact=true]/header:py-3.5">
          <Link
            href="/"
            aria-label="PLL Estudio Jurídico — inicio"
            className="relative z-10 shrink-0"
            data-cursor="label"
            data-cursor-label="Inicio"
          >
            <Monogram
              tone="onDark"
              className="w-auto transition-[height] duration-500 ease-[var(--ease-out-expo)] h-8 group-data-[compact=true]/header:h-6"
            />
          </Link>

          {/* Con las tres areas sumadas, el menu entra recien en `lg`: en
              tablet los seis items mas el boton pisaban el monograma. */}
          <nav
            aria-label="Principal"
            className="hidden items-center gap-8 lg:flex"
          >
            {site.navegacion.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => goToAnchor(e, item.href)}
                className="eyebrow relative text-bone/70 transition-colors duration-300 hover:text-bone after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-500 after:ease-[var(--ease-out-expo)] hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.contacto.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="label"
              data-cursor-label="Escribir"
              className="eyebrow flex items-center gap-2.5 border border-copper/45 px-5 py-2.5 text-copper transition-colors duration-400 hover:bg-copper hover:text-espresso-deep"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              WhatsApp
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
            <span aria-hidden="true" className="relative block h-3 w-7">
              <span
                className="absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-500 ease-[var(--ease-in-out-quart)]"
                style={
                  open
                    ? { transform: 'translateY(6px) rotate(12.7deg)' }
                    : undefined
                }
              />
              <span
                className="absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500 ease-[var(--ease-in-out-quart)]"
                style={
                  open
                    ? { transform: 'translateY(-6px) rotate(-12.7deg)' }
                    : undefined
                }
              />
            </span>
          </button>
        </div>

        <hr
          aria-hidden="true"
          className="hairline origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-data-[compact=true]/header:scale-x-100"
        />
      </header>

      {/* Menu movil */}
      <div
        id="menu-movil"
        ref={panelRef}
        inert={!open || undefined}
        className={`fixed inset-0 z-40 flex flex-col justify-end bg-espresso-deep px-6 pb-12 pt-28 transition-[opacity,visibility,clip-path] duration-700 ease-[var(--ease-in-out-quart)] lg:hidden ${
          open
            ? 'visible opacity-100 [clip-path:inset(0_0_0%_0)]'
            : 'invisible opacity-0 [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <nav aria-label="Menú móvil" className="flex flex-col">
          {site.navegacion.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => goToAnchor(e, item.href)}
              className="border-t border-line py-5 font-display text-d2 text-bone transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)]"
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : '0ms',
                transform: open ? 'none' : 'translateY(18px)',
                opacity: open ? 1 : 0,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.contacto.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-10 flex items-center justify-between border border-copper/45 px-6 py-5 text-copper"
        >
          <span className="flex items-center gap-3">
            <WhatsappIcon className="h-4.5 w-4.5 shrink-0" />
            Consultar por WhatsApp
          </span>
          <span aria-hidden="true">→</span>
        </a>

        <p className="mt-8 text-util tracking-[0.02em] text-ash">
          {site.direccion.calle}, {site.direccion.localidad}
          <br />
          {site.horarios.textoCorto}
        </p>
      </div>
    </>
  )
}
