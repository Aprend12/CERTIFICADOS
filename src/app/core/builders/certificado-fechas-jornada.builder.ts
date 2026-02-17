/**
 * Constructor del Certificado con Fechas y Jornada.
 * Diseño verde azulado con tarjetas de información.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoFechasJornadaBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Verdana', sans-serif; max-width: 800px; margin: 0 auto; background: linear-gradient(to bottom, #e8f5e9, #fff); border: 3px solid #00897b; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div class="certificado-header" style="background: linear-gradient(135deg, #00897b 0%, #00695c 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado con Fechas y Jornada</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.75rem;">${this.INSTITUCION}</div>
        <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.65rem;">NIT: ${this.NIT}</div>
      </div>
      <div class="certificado-body" style="padding: 25px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin: 15px 0; font-weight: bold; font-size: 0.85rem; color: #00695c; background: #b2dfdb; padding: 10px; border-radius: 5px;">INFORMACIÓN ACADÉMICA COMPLETA</div>
        <p style="text-align: justify;">El suscribiente, Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>, certifica que:</p>
        <p style="text-align: justify; margin-top: 15px; padding: 15px; background: #fff; border-radius: 8px; border: 1px solid #b2dfdb;"><strong>${o.nombre}</strong>, identificado(a) con documento <strong>${o.documento}</strong>, código estudiantil <strong>${o.codigo}</strong>, se encuentra matriculado(a) en el programa <strong>${o.programa}</strong>, SNIES: <strong>${o.snies}</strong>.</p>
        <div style="display: flex; gap: 15px; margin-top: 20px;">
          <div style="flex: 1; background: #e0f2f1; padding: 15px; border-radius: 8px; border-left: 4px solid #00897b;">
            <div style="font-weight: bold; color: #00695c; margin-bottom: 10px;">DATOS DEL PERÍODO</div>
            <p style="margin: 5px 0;"><strong>Semestre:</strong> ${o.semestre}</p>
            <p style="margin: 5px 0;"><strong>Período:</strong> ${o.periodo}</p>
            <p style="margin: 5px 0;"><strong>Jornada:</strong> ${o.jornada}</p>
          </div>
          <div style="flex: 1; background: #e0f2f1; padding: 15px; border-radius: 8px; border-left: 4px solid #00897b;">
            <div style="font-weight: bold; color: #00695c; margin-bottom: 10px;">FECHAS IMPORTANTES</div>
            <p style="margin: 5px 0;"><strong>Inicio:</strong> ${o.fechaInicio}</p>
            <p style="margin: 5px 0;"><strong>Fin:</strong> ${o.fechaFin}</p>
            <p style="margin: 5px 0;"><strong>Expedición:</strong> ${o.fecha}</p>
          </div>
        </div>
        <p style="margin-top: 20px; text-align: justify; text-align: center;">Se expide la presente en Bucaramanga, a los <strong>${o.fecha}</strong>.</p>
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
      fechaInicio: esPreview ? '****-**-**' : this.formatFecha(datos.fecha_inicio),
      fechaFin: esPreview ? '****-**-**' : this.formatFecha(datos.fecha_fin),
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
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #00897b;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
    </div>`;
  }
}
