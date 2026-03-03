import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CertificadoDatos } from '../../core/models/certificado.model';
import { ApiService } from '../../core/services/api.service';

interface CarreraEstudiante {
  nombre: string;
  snies: string;
  nivel: string;
}

interface EstudianteCertificado {
  codigo_estudiante: string;
  documento: string;
  nombre_completo: string;
  snies: CarreraEstudiante[];
}

@Component({
  selector: 'app-step-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-datos.component.html',
  styleUrls: ['./step-datos.component.css']
})
export class StepDatosComponent {
  @Output() datosSubmitted = new EventEmitter<CertificadoDatos>();
  @Output() goToStep2 = new EventEmitter<{ estudiante: EstudianteCertificado; carreras: CarreraEstudiante[]; tipoCertificado: string; documento: string; numeroEstudiante: string; codigoCarrera: string }>();

  form: FormGroup;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  estudianteEncontrado: EstudianteCertificado | null = null;
  estudianteNoEncontrado = false;
  verificando = false;
  nombreEstudiante: string = '';

  carrerasDisponibles: CarreraEstudiante[] = [];
  carreraSeleccionada: CarreraEstudiante | null = null;
  puedeContinuar: any;

  mostrarModalCarreras = false;
  carreraElegida: string = '';

  constructor() {
    this.form = this.fb.group({
      documento: ['', [Validators.required]],
      codigo_estudiante: ['', [Validators.required]],
      tipo_certificado: ['', [Validators.required]],
      snies: ['']
    });
  }

  get tieneMultiplesCarreras(): boolean {
    return this.carrerasDisponibles.length > 1;
  }

  verificarCertificado() {
    const documento = this.form.get('documento')?.value;
    const codigoEstudiante = this.form.get('codigo_estudiante')?.value;
    const tipoCertificado = this.form.get('tipo_certificado')?.value;

    if (!documento || !codigoEstudiante) {
      this.estudianteNoEncontrado = false;
      this.estudianteEncontrado = null;
      this.carreraSeleccionada = null;
      this.carrerasDisponibles = [];
      return;
    }

    this.verificando = true;

    this.apiService.validarEstudiante(documento, codigoEstudiante, tipoCertificado).subscribe({
      next: (response) => {
        console.log('Respuesta API:', response);

        if (response.success && (response.programas_disponibles || response.programas || response.data?.programas)) {
          const programas = response.programas_disponibles || response.programas || response.data?.programas || [];
          console.log('Debug - programas:', programas);
          console.log('Debug - response.data:', response.data);
          const nombreCompleto = response.nombre_completo || response.data?.nombre_completo || response.estudiante?.nombre || '';
          const estudiante: EstudianteCertificado = {
            documento: documento,
            codigo_estudiante: codigoEstudiante,
            nombre_completo: nombreCompleto,
            snies: programas.map(c => ({
              nombre: c.nombre || '',
              snies: c.snies,
              nivel: c.nivel || ''
            }))
          };

          this.estudianteEncontrado = estudiante;
          this.nombreEstudiante = nombreCompleto;
          this.estudianteNoEncontrado = false;
          this.carrerasDisponibles = estudiante.snies;

          if (estudiante.snies.length === 1) {
            this.carreraSeleccionada = estudiante.snies[0];
          } else {
            this.carreraSeleccionada = null;
          }
        } else {
          this.estudianteEncontrado = null;
          this.estudianteNoEncontrado = true;
          this.carrerasDisponibles = [];
        }
        this.verificando = false;
      },
      error: (err) => {
        console.log('Error API:', err);
        this.estudianteEncontrado = null;
        this.estudianteNoEncontrado = true;
        this.carreraSeleccionada = null;
        this.carrerasDisponibles = [];
        this.verificando = false;
      }
    });
  }

  continuar() {
    const documento = this.form.get('documento')?.value;
    const codigoEstudiante = this.form.get('codigo_estudiante')?.value;
    const tipoCertificado = this.form.get('tipo_certificado')?.value;

    if (!documento || !codigoEstudiante) {
      return;
    }

    if (!this.estudianteEncontrado) {
      this.verificando = true;
      this.apiService.validarEstudiante(documento, codigoEstudiante, tipoCertificado).subscribe({
        next: (response) => {
          console.log('Respuesta API:', response);

          if (response.success && (response.programas_disponibles || response.programas || response.data?.programas)) {
            const programas = response.programas_disponibles || response.programas || response.data?.programas || [];
          const nombreCompleto = response.nombre_completo || response.data?.nombre_completo || response.estudiante?.nombre || '';
            const estudiante: EstudianteCertificado = {
              documento: documento,
              codigo_estudiante: codigoEstudiante,
              nombre_completo: nombreCompleto,
              snies: programas.map(c => ({
                nombre: c.nombre || '',
                snies: c.snies,
                nivel: c.nivel || ''
              }))
            };

            this.estudianteEncontrado = estudiante;
            this.nombreEstudiante = nombreCompleto;
            this.estudianteNoEncontrado = false;
            this.carrerasDisponibles = estudiante.snies;

            if (estudiante.snies.length === 1) {
              this.carreraSeleccionada = estudiante.snies[0];
            } else {
              this.carreraSeleccionada = null;
            }

            this.verificando = false;
            this.procesarContinuar();
          } else {
            this.estudianteEncontrado = null;
            this.estudianteNoEncontrado = true;
            this.carrerasDisponibles = [];
            this.verificando = false;
          }
        },
        error: (err) => {
          console.log('Error API:', err);
          this.estudianteEncontrado = null;
          this.estudianteNoEncontrado = true;
          this.carrerasDisponibles = [];
          this.verificando = false;
        }
      });
    } else {
      this.procesarContinuar();
    }
  }

  procesarContinuar() {
    console.log('Debug - carrerasDisponibles:', this.carrerasDisponibles.length);
    console.log('Debug - carreraSeleccionada:', this.carreraSeleccionada);
    console.log('Debug - tieneMultiplesCarreras:', this.tieneMultiplesCarreras);

    if (this.tieneMultiplesCarreras) {
      console.log('Mostrando modal de carreras');
      this.mostrarModalCarreras = true;
    } else {
      const formValue = this.form.value;
      const datos: CertificadoDatos = {
        documento: formValue.documento,
        codigo_estudiante: formValue.codigo_estudiante,
        snies: this.carreraSeleccionada?.snies || '',
        tipo_certificado: formValue.tipo_certificado,
        nombre_completo: this.nombreEstudiante,
      };
      this.datosSubmitted.emit(datos);
    }
  }

  seleccionarCarrera() {
    if (this.carreraElegida && this.estudianteEncontrado) {
      const formValue = this.form.value;

      const datos: CertificadoDatos = {
        documento: formValue.documento,
        codigo_estudiante: formValue.codigo_estudiante,
        snies: this.carreraElegida,
        tipo_certificado: formValue.tipo_certificado,
        nombre_completo: this.nombreEstudiante,
      };

      this.mostrarModalCarreras = false;
      this.carreraElegida = '';
      this.datosSubmitted.emit(datos);
    }
  }

  cerrarModal() {
    this.mostrarModalCarreras = false;
    this.carreraElegida = '';
  }
}
