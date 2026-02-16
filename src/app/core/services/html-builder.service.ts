import { Injectable } from '@angular/core';
import { DatosCertificado, TITULOS_CERTIFICADO, TipoCertificado } from '../models/certificado.model';

@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderService {

  private readonly INSTITUCION = 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE';
  private readonly NIT = '804.006.527-3';
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO = 'Vicerrectora Académica';

  build(tipo: string, datos: DatosCertificado, esPreview: boolean): string {
    const titulo = TITULOS_CERTIFICADO[tipo as TipoCertificado] || 'para pension';
    const documentoOculto = esPreview ? '**************' : this.sanitize(datos.documento);
    const codigoOculto = esPreview ? '***********' : this.sanitize(datos.codigo);
    const programaOculto = esPreview ? '***************' : this.sanitize(datos.programa);
    const sniesOculto = esPreview ? '**********' : this.sanitize(datos.snies);
    const semestreOculto = esPreview ? '**************' : this.sanitize(datos.semestre);
    const periodoOculto = esPreview ? '***************' : this.sanitize(datos.periodo);
    const jornadaOculto = esPreview ? '*********************' : this.sanitize(datos.jornada);

    return `
    <div class="certificado-header" style="font-size: 0.7rem;">
      <div class="certificado-title" style="text-align: center; margin: 10px 0; font-weight: bold;">${this.sanitize(titulo)}</div>
      <div class="certificado-institution" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.65rem;">LA VICERRECTORA ACADÉMICA<br>${this.INSTITUCION}</div>
      <div class="certificado-nit" style="text-align: center; margin: 5px 0; font-size: 0.6rem;">NIT: ${this.NIT}</div>
    </div>
    <div class="hace-constar" style="text-align: center; margin: 10px 0; font-weight: bold; font-size: 0.7rem;">HACE CONSTAR:</div>
    <div class="certificado-body" style="font-size: 0.65rem; line-height: 1.4;">
      <p>Que, jose jose, identificado(a) con número de documento <strong>${documentoOculto}</strong> (Código: ${codigoOculto}), se encuentra matriculado(a) en el programa <strong>${programaOculto}</strong>, aprobado por el Ministerio de Educación según Snies <strong>${sniesOculto}</strong>.</p>
      <p style="margin-top: 15px;">Actualmente cursa el <strong>${semestreOculto}</strong> en el periodo académico <strong>${periodoOculto}</strong>, en jornada <strong>${jornadaOculto}</strong>.</p>
      <p style="margin-top: 15px;">Se expide a solicitud del interesado(a) en Bucaramanga a los <strong>${esPreview ? '*********************' : this.formatFecha(datos.fecha_expedicion)}</strong>.</p>
    </div>
    <div class="certificado-footer" style="margin-top: 30px; text-align: center; font-size: 0.6rem;">
      <div class="firma-line" style="border-top: 1px solid #000; width: 150px; margin: 0 auto 5px;"></div>
      <div class="firma-nombre" style="font-weight: bold;">_________________________________________</div>
      <div class="firma-nombre" style="font-weight: bold;">${this.FIRMA_NOMBRE}</div>
      <div class="firma-cargo">${this.FIRMA_CARGO}</div>
    </div>`;
  }

  private sanitize(value: string): string {
    if (!value) return '';
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones);
  }
}
