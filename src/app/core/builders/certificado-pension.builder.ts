/**
 * Constructor del Certificado para Pensión.
 * Diseño compacto azul institucional.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoPensionBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Arial Narrow', sans-serif; max-width: 700px; margin: 0 auto; background: #fff; border: 2px solid #1565c0; border-radius: 4px;">
      <div class="certificado-header" style="background: #1565c0; color: white; padding: 15px; text-align: center;">
        <div style="font-weight: bold; font-size: 0.9rem; letter-spacing: 1px;">${this.INSTITUCION}</div>
        <div style="font-size: 0.7rem; margin-top: 5px;">NIT: ${this.NIT}</div>
      </div>
      <div style="background: #e3f2fd; padding: 10px; text-align: center; font-weight: bold; color: #1565c0; font-size: 0.8rem;">CERTIFICADO PARA PENSIÓN</div>
      <div class="certificado-body" style="padding: 20px; font-size: 0.7rem; line-height: 1.5;">
        <p style="text-align: justify;">El que suscribe, Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>,</p>
        <p style="text-align: center; margin: 15px 0; font-weight: bold;">CERTIFICA</p>
        <p style="text-align: justify;">Que <strong>${o.nombre}</strong>, identificado(a) con documento No. <strong>${o.documento}</strong>, código <strong>${o.codigo}</strong>, es estudiante activo(a) del programa <strong>${o.programa}</strong>, SNies: <strong>${o.snies}</strong>.</p>
        <p style="margin-top: 15px; text-align: justify;">Actualmente se encuentra matriculado(a) en el <strong>${o.semestre}</strong>, período <strong>${o.periodo}</strong>, en jornada <strong>${o.jornada}</strong>.</p>
        <p style="margin-top: 15px; text-align: justify;">Se expide para presentar ante instituciones de bienestar familiar o demás entidades, a los <strong>${o.fecha}</strong>.</p>
      </div>
      <div style="text-align: center; padding: 15px; font-size: 0.65rem;">
        <div style="border-top: 1px solid #000; width: 150px; margin: 0 auto 5px;"></div>
        <strong>${this.FIRMA_NOMBRE}</strong><br>
        ${this.FIRMA_CARGO}
      </div>
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
}
