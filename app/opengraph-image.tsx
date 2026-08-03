import { ImageResponse } from 'next/og'
import { site } from '@/content/site'
import {
  MARCA,
  MONOGRAM_RATIO,
  WORDMARK_RATIO,
  monogramaDataUri,
  wordmarkDataUri,
} from '@/lib/og-mark'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${site.nombre} — Abogados en Monte Grande, Buenos Aires`

/**
 * Imagen de OpenGraph: el dorso de la tarjeta.
 *
 * La marca va como SVG vectorial en data URI — no hace falta cargar ninguna
 * tipografia para el titulo, que es justamente lo que rompe estas rutas cuando
 * el runtime no encuentra el archivo de la fuente.
 */
export default function OpengraphImage() {
  const monoAlto = 250
  const wordAlto = 26

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: MARCA.espresso,
          padding: '72px 84px',
        }}
      >
        {/* Hairline cobre arriba: la misma keyline que usa el sitio. */}
        <div style={{ display: 'flex', height: 2, width: 132, background: MARCA.copper }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={monogramaDataUri(MARCA.bone, MARCA.copper)}
            alt=""
            width={Math.round(monoAlto * MONOGRAM_RATIO)}
            height={monoAlto}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wordmarkDataUri(MARCA.copper)}
            alt=""
            width={Math.round(wordAlto * WORDMARK_RATIO)}
            height={wordAlto}
            style={{ marginTop: 26, marginLeft: 6 }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `1px solid ${MARCA.ash}55`,
            paddingTop: 26,
            fontSize: 21,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: MARCA.ash,
          }}
        >
          <div style={{ display: 'flex' }}>Monte Grande, Buenos Aires</div>
          <div style={{ display: 'flex', color: MARCA.bone }}>
            Daños · Laboral · Deportivo
          </div>
        </div>
      </div>
    ),
    size,
  )
}
