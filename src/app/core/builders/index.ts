/**
 * Exporta todos los constructores de certificados.
 * Proporciona una función factory para obtener el builder correcto según el tipo.
 */
export { CertificadoSencilloBuilder } from './certificado-sencillo.builder';
export { CertificadoNotasBuilder } from './certificado-notas.builder';
export { CertificadoFechasBuilder } from './certificado-fechas.builder';
export { CertificadoFechasJornadaBuilder } from './certificado-fechas-jornada.builder';
export { CertificadoPensionBuilder } from './certificado-pension.builder';
export { CertificadoHomologacionBuilder } from './certificado-homologacion.builder';
export { CertificadoGradoBuilder } from './certificado-grado.builder';
export { CertificadoConductaBuilder } from './certificado-conducta.builder';
export { CertificadoHorarioBuilder } from './certificado-horario.builder';
export { CertificadoPracticaBuilder } from './certificado-practica.builder';

import { CertificadoBuilder, TipoCertificado } from '../models/certificado.model';
import { CertificadoSencilloBuilder } from './certificado-sencillo.builder';
import { CertificadoNotasBuilder } from './certificado-notas.builder';
import { CertificadoFechasBuilder } from './certificado-fechas.builder';
import { CertificadoFechasJornadaBuilder } from './certificado-fechas-jornada.builder';
import { CertificadoPensionBuilder } from './certificado-pension.builder';
import { CertificadoHomologacionBuilder } from './certificado-homologacion.builder';
import { CertificadoGradoBuilder } from './certificado-grado.builder';
import { CertificadoConductaBuilder } from './certificado-conducta.builder';
import { CertificadoHorarioBuilder } from './certificado-horario.builder';
import { CertificadoPracticaBuilder } from './certificado-practica.builder';

/**
 * Factory function que retorna el builder apropiado según el tipo de certificado.
 * @param tipo - Tipo de certificado
 * @returns Instancia del builder correspondiente
 */
export function getCertificadoBuilder(tipo: TipoCertificado): CertificadoBuilder {
  const builders: Record<TipoCertificado, CertificadoBuilder> = {
    sencillo: new CertificadoSencilloBuilder(),
    notas: new CertificadoNotasBuilder(),
    fechas: new CertificadoFechasBuilder(),
    fechas_jornada: new CertificadoFechasJornadaBuilder(),
    pension: new CertificadoPensionBuilder(),
    homologacion: new CertificadoHomologacionBuilder(),
    grado: new CertificadoGradoBuilder(),
    conducta: new CertificadoConductaBuilder(),
    horario: new CertificadoHorarioBuilder(),
    practica: new CertificadoPracticaBuilder(),
  };

  return builders[tipo] || new CertificadoSencilloBuilder();
}
