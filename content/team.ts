export type Miembro = {
  nombre: string
  /** Rol bajo el nombre, en cobre. Opcional: si no hay, la ficha no lo muestra. */
  titulo?: string
  detalle: string
  /**
   * Ruta a la foto dentro de /public. Mientras sea `null` el bloque se resuelve con
   * tipografia y el monograma: no hay stock ni retratos inventados.
   * Cuando llegue la foto: '/equipo/diego-perez.jpg' y aparece sola.
   */
  foto: string | null
  /** Texto alternativo de la foto, obligatorio cuando `foto` deja de ser null. */
  fotoAlt?: string
}

/** Titular de la seccion. */
export const equipoTitulo = 'Un estudio con nombre y apellido.'

export const equipo: Miembro[] = [
  {
    nombre: 'Dr. Diego Fernando Pérez',
    titulo: 'Socio',
    detalle:
      'Especialista en derecho de daños, responsabilidad civil y derecho laboral. Cuenta con formación de posgrado en derecho deportivo y desarrolla una práctica orientada al diseño de estrategias jurídicas sólidas, con un enfoque basado en el rigor técnico y la atención personalizada.',
    foto: null,
  },
  {
    // TODO: el cliente lo mando sin "Dr." y sin rol, cuando antes figuraba como
    // "Dr. Agustín Llamera / Abogado / Socio". Se respeta lo que mando, pero hay
    // que confirmarlo: es el tratamiento de una persona real en su propio sitio.
    nombre: 'Agustín Llamera',
    detalle:
      'Desarrolla su actividad en las áreas de práctica del estudio, participando en el diseño de estrategias y en el seguimiento integral de los casos.',
    foto: null,
  },
]

export const equipoResto = {
  titulo: 'El equipo',
  detalle:
    'Un equipo integrado por abogados y colaboradores acompaña el desarrollo de cada caso, garantizando un trabajo coordinado y una atención cercana en todas las etapas del proceso.',
}
