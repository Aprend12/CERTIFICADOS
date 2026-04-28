/**
 * Degree Certificate Template (for preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoGradoBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || 'María Camila Rodríguez López';
    const documento = datos.documento || '52.987.654';
    const programa = datos.programa || 'Administración de Empresas';
    const snies = datos.snies || '106789';

    const contenido = `
      ${this.getEncabezado('Constancia de Finalización de Estudios', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 35px; text-align: justify; font-size: 12pt; line-height: 2; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 25px; text-align: center;">
          <span style="font-size: 13pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 20px; text-indent: 2cm;">Que, <strong style="color: ${this.COLOR_TEXT}; font-size: 13pt;">${nombre}</strong>, identificado(a) con cédula de ciudadanía N° <strong>${documento}</strong>, cursó y aprobó las asignaturas del plan de estudio del programa de <strong style="color: ${this.COLOR_TEXT};">${programa}</strong>, según SNIES <strong>${snies}</strong>.</p>
        <p style="margin-bottom: 20px;">El estudiante completó satisfactoriamente su formación académica y cumple con todos los requisitos establecidos por la institución para la obtención del título.</p>
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