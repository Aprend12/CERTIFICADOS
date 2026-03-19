/**
 * Plantilla de Certificado de Notas (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { formatFechaCompleta } from './index';

export class CertificadoNotasBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'LA VICERRECTORA ACADÉMICA ';
  private readonly NIT = '804.006';
  private readonly DIRECCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';

  build(datos: DatosCertificado): string {
    const fecha = formatFechaCompleta(datos.fecha_expedicion);
    return `
    <div style="width: 100%; min-height: 27.94cm; padding: 50px 60px; font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.8; box-sizing: border-box; background: #fefefe; position: relative;">

      <div style="text-align: center; margin-bottom: 25px; padding-top: 30px; position: relative;">
        <div style="width: 70px; height: 70px; border: 3px solid #e67300; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        </div>
        <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; color: #e67300; letter-spacing: 3px;">${this.INSTITUCION}</div>
        <div style="font-size: 10pt; color: #666; margin-top: 6px; letter-spacing: 1px;">${this.DIRECCION} </div>
        <div style="font-size: 9pt; color: #888; margin-top: 2px;">NIT: ${this.NIT}</div>
      </div>

      <div style="border-bottom: 3px solid #e67300; margin-bottom: 30px; position: relative;">
        <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #e67300; border-radius: 50%;"></div>
      </div>

      <div style="text-align: center; margin-bottom: 35px;">
        <div style="display: inline-block; padding: 8px 30px; border: 2px solid #e67300; border-radius: 4px;">
          <span style="font-size: 13pt; font-weight: bold; text-transform: uppercase; color: #e67300; letter-spacing: 4px;">Registro de Notas</span>
        </div>
      </div>

      <div style="margin-bottom: 20px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #e67300;">
        <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
          <tr>
            <td style="padding: 6px 0; width: 25%; color: #666;"><strong>Nombre:</strong></td>
            <td style="padding: 6px 0; font-weight: bold; color: #444444;">*************** ***************</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #666;"><strong>Identificación:</strong></td>
            <td style="padding: 6px 0; color: #444444;">**************</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #666;"><strong>Programa:</strong></td>
            <td style="padding: 6px 0; color: #444444;">*********************</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #666;"><strong>Período:</strong></td>
            <td style="padding: 6px 0; color: #444444;">****-*</td>
          </tr>
        </table>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 9pt; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <tr style="background: #e67300; color: #fff;">
          <th style="padding: 10px 6px; border: 1px solid #E65100; text-align: left; font-weight: 600;">Asignatura</th>
          <th style="padding: 10px 6px; border: 1px solid #E65100; text-align: center; font-weight: 600;">HT</th>
          <th style="padding: 10px 6px; border: 1px solid #E65100; text-align: center; font-weight: 600;">HP</th>
          <th style="padding: 10px 6px; border: 1px solid #E65100; text-align: center; font-weight: 600;">CR</th>
          <th style="padding: 10px 6px; border: 1px solid #E65100; text-align: center; font-weight: 600;">NF</th>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 8px 6px; border: 1px solid #ddd; color: #333;">*****************************</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">*</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">*</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">*</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #e67300; font-weight: bold; background: #f0f7ff;">**</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 8px 6px; border: 1px solid #ddd; color: #333;">*****************************</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">*</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">*</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #333;">*</td>
          <td style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; color: #e67300; font-weight: bold; background: #f0f7ff;">**</td>
        </tr>
      </table>

      <div style="margin-top: 50px; text-align: left;">
        <p style="color: #555; font-style: italic;">Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${fecha}.</p>
      </div>

      <div style="margin-top: 50px; display: flex; justify-content: center; align-items: flex-end; gap: 80px;">
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
