/**
 * Constructor del Certificado con Horario.
 * Formato profesional institucional para descarga.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoHorarioBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const hashCode = esPreview ? '' : (o.hash_code || o.numero || 'No disponible');

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
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Código</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Grupo</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Horario</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Docente</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Desarrollo de Software III</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">DSW-301</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">A</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Sáb 7:00-12:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Ing. Carlos Mendoza</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Base de Datos II</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">BD-201</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">A</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Sáb 13:00-16:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Ing. Ana García</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Práctica Integral I</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">PI-101</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">A</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Sáb 16:00-18:00</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">Ing. Luis Pérez</td>
        </tr>
      </table>
      <div style="margin-top: 30px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]} a los ${o.fecha}.</p>
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
        jornada: '*************',
        fecha: '*********************',
        codigo_verificacion: 'PREVIEW-2024-****',
        hash_code: '**************',
      };
    }
    return {
      numero: this.sanitize(datos.codigo || '1234HHZS1'),
      nombre: this.sanitize(datos.nombre_completo || datos.nombre || 'Nombre Estudiante'),
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