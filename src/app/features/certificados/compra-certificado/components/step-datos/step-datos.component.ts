import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificadoDatos } from '../../core/models/certificado.model';

interface CarreraEstudiante {
  programa: string;
  snies: string;
  semestre: string;
  periodo: string;
}

interface EstudianteCertificado {
  nombre: string;
  documento: string;
  carreras: CarreraEstudiante[];
}

@Component({
  selector: 'app-step-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-datos.component.html',
  styleUrls: ['./step-datos.component.css']
})
export class StepDatosComponent {
  @Output() datosSubmitted = new EventEmitter<CertificadoDatos>();
  @Output() goToStep2 = new EventEmitter<{ estudiante: EstudianteCertificado; carreras: CarreraEstudiante[]; tipoCertificado: string; documento: string; numeroEstudiante: string; codigoCarrera: string }>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  estudianteEncontrado: EstudianteCertificado | null = null;
  estudianteNoEncontrado = false;
  verificando = false;

  carrerasDisponibles: CarreraEstudiante[] = [];
  carreraSeleccionada: CarreraEstudiante | null = null;

  private readonly estudiantesCertificados: Record<string, EstudianteCertificado> = {
    '1005256864': {
      nombre: 'OJEDA HERNÁNDEZ SANTIAGO',
      documento: '1005256864',
      carreras: [
        {
          programa: 'LICENCIATURA EN PEDAGOGÍA INFANTIL',
          snies: '123456',
          semestre: 'Sexto Semestre',
          periodo: '2025-1'
        },
        {
          programa: 'TECNOLOGÍA EN DESARROLLO DE SOFTWARE',
          snies: '654321',
          semestre: 'Tercer Semestre',
          periodo: '2025-1'
        }
      ]
    },
    '1023456789': {
      nombre: 'MARÍA GONZÁLEZ PÉREZ',
      documento: '1023456789',
      carreras: [
        {
          programa: 'TECNOLOGÍA EN DESARROLLO DE SOFTWARE',
          snies: '654321',
          semestre: 'Quinto Semestre',
          periodo: '2025-1'
        }
      ]
    },
    '1234567890': {
      nombre: 'JUAN CARLOS PÉREZ GÓMEZ',
      documento: '1234567890',
      carreras: [
        {
          programa: 'INGENIERÍA DE SISTEMAS',
          snies: '111111',
          semestre: 'Octavo Semestre',
          periodo: '2025-1'
        },
        {
          programa: 'INGENIERÍA ELECTRÓNICA',
          snies: '222222',
          semestre: 'Cuarto Semestre',
          periodo: '2025-1'
        },
        {
          programa: 'INGENIERÍA INDUSTRIAL',
          snies: '333333',
          semestre: 'Segundo Semestre',
          periodo: '2025-1'
        }
      ]
    }
  };
puedeContinuar: any;

  constructor() {
    this.form = this.fb.group({
      documento_identidad: ['', [Validators.required]],
      numero_estudiante: ['', [Validators.required]],
      tipo_certificado: ['', [Validators.required]],
      codigo_carrera: ['']
    });
  }

  get tieneMultiplesCarreras(): boolean {
    return this.carrerasDisponibles.length > 1;
  }

  filterNumbers(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.form.get(field)?.setValue(value);
  }

  private verificarEstudiante(documento: string, numeroEstudiante: string): EstudianteCertificado | null {
    const estudiante = this.estudiantesCertificados[documento];
    if (estudiante && numeroEstudiante) {
      return estudiante;
    }
    return null;
  }

  verificarCertificado() {
    const documento = this.form.get('documento_identidad')?.value;
    const numeroEstudiante = this.form.get('numero_estudiante')?.value;

    if (!documento || !numeroEstudiante) {
      this.estudianteNoEncontrado = false;
      this.estudianteEncontrado = null;
      this.carreraSeleccionada = null;
      this.carrerasDisponibles = [];
      return;
    }

    this.verificando = true;

    setTimeout(() => {
      const resultado = this.verificarEstudiante(documento, numeroEstudiante);

      if (resultado) {
        this.estudianteEncontrado = resultado;
        this.estudianteNoEncontrado = false;
        this.carrerasDisponibles = resultado.carreras;

        if (resultado.carreras.length === 1) {
          this.carreraSeleccionada = resultado.carreras[0];
        } else {
          this.carreraSeleccionada = null;
        }
      } else {
        this.estudianteEncontrado = null;
        this.estudianteNoEncontrado = true;
        this.carreraSeleccionada = null;
        this.carrerasDisponibles = [];
      }

      this.verificando = false;
    }, 500);
  }

  continuar() {
    if (this.form.valid && this.estudianteEncontrado) {
      const formValue = this.form.value;

      if (this.tieneMultiplesCarreras) {
        this.goToStep2.emit({
          estudiante: this.estudianteEncontrado,
          carreras: this.carrerasDisponibles,
          tipoCertificado: formValue.tipo_certificado,
          documento: formValue.documento_identidad,
          numeroEstudiante: formValue.numero_estudiante,
          codigoCarrera: formValue.codigo_carrera
        });
      } else {
        const datos: CertificadoDatos = {
          documento_identidad: formValue.documento_identidad,
          numero_estudiante: formValue.numero_estudiante,
          numero_programa: this.carreraSeleccionada?.snies || '',
          tipo_certificado: formValue.tipo_certificado,
          nombreEstudiante: this.estudianteEncontrado?.nombre || ''
        };
        this.datosSubmitted.emit(datos);
      }
    }
  }
}
