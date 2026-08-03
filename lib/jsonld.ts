import { site } from '@/content/site'
import { areas } from '@/content/areas'
import { faq } from '@/content/faq'

const ID_ESTUDIO = `${site.url}/#estudio-juridico`

/**
 * LegalService + LocalBusiness en un solo nodo con dos `@type`: es la forma
 * correcta de declarar un estudio que ademas es un negocio con direccion fisica
 * y horario, sin duplicar la entidad en dos bloques que Google tendria que
 * reconciliar solo.
 */
export function jsonLdEstudio() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': ID_ESTUDIO,
    name: site.nombre,
    description: site.descripcionCorta,
    url: site.url,
    telephone: site.contacto.celularTel,
    email: site.contacto.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/logo/monogram.svg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.direccion.calle,
      addressLocality: site.direccion.localidad,
      addressRegion: site.direccion.provincia,
      postalCode: site.direccion.codigoPostal,
      addressCountry: site.direccion.pais,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.direccion.lat,
      longitude: site.direccion.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.horarios.dias,
        opens: site.horarios.apertura,
        closes: site.horarios.cierre,
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Argentina' },
      { '@type': 'AdministrativeArea', name: 'Provincia de Buenos Aires' },
      { '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Diego Fernando Pérez',
      jobTitle: 'Abogado',
    },
    employee: [
      { '@type': 'Person', name: 'Diego Fernando Pérez', jobTitle: 'Abogado' },
      { '@type': 'Person', name: 'Agustín Llamera', jobTitle: 'Abogado' },
    ],
    knowsLanguage: ['es-AR'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Áreas de trabajo',
      itemListElement: areas.map((a) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: a.titulo,
          description: a.bajada,
          url: `${site.url}/areas/${a.slug}`,
        },
      })),
    },
  }
}

export function jsonLdFaq() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  }
}

export function jsonLdArea(slug: string) {
  const area = areas.find((a) => a.slug === slug)
  if (!area) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: area.titulo,
    description: area.bajada,
    url: `${site.url}/areas/${area.slug}`,
    serviceType: area.titulo,
    provider: { '@id': ID_ESTUDIO },
    areaServed: { '@type': 'Country', name: 'Argentina' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Qué resolvemos en ${area.titulo.toLowerCase()}`,
      itemListElement: area.materias.map((m) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: m },
      })),
    },
  }
}

export function jsonLdBreadcrumb(items: { nombre: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      item: it.url,
    })),
  }
}

/** Serializa cortando `<` para que ningun texto pueda cerrar el <script>. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
