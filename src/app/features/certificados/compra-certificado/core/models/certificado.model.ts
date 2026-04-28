/**
 * Data models for certificate generation and purchase flow.
 */

/**
 * Represents a single subject/course in a student's record.
 */
export interface Materia {
  nombre: string;
  codigo?: string;
  nivel: string;
  creditos: number;
  nota: number;
  periodo?: string;
}

/** Academic period with its corresponding subjects. */
export interface PeriodoAcademico {
  periodo: string;
  materias: Materia[];
}

/** Initial data received from the API when user requests certificate info. */
export interface CertificadoDatos {
  documento: string;
  codigo_estudiante: string;
  snies: string;
  tipo_certificado: string;
  nombre_completo: string;
  hash_code?: string;
  historial_notas?: PeriodoAcademico[];
  programa_academico?: string;
  periodo_activo?: string;
  semestre_academico?: string;
  fecha_inicio_periodo?: string;
  fecha_fin_periodo?: string;
  jornada?: string;
}

/** Processed data used for building the certificate HTML. */
export interface DatosCertificado {
  documento: string;
  nombre?: string;
  nombre_completo?: string;
  programa: string;
  snies: string;
  semestre: string;
  periodo: string;
  fecha_expedicion: string;
  fecha_inicio: string;
  fecha_fin: string;
  jornada: string;
  codigo: string;
  hash_code?: string;
  codigo_verificacion?: string;
  materias?: Materia[];
  fecha_inicio_periodo?: string;
  fecha_fin_periodo?: string;
}

/** Available certificate types that can be requested. */
export type TipoCertificado =
  | 'sencillo'
  | 'notas'
  | 'fechas'
  | 'fechas_jornada'
  | 'pension'
  | 'homologacion'
  | 'grado'
  | 'conducta'
  | 'horario'
  | 'practica';

/** Mapping of certificate types to their display titles. */
export const TITULOS_CERTIFICADO: Record<TipoCertificado, string> = {
  sencillo: 'Certificado de Estudio Sencillo',
  notas: 'Certificado de Notas',
  fechas: 'Certificado con Fechas Académicas',
  fechas_jornada: 'Certificado con Fechas y Jornada',
  pension: 'Certificado para Pensión',
  homologacion: 'Certificado Primer Ingreso Homologado',
  grado: 'Certificado Finalización y Próxima Ceremonia',
  conducta: 'Certificado de Buena Conducta',
  horario: 'Certificado con Horario y Fechas',
  practica: 'Certificado de Práctica'
};

/** Builder interface for generating certificate HTML content. */
export interface CertificadoBuilder {
  build(datos: DatosCertificado, esPreview: boolean): string;
}