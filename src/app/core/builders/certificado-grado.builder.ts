/**
 * Constructor del Certificado de Grado.
 * Diseño púrpura elegante con emoji de graduación.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoGradoBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%); border: 5px solid #7b1fa2; border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);">
      <div class="certificado-header" style="background: linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; text-align: center;">
        <div style="font-size: 1.5rem; margin-bottom: 10px;">🎓</div>
        <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado Finalización y Próxima Ceremonia</div>
        <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.8rem;">${this.INSTITUCION}</div>
        <div style="text-align: center; margin-top: 10px; font-size: 0.7rem;">NIT: ${this.NIT}</div>
      </div>
      <div class="certificado-body" style="padding: 30px; font-size: 0.75rem; line-height: 1.8; color: #212121;">
        <div style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 0.9rem; color: #7b1fa2; text-transform: uppercase; letter-spacing: 2px;">Certificación de Estudios y Grado</div>
        <p style="text-align: justify;">El suscribiente, <strong>${this.FIRMA_NOMBRE}</strong>, Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong>, en uso de sus facultades legales,</p>
        <p style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 0.85rem;">CERTIFICA QUE:</p>
        <p style="text-align: justify; background: #f3e5f5; padding: 20px; border-radius: 8px; border-left: 5px solid #7b1fa2;"><strong>${o.nombre}</strong>, identificado(a) con documento de identidad No. <strong>${o.documento}</strong>, código estudiantil <strong>${o.codigo}</strong>, se encuentra matriculado(a) actualmente en el programa <strong>${o.programa}</strong>, programa registrado ante el SNIES con el No. <strong>${o.snies}</strong>.</p>
        <p style="margin-top: 20px; text-align: justify;">El estudiante ha completado los requisitos académicos del <strong>${o.semestre}</strong> en el período <strong>${o.periodo}</strong>, encontrándose en proceso de trámite para la próxima ceremonia de grado.</p>
        <div style="background: #7b1fa2; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
          <strong>PRÓXIMA CEREMONIA DE GRADO: ${esPreview ? '***************' : '15 de Mayo de 2026'}</strong>
        </div>
        <p style="margin-top: 25px; text-align: justify; text-align: center;">Se expide la presente en Bucaramanga, a los <strong>${o.fecha}</strong>.</p>
      </div>
      <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.65rem; padding: 20px; background: #f5f5f5; border-radius: 0 0 8px 8px;">
        <div style="border-top: 2px solid #7b1fa2; width: 200px; margin: 0 auto 10px;"></div>
        <div style="font-weight: bold; font-size: 0.75rem; color: #4a148c;">${this.FIRMA_NOMBRE}</div>
        <div style="color: #666;">${this.FIRMA_CARGO}</div>
        <div style="margin-top: 15px; font-size: 0.55rem; color: #999;">${this.INSTITUCION}</div>
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
