/**
 * Pension Certificate Template (for preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoPensionBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || 'Juan Pérez García';
    const documento = datos.documento || '1.234.567.890';
    const programa = datos.programa || 'Ingeniería de Sistemas';
    const snies = datos.snies || '108543';
    const periodo = datos.periodo || '2025-1';
    const fecha_inicio = datos.fecha_inicio_periodo || datos.fecha_inicio || '15 de enero de 2025';
    const fecha_fin = datos.fecha_fin_periodo || datos.fecha_fin || '15 de junio de 2025';

    const contenido = `
      ${this.getEncabezado('Constancia de Pensión', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 25px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1cm;">Que, ${nombre}, identificado(a) con número de documento ${documento}, se encuentra matriculado(a) en el programa de ${programa}, SNIES ${snies}.</p>
        <p style="margin-bottom: 15px;">El semestre académico inicia el <strong>${fecha_inicio}</strong> y finaliza el <strong>${fecha_fin}</strong>.</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9.5pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Concepto</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Valor</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Estado</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY};">Matrícula Semestral</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">$5.450.000</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; color: #000000; font-weight: 600;">PAGADO</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY};">Seguro Estudiantil</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">$125.000</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; color: #000000; font-weight: 600;">PAGADO</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY};">Carné</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">$35.000</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; color: #000000; font-weight: 600;">PAGADO</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY};">Certificados</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">$28.500</td>
          <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; color: #000000; font-weight: 600;">PENDIENTE</td>
        </tr>
      </table>
      <div style="margin-bottom: 20px; font-size: 10pt; text-align: justify; color: ${this.COLOR_TEXT};">
        <p>El estudiante se encuentra(a) a paz y salvo con todos los pagos correspondientes al período académico ${periodo}, a excepción de los conceptos pendientes.</p>
      </div>
      <div style="margin-top: 40px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${this.formatFechaCompleta(new Date().toISOString().split('T')[0])}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter('PREVIEW-2024-****')}
    `;

    return this.getWrapper(contenido);
  }
}