import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout, catchError } from 'rxjs';
import { CertificadoData, VerificarCertificadoResponse } from '../models/verificar.model';

const API_CONFIG = {
  baseUrl: '/certificado'
};

export interface VerificarCertificadoRequest {
  hash_code: string;
  documento_estudiante: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerificarService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_CONFIG.baseUrl;

  verificarCertificado(body: VerificarCertificadoRequest): Observable<VerificarCertificadoResponse> {
    return this.http.post<VerificarCertificadoResponse>(`${this.baseUrl}/verificar`, body).pipe(
      timeout(10000),
      catchError(err => {
        console.error('Error en servicio:', err);
        throw err;
      })
    );
  }

  descargarCertificado(hash_code: string, documento_estudiante: string): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/descargar`, {
      hash_code,
      documento_estudiante
    }, { responseType: 'blob' });
  }

  limpiar() {}
}