import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoHomologacionBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';
  private readonly LOGO = 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif';

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const escala = esPreview ? 'width: 100%;' : 'width: 21.59cm;';
    const padding = esPreview ? '25px' : '3cm 2.5cm 2.5cm 3cm';
    const logoWidth = esPreview ? '60px' : '4cm';
    const spacing = esPreview ? '8px' : '15px';
    const pSpacing = esPreview ? '12px' : '25px';
    const hideInPreview = esPreview ? 'display: none;' : '';

    return `
    <div class="certificado-inner" style="${escala} min-height: 27.94cm; padding: ${padding}; font-family: 'Times New Roman', Times, serif; font-size: ${esPreview ? '10pt' : '12pt'}; line-height: 1.8; box-sizing: border-box; background: white;">

      <table style="width: 100%; margin-bottom: ${spacing};">
        <tr>
          <td style="width: 100px; vertical-align: top; ${hideInPreview}">
            <img src="${this.LOGO}" alt="Logo" style="width: ${logoWidth}; height: auto;">
          </td>
          <td style="text-align: right; vertical-align: top; font-size: ${esPreview ? '8pt' : '10pt'}; padding-top: 10px;">
            <div style="font-size: ${esPreview ? '9pt' : '10pt'}; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">CONSTANCIA DE HOMOLOGACIÓN</div>
            <span ${hideInPreview}><strong>Número:</strong> ${o.numero}</span>
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin-bottom: ${spacing};">
        <div style="font-size: ${esPreview ? '10pt' : '12pt'}; font-weight: bold; text-transform: uppercase;">LA VICERRECTORA ACADÉMICA</div>
        <div style="font-size: ${esPreview ? '10pt' : '12pt'}; font-weight: bold; text-transform: uppercase;">${this.INSTITUCION}</div>
        <div style="font-size: ${esPreview ? '9pt' : '11pt'};">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 2px solid #333; margin-bottom: ${spacing};"></div>

      <div style="margin-bottom: ${pSpacing}; text-align: justify; text-indent: 1.5cm;">
        <p style="margin-bottom: ${spacing};"><strong>HACE CONSTAR:</strong></p>
        <p style="margin-bottom: ${spacing};">Que, <strong>asd</strong>, identificado(a) con número de documento <strong>${o.documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong>${o.programa}</strong>, modalidad virtual, aprobado por el Ministerio de Educación según resolución <strong>014875</strong>.</p>
        <p style="margin-bottom: ${spacing};">El estudiante cursará el <strong>${o.semestre} semestre</strong> en el período académico <strong>${o.periodo}</strong>, producto del reconocimiento de la titulación previa de Tecnólogo en Análisis y Desarrollo de Software del SENA.</p>
        <p style="margin-bottom: ${spacing};">El período académico inició el <strong>lunes 15 de septiembre de 2025</strong> y finaliza el <strong>sábado 10 de enero de 2026</strong>.</p>
      </div>

      <div style="margin-top: ${esPreview ? '40px' : '80px'}; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
      </div>

      <div style="margin-top: ${esPreview ? '40px' : '70px'}; text-align: left;">
        <div style="border-top: 1.5pt solid black; width: 8cm; margin-bottom: 12px;"></div>
        <p style="margin: 0; font-weight: bold; font-size: ${esPreview ? '9pt' : '12pt'};">${this.FIRMA_NOMBRE}</p>
        <p style="margin: 0; font-size: ${esPreview ? '8pt' : '11pt'};">${this.FIRMA_CARGO}</p>
      </div>

    </div>`;
  }

  private getOcultos(datos: DatosCertificado, esPreview: boolean) {
    return {
      numero: esPreview ? '*******' : this.sanitize(datos.codigo || '1234HHZS1'),

      documento: esPreview ? '**************' : this.sanitize(datos.documento),
      programa: esPreview ? '***************' : this.sanitize(datos.programa),
      snies: esPreview ? '**********' : this.sanitize(datos.snies),
      semestre: esPreview ? '***' : this.sanitize(datos.semestre),
      periodo: esPreview ? '****-*' : this.sanitize(datos.periodo),
      fecha: esPreview ? '*********************' : this.formatFechaCompleta(datos.fecha_expedicion),
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
