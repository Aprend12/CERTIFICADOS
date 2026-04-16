import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerificarService } from '../core/services/verificar.service';
import { CertificadoData, Programa } from '../core/models/verificar.model';
import { ValidarCodigoComponent } from '../components/validar-codigo/validar-codigo.component';
import { MostrarResultadoComponent } from '../components/mostrar-resultado/mostrar-resultado.component';

@Component({
  selector: 'app-verificar-certificado',
  standalone: true,
  imports: [CommonModule, ValidarCodigoComponent, MostrarResultadoComponent, FormsModule],
  templateUrl: './verificar-certificado.component.html',
  styleUrls: ['./verificar-certificado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  programasDisponibles: Programa[] = [];
  carreraElegida: string = '';
  mostrarModalCarreras: boolean = false;
  tieneMultiplesCarreras: boolean = false;

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

    const body = {
      hash_code: codigo.trim(),
      documento_estudiante: documento.trim()
    };

    this.verificarService.verificarCertificado(body).subscribe({
      next: (response: any) => {
        this.verificando = false;

        if (response.action_code === 'CERTIFICADO_VALIDO') {
          this.certificadoValido = true;
          let hash = codigo.trim();
          if (!hash.endsWith('.pdf')) {
            hash = hash + '.pdf';
          }
          this.downloadUrl = `/api/descargar/certificado/${hash}`;
          this.certificadoData = {
            tipo_certificado: '',
            nombre_completo: '',
            documento: documento.trim(),
            codigo_estudiante: '',
            programa: '',
            snies: '',
            fecha_expedicion: '',
            hash: hash,
            nombre_pdf: hash,
            html: ''
          };
          this.stepActual.set(2);
        } else if (response.action_code === 'HASH_INVALIDO') {
          this.certificadoValido = false;
          this.mostrarError = true;
          this.mensajeError = response.mensaje;
        } else {
          this.certificadoValido = false;
          this.mostrarError = true;
          this.mensajeError = response.mensaje;
        }
      },
      error: (err) => {
        this.verificando = false;
        this.certificadoValido = false;
        this.mostrarError = true;
        if (err.status === 404) {
          this.mensajeError = 'Este certificado no corresponde al documento o no existe.';
        } else if (err.status === 400) {
          this.mensajeError = 'Datos inválidos. Verifique el código y documento.';
        } else {
          this.mensajeError = 'Error de conexión. Intente más tarde.';
        }
      }
    });
  }

  seleccionarCarrera(hash: string) {
    if (!this.carreraElegida) {
      return;
    }

    const programa = this.programasDisponibles.find(p => p.snies === this.carreraElegida);
    if (programa) {
      this.certificadoData = {
        tipo_certificado: '',
        nombre_completo: this.certificadoData?.nombre_completo || '',
        documento: '',
        codigo_estudiante: '',
        programa: programa.nombre,
        snies: programa.snies,
        fecha_expedicion: '',
        hash: hash,
        nombre_pdf: this.certificadoData?.nombre_pdf || '',
        html: '',
        programas: this.programasDisponibles
      };
    }

    this.mostrarModalCarreras = false;
    this.stepActual.set(2);
  }

  cerrarModal() {
    this.mostrarModalCarreras = false;
    this.carreraElegida = '';
    this.programasDisponibles = [];
    this.tieneMultiplesCarreras = false;
    this.certificadoValido = false;
    this.reset();
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
    this.programasDisponibles = [];
    this.carreraElegida = '';
    this.mostrarModalCarreras = false;
    this.tieneMultiplesCarreras = false;
    this.verificarService.limpiar();
  }

  volverABuscar() {
    this.reset();
  }
}
