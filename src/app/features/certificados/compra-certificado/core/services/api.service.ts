import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoAcademico } from '../models/certificado.model';

const API_CONFIG = {
  baseUrl: '/certificado',
  downloadUrl: '/certificado/descargar'
};

export interface Carrera {
  nivel: string;
  snies: string;
  nombre: string;
  programa: string;
}

export interface DatosCertificadoApi {
  codigo_estudiante: string;
  documento_estudiante: string;
  hash_code: string;
  nombre_estudiante: string;
  programa_academico: string;
  snies_programa: string;
  tipo_certificado: string;
  jornada?: string;
  modalidad?: string;
  nivel_academico?: string;
  periodo_activo?: string;
  semestre_academico?: string;
  historial_notas?: PeriodoAcademico[];
  horario_clases?: string[];
  fecha_inicio_periodo?: string;
  fecha_fin_periodo?: string;
}

export interface ValidarEstudianteResponse {
  action_code: string;
  mensaje?: string;
  success?: boolean;
  datos_certificado?: DatosCertificadoApi;
  programas_disponibles?: Carrera[];
  programas?: Carrera[];
  nombre_completo?: string;
  estudiante?: {
    codigo_estudiante?: string;
    documento?: string;
    nombre?: string;
  };
  data?: {
    nombre_completo?: string;
    codigo_estudiante?: string;
    documento_identidad?: string;
    programas?: Carrera[];
    nombre_pdf?: string;
  };
}

export interface ValidarPagoRequest {
  hash_code: string;
  documento_estudiante: string;
  numero_desprendible: string;
}

export interface ValidarPagoResponse {
  action_code: string;
  mensaje?: string;
}

export interface GenerarCertificadoRequest {
  hash_code: string;
  documento_estudiante: string;
}

export interface CertificadosDataResponse {
  codigo_verificacion?: string;
  hash?: string;
  fecha_expedicion?: string;
  secciones_incluidas?: Record<string, unknown>;
  ruta_pdf?: string;
  nombre_pdf?: string;
}

export interface GenerarCertificadoResponse {
  action_code?: string;
  mensaje?: string;
  success?: boolean;
  certificado_pdf?: string;
  pdf?: string;
  hash?: string;
  data?: CertificadosDataResponse;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_CONFIG.baseUrl;
  private readonly baseDownloadUrl = API_CONFIG.downloadUrl;

  getDownloadUrl(filename: string): string {
    if (filename.startsWith('http')) {
      return filename;
    }
    return `${this.baseDownloadUrl}/${filename}`;
  }

  validarEstudiante(
    documento_estudiante: string,
    codigoEstudiante: string,
    tipoCertificado: string,
    snies_programa?: string
  ): Observable<ValidarEstudianteResponse> {
    return this.http.post<ValidarEstudianteResponse>(`${this.baseUrl}/preparar`, {
      tipo_certificado: tipoCertificado,
      documento_estudiante,
      codigo_estudiante: codigoEstudiante,
      snies_programa: snies_programa || ''
    });
  }

  validarPago(request: ValidarPagoRequest): Observable<ValidarPagoResponse> {
    return this.http.post<ValidarPagoResponse>(`${this.baseUrl}/pagar`, request);
  }

  generarCertificado(data: GenerarCertificadoRequest): Observable<GenerarCertificadoResponse> {
    return this.http.post<GenerarCertificadoResponse>(`${this.baseUrl}/generar`, data);
  }
}