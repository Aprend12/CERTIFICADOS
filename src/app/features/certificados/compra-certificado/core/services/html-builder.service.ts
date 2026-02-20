// Servicio responsable de construir el HTML del certificado académico.

import { Injectable } from '@angular/core';
import { DatosCertificado, TipoCertificado } from '../models/certificado.model';
import { getCertificadoBuilder } from '../builders';
import { getPlantillaBuilder } from '../plantilla';

@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderService {

  build(tipo: string, datos: DatosCertificado, esPreview: boolean): string {
    const tipoValido = tipo as TipoCertificado;
    const builder = esPreview 
      ? getPlantillaBuilder(tipoValido) 
      : getCertificadoBuilder(tipoValido);
    return builder.build(datos, esPreview);
  }
}
