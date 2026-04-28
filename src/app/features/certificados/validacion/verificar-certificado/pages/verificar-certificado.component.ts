import { Component, inject, OnInit, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VerificarService } from '../core/services/verificar.service';
import { ValidarCodigoComponent } from '../components/validar-codigo/validar-codigo.component';

@Component({
  selector: 'app-verificar-certificado',
  standalone: true,
  imports: [CommonModule, ValidarCodigoComponent],
  templateUrl: './verificar-certificado.component.html',
  styleUrls: ['./verificar-certificado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificarCertificadoComponent implements OnInit {
  verificarService: VerificarService = inject(VerificarService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  stepActual = signal(1);

  hashCode: string = '';
  documentoEstudiante: string = '';
  certificadoValido: boolean = false;
  mostrarError: boolean = false;
  mensajeError: string = '';
  verificando: boolean = false;
  descargando: boolean = false;

  pdfSrc: SafeResourceUrl | null = null;
  private pdfUrl: string | null = null;
  cargandoPdf: boolean = false;

  ngOnInit() {
    this.reset();
  }

  onCodigoIngresado(data: { codigo: string; documento: string }) {
    this.verificarPorCodigo(data.codigo, data.documento);
  }

  private verificarPorCodigo(codigo: string, documento: string) {
    if (!codigo.trim() || !documento.trim()) {
      this.mostrarError = true;
      this.mensajeError = 'Por favor ingrese el código y el documento del estudiante';
      this.certificadoValido = false;
      return;
    }

    this.verificando = true;
    this.mostrarError = false;
    this.mensajeError = '';
    this.hashCode = codigo.trim();
    this.documentoEstudiante = documento.trim();

    this.verificarService.verificarCertificado({
      hash_code: this.hashCode,
      documento_estudiante: this.documentoEstudiante
    }).subscribe({
      next: (response) => {
        this.verificando = false;

        if (response?.action_code === 'CERTIFICADO_VALIDO') {
          this.certificadoValido = true;
          this.stepActual.set(2);
          this.cargarPdf();
        } else {
          this.certificadoValido = false;
          this.mostrarError = true;
          this.mensajeError = response?.mensaje || 'Certificado no encontrado';
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error en verificación:', err);
        this.verificando = false;
        this.certificadoValido = false;
        this.mostrarError = true;
        if (err.name === 'TimeoutError') {
          this.mensajeError = 'La solicitud tardó demasiado. Intente de nuevo.';
        } else if (err.status === 404) {
          this.mensajeError = 'Este certificado no corresponde al documento o no existe.';
        } else if (err.status === 400) {
          this.mensajeError = 'Datos inválidos. Verifique el código y documento.';
        } else if (err.status === 0) {
          this.mensajeError = 'No se pudo conectar con el servidor. Verifique su conexión.';
        } else {
          this.mensajeError = 'Error de conexión. Intente más tarde.';
        }
        this.cdr.markForCheck();
      }
    });
  }

  private cargarPdf() {
    this.cargandoPdf = true;

    this.verificarService.descargarCertificado(this.hashCode, this.documentoEstudiante).subscribe({
      next: (blob) => {
        this.cargandoPdf = false;
        if (this.pdfUrl) {
          window.URL.revokeObjectURL(this.pdfUrl);
        }
        this.pdfUrl = window.URL.createObjectURL(blob);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.cargandoPdf = false;
        this.mostrarError = true;
        this.mensajeError = 'Error al cargar el certificado. Puede descargarlo usando el botón.';
        this.cdr.markForCheck();
      }
    });
  }

  descargarCertificado() {
    if (!this.hashCode || !this.documentoEstudiante) {
      return;
    }

    this.descargando = true;

    this.verificarService.descargarCertificado(this.hashCode, this.documentoEstudiante).subscribe({
      next: (blob) => {
        this.descargando = false;
        const url = window.URL.createObjectURL(blob);
        const pdfUrlWithParams = url + '#toolbar=0&navpanes=0&scrollbar=0&view=FitV';
        const link = document.createElement('a');
        link.href = pdfUrlWithParams;
        link.target = '_blank';
        link.download = 'certificado.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.cdr.markForCheck();
      },
      error: () => {
        this.descargando = false;
        this.mostrarError = true;
        this.mensajeError = 'Error al descargar el certificado. Intente más tarde.';
        this.cdr.markForCheck();
      }
    });
  }

  isStepActive(step: number): boolean {
    return this.stepActual() === step;
  }

  isStepCompleted(step: number): boolean {
    return this.stepActual() > step;
  }

  goToStep(step: number): void {
    if (step <= this.stepActual() || this.isStepCompleted(step - 1)) {
      this.stepActual.set(step);
    }
  }

  reset() {
    if (this.pdfUrl) {
      window.URL.revokeObjectURL(this.pdfUrl);
    }
    this.stepActual.set(1);
    this.hashCode = '';
    this.documentoEstudiante = '';
    this.certificadoValido = false;
    this.mostrarError = false;
    this.mensajeError = '';
    this.verificando = false;
    this.descargando = false;
    this.pdfSrc = null;
    this.pdfUrl = null;
    this.cargandoPdf = false;
    this.verificarService.limpiar();
  }

  volverABuscar() {
    this.reset();
  }
}
