import { ImageResponse } from 'next/og'
import { MARCA, MONOGRAM_RATIO, monogramaDataUri } from '@/lib/og-mark'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const alto = 82
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
