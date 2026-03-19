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
    <div style="width: 21.59cm; min-height: 27.94cm; padding: 2.5cm 2.5cm; font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.8; box-sizing: border-box; background: white; position: relative;">
      <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 3px solid #e65100; pointer-events: none;"></div>
      <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid #F57C00; pointer-events: none;"></div>

      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="width: 100px; vertical-align: top; text-align: center;">
            <img src="${this.LOGO}" alt="Logo" style="width: 6cm; height: auto;">
          </td>
          <td style="text-align: right; vertical-align: top; padding-top: 10px;">
            <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; color: #e65100; letter-spacing: 1px;">CONSTANCIA DE PRÁCTICAS</div>
            <span ${esPreview ? 'style="display:none"' : ''}><strong>Número:</strong> ${o.numero}</span>
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase; color: #e65100; letter-spacing: 2px; margin-bottom: 8px;">LA VICERRECTORA ACADÉMICA</div>
        <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">${this.INSTITUCION}</div>
        <div style="font-size: 10pt; color: #555;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 2px solid #e65100; margin-bottom: 20px;"></div>

      <div style="margin-bottom: 20px; text-align: justify; text-indent: 1.5cm;">
        <p style="margin-bottom: 15px; text-align: center;"><strong style="font-size: 12pt; color: #e65100;">HACE CONSTAR:</strong></p>
        <p style="margin-bottom: 15px;">Que, <strong>${o.nombre}</strong>, identificado(a) con número de cédula <strong>${o.documento}</strong>, cursó y aprobó el ciclo de prácticas integrales, asociadas al programa <strong>${o.programa}</strong>, según código Snies <strong>${o.snies}</strong>.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 10pt; border: 1px solid #e65100;">
        <tr style="background: #e65100; color: white;">
          <th style="padding: 10px; border: 1px solid #e65100; text-align: left; font-weight: bold;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">HP</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">HA</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">CRÉDITOS</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">SEMESTRE</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">PERIODO</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e65100;">Práctica Integral I</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">6</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">VI</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">2023-1</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #e65100;">Práctica Integral II</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">6</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">VII</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">2023-2</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e65100;">Práctica Integral III</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">6</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">VIII</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">2024-1</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #e65100;">Práctica Integral IV</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">6</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">3</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">IX</td>
          <td style="padding: 10px; border: 1px solid #e65100; text-align: center;">2024-1</td>
        </tr>
      </table>

      <div style="margin-top: 40px; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
      </div>

      <table style="width: 100%; margin-top: 40px;">
        <tr>
          <td style="width: 50%; text-align: center; vertical-align: bottom;">
            <div style="border-top: 1.5pt solid #e65100; width: 7cm; margin: 0 auto 10px auto;"></div>
            <p style="margin: 0; font-weight: bold; font-size: 11pt; color: #e65100;">${this.FIRMA_NOMBRE}</p>
            <p style="margin: 0; font-size: 10pt; color: #555;">${this.FIRMA_CARGO}</p>
          </td>
        </tr>
      </table>

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
      nombre: this.sanitize(datos.nombre_completo || datos.nombre || 'Nombre Estudiante'),
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
