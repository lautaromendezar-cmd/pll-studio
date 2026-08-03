export type Paso = { numero: string; titulo: string; texto: string }

export const proceso: Paso[] = [
  {
    numero: '01',
    titulo: 'Entrevista',
    texto: 'Escuchamos el caso y revisamos la documentación disponible.',
  },
  {
    numero: '02',
    titulo: 'Análisis y estrategia',
    texto: 'Te explicamos tus derechos, las opciones reales y cuál conviene.',
  },
  {
    numero: '03',
    titulo: 'Reclamo extrajudicial y mediación',
    texto: 'Muchos casos se resuelven acá.',
  },
  {
    numero: '04',
    titulo: 'Demanda',
    texto:
      'Si hay que ir a juicio, vamos. Te mantenemos informado de cada novedad.',
  },
]

export const procesoCierre =
  'No tenés que preocuparte por lo técnico. De eso nos ocupamos nosotros.'
