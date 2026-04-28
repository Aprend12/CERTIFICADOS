import { Injectable, inject } from '@angular/core';
import { CertificadoDatos, DatosCertificado, TITULOS_CERTIFICADO, TipoCertificado, Materia } from '../models/certificado.model';
import { HtmlBuilderService } from './html-builder.service';

/**
 * Service for managing certificate data and generation.
 * Handles data mapping between API response and certificate builder input.
 */
@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  /** Current certificate request data */
  private datos!: CertificadoDatos;
  /** Service for building HTML certificate content */
  private htmlBuilder = inject(HtmlBuilderService);

  /**
   * Stores the certificate request data.
   * @param data - The certificate data from the user input
   */
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
    const datosCertificado = this.mapearDatosPreview(datos);
    return this.htmlBuilder.build(datos.tipo_certificado as TipoCertificado, datosCertificado, true);
  }

  private mapearDatosPreview(datos: CertificadoDatos): DatosCertificado {
    return {
      documento: datos.documento || '',
      nombre: datos.nombre_completo || '',
      nombre_completo: datos.nombre_completo || '',
      programa: datos.programa_academico || '',
      snies: datos.snies || '',
      semestre: datos.semestre_academico || '',
      periodo: datos.periodo_activo || '',
      fecha_expedicion: '',
      fecha_inicio: '',
      fecha_fin: '',
      jornada: datos.jornada || '',
      codigo: '',
      hash_code: '',
      codigo_verificacion: '',
      materias: [],
      fecha_inicio_periodo: datos.fecha_inicio_periodo || '',
      fecha_fin_periodo: datos.fecha_fin_periodo || ''
    };
  }

  generarCertificadoConDatos(datos: DatosCertificado, tipoCertificado: string): string {
    if (!tipoCertificado || !this.esTipoValido(tipoCertificado)) {
      return '';
    }
    return this.htmlBuilder.build(tipoCertificado as TipoCertificado, datos, false);
  }

  private mapearDatos(datos: CertificadoDatos): DatosCertificado {
    const materias: Materia[] = this.extraerMaterias(datos);
    
    return {
      documento: datos.documento || '',
      nombre: datos.nombre_completo || '',
      nombre_completo: datos.nombre_completo || '',
      programa: datos.programa_academico || '',
      snies: datos.snies || '',
      semestre: datos.semestre_academico || '',
      periodo: datos.periodo_activo || '',
      fecha_expedicion: new Date().toISOString().split('T')[0],
      fecha_inicio: datos.fecha_inicio_periodo || '',
      fecha_fin: datos.fecha_fin_periodo || '',
      jornada: datos.jornada || '',
      codigo: datos.codigo_estudiante || '',
      hash_code: datos.hash_code || '',
      codigo_verificacion: datos.hash_code || '',
      materias: materias,
      fecha_inicio_periodo: datos.fecha_inicio_periodo || '',
      fecha_fin_periodo: datos.fecha_fin_periodo || ''
    };
  }

  private extraerMaterias(datos: CertificadoDatos): Materia[] {
    if (!datos.historial_notas || !Array.isArray(datos.historial_notas)) {
      return [];
    }
    
    return datos.historial_notas.map((m: any) => ({
      nombre: m.nombre_asignatura || m.nombre || '',
      codigo: m.codigo_asignatura || m.codigo || '',
      nivel: m.nivel || m.semestre || '',
      creditos: parseInt(m.creditos) || 0,
      nota: parseFloat(m.nota) || 0
    }));
  }

}
