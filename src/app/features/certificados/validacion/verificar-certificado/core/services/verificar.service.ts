import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CertificadoData, Programa } from '../models/verificar.model';

const API_CONFIG = {
  baseUrl: '/certificado'
};

export interface VerificarError {
  action_code: string;
  mensaje: string;
}

export interface DescargarResponse {
  mensaje: string;
  nombre_pdf: string;
  programas?: Programa[];
  action_code?: string;
}

export interface VerificarCertificadoRequest {
  hash_code: string;
  documento_estudiante: string;
}

export interface VerificarCertificadoResponse {
  action_code: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerificarService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_CONFIG.baseUrl;

  private certificadoActual = signal<CertificadoData | null>(null);
  private programasDisponibles = signal<Programa[]>([]);

  certificado = this.certificadoActual.asReadonly();
  programas = this.programasDisponibles.asReadonly();

  verificar(hash: string): Observable<DescargarResponse | VerificarError> {
    return this.http.get<DescargarResponse>(`${this.baseUrl}/descargar/certificado/${hash}`).pipe(
      timeout(15000),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          return of({
            action_code: 'TIMEOUT',
            mensaje: 'La verificación tardó demasiado. Por favor, intenta nuevamente.',
            nombre_pdf: '',
            programas: []
          } as VerificarError);
        }
        return of({
          action_code: 'ERROR',
          mensaje: err.error?.mensaje || 'Error al verificar el certificado',
          nombre_pdf: '',
          programas: []
        } as VerificarError);
      })
    );
  }

  verificarCertificado(body: VerificarCertificadoRequest): Observable<VerificarCertificadoResponse> {
    return this.http.post<VerificarCertificadoResponse>(`${this.baseUrl}/verificar`, body);
  }

  getCertificado(): CertificadoData | null {
    return this.certificadoActual();
  }

  setCertificadoData(data: CertificadoData) {
    this.certificadoActual.set(data);
  }

  setProgramasDisponibles(programas: Programa[]) {
    this.programasDisponibles.set(programas);
  }

  getProgramasDisponibles(): Programa[] {
    return this.programasDisponibles();
  }

  limpiar() {
    this.certificadoActual.set(null);
    this.programasDisponibles.set([]);
  }
}