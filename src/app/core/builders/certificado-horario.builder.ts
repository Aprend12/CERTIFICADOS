/**
 * Constructor del Certificado con Horario.
 * Diseño naranja con tabla de horario.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoHorarioBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 0 auto; background: #fff; border: 3px solid #e65100; border-radius: 8px;">
      <div class="certificado-header" style="background: linear-gradient(135deg, #e65100 0%, #ef6c00 100%); color: white; padding: 20px; border-radius: 6px 6px 0 0;">
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado con Horario y Fechas</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.75rem;">${this.INSTITUCION}</div>
        <div style="text-align: center; margin-top: 5px; font-size: 0.65rem;">NIT: ${this.NIT}</div>
      </div>
      <div class="certificado-body" style="padding: 25px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <p style="text-align: justify;">El suscribiente, Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>, certifica:</p>
        <p style="margin-top: 15px; text-align: justify;"><strong>${o.nombre}</strong>, identificado(a) con CC No. <strong>${o.documento}</strong>, código <strong>${o.codigo}</strong>, estudiante del programa <strong>${o.programa}</strong> (SNIES: ${o.snies}).</p>
        <p style="margin-top: 15px; text-align: justify;">Se encuentra matriculado(a) en el <strong>${o.semestre}</strong>, período <strong>${o.periodo}</strong>, jornada <strong>${o.jornada}</strong>.</p>
        
        <div style="margin-top: 25px; background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #e65100;">
          <div style="font-weight: bold; color: #e65100; margin-bottom: 15px; text-align: center;">HORARIO DE CLASES</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.7rem;">
            <tr style="background: #e65100; color: white;">
              <th style="padding: 8px; border: 1px solid #e65100;">DÍA</th>
              <th style="padding: 8px; border: 1px solid #e65100;">HORA</th>
              <th style="padding: 8px; border: 1px solid #e65100;">ASIGNATURA</th>
              <th style="padding: 8px; border: 1px solid #e65100;">AULA</th>
            </tr>
            <tr><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '****' : 'Lunes'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '***' : '07:00 - 10:00'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Programación II'}</td><td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : 'Lab 3'}</td></tr>
            <tr style="background: #f5f5f5;"><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '****' : 'Martes'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '***' : '10:00 - 12:00'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Base de Datos II'}</td><td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : 'Lab 1'}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '****' : 'Miércoles'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '***' : '07:00 - 10:00'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Programación II'}</td><td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : 'Lab 3'}</td></tr>
            <tr style="background: #f5f5f5;"><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '****' : 'Jueves'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '***' : '14:00 - 17:00'}</td><td style="padding: 6px; border: 1px solid #ddd;">${esPreview ? '*************' : 'Ingeniería de Software'}</td><td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${esPreview ? '***' : 'Aula 205'}</td></tr>
          </table>
        </div>
        <p style="margin-top: 20px; text-align: justify;">Se expide en Bucaramanga a los <strong>${o.fecha}</strong>.</p>
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
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #e65100;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
    </div>`;
  }
}
