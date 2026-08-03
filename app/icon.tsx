import { ImageResponse } from 'next/og'
import { MARCA, MONOGRAM_RATIO, monogramaDataUri } from '@/lib/og-mark'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/**
 * Favicon: el monograma sobre espresso. A 64px la L italica se pierde, asi que
 * el monograma va casi a sangre — se lee como una marca, no como tres letras.
 */
export default function Icon() {
  const alto = 34
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: MARCA.espresso,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={monogramaDataUri(MARCA.bone, MARCA.copper)}
          alt=""
          width={Math.round(alto * MONOGRAM_RATIO)}
          height={alto}
        />
      </div>
    ),
    size,
  )
}
