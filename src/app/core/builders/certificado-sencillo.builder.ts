/**
 * Constructor del Certificado de Estudio Sencillo.
 * Diseño clásico con borde azul oscuro.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoSencilloBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; background: #fff; border: 3px solid #1a237e; border-radius: 8px;">
      <div class="certificado-header" style="background: linear-gradient(135deg, #1a237e 0%, #283593 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado de Estudio Sencillo</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.75rem;">LA VICERRECTORA ACADÉMICA<br>${this.INSTITUCION}</div>
        <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.65rem;">NIT: ${this.NIT}</div>
      </div>
      <div class="certificado-body" style="padding: 25px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin: 15px 0; font-weight: bold; font-size: 0.8rem; color: #1a237e;">HACE CONSTAR</div>
        <p style="text-align: justify;">Que, <strong>${o.nombre}</strong>, identificado(a) con número de documento <strong>${o.documento}</strong> (Código: ${o.codigo}), se encuentra actualmente matriculado(a) en el programa de educación superior <strong>${o.programa}</strong>, aprobado por el Ministerio de Educación Nacional según registro SNIES No. <strong>${o.snies}</strong>.</p>
        <p style="margin-top: 15px; text-align: justify;">El presente certificado se expide a solicitud del interesado(a) para los fines que considere convenientes.</p>
        <p style="margin-top: 20px; text-align: justify;">Se expide en Bucaramanga, Santander, a los <strong>${o.fecha}</strong>.</p>
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
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #1a237e;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
      <div style="margin-top: 15px; font-size: 0.55rem; color: #999;">Documento generado por el Sistema de Certificados Académicos</div>
    </div>`;
  }
}
