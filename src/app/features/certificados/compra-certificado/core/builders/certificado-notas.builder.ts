import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoNotasBuilder implements CertificadoBuilder {
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO  = 'Vicerrectora Académica';
  private readonly LOGO = 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif';


  private readonly COLOR_NARANJA   = '#C55A11';
  private readonly COLOR_GRIS_TXT  = '#595959';
  private readonly COLOR_GRIS_CELL = '#D9D9D9';
  private readonly COLOR_BORDE     = '#AEAAAA';


  build(datos: DatosCertificado, p0: boolean): string {
    const o   = this.getOcultos(datos);
    const mat = this.getMaterias();
    const ta  = this.getTotalesAcumulados();
    const tp  = this.getTotalesPeriodo();

    const G = this.COLOR_GRIS_CELL;
    const B = this.COLOR_BORDE;
    const cellHead = `background:${G}; font-weight:bold; text-align:center; padding:5px 6px; border:1px solid ${B}; font-size:9pt;`;
    const cellData = `text-align:center; padding:6px 4px; border:1px solid ${B}; font-size:9.5pt;`;

    return `
<div style="
  width: 21.59cm;
  min-height: 27.94cm;
  padding: 1.8cm 1.8cm 2cm 1.8cm;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  background: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
">


  <!--  ENCABEZADO -->

  <table style="width:100%; border-collapse:collapse; margin-bottom:18px;">
    <tr>

      <!-- Logo + nombre institución -->
      <td style="width:55%; vertical-align:middle;">
        <table style="border-collapse:collapse;">
          <tr>
            <td style="vertical-align:middle; padding-right:10px;">
              <img src="${this.LOGO}" style="height:1.8cm; width:auto; display:block;">
            </td>
          </tr>
        </table>
      </td>

      <!-- Título + número -->
      <td style="width:45%; text-align:right; vertical-align:middle;">
        <div style="font-size:12pt; font-weight:bold; color:#000; line-height:1.1;">
          REGISTRO DE NOTAS
        </div>
        <div style="font-size:10pt; font-weight:bold; color:#000; margin-top:2px;">
          Numero:${o.numero}
        </div>
      </td>

    </tr>
  </table>

  <!--  TABLA DATOS ESTUDIANTE  -->

  <table style="width:100%; border-collapse:collapse; border:1px solid ${B}; margin-bottom:18px;">

    <!-- Encabezado fila 1: Estudiante | Identificación -->
    <tr>
      <td style="width:67%; ${cellHead} font-size:10pt;">Estudiante</td>
      <td style="width:33%; ${cellHead} font-size:10pt;">Identificación</td>
    </tr>

    <!-- Datos fila 1 -->
    <tr>
      <td style="padding:9px 12px; border:1px solid ${B}; font-size:11pt; text-align:center;">
       hjufsasf
      </td>
      <td style="padding:9px 12px; border:1px solid ${B}; font-size:11pt; text-align:center;">
        ${o.documento}
      </td>
    </tr>

    <!-- Encabezado fila 2: Programa | Periodo | Año | Fecha de expedición -->
    <tr>
      <td style="${cellHead} font-size:10pt; text-align:center; padding:5px 12px; border:1px solid ${B};">
        Programa académico
      </td>
      <td style="padding:0; border:1px solid ${B}; background:${G};">
        <table style="width:100%; border-collapse:collapse; height:100%;">
          <tr>
            <td style="width:28%; ${cellHead} border:none; border-right:1px solid ${B};">Periodo</td>
            <td style="width:24%; ${cellHead} border:none; border-right:1px solid ${B};">Año</td>
            <td style="width:48%; ${cellHead} border:none;">Fecha de expedición</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Datos fila 2 -->
    <tr>
      <td style="padding:9px 12px; border:1px solid ${B}; font-size:11pt; text-align:center;">
        ${o.programa}
      </td>
      <td style="padding:0; border:1px solid ${B};">
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="width:28%; text-align:center; padding:9px 4px; border-right:1px solid ${B}; font-size:11pt;">
              ${o.semestre}
            </td>
            <td style="width:24%; text-align:center; padding:9px 4px; border-right:1px solid ${B}; font-size:11pt;">
              ${o.periodo}
            </td>
            <td style="width:48%; text-align:center; padding:9px 4px; font-size:11pt;">
              ${o.fecha_expedicion}
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>

  <!--  TABLA MATERIAS   -->

  <table style="width:100%; border-collapse:collapse; border:1px solid ${B}; margin-bottom:18px;">
    <tr>
      <td style="width:48%; ${cellHead} font-size:10pt; padding:6px 10px;">Modulo / Asignaturas</td>
      <td style="width:13%; ${cellHead} font-size:10pt;">Código</td>
      <td style="width:10%; ${cellHead} font-size:10pt;">Nivel</td>
      <td style="width:13%; ${cellHead} font-size:10pt;">Créditos</td>
      <td style="width:16%; ${cellHead} font-size:10pt;">Nota</td>
    </tr>
    ${mat}
  </table>
  <!--   TOTAL ACUMULADOS  +  TOTALES PERIODO -->

  <table style="width:100%; border-collapse:collapse; margin-bottom:auto;">
    <tr>

      <!-- ── TOTAL ACUMULADOS (5 columnas) ── -->
      <td style="width:50%; vertical-align:top; padding-right:3%;">
        <table style="width:100%; border-collapse:collapse; border:1px solid ${B};">
          <tr>
            <td colspan="5" style="background:${G}; font-weight:bold; text-align:center; padding:6px; border:1px solid ${B}; font-size:9.5pt; letter-spacing:1.5px;">
              TOTAL ACUMULADOS
            </td>
          </tr>
          <tr>
            <td style="${cellHead} font-size:7.5pt;">CLASE</td>
            <td style="${cellHead} font-size:7.5pt;">CREDITOS<br>CURSADOS</td>
            <td style="${cellHead} font-size:7.5pt;">CREDITOS<br>APROBADOS</td>
            <td style="${cellHead} font-size:7.5pt;">PROMEDIO<br>PONDERADO</td>
            <td style="${cellHead} font-size:7.5pt;">NIVEL</td>
          </tr>
          <tr>
            <td style="${cellData} font-size:8.5pt;">NUMERIC<br>O</td>
            <td style="${cellData}">${ta.creditosCursados}</td>
            <td style="${cellData}">${ta.creditosAprobados}</td>
            <td style="${cellData}">${ta.promedio}</td>
            <td style="${cellData}">${o.semestre}</td>
          </tr>
        </table>
      </td>

      <!-- ── TOTALES PERIODO (3 columnas) ── -->
      <td style="width:47%; vertical-align:top;">
        <table style="width:100%; border-collapse:collapse; border:1px solid ${B};">
          <tr>
            <td colspan="3" style="background:${G}; font-weight:bold; text-align:center; padding:6px; border:1px solid ${B}; font-size:9.5pt; letter-spacing:1.5px;">
              TOTALES PERIODO
            </td>
          </tr>
          <tr>
            <td style="${cellHead} font-size:7.5pt;">CREDITOS<br>CURSADOS</td>
            <td style="${cellHead} font-size:7.5pt;">CREDITOS<br>APROBADOS</td>
            <td style="${cellHead} font-size:7.5pt;">PROMEDIO<br>PONDERADO O</td>
          </tr>
          <tr>
            <td style="${cellData}">${tp.creditosCursados}</td>
            <td style="${cellData}">${tp.creditosAprobados}</td>
            <td style="${cellData}">${tp.promedio}</td>
          </tr>
        </table>
      </td>

    </tr>
  </table>

  <!--  FIRMA (al pie de página)   -->

  <div style="text-align:center; margin-top:auto; padding-top:60px;">
    <div style="width:13cm; border-top:1.5px solid #000; margin:0 auto 8px auto;"></div>
    <div style="font-size:11pt; font-weight:bold; letter-spacing:0.3px;">
      ${this.FIRMA_NOMBRE}
    </div>
  </div>

</div>`;
  }

  private getMaterias(): string {
    const B = this.COLOR_BORDE;
    const materias = [
      { nombre: 'DIDÁCTICAS ESPECÍFICAS EN EDUCACIÓN INFANTIL (ARTE, JUEGO Y EXPRESIÓN)', codigo: 'LPI601', nivel: 'VI', creditos: 3, nota: 4.3 },
      { nombre: 'HIGIENE Y SEGURIDAD EN EL TRABAJO CON INFANTES',                         codigo: 'LPI603', nivel: 'VI', creditos: 2, nota: 4.3 },
      { nombre: 'INGLÉS II',                                                               codigo: 'LPI600', nivel: 'VI', creditos: 2, nota: 4.6 },
      { nombre: 'INVESTIGACIÓN APLICADA II (MARCO DE REF. Y ESTADO DL ART)',               codigo: 'LPI604', nivel: 'VI', creditos: 3, nota: 3.8 },
      { nombre: 'PRÁCTICA INTEGRAL I',                                                     codigo: 'LPI605', nivel: 'VI', creditos: 3, nota: 3.8 },
      { nombre: 'TALLER DISEÑO DE MATERIALES I',                                           codigo: 'LPI602', nivel: 'VI', creditos: 3, nota: 4.7 },
    ];

    return materias.map(m => `
      <tr>
        <td style="padding:7px 10px; border:1px solid ${B}; font-size:9.5pt;">${m.nombre}</td>
        <td style="text-align:center; padding:7px 4px; border:1px solid ${B}; font-size:9.5pt; font-weight:bold;">${m.codigo}</td>
        <td style="text-align:center; padding:7px 4px; border:1px solid ${B}; font-size:9.5pt;">${m.nivel}</td>
        <td style="text-align:center; padding:7px 4px; border:1px solid ${B}; font-size:9.5pt;">${m.creditos}</td>
        <td style="text-align:center; padding:7px 4px; border:1px solid ${B}; font-size:9.5pt;">${m.nota}</td>
      </tr>`).join('');
  }

  private getTotalesAcumulados() {
    return {
      creditosCursados:  92,
      creditosAprobados: 92,
      promedio:          '3.9',
    };
  }

  private getTotalesPeriodo() {
    const materias = [
      { creditos: 3, nota: 4.3 },
      { creditos: 2, nota: 4.3 },
      { creditos: 2, nota: 4.6 },
      { creditos: 3, nota: 3.8 },
      { creditos: 3, nota: 3.8 },
      { creditos: 3, nota: 4.7 },
    ];
    const cursados     = materias.reduce((s, m) => s + m.creditos, 0);
    const sumPonderada = materias.reduce((s, m) => s + m.creditos * m.nota, 0);
    return {
      creditosCursados:  cursados,
      creditosAprobados: cursados,
      promedio:          (sumPonderada / cursados).toFixed(1),
    };
  }

  private getOcultos(datos: DatosCertificado) {
    return {
      numero:           ' ' + this.sanitize(datos.codigo || '1 123ad32'),

      documento:        this.sanitize(datos.documento),
      programa:         this.sanitize(datos.programa),
      semestre:         this.getNumeroRomano(datos.semestre),
      periodo:          this.sanitize(datos.periodo),
      fecha_expedicion: this.formatFecha(datos.fecha_expedicion),
    };
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

  private getNumeroRomano(semestre: string): string {
    const romanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
    return romanos[parseInt(semestre) - 1] || semestre;
  }

  private formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [y, m, d] = fecha.split('-');
    return (y && m && d) ? `${y} ${m} ${d}` : fecha;
  }
}
