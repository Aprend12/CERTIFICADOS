import { Injectable } from '@angular/core';
import { DatosCertificado, TipoCertificado } from '../models/certificado.model';
import { getCertificadoBuilder, getCertificadoWrapper } from '../builders';
import { getPlantillaBuilder } from '../plantilla';

/**
 * Service for building certificate HTML content.
 * Selects the appropriate builder based on certificate type and mode (preview/download).
 */
@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderService {
  /**
   * Builds HTML content for a certificate.
   * @param tipo - Certificate type (sencillo, notas, fechas, etc.)
   * @param datos - Certificate data with student information
   * @param esPreview - Whether this is a preview (masked data) or final certificate
   * @returns HTML string wrapped in container
   */
  build(tipo: string, datos: DatosCertificado, esPreview: boolean): string {
    const tipoValido = tipo as TipoCertificado;
    const builder = esPreview 
      ? getPlantillaBuilder(tipoValido) 
      : getCertificadoBuilder(tipoValido);
    const contenido = builder.build(datos, esPreview);
    return getCertificadoWrapper(contenido);
  }
}
