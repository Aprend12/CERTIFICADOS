/**
 * Constructor del Certificado de Notas.
 * Diseño verde con tabla de calificaciones.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoNotasBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; background: #fafafa; border: 4px double #2e7d32; border-radius: 8px;">
      <div class="certificado-header" style="background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado de Notas</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.75rem;">LA VICERRECTORA ACADÉMICA<br>${this.INSTITUCION}</div>
        <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.65rem;">NIT: ${this.NIT}</div>
      </div>
      <div class="certificado-body" style="padding: 25px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin: 15px 0; font-weight: bold; font-size: 0.85rem; color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px;">CONSTANCIA DE CALIFICACIONES</div>
        <p style="text-align: justify;">El abajo firmante, Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>, certifica que:</p>
        <p style="text-align: justify; margin-top: 15px;"><strong>${o.nombre}</strong>, identificado(a) con documento de identidad No. <strong>${o.documento}</strong>, código estudiantil <strong>${o.codigo}</strong>, se encuentra matriculado(a) en el programa <strong>${o.programa}</strong> (SNIES: ${o.snies}).</p>
        <p style="margin-top: 15px; text-align: justify;">Actualmente cursa el <strong>${o.semestre}</strong> en el período académico <strong>${o.periodo}</strong>.</p>
        <p style="margin-top: 20px; text-align: justify;">Se expide la presente certificación en Bucaramanga a los <strong>${o.fecha}</strong>.</p>
      </div>
      <div class="tabla-notas" style="padding: 0 25px 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.7rem;">
          <tr style="background: #2e7d32; color: white;">
            <th style="padding: 8px; border: 1px solid #2e7d32; text-align: center;">ASIGNATURA</th>
            <th style="padding: 8px; border: 1px solid #2e7d32; text-align: center;">CRÉDITOS</th>
            <th style="padding: 8px; border: 1px solid #2e7d32; text-align: center;">NOTA</th>
          </tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Programación I'}</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">4</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : '4.2'}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 8px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Base de Datos I'}</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : '3.8'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Ingeniería de Software'}</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">4</td><td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : '4.5'}</td></tr>
        </table>
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
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #2e7d32;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
    </div>`;
  }
}
