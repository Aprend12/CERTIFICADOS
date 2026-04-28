/**
 * Base template for certificates.
 * Contains professional structure and styles.
 */
import { CONSTANTES_CERTIFICADO } from '../constants';

export class CertificadoPlantillaBase {
  protected readonly INSTITUCION = CONSTANTES_CERTIFICADO.INSTITUCION;
  protected readonly NIT = CONSTANTES_CERTIFICADO.NIT;
  protected readonly SNIES = CONSTANTES_CERTIFICADO.SNIES;
  protected readonly DIRECCION = CONSTANTES_CERTIFICADO.DIRECCION;
  protected readonly FIRMA_NOMBRE = CONSTANTES_CERTIFICADO.FIRMA_NOMBRE;
  protected readonly FIRMA_CARGO = CONSTANTES_CERTIFICADO.FIRMA_CARGO;
  protected readonly LOGO = CONSTANTES_CERTIFICADO.LOGO;

  protected readonly COLOR_PRIMARY = CONSTANTES_CERTIFICADO.COLOR_PRIMARY;
  protected readonly COLOR_ACCENT = CONSTANTES_CERTIFICADO.COLOR_ACCENT;
  protected readonly COLOR_TEXT = CONSTANTES_CERTIFICADO.COLOR_TEXT;
  protected readonly COLOR_MUTED = CONSTANTES_CERTIFICADO.COLOR_MUTED;
  protected readonly COLOR_BORDER = CONSTANTES_CERTIFICADO.COLOR_BORDER;

  protected getMarcosDecorativos(): string {
    return `
      <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 2px solid ${this.COLOR_PRIMARY}; pointer-events: none;"></div>
      <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid ${this.COLOR_BORDER}; pointer-events: none;"></div>
      <div style="position: absolute; top: 30px; left: 30px; width: 80px; height: 80px; border-top: 3px solid ${this.COLOR_PRIMARY}; border-left: 3px solid ${this.COLOR_PRIMARY}; pointer-events: none;"></div>
      <div style="position: absolute; top: 30px; right: 30px; width: 80px; height: 80px; border-top: 3px solid ${this.COLOR_PRIMARY}; border-right: 3px solid ${this.COLOR_PRIMARY}; pointer-events: none;"></div>
      <div style="position: absolute; bottom: 30px; left: 30px; width: 80px; height: 80px; border-bottom: 3px solid ${this.COLOR_PRIMARY}; border-left: 3px solid ${this.COLOR_PRIMARY}; pointer-events: none;"></div>
      <div style="position: absolute; bottom: 30px; right: 30px; width: 80px; height: 80px; border-bottom: 3px solid ${this.COLOR_PRIMARY}; border-right: 3px solid ${this.COLOR_PRIMARY}; pointer-events: none;"></div>`;
  }

  protected getEncabezado(titulo: string, hashCode: string): string {
    return `
      <table style="width: 100%; margin-bottom: 35px;">
        <tr>
          <td style="width: 180px; vertical-align: middle; text-align: left;">
            <img src="${this.LOGO}" alt="Logo" style="width: 5.5cm; height: auto; display: block;">
          </td>
          <td style="text-align: right; vertical-align: middle; padding-left: 20px;">
            <div style="font-size: 10pt; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px; color: ${this.COLOR_TEXT};">${titulo}</div>
            <div style="font-size: 9pt; color: ${this.COLOR_MUTED};"><strong>Código:</strong> ${hashCode}</div>
          </td>
        </tr>
      </table>`;
  }

  protected getTituloPrincipal(): string {
    return `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 11pt; font-weight: 600; text-transform: uppercase; color: ${this.COLOR_TEXT}; letter-spacing: 2px; margin-bottom: 12px;">La Vicerrectora Académica de</div>
        <div style="font-size: 15pt; font-weight: 700; text-transform: uppercase; color: ${this.COLOR_TEXT}; margin-bottom: 8px; line-height: 1.4;">${this.INSTITUCION}</div>
        <div style="font-size: 9.5pt; color: ${this.COLOR_MUTED};">NIT: ${this.NIT}</div>
      </div>
      <div style="border-bottom: 2px solid ${this.COLOR_PRIMARY}; margin: 0 auto 30px auto; width: 60%;"></div>`;
  }

  protected getFirma(): string {
    return `
      <table style="width: 100%; margin-top: 60px;">
        <tr>
          <td style="width: 50%; text-align: center; vertical-align: bottom;">
            <div style="border-top: 2px solid ${this.COLOR_PRIMARY}; width: 8cm; margin: 0 auto 12px auto;"></div>
            <p style="margin: 0; font-weight: 700; font-size: 11pt; color: ${this.COLOR_TEXT};">${this.FIRMA_NOMBRE}</p>
            <p style="margin: 0; font-size: 10pt; color: ${this.COLOR_MUTED};">${this.FIRMA_CARGO}</p>
          </td>
        </tr>
      </table>`;
  }

  protected getFooter(codigoVerificacion: string): string {
    return codigoVerificacion ? `
      <div style="margin-top: 50px; text-align: center; font-size: 8.5pt; color: ${this.COLOR_MUTED}; border-top: 1px solid ${this.COLOR_BORDER}; padding-top: 20px;">
        <div style="margin-bottom: 6px;"><strong>Código de verificación:</strong> <span style="color: ${this.COLOR_TEXT}; font-weight: 600;">${codigoVerificacion}</span></div>
        <div style="font-size: 8pt;">Verifique este certificado en: <strong>https://tecnologicadeloriente.edu.co/validar</strong></div>
      </div>` : '';
  }

  protected getWrapper(contenido: string): string {
    return `
      <div style="width: 21.59cm; min-height: 27.94cm; margin: 0 auto; position: relative; overflow: hidden; background: white; font-family: 'Calibri', 'Times New Roman', serif;">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: auto;
          opacity: 0.25;
          z-index: 0;
          pointer-events: none;
        ">
          <img src="assets/images/marca_agua.webp" alt="" style="width: 100%; height: auto;">
        </div>
        <div style="position: relative; z-index: 1; padding: 3cm 3cm 2.5cm 3cm;">
          ${contenido}
        </div>
      </div>`;
  }

  protected formatFechaCompleta(fecha: string): string {
    if (!fecha) return '';
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
  }

  protected sanitize(value: string): string {
    if (!value) return '';
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
}
