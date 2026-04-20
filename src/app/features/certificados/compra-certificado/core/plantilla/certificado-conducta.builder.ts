/**
 * Plantilla de Certificado de Buena Conducta (para preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoConductaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = this.maskValue(datos.nombre_completo || datos.nombre, '*********************');
    const documento = this.maskValue(datos.documento, '**************');
    const programa = this.maskValue(datos.programa, '*********************');
    const snies = this.maskValue(datos.snies, '**********');
    const semestre = this.maskValue(datos.semestre, '***');

    const contenido = `
      ${this.getEncabezado('Constancia de Buena Conducta', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 35px; text-align: justify; font-size: 12pt; line-height: 2; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 25px; text-align: center;">
          <span style="font-size: 13pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 20px; text-indent: 2cm;">Que, <strong style="color: ${this.COLOR_TEXT}; font-size: 13pt;">${nombre}</strong>, identificado(a) con cédula de ciudadanía No. <strong>${documento}</strong>, cursó el <strong>${semestre}</strong> semestre en el programa de <strong style="color: ${this.COLOR_TEXT};">${programa}</strong>, según SNIES <strong>${snies}</strong>.</p>
        <p style="margin-bottom: 20px;">Durante el tiempo de permanencia en nuestra institución, el/la estudiante presentó una <strong style="color: ${this.COLOR_TEXT};">excelente conducta académica y personal</strong>, demostrando valores éticos y profesionales destacados.</p>
      </div>
      <div style="margin-top: 60px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${this.formatFechaCompleta(new Date().toISOString().split('T')[0])}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter('PREVIEW-2024-****')}
    `;

    return this.getWrapper(contenido);
  }
}