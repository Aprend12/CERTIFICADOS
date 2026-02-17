/**
 * Constructor del Certificado de Buena Conducta.
 * Diseño azul con escudo y constancia verde.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoConductaBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div class="certificado-container" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; background: #fff; border: 3px solid #1565c0; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <div class="certificado-header" style="background: #1565c0; color: white; padding: 20px; border-radius: 6px 6px 0 0; display: flex; align-items: center; justify-content: center; gap: 20px;">
        <div style="font-size: 2rem;">🛡️</div>
        <div>
          <div class="certificado-title" style="font-weight: bold; font-size: 1rem; text-transform: uppercase;">Certificado de Buena Conducta</div>
          <div style="font-size: 0.7rem; margin-top: 5px;">${this.INSTITUCION}</div>
        </div>
      </div>
      <div class="certificado-body" style="padding: 30px; font-size: 0.75rem; line-height: 1.6; color: #333;">
        <p style="text-align: justify;">La Vicerrectora Académica de la <strong>${this.INSTITUCION}</strong> (NIT: ${this.NIT}),</p>
        <p style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 0.9rem; color: #1565c0;">CERTIFICA</p>
        <p style="text-align: justify;">Que <strong>${o.nombre}</strong>, identificado(a) con documento de identificación personal No. <strong>${o.documento}</strong>, código estudiantil <strong>${o.codigo}</strong>, es estudiante del programa <strong>${o.programa}</strong> (SNIES: ${o.snies}).</p>
        <div style="background: #e8f5e9; border: 2px solid #4caf50; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
          <div style="font-size: 1.2rem; color: #2e7d32; font-weight: bold;">✓ CONSTANCIA DE CONDUCTA</div>
          <p style="margin-top: 10px; color: #2e7d32;">Durante su estancia en la institución, el estudiante ha mantenido una conducta <strong>EJEMPLAR</strong> y <strong>RESPETUOSA</strong>, cumpliendo con todas las normas institucionales y demostrando valores éticos positivos.</p>
        </div>
        <p style="margin-top: 15px; text-align: justify;">Actualmente cursa el <strong>${o.semestre}</strong> en el período académico <strong>${o.periodo}</strong>, en jornada <strong>${o.jornada}</strong>.</p>
        <p style="margin-top: 20px; text-align: justify;">Se expide la presente a solicitud del interesado(a) en Bucaramanga, a los <strong>${o.fecha}</strong>.</p>
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
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem; padding-top: 20px; border-top: 2px solid #1565c0;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 180px; margin: 0 auto 8px;"></div>
      <div class="firma-nombre" style="font-weight: bold; font-size: 0.7rem;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo" style="color: #666; font-size: 0.6rem;">${this.FIRMA_CARGO}</div>
    </div>`;
  }
}
