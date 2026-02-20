/**
 * Plantilla de Certificado de Notas (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoNotasBuilder implements CertificadoBuilder {
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

      <div style="text-align: center; margin-bottom: 12px;">
        <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">REGISTRO DE NOTAS</div>
      </div>

      <div style="margin-bottom: 12px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
          <tr>
            <td style="padding: 3px 0; width: 30%;"><strong>Nombre:</strong></td>
            <td style="padding: 3px 0; font-weight: bold;">*************** ***************</td>
          </tr>
          <tr>
            <td style="padding: 3px 0;"><strong>Identificación:</strong></td>
            <td style="padding: 3px 0;">**************</td>
          </tr>
          <tr>
            <td style="padding: 3px 0;"><strong>Programa:</strong></td>
            <td style="padding: 3px 0;">*********************</td>
          </tr>
          <tr>
            <td style="padding: 3px 0;"><strong>Período:</strong></td>
            <td style="padding: 3px 0;">****-*</td>
          </tr>
        </table>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 8pt;">
        <tr style="background: #e0e0e0;">
          <th style="padding: 4px; border: 0.5pt solid black; text-align: left;">Asignatura</th>
          <th style="padding: 4px; border: 0.5pt solid black; text-align: center;">HT</th>
          <th style="padding: 4px; border: 0.5pt solid black; text-align: center;">HP</th>
          <th style="padding: 4px; border: 0.5pt solid black; text-align: center;">CR</th>
          <th style="padding: 4px; border: 0.5pt solid black; text-align: center;">NF</th>
        </tr>
        <tr>
          <td style="padding: 3px; border: 0.5pt solid black;">Desarrollo de Software III</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">2</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">4</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">92</td>
        </tr>
        <tr>
          <td style="padding: 3px; border: 0.5pt solid black;">Base de Datos II</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">2</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">2</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 3px; border: 0.5pt solid black; text-align: center;">88</td>
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
