import { Injectable } from '@angular/core';
import { CertificadoDatos } from '../models/certificado.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private datos!: CertificadoDatos;

  setDatos(data: CertificadoDatos) {
    this.datos = data;
  }

  getDatos(): CertificadoDatos {
    return this.datos;
  }

  limpiar() {
    this.datos = {} as CertificadoDatos;
  }
}
