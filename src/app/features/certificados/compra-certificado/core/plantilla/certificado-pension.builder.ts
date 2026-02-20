/**
 * Plantilla de Certificado de Pensión (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoPensionBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';

  build(datos: DatosCertificado): string {
    return `
    <div style="width: 100%; min-height: 27.94cm; padding: 25px; font-family: 'Times New Roman', Times, serif; font-size: 10pt; line-height: 1.5; box-sizing: border-box; background: white;">

      <div style="text-align: center; margin-bottom: 8px; padding-top: 20px;">
        <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase;">${this.INSTITUCION}</div>
        <div style="font-size: 10pt;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 2px solid #333; margin-bottom: 8px;"></div>

      <div style="margin-bottom: 12px; text-align: justify; text-indent: 1cm;">
        <p style="margin: 5px 0;"><strong>HACE CONSTAR:</strong></p>
        <p style="margin: 5px 0;">Que, *************** ***************, identificado(a) con número de documento **************, se encuentra matriculado(a) en el programa de *********************, Snies ******.</p>
        <p style="margin: 5px 0;">El semestre académico inicia el 28 de julio de 2025 y finaliza el 29 de noviembre de 2025.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 8pt;">
        <tr style="background: #e0e0e0;">
          <th style="padding: 6px; border: 0.5pt solid black; text-align: left;">Concepto</th>
          <th style="padding: 6px; border: 0.5pt solid black; text-align: center;">Valor</th>
          <th style="padding: 6px; border: 0.5pt solid black; text-align: center;">Estado</th>
        </tr>
        <tr>
          <td style="padding: 4px; border: 0.5pt solid black;">Matrícula Semestral</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">$ 4.500.000</td>
          <td style="padding: 4px; border: 0.5pt solid black; text-align: center;">Cancelado</td>
        </tr>
      </table>

      <div style="margin-top: 40px; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ********************.</p>
      </div>

      <div style="margin-top: 40px; text-align: left;">
        <div style="border-top: 1pt solid black; width: 8cm; margin-bottom: 10px;"></div>
        <p style="margin: 0; font-size: 8pt;">Vicerrectora Académica</p>
      </div>

    </div>`;
  }
}
