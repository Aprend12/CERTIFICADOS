/**
 * Degree Certificate Constructor.
 * Professional institutional format for download.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoGradoBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);

    const contenido = `
      ${this.getEncabezado('Constancia de Finalización de Estudios', o.hash_code || o.numero || 'No disponible')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 35px; text-align: justify; font-size: 12pt; line-height: 2; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 25px; text-align: center;">
          <span style="font-size: 13pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 20px; text-indent: 2cm;">Que, <strong style="color: ${this.COLOR_TEXT}; font-size: 13pt;">${o.nombre}</strong>, identificado(a) con cédula de ciudadanía N° <strong>${o.documento}</strong>, cursó yrió las asignaturas del plan de estudio del programa de <strong style="color: ${this.COLOR_TEXT};">${o.programa}</strong>, según SNIES <strong>${o.snies}</strong>.</p>
      </div>
      <div style="margin-top: 60px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter(o.codigo_verificacion || o.hash_code)}
    `;

    return this.getWrapper(contenido);
  }

  private getOcultos(datos: DatosCertificado, esPreview: boolean) {
    if (esPreview) {
      return {
        numero: '*******',
        nombre: '*********************',
        documento: '**************',
        programa: '*********************',
        snies: '**********',
        fecha: '*********************',
        codigo_verificacion: 'PREVIEW-2024-****',
        hash_code: '**************',
      };
    }
    return {
      numero: this.sanitize(datos.codigo || ''),
      nombre: this.sanitize(datos.nombre_completo || datos.nombre || ''),
      documento: this.sanitize(datos.documento),
      programa: this.sanitize(datos.programa),
      snies: this.sanitize(datos.snies),
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: this.sanitize(datos.hash_code || ''),
    };
  }
}