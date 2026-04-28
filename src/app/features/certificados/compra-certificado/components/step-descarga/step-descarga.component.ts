import { Component, Input, inject, OnChanges, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CertificadoService } from '../../core/services/certificado.service';
import { ApiService } from '../../core/services/api.service';
import { CertificadoDatos, DatosCertificado, Materia } from '../../core/models/certificado.model';
import { tap, catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-step-descarga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-descarga.component.html',
  styleUrls: ['./step-descarga.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepDescargaComponent implements OnChanges {
  @Input() datos: CertificadoDatos = {
    documento: '',
    codigo_estudiante: '',
    snies: '',
    tipo_certificado: '',
    nombre_completo: '',
    hash_code: '',
    historial_notas: [],
    programa_academico: '',
    periodo_activo: '',
    semestre_academico: ''
  };

  certificadoFinal: string = '';
  certificadoFinalSafe: SafeHtml = '' as SafeHtml;
  generando = false;
  descargado = false;
  error: string | null = null;

  private certificadoService = inject(CertificadoService);
  private apiService = inject(ApiService);
  private sanitizer = inject(DomSanitizer);
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

    const hashCode = this.datos.hash_code || '';

    if (hashCode) {
      const datosCertificado: DatosCertificado = {
        documento: this.datos.documento,
        nombre: this.datos.nombre_completo || '',
        nombre_completo: this.datos.nombre_completo || '',
        programa: this.datos.programa_academico || '',
        snies: this.datos.snies || '',
        semestre: this.datos.semestre_academico || '',
        periodo: this.datos.periodo_activo || '',
        fecha_expedicion: new Date().toISOString().split('T')[0],
        fecha_inicio: this.datos.fecha_inicio_periodo || '',
        fecha_fin: this.datos.fecha_fin_periodo || '',
        jornada: this.datos.jornada || '',
        codigo: this.datos.codigo_estudiante || '',
        hash_code: hashCode,
        codigo_verificacion: hashCode,
        materias: [],
        fecha_inicio_periodo: this.datos.fecha_inicio_periodo || '',
        fecha_fin_periodo: this.datos.fecha_fin_periodo || ''
      };

      if (this.datos.historial_notas && this.datos.historial_notas.length > 0) {
        const todasLasMaterias: Materia[] = [];

        for (const periodo of this.datos.historial_notas) {
          if (periodo.materias && Array.isArray(periodo.materias)) {
            for (const m of periodo.materias) {
              todasLasMaterias.push({
                nombre: m.nombre || '',
                codigo: '',
                nivel: m.nivel || '',
                creditos: Number(m.creditos) || 0,
                nota: Number(m.nota) || 0,
                periodo: periodo.periodo || ''
              });
            }
          }
        }
        datosCertificado.materias = todasLasMaterias;
      }

      const htmlCertificado = this.certificadoService.generarCertificadoConDatos(datosCertificado, this.datos.tipo_certificado);
      this.certificadoFinal = htmlCertificado;
      this.certificadoFinalSafe = this.sanitizer.bypassSecurityTrustHtml(htmlCertificado);
      this.generando = false;
    } else {
      this.error = 'No se ha generado el hash_code para este certificado';
      this.generando = false;
    }
  }

  descargar() {
    if (!this.datos || !this.datos.documento) {
      this.error = 'Falta documento de identidad para generar el certificado.';
      return;
    }

    const hashCode = this.datos.hash_code;
    if (!hashCode) {
      this.error = 'No se ha generado el hash_code para este certificado';
      return;
    }

    this.generando = true;
    this.error = null;

    const request: { hash_code: string; documento_estudiante: string } = {
      hash_code: hashCode,
      documento_estudiante: this.datos.documento
    };

    this.apiService.generarCertificado(request).pipe(
      timeout(30000),
      tap((resp) => {
        if (resp.certificado_pdf) {
          const binaryString = atob(resp.certificado_pdf);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          this.triggerDownload(url);
          window.URL.revokeObjectURL(url);
        } else if (resp.data?.hash) {
          let fileName = `${this.datos.nombre_completo || 'certificado'}.pdf`;
          const fullUrl = this.apiService.getDownloadUrl(fileName);
          this.triggerDownload(fullUrl);
        }
      }),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          this.error = 'La solicitud tardó demasiado. Por favor, intenta nuevamente.';
        } else {
          this.error = 'Error al generar el certificado: ' + (err.message || 'Error desconocido');
        }
        this.generando = false;
        return of(null);
      })
    ).subscribe({
      next: () => {
        if (!this.error) {
          this.generando = false;
          this.descargado = true;
        }
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
    this.router.navigate(['/compra-certificado']);
  }
}
