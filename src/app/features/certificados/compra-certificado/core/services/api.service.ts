import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  codigo_estudiante: string;
  documento: string;
  nombre: string;
  codigo: string;
  carreras: Carrera[];
  nombre_completo: string;
}

export interface Carrera {
  nivel: any;
  snies: string;
  nombre: string;
  programa: string;
}

export interface Seccion {
  id: string;
  nombre: string;
}

export interface ValidarEstudianteResponse {
  action_code: string;
  mensaje: string;
  programas_disponibles: Carrera[];
  programas?: any[];
  success: boolean;
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
    programas?: any[];
  };
}

export interface GenerarCertificadoRequest {
  documento_identidad: string;
  tipo_certificado: string[];
  snies?: string;
  nombre_completo?: string;
}

export interface GenerarCertificadoResponse {
  mensaje: string;
  pdf: string;
  hash: string;
}

export interface VerificarCertificadoResponse {
  valido: boolean;
  mensaje: string;
  certificado?: any;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  validarEstudiante(documento: string, codigoEstudiante: string, tipoCertificado: string): Observable<ValidarEstudianteResponse> {
    console.log('Llamando API con documento:', documento, 'codigo:', codigoEstudiante);
    return this.http.post<ValidarEstudianteResponse>(`${this.baseUrl}/estudiante`, {
      documento,
      tipo_certificado: tipoCertificado,
      codigo_estudiante: codigoEstudiante

    });
  }

  getSeccionesDisponibles(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.baseUrl}/secciones/disponibles`);
  }

  generarCertificado(data: GenerarCertificadoRequest): Observable<GenerarCertificadoResponse> {
    return this.http.post<GenerarCertificadoResponse>(`${this.baseUrl}/generar/certificado`, data);
  }

  descargarCertificado(nombrePdf: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/descargar/certificado/${nombrePdf}`, {
      responseType: 'blob'
    });
  }

  verificarCertificado(hash: string): Observable<VerificarCertificadoResponse> {
    return this.http.get<VerificarCertificadoResponse>(`${this.baseUrl}/verificar/certificado/${hash}`);
  }
}
