/**
 * Plantilla de Certificado de Práctica (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { formatFechaCompleta } from './index';

export class CertificadoPracticaBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'LA VICERRECTORA ACADÉMICA ';
  private readonly NIT = '804.006';
  private readonly DIRECCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';

  build(datos: DatosCertificado): string {
    const fecha = formatFechaCompleta(datos.fecha_expedicion);
    return `
    <div style="width: 100%; min-height: 27.94cm; padding: 50px 60px; font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 11pt; line-height: 1.8; box-sizing: border-box; background: #fefefe; position: relative;">

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

      <div style="margin-bottom: 20px; text-align: justify; text-indent: 2cm;">
        <p style="margin-bottom: 15px; color: #2c2c2c;">HACE CONSTAR:</p>
        <p style="margin-bottom: 15px; color: #2c2c2c; text-indent: 0cm;">Que, <strong style="color: #0d3b66;">*************** ***************</strong>, identificado(a) con número de cédula <strong style="color: #0d3b66;">**************</strong>, cursó y aprobó el ciclo de prácticas integrales, asociadas al programa <strong style="color: #0d3b66;">*********************</strong>, según código Snies <strong style="color: #0d3b66;">******</strong>.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 9pt; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <tr style="background: #0d3b66; color: #fff;">
          <th style="padding: 10px 6px; border: 1px solid #0a2d4a; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px 6px; border: 1px solid #0a2d4a; text-align: center; font-weight: 600;">HT</th>
          <th style="padding: 10px 6px; border: 1px solid #0a2d4a; text-align: center; font-weight: 600;">CR</th>
          <th style="padding: 10px 6px; border: 1px solid #0a2d4a; text-align: center; font-weight: 600;">SEM</th>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 8px 6px; border: 1px solid #ddd; color: #333;">Práctica Integral I</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">3</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">6</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">3</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 8px 6px; border: 1px solid #ddd; color: #333;">Práctica Integral II</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">3</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">6</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">3</td>
        </tr>
      </table>

      <div style="margin-top: 50px; text-align: left;">
        <p style="color: #555; font-style: italic;">Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${fecha}.</p>
      </div>

      <div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end;">
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
