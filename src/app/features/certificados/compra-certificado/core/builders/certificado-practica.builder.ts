/**
 * Constructor del Certificado de Práctica.
 * Formato profesional institucional para descarga.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoPracticaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const hashCode = esPreview ? '' : (o.hash_code || o.numero || 'No disponible');

    const contenido = `
      ${this.getEncabezado('Constancia de Prácticas', hashCode)}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 25px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${o.nombre}</strong>, identificado(a) con número de cédula <strong>${o.documento}</strong>, cursó y aprobó el ciclo de prácticas integrales, asociadas al programa <strong style="color: ${this.COLOR_TEXT};">${o.programa}</strong>, según código SNIES <strong>${o.snies}</strong>.</p>
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
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Práctica Integral I</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">6</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">VI</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">2023-1</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Práctica Integral II</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">6</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">VII</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">2023-2</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Práctica Integral III</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">6</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">VIII</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">2024-1</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY};">Práctica Integral IV</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">6</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">3</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">IX</td>
          <td style="padding: 8px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center;">2024-1</td>
        </tr>
      </table>
      <div style="margin-top: 40px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
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
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: this.sanitize(datos.hash_code || ''),
    };
  }
}