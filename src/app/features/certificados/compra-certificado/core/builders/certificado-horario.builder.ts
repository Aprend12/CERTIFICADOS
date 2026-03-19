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
    <div style="width: 21.59cm; min-height: 27.94cm; padding: 2.5cm 2.5cm; font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.5; box-sizing: border-box; background: white; position: relative;">
      <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 3px solid #e65100; pointer-events: none;"></div>
      <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid #F57C00; pointer-events: none;"></div>

      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="width: 100px; vertical-align: top; text-align: center;">
            <img src="${this.LOGO}" alt="Logo" style="width: 6cm; height: auto;">
          </td>
          <td style="text-align: right; vertical-align: top; padding-top: 10px;">
            <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; color: #e65100; letter-spacing: 1px;">CONSTANCIA DE HORARIO</div>
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

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid #e65100;">
        <tr>
          <td style="padding: 8px; width: 30%; background: #e65100; color: white; font-weight: bold;">Nombre:</td>
          <td style="padding: 8px; font-weight: bold;">${o.nombre}</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 8px; background: #e65100; color: white; font-weight: bold;">Identificación:</td>
          <td style="padding: 8px;">${o.documento}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #e65100; color: white; font-weight: bold;">Programa académico:</td>
          <td style="padding: 8px;">${o.programa}</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 8px; background: #e65100; color: white; font-weight: bold;">Período:</td>
          <td style="padding: 8px;">${o.periodo}</td>
        </tr>
      </table>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid #e65100;">
        <tr style="background: #e65100; color: white;">
          <th style="padding: 10px; border: 1px solid #e65100; text-align: left; font-weight: bold;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">Código</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">Grupo</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">Horario</th>
          <th style="padding: 10px; border: 1px solid #e65100; text-align: center; font-weight: bold;">Docente</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e65100;">Desarrollo de Software III</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center; font-weight: bold;">DSW-301</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">A</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">Sáb 7:00-12:00</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">Ing. Carlos Mendoza</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 8px; border: 1px solid #e65100;">Base de Datos II</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center; font-weight: bold;">BD-201</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">A</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">Sáb 13:00-16:00</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">Ing. Ana García</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e65100;">Práctica Integral I</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center; font-weight: bold;">PI-101</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">A</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">Sáb 16:00-18:00</td>
          <td style="padding: 8px; border: 1px solid #e65100; text-align: center;">Ing. Luis Pérez</td>
        </tr>
      </table>

      <div style="margin-top: 30px; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]} a los ${o.fecha}.</p>
      </div>

      <table style="width: 100%; margin-top: 30px;">
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
        jornada: '*************',
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
