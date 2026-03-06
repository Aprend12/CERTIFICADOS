import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

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
    nombre_pdf?: string;
  };
}

export interface GenerarCertificadoRequest {
  documento_identidad: string;
  tipo_certificado: string[];
  snies?: string;
}

// Response when the server provides a download descriptor.
export interface DescargarCertificado {
  mensaje: string;
  nombre_pdf: string;
}
export interface GenerarCertificadoResponse {
  success?: boolean;               // new backend wraps result
  mensaje: string;
  // legacy fields kept for compatibility
  pdf?: string;
  hash?: string;
  data?: {
    codigo_verificacion?: string;
    hash?: string;
    fecha_expedicion?: string;
    secciones_incluidas?: any;
    ruta_pdf?: string;
    nombre_pdf?: string;
    [key: string]: any;
  };
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
  private readonly baseDownloadUrl = 'https://georgiann-cleanable-axel.ngrok-free.dev/api/descargar/certificado';

  getDownloadUrl(filename: string): string {
    if (filename.startsWith('http')) {
      return filename;
    }
    return `${this.baseDownloadUrl}/${filename}`;
  }

  validarEstudiante(documento: string, codigoEstudiante: string, tipoCertificado: string): Observable<ValidarEstudianteResponse> {
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

  /**
   * First step: ask the backend for a download descriptor that contains the
   * filename or token to fetch the actual PDF.
   */
  descargarCertificado(nombre_pdf: string): Observable<DescargarCertificado> {
    return this.http.get<DescargarCertificado>( `${this.baseUrl}/descargar/certificado/${nombre_pdf}`
    );
  }

  verificarCertificado(hash: string): Observable<VerificarCertificadoResponse> {
    return this.http.get<VerificarCertificadoResponse>(`${this.baseUrl}/verificar/certificado/${hash}`);
  }
}
