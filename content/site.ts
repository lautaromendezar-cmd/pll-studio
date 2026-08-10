/**
 * Datos del estudio. Todo lo que se cambia sin tocar componentes vive aca.
 * Si algo del sitio hay que editar y no esta en este archivo o en sus hermanos
 * (areas.ts, team.ts, faq.ts, proceso.ts), es un bug.
 */

const WHATSAPP_NUMERO_INTL = '5491139356458'
const WHATSAPP_MENSAJE = 'Hola, quisiera hacer una consulta.'

export const site = {
  nombre: 'PLL Estudio Jurídico',
  nombreCorto: 'PLL',
  descripcionCorta:
    'Estudio jurídico en Monte Grande, Buenos Aires. Más de 30 años en daños, derecho laboral y derecho deportivo.',

  /** Cambiar por el dominio definitivo antes de publicar. Se usa en metadata, sitemap y JSON-LD. */
  url: 'https://pllestudiojuridico.com.ar',

  contacto: {
    /** Celular / WhatsApp, tal como se muestra en pantalla. */
    celular: '11 3935-6458',
    /** Linea fija del estudio, tal como se muestra en pantalla. */
    fijo: '(011) 4290-6416',
    /** Version E.164 para los href="tel:". */
    celularTel: '+5491139356458',
    fijoTel: '+541142906416',
    email: 'pllestudiojuridico@gmail.com',
    whatsapp: `https://wa.me/${WHATSAPP_NUMERO_INTL}?text=${encodeURIComponent(WHATSAPP_MENSAJE)}`,
  },

  direccion: {
    calle: 'Dardo Rocha 123',
    localidad: 'Monte Grande',
    partido: 'Esteban Echeverría',
    provincia: 'Buenos Aires',
    codigoPostal: 'B1842',
    pais: 'AR',
    paisNombre: 'Argentina',
    /** Monte Grande, Esteban Echeverria. Usado solo en el JSON-LD. */
    lat: -34.8167,
    lng: -58.4667,
  },

  horarios: {
    texto: 'Lunes a viernes, 09:00 a 18:00',
    textoCorto: 'Lun a Vie · 09—18 h',
    /** Formato schema.org. */
    apertura: '09:00',
    cierre: '18:00',
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },

  /**
   * Redes: los iconos se maquetan igual, pero solo se renderizan las que tengan `href`.
   * Poner la URL real aca y aparecen solas.
   */
  redes: [
    { nombre: 'Instagram', abrev: 'IG', href: null as string | null }, // TODO: pendiente de cliente
    { nombre: 'Facebook', abrev: 'FB', href: null as string | null }, // TODO: pendiente de cliente
    { nombre: 'LinkedIn', abrev: 'IN', href: null as string | null }, // TODO: pendiente de cliente
  ],

  /** Cifras reales del estudio. No agregar ninguna que no se pueda sostener. */
  cifras: [
    { valor: 30, sufijo: '+', etiqueta: 'años de trayectoria' },
    { valor: 5, sufijo: '', etiqueta: 'abogados' },
    { valor: 2, sufijo: '', etiqueta: 'colaboradores' },
  ],

  /**
   * Las tres areas van con nombre propio en el menu: el visitante tiene que
   * ver de entrada que el estudio trabaja tres frentes, no un "Areas" generico.
   */
  navegacion: [
    { label: 'Daños', href: '/areas/danos-civil-y-comercial' },
    { label: 'Laboral', href: '/areas/laboral' },
    { label: 'Deportivo', href: '/areas/deportivo' },
    { label: 'El proceso', href: '/#proceso' },
    { label: 'El estudio', href: '/#estudio' },
    { label: 'Contacto', href: '/#contacto' },
  ],

  hero: {
    eyebrow: 'Estudio jurídico · Monte Grande, Buenos Aires',
    titulo: ['El derecho exige', 'más que conocimiento.', 'Exige criterio.'],
    bajada:
      'En PLL Estudio Jurídico combinamos excelencia técnica, pensamiento estratégico y atención personalizada para brindar soluciones jurídicas sólidas en cada etapa del conflicto.',
    ctaPrimario: 'Consultar por WhatsApp',
    ctaSecundario: 'Ver áreas de trabajo',
  },

  manifiesto: {
    eyebrow: 'Por qué nos eligen',
    /** Lo que va entre asteriscos se pinta en cobre. */
    parrafos: [
      'Confianza que se construye *con hechos*.',
      'Cada consulta recibe un análisis serio, una respuesta honesta y una estrategia cuidadosamente diseñada. Mantenemos una comunicación clara durante todo el proceso porque entendemos que una buena defensa también consiste en que el cliente sepa, en cada etapa, dónde está parado.',
    ],
  },

  /**
   * Apertura de la seccion de areas. El titular se parte en lineas a mano: cada
   * frase arranca en renglon propio, no se deja al wrap.
   */
  areasSeccion: {
    eyebrow: 'Áreas de trabajo',
    titulo: ['Tres áreas de práctica.', 'Un mismo estándar de excelencia.'],
  },

  alcance: {
    eyebrow: 'Alcance',
    titulo: 'Monte Grande como base. El mapa es más grande.',
    texto:
      'Con sede en Monte Grande, representamos a clientes en la Provincia de Buenos Aires y en la Ciudad Autónoma de Buenos Aires. Gracias a nuestra matrícula federal, intervenimos en asuntos en todo el país y, en materia de derecho deportivo, también en el ámbito internacional. Las consultas pueden realizarse de manera presencial o por videoconferencia.',
    anillos: [
      { label: 'Provincia de Buenos Aires', detalle: 'Zona sur y conurbano' },
      { label: 'CABA', detalle: 'Fuero civil, laboral y comercial' },
      { label: 'Todo el país', detalle: 'Matrícula federal' },
      { label: 'Internacional', detalle: 'Solo derecho deportivo · TAS/CAS' },
    ],
  },

  /**
   * Imagen del bloque "El estudio". Atmosferica: es un escritorio con una
   * lampara, no una foto documental de la oficina real ni del equipo. Cuando el
   * cliente mande fotos propias, se reemplaza el archivo y listo.
   */
  estudioImagen: {
    src: '/img/estudio.jpg',
    alt: 'Escritorio de madera oscura con una carpeta de cuero cerrada, iluminado por una lámpara de bronce en una oficina en penumbra.',
  },

  contactoSeccion: {
    eyebrow: 'Contacto',
    titulo: 'Contanos qué te pasó.',
    bajada: 'Escribinos por WhatsApp y te respondemos en horario de atención.',
  },

  legal: {
    /**
     * El cliente confirmo matricula federal pero no envio numero de matricula ni colegio.
     * No inventar: cuando lo mande, escribirlo aca y aparece en el footer.
     */
    matricula: 'Matrícula federal',
    matriculaNumero: null as string | null,
  },
} as const

export type Site = typeof site
