/**
 * Constructor del Certificado de Práctica.
 * Diseño azul indigo con información de práctica.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoPracticaBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; background: linear-gradient(to bottom, #e8eaf6, #fff); border: 4px solid #303f9f; border-radius: 10px;">
      <div class="certificado-header" style="background: linear-gradient(135deg, #303f9f 0%, #3949ab 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <div style="text-align: center; font-size: 1.5rem; margin-bottom: 5px;">💼</div>
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado de Práctica</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.75rem;">${this.INSTITUCION}</div>
        <div style="text-align: center; font-size: 0.65rem;">NIT: ${this.NIT} - Centro de Prácticas</div>
      </div>
      <div class="certificado-body" style="padding: 30px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <p style="text-align: justify;">La Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>, certifica a quien corresponda:</p>
        <p style="margin-top: 20px; text-align: justify; background: #c5cae9; padding: 20px; border-radius: 8px; border-left: 5px solid #303f9f;">
          <strong>${o.nombre}</strong>, identificado(a) con documento No. <strong>${o.documento}</strong>, código estudiantil <strong>${o.codigo}</strong>, actualmente matriculado(a) en el programa <strong>${o.programa}</strong> (SNIES: ${o.snies}), se encuentra cursando el <strong>${o.semestre}</strong> en el período académico <strong>${o.periodo}</strong>, jornada <strong>${o.jornada}</strong>.
        </p>
        <div style="margin-top: 25px; background: #fff; padding: 20px; border-radius: 8px; border: 2px dashed #303f9f;">
          <div style="font-weight: bold; color: #303f9f; margin-bottom: 15px; text-align: center; text-transform: uppercase;">Información de Práctica</div>
          <p style="margin: 8px 0;"><strong>Modalidad:</strong> ${esPreview ? '*********************' : 'Práctica Empresarial'}</p>
          <p style="margin: 8px 0;"><strong>Empresa:</strong> ${esPreview ? '***********************' : 'Empresa de Tecnología XYZ'}</p>
          <p style="margin: 8px 0;"><strong>Fecha Inicio:</strong> ${o.fechaInicio}</p>
          <p style="margin: 8px 0;"><strong>Fecha Fin:</strong> ${o.fechaFin}</p>
          <p style="margin: 8px 0;"><strong>Horas Requeridas:</strong> ${esPreview ? '****' : '480 horas'}</p>
          <p style="margin: 8px 0;"><strong>Estado:</strong> ${esPreview ? '**********' : 'En curso'}</p>
        </div>
        <p style="margin-top: 25px; text-align: justify;">La presente certificación se expide a solicitud del interesado(a) para los trámites pertinentes, en Bucaramanga a los <strong>${o.fecha}</strong>.</p>
      </div>
      <div class="certificado-footer" style="margin-top: 20px; text-align: center; font-size: 0.6rem; padding: 20px; background: #e8eaf6; border-radius: 0 0 8px 8px;">
        <div style="border-top: 2px solid #303f9f; width: 180px; margin: 0 auto 8px;"></div>
        <div style="font-weight: bold; font-size: 0.7rem; color: #303f9f;">${this.FIRMA_NOMBRE}</div>
        <div style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
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
}
