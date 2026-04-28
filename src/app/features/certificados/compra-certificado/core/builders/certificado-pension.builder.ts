/**
 * Pension Certificate Constructor.
 * Professional institutional format for download.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoPensionBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const totales = this.getTotales(datos);
    const hashCode = esPreview ? '' : (o.hash_code || o.numero || 'No disponible');

    const contenido = `
      ${this.getEncabezado('Constancia de Pensión', hashCode)}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 20px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1cm;">Que, ${o.nombre}, identificado(a) con número de documento ${o.documento}, se encuentra matriculado(a) en el programa de ${o.programa}, SNIES ${o.snies}.</p>
      </div>
      <div style="margin-bottom: 20px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p>El semestre académico ${o.periodo} inició el <strong>${o.fecha_inicio}</strong> y finaliza el <strong>${o.fecha_fin}</strong>. Durante este período, el/la estudiante desarrolla la siguiente carga académica:</p>
      </div>
      ${this.getTablaAsignaturas(datos)}
      <div style="margin-bottom: 20px; font-size: 10pt; text-align: justify; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 10px;"><strong>HP:</strong> Horas presenciales semanales | <strong>HA:</strong> Horas de trabajo autónomo semanales</p>
        <p style="margin-bottom: 10px;">En total son ${totales.creditos} créditos. Según el Artículo 45 del reglamento estudiantil: "Se define el crédito académico como la unidad de medida del trabajo académico. Un crédito académico corresponde a 48 horas de trabajo directo o indirecto del estudiante. Por una hora de trabajo presencial se proyectan dos de trabajo independiente."</p>
        <p style="margin-bottom: 10px;">El/la estudiante realiza ${totales.horas} horas semanales de trabajo académico (presenciales + autónomo). Se expide para presentar ante Instituciones de Bienestar Familiar o demás entidades.</p>
      </div>
      <div style="margin-top: 40px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter(o.codigo_verificacion || o.hash_code)}
    `;

    return this.getWrapper(contenido);
  }

  private getTablaAsignaturas(datos: DatosCertificado): string {
    const materias = datos.materias || [];
    const periodoActivo = datos.periodo;
    const materiasPeriodo = materias.filter(m => m.periodo === periodoActivo);
    const cellData = `text-align:center; padding:8px 4px; border:1px solid ${this.COLOR_PRIMARY}; font-size:9pt;`;

    let html = `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9.5pt; border: 1px solid ${this.COLOR_PRIMARY};">
        <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">HP</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">HA</th>
          <th style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">Créditos</th>
        </tr>
    `;

    let totalHP = 0;
    let totalHA = 0;
    let totalCreditos = 0;

    for (let i = 0; i < materiasPeriodo.length; i++) {
      const m = materiasPeriodo[i];
      const hp = m.creditos || 4;
      const ha = (m.creditos || 4) * 2;
      totalHP += hp;
      totalHA += ha;
      totalCreditos += m.creditos || 0;

      html += `
        <tr style="background: ${i % 2 === 1 ? '#f7fafc' : 'white'};">
          <td style="padding: 8px 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left;">${m.nombre}</td>
          <td style="${cellData}">${hp}</td>
          <td style="${cellData}">${ha}</td>
          <td style="${cellData} font-weight: 600;">${m.creditos}</td>
        </tr>
      `;
    }

    html += `
      <tr style="background: ${this.COLOR_PRIMARY}; color: white;">
        <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: left; font-weight: 600;">Total</td>
        <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">${totalHP}</td>
        <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">${totalHA}</td>
        <td style="padding: 10px; border: 1px solid ${this.COLOR_PRIMARY}; text-align: center; font-weight: 600;">${totalCreditos}</td>
      </tr>
    </table>`;

    return html;
  }

  private getTotales(datos: DatosCertificado) {
    const materias = datos.materias || [];
    const periodoActivo = datos.periodo;
    const materiasPeriodo = materias.filter(m => m.periodo === periodoActivo);
    const totalCreditos = materiasPeriodo.reduce((s, m) => s + (m.creditos || 0), 0);
    const totalHP = totalCreditos;
    const totalHA = totalCreditos * 2;
    const totalHoras = totalHP + totalHA;
    return { creditos: totalCreditos, horas: totalHoras };
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
        fecha_inicio: '**** de *** de ****',
        fecha_fin: '**** de *** de ****',
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
      fecha_inicio: this.formatFechaCompleta(datos.fecha_inicio_periodo || datos.fecha_inicio || ''),
      fecha_fin: this.formatFechaCompleta(datos.fecha_fin_periodo || datos.fecha_fin || ''),
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: this.sanitize(datos.hash_code || ''),
    };
  }
}