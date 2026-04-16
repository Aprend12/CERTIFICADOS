/**
 * Plantilla base para certificados (versión preview).
 */
import { CONSTANTES_CERTIFICADO_PREVIEW } from '../constants';

export class CertificadoPlantillaBase {
  protected readonly INSTITUCION = CONSTANTES_CERTIFICADO_PREVIEW.INSTITUCION;
  protected readonly NIT = CONSTANTES_CERTIFICADO_PREVIEW.NIT;
  protected readonly DIRECCION = CONSTANTES_CERTIFICADO_PREVIEW.DIRECCION;
  protected readonly FIRMA_NOMBRE = CONSTANTES_CERTIFICADO_PREVIEW.FIRMA_NOMBRE;
  protected readonly FIRMA_CARGO = CONSTANTES_CERTIFICADO_PREVIEW.FIRMA_CARGO;
  protected readonly LOGO = CONSTANTES_CERTIFICADO_PREVIEW.LOGO;
  
  protected readonly COLOR_PRIMARY = CONSTANTES_CERTIFICADO_PREVIEW.COLOR_PRIMARY;
  protected readonly COLOR_ACCENT = CONSTANTES_CERTIFICADO_PREVIEW.COLOR_ACCENT;
  protected readonly COLOR_TEXT = CONSTANTES_CERTIFICADO_PREVIEW.COLOR_TEXT;
  protected readonly COLOR_MUTED = CONSTANTES_CERTIFICADO_PREVIEW.COLOR_MUTED;
  protected readonly COLOR_LIGHT = CONSTANTES_CERTIFICADO_PREVIEW.COLOR_LIGHT;
  protected readonly COLOR_BORDER = CONSTANTES_CERTIFICADO_PREVIEW.COLOR_BORDER;

  protected getMarcosDecorativos(): string {
    return '';
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
        ${this.getMarcosDecorativos()}
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

  protected maskValue(value: string | undefined, defaultValue: string): string {
    if (!value || value.trim() === '') {
      return defaultValue;
    }
    const length = value.length;
    return '*'.repeat(Math.min(length, 30));
  }
}

export function formatFechaCompleta(fecha: string): string {
  if (!fecha) return '';
  const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
}