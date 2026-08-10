export type Paso = {
  numero: string
  titulo: string
  texto: string
  /**
   * Imagen atmosferica del paso, generada con IA en la paleta del sitio.
   * Opcional: los pasos sin foto se resuelven con el bloque espresso y el
   * numero en cobre, que es el mismo gesto sin la imagen.
   */
  imagen?: string
}

/** Frase de apertura de la seccion, al lado del eyebrow. */
export const procesoIntro =
  'Cada etapa. Una estrategia. Un mismo acompañamiento.'

export const proceso: Paso[] = [
  {
    numero: '01',
    titulo: 'Consulta inicial',
    texto:
      'Conocemos su situación, revisamos la documentación disponible y definimos los primeros pasos.',
    imagen: '/img/proceso-entrevista.jpg',
  },
  {
    numero: '02',
    titulo: 'Análisis y estrategia',
    texto:
      'Evaluamos fortalezas, riesgos y alternativas para diseñar la estrategia jurídica más conveniente.',
    imagen: '/img/proceso-analisis.jpg',
  },
  {
    numero: '03',
    titulo: 'Reclamo extrajudicial y mediación',
    texto:
      'Siempre que sea posible, procuramos una solución eficiente mediante negociación o mediación, evitando costos y tiempos innecesarios.',
    imagen: '/img/proceso-mediacion.jpg',
  },
  {
    numero: '04',
    titulo: 'Demanda',
    texto:
      'Cuando el proceso judicial resulta necesario, asumimos la representación integral del caso y mantenemos una comunicación clara durante cada etapa.',
    imagen: '/img/proceso-demanda.jpg',
  },
  {
    numero: '05',
    titulo: 'Resolución y seguimiento',
    texto:
      'Una vez finalizado el conflicto, acompañamos la ejecución de la sentencia o del acuerdo hasta su efectivo cumplimiento.',
    imagen: '/img/proceso-resolucion.jpg',
  },
  {
    numero: '06',
    titulo: 'Prevención y asesoramiento continuo',
    texto:
      'El mejor litigio suele ser el que puede evitarse mediante un asesoramiento oportuno.',
    imagen: '/img/proceso-prevencion.jpg',
  },
]

export const procesoCierre =
  'Usted ocúpese de sus proyectos. Nosotros nos ocupamos de proteger sus derechos.'
