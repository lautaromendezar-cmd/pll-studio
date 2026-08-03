import localFont from 'next/font/local'

/**
 * Auto-hospedadas desde /app/fonts. Nada de <link> a Google Fonts: un request
 * bloqueante a otro origen antes del primer texto se paga en LCP.
 * Licencia: Fontshare (ITF Free Font License), uso comercial permitido.
 */

export const sentient = localFont({
  variable: '--font-sentient',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  // Genera una @font-face de respaldo con las metricas de Sentient aplicadas a
  // Times New Roman. Sin esto, el reflow al entrar la fuente real mueve el hero
  // entero: medido, 0.028 de CLS solo por este cambio.
  adjustFontFallback: 'Times New Roman',
  // Solo el peso 300. Sentient se usa exclusivamente en Light en todo el sitio,
  // asi que el Regular eran 26 KB precargados que nunca se pintaban.
  src: [
    { path: './fonts/Sentient-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Sentient-LightItalic.woff2', weight: '300', style: 'italic' },
  ],
})

export const switzer = localFont({
  variable: '--font-switzer',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
  src: [
    { path: './fonts/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Switzer-Medium.woff2', weight: '500', style: 'normal' },
  ],
})
