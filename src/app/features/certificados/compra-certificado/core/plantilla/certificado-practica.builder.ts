/**
 * Plantilla de Certificado de Práctica (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoPracticaBuilder implements CertificadoBuilder {
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
        <p style="margin-bottom: 8px;">Que, <strong>*************** ***************</strong>, identificado(a) con número de cédula <strong>**************</strong>, cursó y aprobó el ciclo de prácticas integrales, asociadas al programa <strong>*********************</strong>, según código Snies <strong>******</strong>.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 8pt;">
        <tr style="background: #e0e0e0;">
          <th style="padding: 6px; border: 0.5pt solid black; text-align: left; font-weight: bold;">Asignatura</th>
          <th style="padding: 6px; border: 0.5pt solid black; text-align: center; font-weight: bold;">HT</th>
          <th style="padding: 6px; border: 0.5pt solid black; text-align: center; font-weight: bold;">CR</th>
          <th style="padding: 6px; border: 0.5pt solid black; text-align: center; font-weight: bold;">SEM</th>
        </tr>
        <tr>
          <td style="padding: 4px; border: 0.5pt solid black;">Práctica Integral I</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">6</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">3</td>
        </tr>
        <tr>
          <td style="padding: 4px; border: 0.5pt solid black;">Práctica Integral II</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">6</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">3</td>
        </tr>
      </table>

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
