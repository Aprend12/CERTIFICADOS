/**
 * Plantilla de Certificado de Práctica (para preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoPracticaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || '*********************';
    const documento = datos.documento || '**************';

    const contenido = `
      ${this.getEncabezado('Constancia de Prácticas', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 25px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${nombre}</strong>, identificado(a) con número de cédula <strong>${documento}</strong>, cursó y aprobó el ciclo de prácticas integrales, asociadas al programa <strong style="color: ${this.COLOR_TEXT};">*********************</strong>, según código SNIES <strong>**********</strong>.</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 9.5pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">HP</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">HA</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">CRÉDITOS</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">SEMESTRE</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">PERIODO</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">***</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">****-*</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">***</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">****-*</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">***</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">****-*</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">***********************</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">*</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">***</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">****-*</td>
        </tr>
      </table>
      <div style="margin-top: 40px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${this.formatFechaCompleta(new Date().toISOString().split('T')[0])}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter('PREVIEW-2024-****')}
    `;

    return this.getWrapper(contenido);
  }
}