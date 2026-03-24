import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarService } from '../core/services/verificar.service';
import { CertificadoData } from '../core/models/verificar.model';
import { ValidarCodigoComponent } from '../components/validar-codigo/validar-codigo.component';
import { MostrarResultadoComponent } from '../components/mostrar-resultado/mostrar-resultado.component';

@Component({
  selector: 'app-verificar-certificado',
  standalone: true,
  imports: [CommonModule, ValidarCodigoComponent, MostrarResultadoComponent],
  templateUrl: './verificar-certificado.component.html',
  styleUrls: ['./verificar-certificado.component.css']
})
export class VerificarCertificadoComponent implements OnInit {
  verificarService: VerificarService = inject(VerificarService);

  stepActual = signal(1);
  totalPasos = 2;

  certificadoData: CertificadoData | null = null;
  certificadoHTML: string = '';
  certificadoValido: boolean = false;
  mostrarError: boolean = false;
  mensajeError: string = '';
  verificando: boolean = false;
  downloadUrl: string = '';

  ngOnInit() {
    this.reset();
  }

  onCodigoIngresado(codigo: string) {
    this.verificarPorCodigo(codigo);
  }

  private verificarPorCodigo(codigo: string) {
    if (!codigo.trim()) {
      this.mostrarError = true;
      this.mensajeError = 'Por favor ingrese un código';
      this.certificadoValido = false;
      return;
    }

    let hash = codigo.trim();
    if (!hash.endsWith('.pdf')) {
      hash = hash + '.pdf';
    }

    this.verificando = true;
    this.mostrarError = false;
    this.mensajeError = '';

    const url = `/api/descargar/certificado/${hash}`;
    this.downloadUrl = url;

    this.verificarService.verificar(hash).subscribe({
      next: (response) => {
        this.verificando = false;
        this.certificadoValido = true;
        this.certificadoData = {
          tipo_certificado: '',
          nombre_completo: response.nombre_pdf || hash,
          documento: '',
          codigo_estudiante: '',
          programa: '',
          snies: '',
          fecha_expedicion: '',
          hash: hash,
          nombre_pdf: response.nombre_pdf || hash,
          html: ''
        };
        this.stepActual.set(2);
      },
      error: (err) => {
        this.verificando = false;
        this.certificadoValido = false;
        this.mostrarError = true;
        if (err.status === 404) {
          this.mensajeError = 'Código no encontrado. Verifique el código e intente nuevamente.';
        } else {
          this.mensajeError = 'Error de conexión. Intente más tarde.';
        }
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
    this.stepActual.set(1);
    this.certificadoData = null;
    this.certificadoHTML = '';
    this.certificadoValido = false;
    this.mostrarError = false;
    this.mensajeError = '';
    this.verificando = false;
    this.downloadUrl = '';
    this.verificarService.limpiar();
  }

  volverABuscar() {
    this.reset();
  }
}
