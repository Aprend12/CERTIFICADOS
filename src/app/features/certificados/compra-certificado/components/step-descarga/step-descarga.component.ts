import { Component, Input, inject, OnChanges, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CertificadoService } from '../../core/services/certificado.service';
import { ApiService, ValidarEstudianteResponse, GenerarCertificadoResponse } from '../../core/services/api.service';
import { CertificadoDatos, DatosCertificado } from '../../core/models/certificado.model';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-step-descarga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-descarga.component.html',
  styleUrls: ['./step-descarga.component.css']
})
export class StepDescargaComponent implements OnChanges {
  @Input() datos: CertificadoDatos = {
    documento: '',
    codigo_estudiante: '',
    snies: '',
    tipo_certificado: '',
    nombre_completo: '',
  };

  certificadoFinal: string = '';
  certificadoFinalSafe: SafeHtml = '' as any;
  generando = false;
  descargado = false;
  error: string | null = null;

  lastJsonResponse: any = null;
  jsonHistory: any[] = [];
  certificadoJson: any = null;
  fileName: string | null = null;
  lastRequestedUrl: string | null = null;

  scale: number = 0.5;

  private certificadoService = inject(CertificadoService);
  private apiService = inject(ApiService);
  private sanitizer = inject(DomSanitizer);
  private ngZone = inject(NgZone);
  private router = inject(Router);

  ngOnChanges() {
    if (this.datos.documento && this.datos.tipo_certificado) {
      this.generarCertificadoFinal();
    }
  }

  generarCertificadoFinal() {
    if (!this.datos.documento || !this.datos.tipo_certificado) {
      return;
    }

    this.generando = true;
    this.error = null;

    this.apiService.validarEstudiante(
      this.datos.documento,
      this.datos.codigo_estudiante,
      this.datos.tipo_certificado
    ).pipe(
      tap((resp: ValidarEstudianteResponse) => {

        const r: any = resp;

        let nombreCompleto = this.datos.nombre_completo || '';
        let programa = '';
        let snies = this.datos.snies || '';
        let periodo = '2025-1';
        let semestre = 'V';

        if (r.data?.nombre_completo) {
          nombreCompleto = r.data.nombre_completo;
        } else if (resp.nombre_completo) {
          nombreCompleto = resp.nombre_completo;
        } else if (resp.estudiante?.nombre) {
          nombreCompleto = resp.estudiante.nombre;
        }

        if (r.data?.programas?.length > 0) {
          const prog = r.data.programas[0];
          programa = prog.nombre || prog.programa || '';
          snies = prog.snies || snies;
          if (prog.periodo) periodo = prog.periodo;
          if (prog.nivel) semestre = prog.nivel;
        } else if (resp.programas_disponibles?.length > 0) {
          const prog = resp.programas_disponibles[0];
          programa = prog.nombre || prog.programa || '';
          snies = prog.snies || snies;
        }

        if (!nombreCompleto && r.estudiante) {
          nombreCompleto = r.estudiante.nombre || r.estudiante.codigo_estudiante || '';
        }

        this.certificadoJson = { snies: snies, programa: programa, nombre: nombreCompleto };

        const datosCertificado: DatosCertificado = {
          documento: this.datos.documento,
          nombre: nombreCompleto,
          nombre_completo: nombreCompleto,
          programa: programa || 'Tecnología en Desarrollo de Software',
          snies: snies || '804006527',
          semestre: semestre,
          periodo: periodo,
          fecha_expedicion: new Date().toISOString().split('T')[0],
          fecha_inicio: '2025-01-15',
          fecha_fin: '2025-06-15',
          jornada: 'Diurna',
          codigo: this.datos.codigo_estudiante || ''
        };

        const htmlCertificado = this.certificadoService.generarCertificadoConDatos(datosCertificado, this.datos.tipo_certificado);
        this.certificadoFinal = htmlCertificado;
        this.certificadoFinalSafe = this.sanitizer.bypassSecurityTrustHtml(htmlCertificado);
      }),
      catchError(err => {
        this.error = 'Error al obtener datos del estudiante';
        const htmlCertificado = this.certificadoService.generarCertificadoFinal(this.datos);
        this.certificadoFinal = htmlCertificado;
        this.certificadoFinalSafe = this.sanitizer.bypassSecurityTrustHtml(htmlCertificado);
        return throwError(() => err);
      })
    ).subscribe({
      next: () => {
        this.generando = false;
      },
      error: () => {
        this.generando = false;
      }
    });
  }

  descargar() {
    if (!this.datos || !this.datos.documento) {
      this.error = 'Falta documento de identidad para generar el certificado.';
      return;
    }

    this.generando = true;
    this.error = null;

    this.ngZone.run(() => {
      setTimeout(() => {
        this.generando = false;
        this.descargado = true;
      }, 5000);
    });

    const sniesFromApi = this.certificadoJson?.snies || this.datos.snies || '';

    const request: { documento_identidad: string; tipo_certificado: string[]; snies?: string } = {
      documento_identidad: this.datos.documento,
      tipo_certificado: [this.datos.tipo_certificado || ''],
      snies: sniesFromApi || undefined
    };

    this.apiService.generarCertificado(request).pipe(
      tap((resp: GenerarCertificadoResponse) => {
        this.lastJsonResponse = resp;
        this.jsonHistory.push({ step: 'generarCertificado', data: resp });

        let rutaPdf = '';
        let nombrePdf = '';

        if (resp.data) {
          this.certificadoJson = resp.data;
          rutaPdf = resp.data.ruta_pdf || '';
          nombrePdf = resp.data.nombre_pdf || '';
        } else {
          this.certificadoJson = resp;
          rutaPdf = resp.pdf || '';
        }

        this.fileName = nombrePdf;

        if (rutaPdf) {
          let fileName = rutaPdf;
          if (rutaPdf.includes('/') || rutaPdf.includes('\\') || rutaPdf.includes(':')) {
            const parts = rutaPdf.split(/[/\\:]/);
            fileName = parts[parts.length - 1] || '';
          }
          const fullUrl = this.apiService.getDownloadUrl(fileName);
          this.triggerDownload(fullUrl);
        }
      }),
      catchError(err => {
        this.error = 'Error al generar el certificado: ' + (err.message || 'Error desconocido');
        this.generando = false;
        return throwError(() => err);
      })
    ).subscribe({
      next: () => {
        this.generando = false;
      },
      error: () => {
        this.generando = false;
      }
    });
  }

  private triggerDownload(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  nuevoCertificado() {
    window.location.href = '/compra-certificado';
  }
}
