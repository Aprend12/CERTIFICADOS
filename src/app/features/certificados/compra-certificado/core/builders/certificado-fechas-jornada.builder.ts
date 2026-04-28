/**
 * Dates and Schedule Certificate Constructor.
 * Professional institutional format for download.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoFechasJornadaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const hashCode = esPreview ? '' : (o.hash_code || o.numero || 'No disponible');

    const contenido = `
      ${this.getEncabezado('Constancia de Jornada', hashCode)}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 30px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${o.nombre}</strong>, identificado(a) con número de documento <strong>${o.documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: ${this.COLOR_TEXT};">${o.programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${o.snies}</strong>. El estudiante cursa el <strong>${o.semestre}</strong> semestre en el período <strong>${o.periodo}</strong>.</p>
        <p style="margin-bottom: 15px;">inició clases el <strong>${o.fecha_inicio_periodo || 'NO DISPONIBLE'}</strong> y finaliza el <strong>${o.fecha_fin_periodo || 'NO DISPONIBLE'}</strong>; <strong>Jornada de estudio</strong> ${o.jornada || 'NO DISPONIBLE'}</p>
      </div>
      <div style="margin-top: 50px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
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
        semestre: '***',
        periodo: '****-*',
        fecha: '*********************',
        codigo_verificacion: 'PREVIEW-2024-****',
        hash_code: '**************',
        fecha_inicio_periodo: '*********************',
        fecha_fin_periodo: '*********************',
        jornada: '*********************',
      };
    }
    return {
      numero: this.sanitize(datos.codigo || ''),
      nombre: this.sanitize(datos.nombre_completo || datos.nombre || ''),
      documento: this.sanitize(datos.documento),
      programa: this.sanitize(datos.programa),
      snies: this.sanitize(datos.snies),
      semestre: this.sanitize(datos.semestre),
      periodo: this.sanitize(datos.periodo),
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: this.sanitize(datos.hash_code || ''),
      fecha_inicio_periodo: this.sanitize(datos.fecha_inicio_periodo || ''),
      fecha_fin_periodo: this.sanitize(datos.fecha_fin_periodo || ''),
      jornada: this.sanitize(datos.jornada || ''),
    };
  }
}
