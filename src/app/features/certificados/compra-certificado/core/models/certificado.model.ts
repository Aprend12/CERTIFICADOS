// Modelos de datos para el sistema de certificados académicos.

export interface CertificadoDatos {
  documento_identidad: string;
  numero_estudiante: string;
  numero_programa: string;
  tipo_certificado: string;
  nombreEstudiante: string;
}

// Interfaz que representa los datos completos del certificado.

export interface DatosCertificado {
  documento: string;
  nombre: string;
  programa: string;
  snies: string;
  semestre: string;
  periodo: string;
  fecha_expedicion: string;
  fecha_inicio: string;
  fecha_fin: string;
  jornada: string;
  codigo: string;
}

// Tipos de certificados disponibles en el sistema.

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

// Mapeo de tipos de certificado a sus títulos descriptivos.

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

// Interfaz base para constructores de certificados.
export interface CertificadoBuilder {
  build(datos: DatosCertificado, esPreview: boolean): string;
}
