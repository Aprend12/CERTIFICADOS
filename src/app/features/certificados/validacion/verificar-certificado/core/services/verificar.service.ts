import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CertificadoData } from '../models/verificar.model';

export interface DescargarResponse {
  mensaje: string;
  nombre_pdf: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerificarService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  private certificadoActual = signal<CertificadoData | null>(null);

  certificado = this.certificadoActual.asReadonly();

  verificar(hash: string): Observable<DescargarResponse> {
    return this.http.get<DescargarResponse>(`${this.baseUrl}/descargar/certificado/${hash}`);
  }

  getCertificado(): CertificadoData | null {
    return this.certificadoActual();
  }

  setCertificadoData(data: CertificadoData) {
    this.certificadoActual.set(data);
  }

  limpiar() {
    this.certificadoActual.set(null);
  }
}
