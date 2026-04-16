export interface VerificarCertificadoResponse {
  valido: boolean;
  mensaje: string;
  certificado?: CertificadoData;
}

export interface Programa {
  nombre: string;
  snies: string;
  nivel?: string;
  jornada?: string;
  modalidad?: string;
}

export interface CertificadoData {
  tipo_certificado: string;
  nombre_completo: string;
  documento: string;
  codigo_estudiante: string;
  programa: string;
  snies: string;
  fecha_expedicion: string;
  hash: string;
  nombre_pdf: string;
  html?: string;
  programas?: Programa[];
}
