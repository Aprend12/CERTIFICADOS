/**
 * Plantilla de Certificado con Fechas y Jornada (para preview).
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoFechasJornadaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado): string {
    const nombre = this.maskValue(datos.nombre_completo || datos.nombre, '*********************');
    const documento = this.maskValue(datos.documento, '**************');
    const programa = this.maskValue(datos.programa, '*********************');
    const snies = this.maskValue(datos.snies, '**********');
    const semestre = this.maskValue(datos.semestre, '***');
    const periodo = this.maskValue(datos.periodo, '****-*');
    const fecha_inicio = this.maskValue(datos.fecha_inicio_periodo, '*********************');
    const fecha_fin = this.maskValue(datos.fecha_fin_periodo, '*********************');
    const jornada = this.maskValue(datos.jornada, '*********************');

    const contenido = `
      ${this.getEncabezado('Constancia de Jornada', 'PREVIEW-2024-****')}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 30px; text-align: justify; font-size: 11pt; line-height: 1.8; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 15px; text-align: center;">
          <span style="font-size: 12pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 15px; text-indent: 1.5cm;">Que, <strong style="color: ${this.COLOR_TEXT};">${nombre}</strong>, identificado(a) con número de documento <strong>${documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: ${this.COLOR_TEXT};">${programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${snies}</strong>.</p>
        <p style="margin-bottom: 15px;">El estudiante cursa actualmente el <strong>${semestre}</strong> semestre en el período académico <strong>${periodo}</strong>.</p>
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