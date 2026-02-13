import { Injectable } from '@angular/core';
import { CertificadoDatos, DatosCertificado, TITULOS_CERTIFICADO, TipoCertificado } from '../models/certificado.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadoGeneratorService {

  private readonly PROGRAMA = 'Tecnología en Desarrollo de Software';
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';
  private readonly JORNADA = 'Diurna';
  private readonly SEMESTRE = 'Quinto Semestre';
  private readonly PERIODO = '2025-1';

  generarPreview(datos: CertificadoDatos): string {
    if (!datos.tipo_certificado) {
      return '<p class="preview-placeholder">Seleccione un tipo de certificado y complete los datos para ver la vista previa</p>';
    }

    const datosCertificado = this.mapearDatos(datos);
    return this.buildCertificadoHTML(datos.tipo_certificado as TipoCertificado, datosCertificado, true);
  }

  getTitulo(tipo: string): string {
    return TITULOS_CERTIFICADO[tipo as TipoCertificado] || 'para pension';
  }

  generarCertificadoFinal(datos: CertificadoDatos): string {
    const datosCertificado = this.mapearDatos(datos);
    return this.buildCertificadoHTML(datos.tipo_certificado as TipoCertificado, datosCertificado, false);
  }

  private mapearDatos(datos: CertificadoDatos): DatosCertificado {
    return {
      nombre: datos.nombre || 'Daniel García Pérez',
      documento: datos.documento_identidad || '10236580',
      programa: this.PROGRAMA,
      snies: datos.numero_programa || '123456',
      semestre: this.SEMESTRE,
      periodo: this.PERIODO,
      fecha_expedicion: new Date().toISOString().split('T')[0],
      fecha_inicio: '2023-02-15',
      fecha_fin: '2025-12-10',
      jornada: this.JORNADA,
      codigo: datos.numero_estudiante || ''
    };
  }

  private buildCertificadoHTML(tipo: string, datos: DatosCertificado, esPreview: boolean): string {
    const titulo = TITULOS_CERTIFICADO[tipo as TipoCertificado] || 'para pension';
    const nombreOculto = esPreview ? '*********' : datos.nombre;
    const documentoOculto = esPreview ? '**************' : datos.documento;
    const codigoOculto = esPreview ? '***********' : datos.codigo;
    const programaOculto = esPreview ? '***************' : datos.programa;
    const sniesOculto = esPreview ? '**********' : datos.snies;
    const semestreOculto = esPreview ? '**************' : datos.semestre;
    const periodoOculto = esPreview ? '***************' : datos.periodo;
    const jornadaOculto = esPreview ? '*********************' : datos.jornada;

    return `
    <div class="certificado-header" style="font-size: 0.7rem;">
      <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold;">${titulo}</div>
      <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.65rem;">LA VICERRECTORA ACADÉMICA<br>${this.INSTITUCION}</div>
      <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.6rem;">NIT: ${this.NIT}</div>
    </div>
    <div class="hace-constar" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.7rem;">HACE CONSTAR:</div>
    <div class="certificado-body" style="font-size: 0.65rem; line-height: 1.4;">
      <p>Que, <strong>${nombreOculto}</strong>, identificado(a) con número de documento <strong>${documentoOculto}</strong> (Código: ${codigoOculto}), se encuentra matriculado(a) en el programa <strong>${programaOculto}</strong>, aprobado por el Ministerio de Educación según Snies <strong>${sniesOculto}</strong>.</p>
      <p style="margin-top: 15px;">Actualmente cursa el <strong>${semestreOculto}</strong> en el periodo académico <strong>${periodoOculto}</strong>, en jornada <strong>${jornadaOculto}</strong>.</p>
      <p style="margin-top: 15px;">Se expide a solicitud del interesado(a) en Bucaramanga a los <strong>${esPreview ? '*********************' : this.formatFecha(datos.fecha_expedicion)}</strong>.</p>
    </div>
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 150px; margin: 0 auto 5px;"></div>
      <div class="firma-nombre" style="font-weight: bold;">_________________________________________</div>
      <div class="firma-nombre" style="font-weight: bold;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo">${this.FIRMA_CARGO}</div>
    </div>`;
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
  }

  descargarCertificado(html: string, nombreArchivo: string = 'certificado.html'): void {
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
    elemento.setAttribute('download', nombreArchivo);
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  }
}
