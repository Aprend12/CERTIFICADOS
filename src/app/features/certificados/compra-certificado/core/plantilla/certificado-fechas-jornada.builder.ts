/**
 * Dates and Schedule Certificate Template (for preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoFechasJornadaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = datos.nombre_completo || datos.nombre || 'Sofía Andrea Ramírez Vargas';
    const documento = datos.documento || '5.678.901';
    const programa = datos.programa || 'Diseño Gráfico';
    const snies = datos.snies || '108432';
    const semestre = datos.semestre || '4';
    const periodos = datos.periodo || '2025-1';
    const fecha_inicio = datos.fecha_inicio_periodo || datos.fecha_inicio || '15 de enero de 2025';
    const fecha_fin = datos.fecha_fin_periodo || datos.fecha_fin || '15 de junio de 2025';
    const jornada = datos.jornada || 'Diurna (7:00 am - 5:00 pm)';

    const contenido = `
      ${this.getEncabezado('Constancia de Jornada', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 30px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${nombre}</strong>, identificado(a) con número de documento <strong>${documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: ${this.COLOR_TEXT};">${programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${snies}</strong>.</p>
        <p style="margin-bottom: 15px;">El estudiante cursa actualmente el <strong>${semestre}</strong> semestre en el período académico <strong>${periodos}</strong>.</p>
        <p style="margin-bottom: 15px;">Inició clases el <strong>${fecha_inicio}</strong> y finaliza el <strong>${fecha_fin}</strong>.</p>
        <p style="margin-bottom: 15px;">Jornada de estudio: <strong>${jornada}</strong></p>
      </div>
      <div style="margin-top: 50px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${this.formatFechaCompleta(new Date().toISOString().split('T')[0])}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter('PREVIEW-2024-****')}
    `;

    return this.getWrapper(contenido);
  }
}