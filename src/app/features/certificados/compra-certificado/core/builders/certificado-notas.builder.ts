import { DatosCertificado, CertificadoBuilder } from '../models/certificado.model';

export class CertificadoNotasBuilder implements CertificadoBuilder {
  private readonly FIRMA_NOMBRE = 'MAGDA CAROLINA REYES RINCÓN';
  private readonly FIRMA_CARGO  = 'Vicerrectora Académica';
  private readonly LOGO = 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif';


  private readonly COLOR_AZUL    = '#e65100';
  private readonly COLOR_GRIS_TXT  = '#595959';
  private readonly COLOR_GRIS_CELL = '#f8f9fa';
  private readonly COLOR_BORDE     = '#e65100';


  build(datos: DatosCertificado, p0: boolean): string {
    const o   = this.getOcultos(datos);
    const mat = this.getMaterias();
    const ta  = this.getTotalesAcumulados();
    const tp  = this.getTotalesPeriodo();

    const B = this.COLOR_BORDE;
    const cellHead = `background:${this.COLOR_AZUL}; color:white; font-weight:bold; text-align:center; padding:8px 6px; border:1px solid ${B}; font-size:9pt;`;
    const cellData = `text-align:center; padding:8px 4px; border:1px solid ${B}; font-size:9.5pt;`;

    return `
<div style="
  width: 21.59cm;
  min-height: 27.94cm;
  padding: 2cm 2cm;
  font-family: 'Times New Roman', serif;
  font-size: 10pt;
  line-height: 1.5;
  background: white;
  box-sizing: border-box;
  position: relative;
">

  <!-- Marco decorativo -->
  <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 3px solid #e65100; pointer-events: none;"></div>
  <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid #F57C00; pointer-events: none;"></div>

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
        <div style="font-size:12pt; font-weight:bold; color:#e65100; line-height:1.1;">
          REGISTRO DE NOTAS
        </div>
        <div style="font-size:10pt; font-weight:bold; color:#e65100; margin-top:2px;">
          Número:${o.numero}
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
      <td style="padding:10px 12px; border:1px solid ${B}; font-size:11pt; text-align:center; font-weight:bold;">
       ${o.nombre}
      </td>
      <td style="padding:10px 12px; border:1px solid ${B}; font-size:11pt; text-align:center;">
        ${o.documento}
      </td>
    </tr>

    <!-- Encabezado fila 2: Programa | Periodo | Año | Fecha de expedición -->
    <tr>
      <td style="${cellHead} font-size:10pt; text-align:center; padding:5px 12px; border:1px solid ${B};">
        Programa académico
      </td>
      <td style="padding:0; border:1px solid ${B}; background:${this.COLOR_AZUL};">
        <table style="width:100%; border-collapse:collapse; height:100%;">
          <tr>
            <td style="width:28%; ${cellHead} border:none; border-right:1px solid #F57C00;">Período</td>
            <td style="width:24%; ${cellHead} border:none; border-right:1px solid #F57C00;">Año</td>
            <td style="width:48%; ${cellHead} border:none;">Fecha de expedición</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Datos fila 2 -->
    <tr>
      <td style="padding:10px 12px; border:1px solid ${B}; font-size:11pt; text-align:center; font-weight:bold;">
        ${o.programa}
      </td>
      <td style="padding:0; border:1px solid ${B};">
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="width:28%; text-align:center; padding:10px 4px; border-right:1px solid ${B}; font-size:11pt; font-weight:bold;">
              ${o.semestre}
            </td>
            <td style="width:24%; text-align:center; padding:10px 4px; border-right:1px solid ${B}; font-size:11pt;">
              ${o.periodo}
            </td>
            <td style="width:48%; text-align:center; padding:10px 4px; font-size:11pt;">
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
      <td style="width:48%; ${cellHead} font-size:10pt; padding:6px 10px;">Módulo / Asignaturas</td>
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
            <td colspan="5" style="background:${this.COLOR_AZUL}; color:white; font-weight:bold; text-align:center; padding:6px; border:1px solid ${B}; font-size:9.5pt; letter-spacing:1.5px;">
              TOTAL ACUMULADOS
            </td>
          </tr>
          <tr>
            <td style="${cellHead} font-size:7.5pt;">CLASE</td>
            <td style="${cellHead} font-size:7.5pt;">CRÉDITOS<br>CURSADOS</td>
            <td style="${cellHead} font-size:7.5pt;">CRÉDITOS<br>APROBADOS</td>
            <td style="${cellHead} font-size:7.5pt;">PROMEDIO<br>PONDERADO</td>
            <td style="${cellHead} font-size:7.5pt;">NIVEL</td>
          </tr>
          <tr>
            <td style="${cellData} font-size:8.5pt; font-weight:bold;">NUMÉRICO</td>
            <td style="${cellData}">${ta.creditosCursados}</td>
            <td style="${cellData}">${ta.creditosAprobados}</td>
            <td style="${cellData}; font-weight:bold; color:#e65100;">${ta.promedio}</td>
            <td style="${cellData}">${o.semestre}</td>
          </tr>
        </table>
      </td>

      <!-- ── TOTALES PERIODO (3 columnas) ── -->
      <td style="width:47%; vertical-align:top;">
        <table style="width:100%; border-collapse:collapse; border:1px solid ${B};">
          <tr>
            <td colspan="3" style="background:${this.COLOR_AZUL}; color:white; font-weight:bold; text-align:center; padding:6px; border:1px solid ${B}; font-size:9.5pt; letter-spacing:1.5px;">
              TOTALES PERIODO
            </td>
          </tr>
          <tr>
            <td style="${cellHead} font-size:7.5pt;">CRÉDITOS<br>CURSADOS</td>
            <td style="${cellHead} font-size:7.5pt;">CRÉDITOS<br>APROBADOS</td>
            <td style="${cellHead} font-size:7.5pt;">PROMEDIO<br>PONDERADO</td>
          </tr>
          <tr>
            <td style="${cellData}">${tp.creditosCursados}</td>
            <td style="${cellData}">${tp.creditosAprobados}</td>
            <td style="${cellData}; font-weight:bold; color:#e65100;">${tp.promedio}</td>
          </tr>
        </table>
      </td>

    </tr>
  </table>

  <!--  FIRMA (al pie de página)   -->

  <table style="width: 100%; margin-top: 40px;">
    <tr>
      <td style="width: 50%; text-align: center; vertical-align: bottom;">
        <div style="border-top: 1.5pt solid #e65100; width: 7cm; margin: 0 auto 10px auto;"></div>
        <p style="margin: 0; font-weight: bold; font-size: 11pt; color: #e65100;">${this.FIRMA_NOMBRE}</p>
        <p style="margin: 0; font-size: 10pt; color: #555;">${this.FIRMA_CARGO}</p>
      </td>
    </tr>
  </table>

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

    return materias.map((m, i) => `
      <tr style="background: ${i % 2 === 1 ? '#f8f9fa' : 'white'};">
        <td style="padding:8px 10px; border:1px solid ${B}; font-size:9.5pt;">${m.nombre}</td>
        <td style="text-align:center; padding:8px 4px; border:1px solid ${B}; font-size:9.5pt; font-weight:bold;">${m.codigo}</td>
        <td style="text-align:center; padding:8px 4px; border:1px solid ${B}; font-size:9.5pt;">${m.nivel}</td>
        <td style="text-align:center; padding:8px 4px; border:1px solid ${B}; font-size:9.5pt;">${m.creditos}</td>
        <td style="text-align:center; padding:8px 4px; border:1px solid ${B}; font-size:9.5pt; font-weight:bold; color:#e65100;">${m.nota}</td>
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
      nombre:            this.sanitize(datos.nombre_completo || datos.nombre || 'Nombre Estudiante'),
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
