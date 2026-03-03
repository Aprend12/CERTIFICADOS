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

export function getCertificadoWrapper(contenido: string): string {
  return `
    <div style="
      width: 21.59cm;
      min-height: 27.94cm;
      padding: 2cm 2cm;
      box-sizing: border-box;
      background: white;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      font-family: 'Times New Roman', Times, serif;
    ">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        width: 150%;
        text-align: center;
        z-index: 0;
        opacity: 0.08;
        pointer-events: none;
      ">
        <div style="
          font-size: 80pt;
          font-weight: bold;
          color: #0d3b66;
          white-space: nowrap;
          letter-spacing: 20px;
        ">
          CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE
        </div>
        <div style="
          font-size: 60pt;
          font-weight: bold;
          color: #0d3b66;
          white-space: nowrap;
          letter-spacing: 20px;
          margin-top: 100px;
        ">
          SNIES 804.006.527-3
        </div>
      </div>
      <div style="position: relative; z-index: 1;">
        ${contenido}
      </div>
    </div>
  `;
}
