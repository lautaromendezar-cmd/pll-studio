import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

/**
 * Flat config. `next lint` quedo deprecado en Next 15.5 y en 16 desaparece:
 * el script `npm run lint` llama a la CLI de ESLint directamente.
 */
const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // El monograma se genera desde el PDF original; los paths largos no se
      // reformatean a mano.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]

export default config
