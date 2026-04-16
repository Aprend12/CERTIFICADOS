/**
 * Constructor del Certificado de Homologación.
 * Formato profesional institucional para descarga.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoHomologacionBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const hashCode = esPreview ? '' : (o.hash_code || o.numero || 'No disponible');

    const contenido = `
      ${this.getEncabezado('Constancia de Homologación', hashCode)}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 30px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color:
        ${this.COLOR_TEXT};">${o.nombre}</strong>, identificado(a) con número de documento <strong>
        ${o.documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color:
        ${this.COLOR_TEXT};">${o.programa}</strong>, según resolución ministerial SNIES No. <strong>${o.snies}</strong>.
        El/la estudiante fue admitido(a) mediante proceso de homologación al programa de <strong style="color: ${this.COLOR_TEXT};">${o.programa}</strong>.
        El/la estudiante cumple con todos los requisitos de admisión y homologación establecidos por la institución y por el Ministerio de Educación Nacional.</p>
        <p style="margin-bottom: 15px;">El período académico <strong>${o.periodo}</strong> inició el <strong>${o.fecha_inicio}</strong> y finaliza el <strong>${o.fecha_fin}</strong>.</p>
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
    return {
      numero: esPreview ? '*******' : this.sanitize(datos.codigo || '1234HHZS1'),
      nombre: esPreview ? '*********************' : this.sanitize(datos.nombre_completo || datos.nombre || 'Nombre Estudiante'),
      documento: esPreview ? '**************' : this.sanitize(datos.documento),
      programa: esPreview ? '***************' : this.sanitize(datos.programa),
      snies: esPreview ? '**********' : this.sanitize(datos.snies),
      semestre: esPreview ? '***' : this.sanitize(datos.semestre),
      periodo: esPreview ? '****-*' : this.sanitize(datos.periodo),
      fecha_inicio: esPreview ? '**** de *** de ****' : this.sanitize(datos.fecha_inicio || '15 de septiembre de 2025'),
      fecha_fin: esPreview ? '**** de *** de ****' : this.sanitize(datos.fecha_fin || '10 de enero de 2026'),
      fecha: esPreview ? '*********************' : this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: esPreview ? 'PREVIEW-2024-****' : this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: esPreview ? '**************' : this.sanitize(datos.hash_code || ''),
    };
  }
}
