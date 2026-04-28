/**
 * Schedule Certificate Constructor.
 * Professional institutional format for download.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoHorarioBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const hashCode = esPreview ? '' : (o.hash_code || o.numero || 'No disponible');
    const tablaHorarios = this.getTablaHorarios(datos);

    const contenido = `
      ${this.getEncabezado('Constancia de Horario', hashCode)}
      ${this.getTituloPrincipal()}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr>
          <td style="padding: 10px; width: 30%; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Nombre:</td>
          <td style="padding: 10px; font-weight: 600; color: ${this.COLOR_TEXT};">${o.nombre}</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Identificación:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">${o.documento}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Programa académico:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">${o.programa}</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; background: ${this.COLOR_PRIMARY}; color: white; font-weight: 600;">Período:</td>
          <td style="padding: 10px; color: ${this.COLOR_TEXT};">${o.periodo}</td>
        </tr>
      </table>
      ${tablaHorarios}
      <div style="margin-top: 30px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]} a los ${o.fecha}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter(o.codigo_verificacion || o.hash_code)}
    `;

    return this.getWrapper(contenido);
  }

  private getTablaHorarios(datos: DatosCertificado): string {
    const materias = datos.materias || [];
    
    if (materias.length === 0) {
      return '<p style="text-align: center; color: #888;">No hay horarios registrados.</p>';
    }

    let html = `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Código</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Nivel</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Créditos</th>
        </tr>`;

    for (let i = 0; i < materias.length; i++) {
      const m = materias[i];
      html += `
        <tr style="background: ${i % 2 === 1 ? '#f7fafc' : 'white'};">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">${this.sanitize(m.nombre || '')}</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">${this.sanitize(m.codigo || '')}</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">${this.sanitize(m.nivel || '')}</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">${m.creditos || 0}</td>
        </tr>`;
    }

    html += '</table>';
    return html;
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
        jornada: '*************',
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
      semestre: this.sanitize(datos.semestre),
      periodo: this.sanitize(datos.periodo),
      jornada: this.sanitize(datos.jornada),
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: this.sanitize(datos.hash_code || ''),
    };
  }
}