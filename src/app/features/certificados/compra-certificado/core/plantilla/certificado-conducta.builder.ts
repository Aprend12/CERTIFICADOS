/**
 * Plantilla de Certificado de Buena Conducta (para preview).
 * Versión simplificada sin logo, número ni nombre de rectora.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoConductaBuilder implements CertificadoBuilder {
  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly DIRECCION = 'Bucaramanga, Santander';

  build(datos: DatosCertificado): string {

    return `
    <div class="certificado-inner" style="************ min-height: 27.94cm; padding: ***************; font-family: 'Times New Roman', Times, serif; font-size: ********* ; line-height: 1.8; box-sizing: border-box; background: white;">

      <div style="text-align: center; margin-bottom: ***********; padding-top: 20px;">
        <div style="font-size: ********** '10pt' : '12pt'}; font-weight: bold; text-transform: uppercase;">************************</div>
        <div style="font-size:  ***************;">NIT: *******************</div>
      </div>

      <div style="border-bottom: 2px solid #333; margin-bottom: ***************;"></div>

      <div style="margin-bottom: **************; text-align: justify; text-indent: 1.5cm;">
        <p style="margin-bottom: *************"><strong>HACE CONSTAR:</strong></p>
        <p style="margin-bottom: ************;">Que, <strong>*********</strong>, identificado(a) con cédula de ciudadanía No. <strong>***********</strong>, cursó el <strong>**************** semestre</strong> en el programa de <strong>************</strong>, según Snies <strong>***********</strong>.</p>
        <p style="margin-bottom: ***************;">Durante el tiempo de permanencia en nuestra institución, el/la estudiante presentó una <strong>excelente conducta académica y personal</strong>.</p>
      </div>

      <div style="margin-top: **************; text-align: left;">
        <p>Se expide a solicitud del interesado(a) en *************, a los ****************.</p>
      </div>

      <div style="margin-top: ***************; text-align: left;">
        <div style="border-top: 1.5pt solid black; width: 8cm; margin-bottom: 12px;"></div>
        <p style="margin: 0; font-size: ********************;">Vicerrectora Académica</p>
      </div>

    </div>`;
  }

}
