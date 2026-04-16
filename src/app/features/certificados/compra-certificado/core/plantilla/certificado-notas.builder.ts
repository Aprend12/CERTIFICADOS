/**
 * Plantilla de Certificado de Notas (para preview).
 */
import { DatosCertificado, CertificadoBuilder, Materia } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoNotasBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || '*********************';
    const documento = datos.documento || '**************';
    const programa = datos.programa || '*********************';
    const snies = datos.snies || '**********';
    const periodo = datos.periodo || '****-*';
    const semestre = datos.semestre || '****';
    
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
            <div style="font-size:9.5pt; font-weight:600; color:${this.COLOR_MUTED}; margin-top:4px;">Hash Code: PREVIEW-2024-****</div>
          </td>
        </tr>
      </table>

      <div style="margin-bottom: 25px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${nombre}</strong>, identificado(a) con número de documento <strong>${documento}</strong>, se encuentra matriculado(a) en el programa de <strong style="color: ${this.COLOR_TEXT};">${programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${snies}</strong>.</p>
        <p style="margin-bottom: 20px;">El estudiante cursa el <strong>${semestre}</strong> semestre en el período <strong>${periodo}</strong>.</p>
      </div>

      ${periodosHTML}

      <table style="width:100%; border-collapse:collapse; margin-top: 30px; border:1px solid ${this.COLOR_BORDER}; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        <tr>
          <td colspan="4" style="background:${this.COLOR_PRIMARY}; color:white; font-weight:600; text-align:center; padding:10px; border:1px solid ${this.COLOR_PRIMARY}; font-size:10pt; letter-spacing: 1px;">TOTALES ACUMULADOS</td>
        </tr>
        <tr>
          <td style="${cellHead} font-size:8pt; background:#f7fafc;">CRÉDITOS CURSADOS</td>
          <td style="${cellHead} font-size:8pt; background:#f7fafc;">CRÉDITOS APROBADOS</td>
          <td style="${cellHead} font-size:8pt; background:#f7fafc;">PROMEDIO PONDERADO</td>
          <td style="${cellHead} font-size:8pt; background:#f7fafc;">NIVEL ACTUAL</td>
        </tr>
        <tr>
          <td style="${cellData} font-weight:600; font-size:10pt;">${ta.creditosCursados}</td>
          <td style="${cellData} font-weight:600; font-size:10pt;">${ta.creditosAprobados}</td>
          <td style="${cellData} font-weight:700; font-size:10pt; color:${this.COLOR_TEXT};">${ta.promedio}</td>
          <td style="${cellData} font-weight:600; font-size:10pt;">${semestre}</td>
        </tr>
      </table>

      ${this.getFirma()}
      ${this.getFooter('PREVIEW-2024-****')}
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

    if (!html) {
      html = this.getMateriasEjemploHTML();
    }

    return html;
  }

  private getMateriasEjemploHTML(): string {
    const cellHead = `background:${this.COLOR_PRIMARY}; color:white; font-weight:600; text-align:center; padding:8px 6px; border:1px solid ${this.COLOR_PRIMARY}; font-size:9pt;`;
    const cellData = `text-align:center; padding:8px 4px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt;`;

    return `
      <div style="margin-bottom: 20px; border: 1px solid ${this.COLOR_BORDER}; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        <div style="background:${this.COLOR_PRIMARY}; color:white; font-weight:600; padding:8px 12px; font-size:10pt; letter-spacing: 1px;">
          Período: 2025-1
        </div>
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="width:55%; ${cellHead} font-size:9pt;">Módulo / Asignatura</td>
            <td style="width:12%; ${cellHead} font-size:9pt;">Nivel</td>
            <td style="width:13%; ${cellHead} font-size:9pt;">Créditos</td>
            <td style="width:20%; ${cellHead} font-size:9pt;">Nota</td>
          </tr>
          <tr style="background: white;">
            <td style="padding:8px 10px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt;">***********************</td>
            <td style="${cellData}">***</td>
            <td style="${cellData}">*</td>
            <td style="${cellData} font-weight:bold; color:${this.COLOR_TEXT};">*.*</td>
          </tr>
          <tr style="background:#f7fafc;">
            <td style="padding:8px 10px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt;">***********************</td>
            <td style="${cellData}">***</td>
            <td style="${cellData}">*</td>
            <td style="${cellData} font-weight:bold; color:${this.COLOR_TEXT};">*.*</td>
          </tr>
          <tr style="background:#e8f4fd;">
            <td style="padding:8px 10px; border:1px solid ${this.COLOR_BORDER}; font-size:9pt; font-weight:600;">Totales del período</td>
            <td style="${cellData} font-weight:600;"></td>
            <td style="${cellData} font-weight:600;">**</td>
            <td style="${cellData} font-weight:700; color:${this.COLOR_TEXT};">0.0</td>
          </tr>
        </table>
      </div>
    `;
  }

  private getTotalesAcumulados(datos: DatosCertificado) {
    const materias = datos.materias || [];
    const cursados = materias.reduce((s, m) => s + (m.creditos || 0), 0);
    const aprobados = materias.filter(m => (m.nota || 0) >= 3.0).reduce((s, m) => s + (m.creditos || 0), 0);
    const sumPonderada = materias.reduce((s, m) => s + ((m.nota || 0) * (m.creditos || 0)), 0);
    const promedio = cursados > 0 ? (sumPonderada / cursados).toFixed(1) : '0.0';
    return { creditosCursados: cursados || 0, creditosAprobados: aprobados || 0, promedio };
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
}