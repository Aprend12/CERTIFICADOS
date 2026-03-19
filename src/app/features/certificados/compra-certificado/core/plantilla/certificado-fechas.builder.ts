/**
 * Plantilla de Certificado con Fechas Académicas (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { formatFechaCompleta } from './index';

export class CertificadoFechasBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'LA VICERRECTORA ACADÉMICA ';
  private readonly NIT = '804.006';
  private readonly DIRECCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';

  build(datos: DatosCertificado): string {
    const fecha = formatFechaCompleta(datos.fecha_expedicion);
    return `
    <div style="width: 100%; min-height: 27.94cm; padding: 50px 60px; font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 2; box-sizing: border-box; background: #fefefe; position: relative;">

      <div style="text-align: center; margin-bottom: 25px; padding-top: 30px; position: relative;">
        <div style="width: 70px; height: 70px; border: 3px solid #e67300; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        </div>
        <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; color: #e67300; letter-spacing: 3px;">${this.INSTITUCION}</div>
        <div style="font-size: 10pt; color: #666; margin-top: 6px; letter-spacing: 1px;">${this.DIRECCION}</div>
        <div style="font-size: 9pt; color: #888; margin-top: 2px;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 3px solid #e67300; margin-bottom: 30px; position: relative;">
        <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #e67300; border-radius: 50%;"></div>
      </div>

      <div style="margin-bottom: 25px; text-align: justify; text-indent: 2cm;">
        <p style="margin-bottom: 15px; color: #2c2c2c;">HACE CONSTAR:</p>
        <p style="margin-bottom: 15px; color: #2c2c2c; text-indent: 0cm;">Que, <strong style="color: #333333;">*************** ***************</strong>, identificado(a) con número de documento <strong style="color: #333333;">**************</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: #333333;">*********************</strong>, aprobado por el Ministerio de Educación según Snies <strong style="color: #333333;">******</strong>.</p>
        <p style="margin-bottom: 15px; color: #2c2c2c;">El estudiante cursa actualmente el <strong style="color: #333333;">***</strong> semestre en el período académico <strong style="color: #333333;">****-*</strong>.</p>
      </div>

      <div style="margin-top: 60px; text-align: left;">
        <p style="color: #555; font-style: italic;">Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${fecha}.</p>
      </div>

      <div style="margin-top: 60px; display: flex; justify-content: center; align-items: flex-end; gap: 80px;">
          <div style="text-align: center;">
            <div style="border-top: 2px solid #e67300; width: 200px; margin-bottom: 8px;"></div>
            <p style="margin: 0; font-size: 10pt; color: #e67300; font-weight: 600;">Rector(a) General</p>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 2px solid #e67300; width: 200px; margin-bottom: 8px;"></div>
            <p style="margin: 0; font-size: 10pt; color: #e67300; font-weight: 600;">Vicerrectora Académica</p>
          </div>
        </div>

    </div>`;
  }
}
