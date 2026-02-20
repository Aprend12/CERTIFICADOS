/**
 * Plantilla de Certificado con Fechas Académicas (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoFechasBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';

  build(datos: DatosCertificado): string {
    return `
    <div style="width: 100%; min-height: 27.94cm; padding: 25px; font-family: 'Times New Roman', Times, serif; font-size: 10pt; line-height: 1.8; box-sizing: border-box; background: white;">
      
      <div style="text-align: center; margin-bottom: 8px; padding-top: 20px;">
        <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase;">${this.INSTITUCION}</div>
        <div style="font-size: 9pt;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 2px solid #333; margin-bottom: 8px;"></div>

      <div style="margin-bottom: 12px; text-align: justify; text-indent: 1.5cm;">
        <p style="margin-bottom: 8px;"><strong>HACE CONSTAR:</strong></p>
        <p style="margin-bottom: 8px;">Que, <strong>*************** ***************</strong>, identificado(a) con número de documento <strong>**************</strong>, se encuentra matriculado(a) actualmente en el programa de <strong>*********************</strong>, aprobado por el Ministerio de Educación según Snies <strong>******</strong>.</p>
        <p style="margin-bottom: 8px;">El estudiante cursa actualmente el <strong>***</strong> semestre en el período académico <strong>****-*</strong>.</p>
        <p style="margin-bottom: 8px;">El período académico inició el <strong>lunes 28 de julio de 2025</strong> y finaliza el <strong>sábado 29 de noviembre de 2025</strong>.</p>
      </div>

      <div style="margin-top: 40px; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ********************.</p>
      </div>

      <div style="margin-top: 40px; text-align: left;">
        <div style="border-top: 1.5pt solid black; width: 8cm; margin-bottom: 12px;"></div>
        <p style="margin: 0; font-size: 8pt;">Vicerrectora Académica</p>
      </div>

    </div>`;
  }
}
