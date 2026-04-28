/**
 * Schedule Certificate Template (for preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoHorarioBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || 'Diego Armando Chávez Mendoza';
    const documento = datos.documento || '9.123.456';
    const programa = datos.programa || 'Ingeniería de Sistemas';
    const periodo = datos.periodo || '2025-1';

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
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">${programa}</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Período:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">${periodo}</td>
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
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Bases de Datos II</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">ISIS-3014</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">01</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Lun 14:00-16:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Dr. Carlos Mendoza</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Ingeniería de Software</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">ISIS-3015</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">01</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Mié 10:00-12:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Dra. Ana López</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Redes de Computadores</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">ISIS-3016</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">02</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Jue 08:00-10:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Ing. Mauricio Ruiz</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Arquitectura de Computadores</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">ISIS-3017</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">01</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Vie 14:00-16:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Dr. Javier Peña</td>
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