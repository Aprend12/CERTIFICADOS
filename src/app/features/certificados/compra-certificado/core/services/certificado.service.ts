import { Injectable, inject } from '@angular/core';
import { CertificadoDatos, DatosCertificado, TITULOS_CERTIFICADO, TipoCertificado } from '../models/certificado.model';
import { HtmlBuilderService } from './html-builder.service';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  private readonly PROGRAMA = 'Tecnología en Desarrollo de Software';
  private readonly JORNADA = 'Diurna';
  private readonly SEMESTRE = 'Quinto Semestre';
  private readonly PERIODO = '2025-1';

  private datos!: CertificadoDatos;
  private htmlBuilder = inject(HtmlBuilderService);

  setDatos(data: CertificadoDatos) {
    this.datos = data;
  }

  getDatos(): CertificadoDatos {
    return this.datos;
  }

  limpiar() {
    this.datos = {} as CertificadoDatos;
  }

  getTitulo(tipo: string): string {
    const tipoValido = tipo as TipoCertificado;
    if (!this.esTipoValido(tipoValido)) {
      return 'para pension';
    }
    return TITULOS_CERTIFICADO[tipoValido];
  }

  private esTipoValido(tipo: string): tipo is TipoCertificado {
    return tipo in TITULOS_CERTIFICADO;
  }

  generarPreview(datos: CertificadoDatos): string {
    if (!datos.tipo_certificado || !this.esTipoValido(datos.tipo_certificado)) {
      return '<p class="preview-placeholder">Seleccione un tipo de certificado y complete los datos para ver la vista previa</p>';
    }
    const datosCertificado = this.mapearDatos(datos);
    return this.htmlBuilder.build(datos.tipo_certificado as TipoCertificado, datosCertificado, true);
  }

  generarCertificadoFinal(datos: CertificadoDatos): string {
    if (!datos.tipo_certificado || !this.esTipoValido(datos.tipo_certificado)) {
      return '';
    }
    const datosCertificado = this.mapearDatos(datos);
    return this.htmlBuilder.build(datos.tipo_certificado as TipoCertificado, datosCertificado, false);
  }

  private mapearDatos(datos: CertificadoDatos): DatosCertificado {
    return {
      documento: datos.documento || '',
      programa: this.PROGRAMA,
      snies: datos.snies || '',
      semestre: this.SEMESTRE,
      periodo: this.PERIODO,
      fecha_expedicion: new Date().toISOString().split('T')[0],
      fecha_inicio: this.calcularFechaInicio(),
      fecha_fin: this.calcularFechaFin(),
      jornada: this.JORNADA,
      codigo: datos.codigo_estudiante || ''
    };
  }

  private calcularFechaInicio(): string {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - (parseInt(this.SEMESTRE.split(' ')[0]) || 5) * 6);
    return fecha.toISOString().split('T')[0];
  }

  private calcularFechaFin(): string {
    return new Date().toISOString().split('T')[0];
  }
}
