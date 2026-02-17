/**
 * Constructor del Certificado de Homologación.
 * Diseño amarillo/naranja.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoHomologacionBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; background: #fffde7; border: 4px solid #f9a825; border-radius: 8px;">
      <div class="certificado-header" style="background: linear-gradient(135deg, #f9a825 0%, #f57f17 100%); color: white; padding: 20px; border-radius: 6px 6px 0 0;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado Primer Ingreso Homologado</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.75rem;">${this.INSTITUCION}</div>
        <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.65rem;">NIT: ${this.NIT} - Sistema de Homologación</div>
      </div>
      <div class="certificado-body" style="padding: 25px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin: 15px 0; font-weight: bold; font-size: 0.85rem; color: #f57f17; border: 2px dashed #f9a825; padding: 10px;">PRIMER INGRESO HOMOLOGADO</div>
        <p style="text-align: justify;">La Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>, certifica que:</p>
        <p style="text-align: justify; margin-top: 15px; background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #f9a825;"><strong>${o.nombre}</strong>, identificado(a) con CC/TI No. <strong>${o.documento}</strong>, código estudiantil <strong>${o.codigo}</strong>, fue admitido(a) mediante proceso de homologación al programa <strong>${o.programa}</strong> (SNIES: ${o.snies}).</p>
        <p style="margin-top: 15px; text-align: justify;">El estudiante se encuentra actualmente matriculado(a) en el <strong>${o.semestre}</strong>, período académico <strong>${o.periodo}</strong>, jornada <strong>${o.jornada}</strong>.</p>
        <p style="margin-top: 20px; text-align: justify;">Se expide la presente certificación en Bucaramanga a los <strong>${o.fecha}</strong>.</p>
      </div>
      ${this.buildFooter()}
    </div>`;
  }

  private getOcultos(datos: DatosCertificado, esPreview: boolean) {
    return {
      nombre: esPreview ? '******* ****** ******' : this.sanitize(datos.nombre),
      documento: esPreview ? '**************' : this.sanitize(datos.documento),
      codigo: esPreview ? '***********' : this.sanitize(datos.codigo),
      programa: esPreview ? '***************' : this.sanitize(datos.programa),
      snies: esPreview ? '**********' : this.sanitize(datos.snies),
      semestre: esPreview ? '**************' : this.sanitize(datos.semestre),
      periodo: esPreview ? '***************' : this.sanitize(datos.periodo),
      jornada: esPreview ? '*********************' : this.sanitize(datos.jornada),
      fecha: esPreview ? '*********************' : this.formatFecha(datos.fecha_expedicion),
    };
  }

  private sanitize(value: string): string {
    if (!value) return '';
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  private formatFecha(fecha: string): string {
    if (!fecha) return '';
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
  }

  private buildFooter(): string {
    return `
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #f9a825;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
    </div>`;
  }
}
