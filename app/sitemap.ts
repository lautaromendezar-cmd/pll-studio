import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { areas } from '@/content/areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date()
  return [
    {
      url: site.url,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...areas.map((a) => ({
      url: `${site.url}/areas/${a.slug}`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
