/**
 * Good Conduct Certificate Constructor.
 * Professional institutional format for download.
 */
import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';
import { CertificadoPlantillaBase } from './certificado-base.builder';

export class CertificadoConductaBuilder extends CertificadoPlantillaBase implements CertificadoBuilder {

  build(datos: DatosCertificado, esPreview: boolean): string {
    const o = this.getOcultos(datos, esPreview);
    const hashCode = o.certificado?.hash_code || o.hash_code || o.numero || 'No disponible';

    const contenido = `
      ${this.getEncabezado('Constancia de Buena Conducta', hashCode)}
      ${this.getTituloPrincipal()}
      <div style="margin-bottom: 35px; text-align: justify; font-size: 12pt; line-height: 2; color: ${this.COLOR_TEXT};">
        <p style="margin-bottom: 25px; text-align: center;">
          <span style="font-size: 13pt; font-weight: 700; color: ${this.COLOR_TEXT}; text-transform: uppercase; letter-spacing: 1px;">Hace Constar</span>
        </p>
        <p style="margin-bottom: 20px; text-indent: 2cm;">Que, <strong style="color: ${this.COLOR_TEXT}; font-size: 13pt;">${o.nombre}</strong>, identificado(a) con número de documento <strong>${o.documento}</strong>, se encuentra matriculado(a) actualmente en el programa de <strong style="color: ${this.COLOR_TEXT};">${o.programa}</strong>, aprobado por el Ministerio de Educación según SNIES <strong>${o.snies}</strong>. El estudiante cursa actualmente el <strong>${o.semestre}</strong> semestre en el período académico <strong>${o.periodo}</strong>.</p>
        <p style="margin-bottom: 20px;">Adicionalmente, durante el tiempo de permanencia en nuestra institución, el/la estudiante ha demostrado una <strong style="color: ${this.COLOR_TEXT};">excelente conducta académica</strong>, cumpliendo con todas las normas del reglamento estudiantil.</p>
      </div>
      <div style="margin-top: 60px; text-align: left; font-size: 11pt; color: ${this.COLOR_MUTED};">
        <p>Se expide a solicitud del interesado(a) en ${this.DIRECCION.split(',')[0]}, a los ${o.fecha}.</p>
      </div>
      ${this.getFirma()}
      ${this.getFooter(o.certificado?.hash_code || o.hash_code)}
    `;

    return this.getWrapper(contenido);
  }

  private getOcultos(datos: DatosCertificado, esPreview: boolean) {
    const hashCode = this.sanitize(datos.hash_code || '');
    if (esPreview) {
      return {
        numero: '*******',
        certificado: { hash_code: '*******' },
        hash_code: '**************',
        nombre: '*********************',
        documento: '**************',
        programa: '*********************',
        snies: '**********',
        semestre: '****',
        periodo: '****-*',
        fecha: '*********************',
      };
    }

    return {
      numero: hashCode,
      certificado: { hash_code: hashCode },
      hash_code: hashCode,
      nombre: this.sanitize(datos.nombre_completo || datos.nombre || ''),
      documento: this.sanitize(datos.documento || ''),
      programa: this.sanitize(datos.programa || ''),
      snies: this.sanitize(datos.snies || ''),
      semestre: this.sanitize(datos.semestre || ''),
      periodo: this.sanitize(datos.periodo || ''),
      fecha: this.formatFechaCompleta(datos.fecha_expedicion),
    };
  }
}
