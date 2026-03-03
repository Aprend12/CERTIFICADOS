/**
 * Plantilla de Certificado de Estudio Sencillo (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { formatFechaCompleta } from './index';

export class CertificadoSencilloBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'LA VICERRECTORA ACADÉMICA ';
  private readonly NIT = '804.006';
  private readonly DIRECCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';

  build(datos: DatosCertificado): string {
    const fecha = formatFechaCompleta(datos.fecha_expedicion);
    return `
    <div style="width: 100%; min-height: 27.94cm; padding: 50px 60px; font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 11pt; line-height: 2; box-sizing: border-box; background: #fefefe; position: relative;">

      <div style="position: absolute; top: 0; left: 0; right: 0; height: 8px; background: linear-gradient(90deg, #0d3b66, #1e5f8a, #0d3b66);"></div>

      <div style="position: absolute; top: 0; left: 0; right: 0; height: 50px; background: linear-gradient(180deg, rgba(13,59,102,0.03) 0%, transparent 100%);"></div>

      <div style="text-align: center; margin-bottom: 25px; padding-top: 30px; position: relative;">
        <div style="width: 70px; height: 70px; border: 3px solid #0d3b66; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        </div>
        <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; color: #0d3b66; letter-spacing: 3px;">${this.INSTITUCION}</div>
        <div style="font-size: 10pt; color: #666; margin-top: 6px; letter-spacing: 1px;">${this.DIRECCION}</div>
        <div style="font-size: 9pt; color: #888; margin-top: 2px;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 3px solid #0d3b66; margin-bottom: 30px; position: relative;">
        <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #0d3b66; border-radius: 50%;"></div>
      </div>

      <div style="margin-bottom: 25px; text-align: justify; text-indent: 2cm;">
        <p style="margin-bottom: 15px; color: #2c2c2c;">HACE CONSTAR:</p>
        <p style="margin-bottom: 15px; color: #2c2c2c; text-indent: 0cm;">Que, <strong style="color: #0d3b66;">*************** ***************</strong>, identificado(a) con número de documento <strong style="color: #0d3b66;">**************</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: #0d3b66;">*********************</strong>, aprobado por el Ministerio de Educación según Snies <strong style="color: #0d3b66;">******</strong>.</p>
        <p style="margin-bottom: 15px; color: #2c2c2c;">El estudiante cursa actualmente el <strong style="color: #0d3b66;">***</strong> semestre en el período académico <strong style="color: #0d3b66;">****-*</strong>.</p>
      </div>

      <div style="margin-top: 60px; text-align: left;">
        <p style="color: #555; font-style: italic;">Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${fecha}.</p>
      </div>

      <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div style="text-align: left;">
          <div style="border-top: 2px solid #0d3b66; width: 250px; margin-bottom: 8px;"></div>
          <p style="margin: 0; font-size: 10pt; color: #0d3b66; font-weight: 600;">Rector(a) General</p>
        </div>
        <div style="text-align: right;">
          <div style="border-top: 2px solid #0d3b66; width: 250px; margin-bottom: 8px;"></div>
          <p style="margin: 0; font-size: 10pt; color: #0d3b66; font-weight: 600;">Vicerrectora Académica</p>
        </div>
      </div>

      <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 8px; background: linear-gradient(90deg, #0d3b66, #1e5f8a, #0d3b66);"></div>

      <div style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); text-align: center; font-size: 7pt; color: #aaa;">
      </div>

    </div>`;
  }
}
