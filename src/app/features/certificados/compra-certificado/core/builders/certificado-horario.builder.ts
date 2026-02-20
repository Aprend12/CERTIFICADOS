/**
 * Constructor del Certificado con Horario.
 * Formato profesional institucional para descarga.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoHorarioBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';
  private readonly LOGO = 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div style="width: 21.59cm; min-height: 27.94cm; padding: 3cm 2.5cm 2.5cm 3cm; font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; box-sizing: border-box; background: white;">
      
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="width: 100px; vertical-align: top;">
            <img src="${this.LOGO}" alt="Logo" style="width: 4cm; height: auto;">
          </td>
          <td style="text-align: right; vertical-align: top; font-size: 10pt;">
            <strong>Número:</strong> ${o.numero}
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin-bottom: 15px;">
        <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">LA VICERRECTORA ACADÉMICA</div>
        <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">${this.INSTITUCION}</div>
        <div style="font-size: 12pt;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 2px solid #333; margin-bottom: 15px;"></div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11pt;">
        <tr>
          <td style="padding: 5px 0; width: 30%;"><strong>Nombre:</strong></td>
          <td style="padding: 5px 0; font-weight: bold;">${o.nombre}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;"><strong>Identificación:</strong></td>
          <td style="padding: 5px 0;">${o.documento}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;"><strong>Programa académico:</strong></td>
          <td style="padding: 5px 0;">${o.programa}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;"><strong>Período:</strong></td>
          <td style="padding: 5px 0;">${o.periodo}</td>
        </tr>
      </table>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11pt;">
        <tr style="background: #e0e0e0;">
          <th style="padding: 8px; border: 0.5pt solid black; text-align: left; font-weight: bold;">Asignatura</th>
          <th style="padding: 8px; border: 0.5pt solid black; text-align: center; font-weight: bold;">Código</th>
          <th style="padding: 8px; border: 0.5pt solid black; text-align: center; font-weight: bold;">Grupo</th>
          <th style="padding: 8px; border: 0.5pt solid black; text-align: center; font-weight: bold;">Horario</th>
          <th style="padding: 8px; border: 0.5pt solid black; text-align: center; font-weight: bold;">Docente</th>
        </tr>
        <tr>
          <td style="padding: 5px; border: 0.5pt solid black;">Desarrollo de Software III</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">DSW-301</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">A</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">Sáb 7:00-12:00</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">Ing. Carlos Mendoza</td>
        </tr>
        <tr>
          <td style="padding: 5px; border: 0.5pt solid black;">Base de Datos II</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">BD-201</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">A</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">Sáb 13:00-16:00</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">Ing. Ana García</td>
        </tr>
        <tr>
          <td style="padding: 5px; border: 0.5pt solid black;">Práctica Integral I</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">PI-101</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">A</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">Sáb 16:00-18:00</td>
          <td style="padding: 5px; border: 0.5pt solid black; text-align: center;">Ing. Luis Pérez</td>
        </tr>
      </table>

      <div style="margin-top: 40px; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]} a los ${o.fecha}.</p>
      </div>

      <div style="margin-top: 50px; text-align: left;">
        <div style="border-top: 1pt solid black; width: 8cm; margin-bottom: 10px;"></div>
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
        jornada: '*************',
        fecha: '*********************',
      };
    }
    return {
      numero: this.sanitize(datos.codigo || '1234HHZS1'),
      nombre: this.sanitize(datos.nombre),
      documento: this.sanitize(datos.documento),
      programa: this.sanitize(datos.programa),
      snies: this.sanitize(datos.snies),
      semestre: this.sanitize(datos.semestre),
      periodo: this.sanitize(datos.periodo),
      jornada: this.sanitize(datos.jornada),
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
