/**
 * Plantilla de Certificado de Horario (para preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoHorarioBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || '*********************';
    const documento = datos.documento || '**************';

    const contenido = `
      ${this.getEncabezado('Constancia de Horario', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr>
          <td style="padding: 10px; width: 30%; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Nombre:</td>
          <td style="padding: 10px; font-weight: 600; color: ${this.COLOR_TEXT};">${nombre}</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Identificación:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">${documento}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Programa académico:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">*********************</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Período:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">****-*</td>
        </tr>
      </table>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Código</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Grupo</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Horario</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Docente</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">******</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">**************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*********************</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">******</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">**************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*********************</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">******</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">**************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*********************</td>
        </tr>
      </table>
      <div style="margin-top: 30px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${this.formatFechaCompleta(new Date().toISOString().split('T')[0])}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter('PREVIEW-2024-****')}
    `;

    return this.getWrapper(contenido);
  }
}