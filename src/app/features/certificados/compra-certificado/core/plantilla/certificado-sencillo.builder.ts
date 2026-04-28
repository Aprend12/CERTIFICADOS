/**
 * Simple Study Certificate Template (for preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoSencilloBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || 'Juan Pérez García';
    const documento = datos.documento || '1.234.567.890';
    const programa = datos.programa || 'Ingeniería de Sistemas';
    const snies = datos.snies || '108543';
    const semestre = datos.semestre || '4';
    const periodo = datos.periodo || '2025-1';

    const contenido = `
      ${this.getEncabezado('Constancia de Estudio', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 35px; text-align: justify; font-size: 12pt; line-height: 2; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 25px; text-align: center;">
          <span style="font-size: 13pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 20px; text-indent: 2cm;">Que, <strong style="color: ${this.COLOR_TEXT}; font-size: 13pt;">${nombre}</strong>, identificado(a) con número de documento <strong>${documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: ${this.COLOR_TEXT};">${programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${snies}</strong>.</p>
        <p style="margin-bottom: 20px;">El estudiante cursa actualmente el <strong>${semestre}</strong> semestre en el período académico <strong>${periodo}</strong>.</p>
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