export type Miembro = {
  nombre: string
  titulo: string
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

export const equipo: Miembro[] = [
  {
    nombre: 'Dr. Diego Fernando Pérez',
    titulo: 'Abogado',
    detalle:
      'Especialista en daños y perjuicios y derecho laboral. Posgrado en derecho deportivo.',
    foto: null,
  },
  {
    nombre: 'Dr. Agustín Llamera',
    titulo: 'Abogado',
    detalle: 'Socio.',
    foto: null,
  },
]

export const equipoResto = {
  titulo: 'El equipo',
  detalle: 'Tres abogados y dos colaboradores completan el estudio.',
}
