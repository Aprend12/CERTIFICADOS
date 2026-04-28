/**
 * Grades Certificate Constructor.
 * Professional institutional format for download.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoNotasBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const periodosHTML = this.getPeriodosHTML(datos);
    const ta = this.getTotalesAcumulados(datos);

    const cellHead = `background:${this.COLOR_PRIMARY}; color:white; font-weight:600; text-align:center; padding:8px 6px; border:1px solid ${this.COLOR_PRIMARY}; font-size:9pt;`;
    const cellData = `text-align:center; padding:8px 4px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt;`;

    const contenido = `
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <tr>
          <td style="width:55%; vertical-align:middle;">
            <img src="${this.LOGO}" style="height:2cm; width:auto; display:block;">
          </td>
          <td style="width:45%; text-align:right; vertical-align:middle;">
            <div style="font-size:11pt; font-weight:600; color:${this.COLOR_TEXT}; line-height:1.2; text-transform: uppercase; letter-spacing: 2px;">Registro de Notas</div>
            <div style="font-size:9.5pt; font-weight:600; color:${this.COLOR_MUTED}; margin-top:4px;">Hash Code: ${o.hash_code || o.numero || 'No disponible'}</div>
          </td>
        </tr>
      </table>

      <div style="margin-bottom: 25px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 20px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${o.nombre}</strong>, identificado(a) con número de documento <strong>${o.documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: ${this.COLOR_TEXT};">${o.programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${o.snies}</strong>. El estudiante cursa actualmente el <strong>${o.semestre}</strong> semestre en el período académico <strong>${o.periodo}</strong>.</p>
      </div>

      ${periodosHTML}

      <div style="margin-top: 30px; text-align: left; font-size: 11pt; color: ${this.COLOR_TEXT};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha_expedicion || this.formatFechaCompleta(datos.fecha_expedicion)}.</p>
      </div>

      ${this.getFirma()}
      ${this.getFooter(o.codigo_verificacion || o.hash_code)}
    `;

    return this.getWrapperNotas(contenido);
  }

  private getPeriodosHTML(datos: DatosCertificado): string {
    const materias = datos.materias || [];
    const periodosMap = new Map<string, any[]>();
    
    for (const m of materias) {
      const periodoKey = m.periodo || 'Sin período';
      if (!periodosMap.has(periodoKey)) {
        periodosMap.set(periodoKey, []);
      }
      periodosMap.get(periodoKey)!.push(m);
    }

    const cellHead = `background:${this.COLOR_PRIMARY}; color:white; font-weight:600; text-align:center; padding:8px 6px; border:1px solid ${this.COLOR_PRIMARY}; font-size:9pt;`;
    const cellData = `text-align:center; padding:8px 4px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt;`;

    let html = '';
    
    for (const [periodo, materiasPeriodo] of periodosMap) {
      const creditos = materiasPeriodo.reduce((sum, m) => sum + (m.creditos || 0), 0);
      const sumPonderada = materiasPeriodo.reduce((sum, m) => sum + ((m.nota || 0) * (m.creditos || 0)), 0);
      const promedio = creditos > 0 ? (sumPonderada / creditos).toFixed(1) : '0.0';
      
      html += `
        <div style="margin-bottom: 20px; border: 1px solid ${this.COLOR_BORDER}; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <div style="background:${this.COLOR_PRIMARY}; color:white; font-weight:600; padding:8px 12px; font-size:10pt; letter-spacing: 1px;">
            Período: ${periodo}
          </div>
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="width:55%; ${cellHead} font-size:9pt;">Módulo / Asignatura</td>
              <td style="width:12%; ${cellHead} font-size:9pt;">Nivel</td>
              <td style="width:13%; ${cellHead} font-size:9pt;">Créditos</td>
              <td style="width:20%; ${cellHead} font-size:9pt;">Nota</td>
            </tr>
            ${materiasPeriodo.map((m, i) => `
              <tr style="background: ${i % 2 === 1 ? '#f7fafc' : 'white'};">
                <td style="padding:8px 10px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt;">${m.nombre}</td>
                <td style="${cellData}">${m.nivel}</td>
                <td style="${cellData}">${m.creditos}</td>
                <td style="${cellData} font-weight:bold; color:${this.COLOR_TEXT};">${m.nota}</td>
              </tr>
            `).join('')}
            <tr style="background:#e8f4fd;">
              <td style="padding:8px 10px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt; font-weight:600;">Totales del período</td>
              <td style="${cellData} font-weight:600;"></td>
              <td style="${cellData} font-weight:600;">${creditos}</td>
              <td style="${cellData} font-weight:700; color:${this.COLOR_TEXT};">${promedio}</td>
            </tr>
          </table>
        </div>
      `;
    }

    return html || '<p style="text-align:center; color: #888;">No hay materias registradas.</p>';
  }

  private getWrapperNotas(contenido: string): string {
    return `
      <div style="width: 21.59cm; min-height: 27.94cm; margin: 0 auto; position: relative; overflow: hidden; background: white; font-family: 'Calibri', 'Times New Roman', serif;">
        ${this.getMarcosDecorativos()}
        <div style="position: relative; z-index: 1; padding: 3cm 3cm 2.5cm 3cm;">
          ${contenido}
        </div>
      </div>`;
  }

  private getTotalesAcumulados(datos: DatosCertificado) {
    const materias = datos.materias || [];
    const cursados = materias.reduce((s, m) => s + (m.creditos || 0), 0);
    const aprobados = materias.filter(m => (m.nota || 0) >= 3.0).reduce((s, m) => s + (m.creditos || 0), 0);
    const sumPonderada = materias.reduce((s, m) => s + ((m.nota || 0) * (m.creditos || 0)), 0);
    const promedio = cursados > 0 ? (sumPonderada / cursados).toFixed(1) : '0.0';
    return { creditosCursados: cursados, creditosAprobados: aprobados, promedio };
  }

  private getOcultos(datos: DatosCertificado, esPreview: boolean) {
    if (esPreview) {
      return {
        numero: '*******',
        nombre: '*********************',
        documento: '**************',
        programa: '*********************',
        snies: '**********',
        semestre: 'VI',
        periodo: '****-*',
        fecha_expedicion: '*********************',
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
      semestre: this.getNumeroRomano(datos.semestre),
      periodo: this.sanitize(datos.periodo),
      fecha_expedicion: this.formatFechaCompleta(datos.fecha_expedicion),
      codigo_verificacion: this.sanitize(datos.codigo_verificacion || datos.hash_code || ''),
      hash_code: this.sanitize(datos.hash_code || ''),
    };
  }

  private getNumeroRomano(semestre: string): string {
    const romanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
    const num = parseInt(semestre);
    if (isNaN(num) || num < 1 || num > 10) return semestre;
    return romanos[num - 1];
  }
}