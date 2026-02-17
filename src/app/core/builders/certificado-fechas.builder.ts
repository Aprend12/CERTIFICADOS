/**
 * Constructor del Certificado con Fechas Académicas.
 * Diseño púrpura con recuadro de fechas.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoFechasBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; background: #fff; border: 5px solid #6a1b9a; border-radius: 0;">
      <div class="certificado-header" style="background: #6a1b9a; color: white; padding: 25px; border-bottom: 4px solid #4a148c;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase;">Certificado con Fechas Académicas</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.8rem;">${this.INSTITUCION}</div>
        <div style="text-align: center; margin-top: 10px; font-size: 0.7rem;">NIT: ${this.NIT} - Vicerrectoría Académica</div>
      </div>
      <div class="certificado-body" style="padding: 30px; font-size: 0.75rem; line-height: 1.8; color: #212121;">
        <div style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 0.9rem; color: #6a1b9a; text-transform: uppercase; letter-spacing: 1px;">Quien Suscribe</div>
        <p style="text-align: justify;"><strong>VICERRECTORA ACADÉMICA</strong> de la <strong>${this.INSTITUCION}</strong>, haciendo uso de las facultades conferidas,</p>
        <p style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 0.85rem;">HACE CONSTAR</p>
        <p style="text-align: justify;">Que <strong>${o.nombre}</strong>, identificado(a) con CC/TI No. <strong>${o.documento}</strong>, código <strong>${o.codigo}</strong>, se encuentra matriculado(a) actualmente en el programa <strong>${o.programa}</strong>, programa aprobado mediante resolución SNIES No. <strong>${o.snies}</strong>.</p>
        <div style="background: #f3e5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #6a1b9a;">
          <p style="margin: 5px 0;"><strong>Período Académico:</strong> ${o.periodo}</p>
          <p style="margin: 5px 0;"><strong>Semestre:</strong> ${o.semestre}</p>
          <p style="margin: 5px 0;"><strong>Fecha de Inicio de Matrícula:</strong> ${o.fechaInicio}</p>
          <p style="margin: 5px 0;"><strong>Fecha de Fin de Período:</strong> ${o.fechaFin}</p>
        </div>
        <p style="margin-top: 20px; text-align: justify;">La presente certificación se expide en Bucaramanga, a los <strong>${o.fecha}</strong>.</p>
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
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #6a1b9a;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
    </div>`;
  }
}
