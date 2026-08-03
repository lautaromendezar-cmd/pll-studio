export type Area = {
  slug: string
  numero: string
  titulo: string
  tituloCorto: string
  /** Titular de la pagina de area: se parte en lineas a mano para controlar el ritmo. */
  tituloLineas: string[]
  bajada: string
  cuerpo: string[]
  /** Bloque destacado opcional: la lista va con numeracion tipografica, sin bullets. */
  destacado?: {
    titulo: string
    items: string[]
    cierre: string
  }
  /** Va en italica Sentient. Es el unico lugar donde se usa. */
  diferencial: string
  situacion?: string
  /** Se listan bajo una keyline en la pagina de area. Tambien alimentan el SEO. */
  materias: string[]
  /**
   * Imagen de la seccion. Atmosferica, no documental: no afirma ser un lugar
   * concreto del estudio ni de un caso. Sin personas, y sin balanzas, martillos
   * ni columnas — ver la lista de prohibidos en DESIGN.md.
   */
  imagen: string
  imagenAlt: string
  metaTitle: string
  metaDescription: string
}

export const areas: Area[] = [
  {
    slug: 'danos-civil-y-comercial',
    numero: '01',
    titulo: 'Daños, civil y comercial',
    tituloCorto: 'Daños y civil',
    tituloLineas: ['Daños,', 'civil y', 'comercial'],
    bajada:
      'Cuando un accidente, un contrato incumplido o un patrimonio en riesgo necesitan una respuesta.',
    cuerpo: [
      'Accidentes de tránsito, daños y perjuicios, responsabilidad civil, incumplimientos contractuales, sucesiones, ejecuciones, cobro de pesos, desalojos, prescripción adquisitiva y reclamos por daño material y moral.',
      'Diseñamos la estrategia según el caso, con el objetivo de proteger el patrimonio y obtener la mayor indemnización posible.',
    ],
    situacion:
      'Sufriste un accidente, tenés un conflicto por un contrato o una sucesión trabada, o un derecho tuyo no está siendo respetado.',
    diferencial:
      'Cada caso de daños se arma distinto. Lo que define el resultado no es el reclamo, es cómo se prueba.',
    materias: [
      'Accidentes de tránsito',
      'Daños y perjuicios',
      'Responsabilidad civil',
      'Incumplimientos contractuales',
      'Sucesiones',
      'Ejecuciones y cobro de pesos',
      'Desalojos',
      'Prescripción adquisitiva',
      'Daño material y moral',
    ],
    imagen: '/img/area-danos.jpg',
    imagenAlt:
      'Calle mojada de noche vista desde adentro de un auto, con las luces de la ciudad desenfocadas a través del parabrisas.',
    metaTitle: 'Abogado de daños y accidentes de tránsito en Monte Grande',
    metaDescription:
      'Accidentes de tránsito, daños y perjuicios, sucesiones, desalojos y ejecuciones. Estudio jurídico en Monte Grande, Esteban Echeverría, con más de 30 años de trayectoria.',
  },
  {
    slug: 'laboral',
    numero: '02',
    titulo: 'Laboral',
    tituloCorto: 'Laboral',
    tituloLineas: ['Derecho', 'laboral'],
    bajada: 'Para trabajadores y para empresas. Los dos lados del mostrador.',
    cuerpo: [
      'Accidentes de trabajo, enfermedades profesionales, despidos y reclamos salariales.',
    ],
    destacado: {
      titulo: 'Lo que arruina un caso antes de empezar',
      items: [
        'Esperar demasiado para consultar.',
        'Renunciar sin asesorarse.',
        'Firmar acuerdos o recibos sin entender qué implican.',
        'Borrar mensajes, no guardar recibos de sueldo, perder pruebas.',
        'Intentar resolverlo todo con conversaciones informales, cuando hay que dejar constancia por los medios adecuados.',
      ],
      cierre:
        'En materia laboral hay plazos legales que casi nadie conoce y que pueden afectar seriamente tus derechos. Consultar a tiempo cambia el resultado del reclamo.',
    },
    diferencial:
      'El expediente laboral se gana o se pierde en los primeros quince días, cuando todavía no hay abogado de por medio.',
    materias: [
      'Accidentes de trabajo',
      'Enfermedades profesionales',
      'Despidos',
      'Reclamos salariales',
      'Asesoramiento a empresas',
    ],
    imagen: '/img/area-laboral.jpg',
    imagenAlt:
      'Nave industrial vacía al final de la jornada, con un haz de luz cálida entrando por una ventana alta y cruzando el piso de hormigón.',
    metaTitle: 'Abogado laboral en zona sur — despidos y accidentes de trabajo',
    metaDescription:
      'Accidentes de trabajo, enfermedades profesionales, despidos y reclamos salariales. Asesoramiento a trabajadores y empresas desde Monte Grande, zona sur del Gran Buenos Aires.',
  },
  {
    slug: 'deportivo',
    numero: '03',
    titulo: 'Derecho deportivo',
    tituloCorto: 'Deportivo',
    tituloLineas: ['Derecho', 'deportivo'],
    bajada: 'Una rama con reglas propias. Y un posgrado que las conoce.',
    cuerpo: [
      'Asesoramos a deportistas, clubes, asociaciones, federaciones, entrenadores y representantes. Redacción, revisión y negociación de contratos deportivos.',
      'Conflictos contractuales, procedimientos disciplinarios, transferencias, reclamos por derechos económicos y de formación, arbitrajes y actuación ante tribunales deportivos nacionales e internacionales, incluido el Tribunal Arbitral del Deporte (TAS/CAS).',
    ],
    diferencial:
      'El derecho deportivo tiene normas, reglamentos y procedimientos propios. El posgrado del Dr. Pérez aporta el entendimiento del funcionamiento interno de asociaciones, federaciones y tribunales deportivos, y de los mecanismos de resolución de conflictos de la actividad.',
    materias: [
      'Contratos deportivos',
      'Transferencias',
      'Derechos económicos y de formación',
      'Procedimientos disciplinarios',
      'Arbitrajes deportivos',
      'Tribunal Arbitral del Deporte (TAS/CAS)',
    ],
    imagen: '/img/area-deportivo.jpg',
    imagenAlt:
      'Salida del túnel de vestuarios hacia una cancha de fútbol vacía al atardecer, con las luces del estadio encendidas.',
    metaTitle: 'Abogado de derecho deportivo en Argentina — contratos y TAS/CAS',
    metaDescription:
      'Contratos deportivos, transferencias, derechos de formación, procedimientos disciplinarios y arbitrajes ante tribunales nacionales e internacionales, incluido el TAS/CAS.',
  },
]

export const getArea = (slug: string) => areas.find((a) => a.slug === slug)
