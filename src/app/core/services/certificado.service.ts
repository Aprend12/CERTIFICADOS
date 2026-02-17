// Servicio principal para la gestión de certificados académicos.

import { Injectable, inject } from '@angular/core';
import { CertificadoDatos, DatosCertificado, TITULOS_CERTIFICADO, TipoCertificado } from '../models/certificado.model';
import { HtmlBuilderService } from './html-builder.service';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  // Constantes del programa académico
  private readonly PROGRAMA = 'Tecnología en Desarrollo de Software';
  private readonly JORNADA = 'Diurna';
  private readonly SEMESTRE = 'Quinto Semestre';
  private readonly PERIODO = '2025-1';

  // Almacena los datos actuales del certificado
  private datos!: CertificadoDatos;

  // Inyección del servicio para construir el HTML
  private htmlBuilder = inject(HtmlBuilderService);

//  Establece los datos del certificado.

  setDatos(data: CertificadoDatos) {
    this.datos = data;
  }

// Obtiene los datos actuales del certificado.

  getDatos(): CertificadoDatos {
    return this.datos;
  }

// Limpia los datos del certificado, reiniciando el estado.

  limpiar() {
    this.datos = {} as CertificadoDatos;
  }

// Obtiene el título del certificado según el tipo.

  getTitulo(tipo: string): string {
    const tipoValido = tipo as TipoCertificado;
    if (!this.esTipoValido(tipoValido)) {
      return 'para pension';
    }
    return TITULOS_CERTIFICADO[tipoValido];
  }

//  Verifica si un tipo de certificado es válido.

  private esTipoValido(tipo: string): tipo is TipoCertificado {
    return tipo in TITULOS_CERTIFICADO;
  }

// Genera la vista previa del certificado en formato HTML.

  generarPreview(datos: CertificadoDatos): string {
    if (!datos.tipo_certificado || !this.esTipoValido(datos.tipo_certificado)) {
      return '<p class="preview-placeholder">Seleccione un tipo de certificado y complete los datos para ver la vista previa</p>';
    }

    const datosCertificado = this.mapearDatos(datos);
    return this.htmlBuilder.build(datos.tipo_certificado as TipoCertificado, datosCertificado, true);
  }

//Genera el certificado final en formato HTML.

  generarCertificadoFinal(datos: CertificadoDatos): string {
    if (!datos.tipo_certificado || !this.esTipoValido(datos.tipo_certificado)) {
      return '';
    }
    const datosCertificado = this.mapearDatos(datos);
    return this.htmlBuilder.build(datos.tipo_certificado as TipoCertificado, datosCertificado, false);
  }

// Mapea los datos del usuario a los datos del certificado.

  private mapearDatos(datos: CertificadoDatos): DatosCertificado {
    return {
      nombre: 'EL ESTUDIANTE',
      documento: datos.documento_identidad || '',
      programa: this.PROGRAMA,
      snies: datos.numero_programa || '',
      semestre: this.SEMESTRE,
      periodo: this.PERIODO,
      fecha_expedicion: new Date().toISOString().split('T')[0],
      fecha_inicio: this.calcularFechaInicio(),
      fecha_fin: this.calcularFechaFin(),
      jornada: this.JORNADA,
      codigo: datos.numero_estudiante || ''
    };
  }

  /**
   * Calcula la fecha de inicio del semestre actual.
   * @returns Fecha en formato ISO
   */
  private calcularFechaInicio(): string {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - (parseInt(this.SEMESTRE.split(' ')[0]) || 5) * 6);
    return fecha.toISOString().split('T')[0];
  }

  /**
   * Calcula la fecha de fin (fecha actual).
   * @returns Fecha actual en formato ISO
   */
  private calcularFechaFin(): string {
    return new Date().toISOString().split('T')[0];
  }
}
