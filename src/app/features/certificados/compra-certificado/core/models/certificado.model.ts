export interface CertificadoDatos {
  documento: string;
  codigo_estudiante: string;
  snies: string;
  tipo_certificado: string;
  nombre_completo: string;
}

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
}

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

export interface CertificadoBuilder {
  build(datos: DatosCertificado, esPreview: boolean): string;
}
