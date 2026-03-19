/**
 * Constructor del Certificado de Estudio Sencillo.
 * Formato profesional institucional para descarga.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoSencilloBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly SNIES = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';
  private readonly LOGO = 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    return `
    <div style="width: 21.59cm; min-height: 27.94cm; margin: 0 auto; position: relative; overflow: hidden; background: white; font-family: 'Times New Roman', serif;">

      <!-- Marco decorativo exterior -->
      <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 3px solid #e65100; pointer-events: none;"></div>

      <!-- Marco decorativo interior -->
      <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid #F57C00; pointer-events: none;"></div>

      <!-- Corner decorations -->
      <div style="position: absolute; top: 30px; left: 30px; width: 60px; height: 60px; border-top: 4px solid #e65100; border-left: 4px solid #e65100; pointer-events: none;"></div>
      <div style="position: absolute; top: 30px; right: 30px; width: 60px; height: 60px; border-top: 4px solid #e65100; border-right: 4px solid #e65100; pointer-events: none;"></div>
      <div style="position: absolute; bottom: 30px; left: 30px; width: 60px; height: 60px; border-bottom: 4px solid #e65100; border-left: 4px solid #e65100; pointer-events: none;"></div>
      <div style="position: absolute; bottom: 30px; right: 30px; width: 60px; height: 60px; border-bottom: 4px solid #e65100; border-right: 4px solid #e65100; pointer-events: none;"></div>

      <div style="position: relative; z-index: 1; padding: 2.5cm 2.5cm; min-height: 27.94cm;">

        <table style="width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="width: 150px; vertical-align: top; text-align: center;">
              <img src="${this.LOGO}" alt="Logo" style="width: 5cm; height: auto;">
            </td>
            <td style="text-align: right; vertical-align: top; padding-top: 15px;">
              <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; color: #e65100; letter-spacing: 1px;">CONSTANCIA DE ESTUDIO</div>
              <div style="font-size: 10pt;"><strong>Número:</strong> ${o.numero}</div>
            </td>
          </tr>
        </table>

        <div style="text-align: center; margin-bottom: 25px;">
          <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; color: #e65100; letter-spacing: 2px; margin-bottom: 8px;">LA VICERRECTORA ACADÉMICA</div>
          <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase; margin-bottom: 5px;">${this.INSTITUCION}</div>
          <div style="font-size: 10pt; color: #555;">NIT: ${this.NIT} • SNIES: ${this.SNIES}</div>
        </div>

        <div style="border-bottom: 2px solid #e65100; margin-bottom: 25px;"></div>

        <div style="margin-bottom: 30px; text-align: justify; text-indent: 1.5cm; font-size: 12pt; line-height: 1.8;">
          <p style="margin-bottom: 20px; text-align: center;"><strong style="font-size: 13pt; color: #e65100;">HACE CONSTAR:</strong></p>
          <p style="margin-bottom: 20px;">Que, <strong>${o.nombre}</strong>, identificado(a) con número de documento <strong>${o.documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong>${o.programa}</strong>, aprobado por el Ministerio de Educación según Snies <strong>${o.snies}</strong>.</p>
          <p style="margin-bottom: 20px;">El estudiante cursa actualmente el <strong>${o.semestre} semestre</strong> en el período académico <strong>${o.periodo}</strong>.</p>
          <p style="margin-bottom: 20px;">La presente certificación se expide a solicitud del interesado(a) para los fines que considere convenientes, tales como trámites ante entidades bancarias, institucionales, laborales o personales.</p>
        </div>

        <div style="margin-top: 60px; text-align: left; font-size: 11pt;">
          <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
        </div>

        <table style="width: 100%; margin-top: 50px;">
          <tr>
            <td style="width: 50%; text-align: center; vertical-align: bottom;">
              <div style="border-top: 1.5pt solid #e65100; width: 7cm; margin: 0 auto 10px auto;"></div>
              <p style="margin: 0; font-weight: bold; font-size: 11pt; color: #e65100;">${this.FIRMA_NOMBRE}</p>
              <p style="margin: 0; font-size: 10pt; color: #555;">${this.FIRMA_CARGO}</p>
            </td>
          </tr>
        </table>

        ${o.codigo_verificacion ? `
        <div style="margin-top: 40px; text-align: center; font-size: 9pt; color: #666; border-top: 1px solid #ddd; padding-top: 15px;">
          <div style="margin-bottom: 8px;">Código de verificación: <strong style="color: #e65100;">${o.codigo_verificacion}</strong></div>
          <div>Verifique este certificado en: <strong>https://tecnologicadeloriente.edu.co/validar</strong></div>
        </div>
        ` : ''}

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
        codigo_verificacion: 'PREVIEW-2024-****',
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
      codigo_verificacion: this.sanitize(datos.codigo || '1234HHZS1'),
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
