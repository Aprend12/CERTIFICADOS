/**
 * Constructor del Certificado de Práctica.
 * Formato profesional institucional para descarga.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoPracticaBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';
  private readonly LOGO = 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div style="width: 21.59cm; min-height: 27.94cm; padding: 3cm 2.5cm 2.5cm 3cm; font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.8; box-sizing: border-box; background: white;">

      <table style="width: 100%; margin-bottom: 15px;">
        <tr>
          <td style="width: 100px; vertical-align: top;">
            <img src="${this.LOGO}" alt="Logo" style="width: 4cm; height: auto;">
          </td>
          <td style="text-align: right; vertical-align: top; font-size: 10pt; padding-top: 10px;">
            <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">CONSTANCIA DE PRÁCTICAS</div>
            <strong>Número:</strong> ${o.numero}
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin-bottom: 15px;">
        <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">LA VICERRECTORA ACADÉMICA</div>
        <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">${this.INSTITUCION}</div>
        <div style="font-size: 11pt;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 2px solid #333; margin-bottom: 15px;"></div>

      <div style="margin-bottom: 25px; text-align: justify; text-indent: 1.5cm;">
        <p style="margin-bottom: 15px;"><strong>HACE CONSTAR:</strong></p>
        <p style="margin-bottom: 15px;">Que, <strong>${o.nombre}</strong>, identificado(a) con número de cédula <strong>${o.documento}</strong>, cursó y aprobó el ciclo de prácticas integrales, asociadas al programa <strong>${o.programa}</strong>, según código Snies <strong>${o.snies}</strong>.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 11pt;">
        <tr style="background: #e0e0e0;">
          <th style="padding: 10px; border: 0.5pt solid black; text-align: left; font-weight: bold;">Asignatura</th>
          <th style="padding: 10px; border: 0.5pt solid black; text-align: center; font-weight: bold;">HORAS</th>
          <th style="padding: 10px; border: 0.5pt solid black; text-align: center; font-weight: bold;">CRÉDITOS</th>
          <th style="padding: 10px; border: 0.5pt solid black; text-align: center; font-weight: bold;">SEMESTRE</th>
          <th style="padding: 10px; border: 0.5pt solid black; text-align: center; font-weight: bold;">PERIODO</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 0.5pt solid black;">Práctica Integral I</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">6</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">2023-1</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 0.5pt solid black;">Práctica Integral II</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">6</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">2023-2</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 0.5pt solid black;">Práctica Integral III</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">6</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">2024-1</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 0.5pt solid black;">Práctica Integral IV</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">6</td>
          <td style="padding: 8px; border: 0.5pt solid border: 0.5pt solid black;">3</td>
          <td style="padding: 8px; border: 0.5pt solid black; text-align: center;">2024-1</td>
        </tr>
      </table>

      <div style="margin-top: 60px; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
      </div>

      <div style="margin-top: 70px; text-align: left;">
        <div style="border-top: 1.5pt solid black; width: 8cm; margin-bottom: 12px;"></div>
        <p style="margin: 0; font-weight: bold; font-size: 12pt;">${this.FIRMA_NOMBRE}</p>
        <p style="margin: 0; font-size: 11pt;">${this.FIRMA_CARGO}</p>
      </div>

    </div>`;
  }

  private getOcultos(datos: DatosCertificado, esPreview: boolean) {
    if (esPreview) {
      return {
        numero: '*******',
        nombre: '*********************',
        documento: '**************',
        programa: '*********************',
        snies: '**********',
        semestre: '***',
        periodo: '****-*',
        fecha: '*********************',
      };
    }
    return {
      numero: this.sanitize(datos.codigo || '1234HHZS1'),
      documento: this.sanitize(datos.documento),
      programa: this.sanitize(datos.programa),
      snies: this.sanitize(datos.snies),
      semestre: this.sanitize(datos.semestre),
      periodo: this.sanitize(datos.periodo),
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
    };
  }

  private sanitize(value: string): string {
    if (!value) return '';
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  private formatFechaCompleta(fecha: string): string {
    if (!fecha) return '';
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
  }
}
