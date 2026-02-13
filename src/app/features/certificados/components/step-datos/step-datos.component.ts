import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificadoDatos } from '../../../../core/models/certificado.model';

@Component({
  selector: 'app-step-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-datos.component.html',
  styleUrls: ['./step-datos.component.css']
})
export class StepDatosComponent {
  @Output() datosSubmitted = new EventEmitter<CertificadoDatos>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      documento_identidad: ['', [Validators.required]],
      numero_estudiante: ['', [Validators.required]],
      numero_programa: ['', [Validators.required]],
      tipoCertificado: ['', [Validators.required]]
    });
  }

  filterNumbers(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.form.get(field)?.setValue(value);
  }

  continuar() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const datos: CertificadoDatos = {
        documento_identidad: formValue.documento_identidad,
        numero_estudiante: formValue.numero_estudiante,
        numero_programa: formValue.numero_programa,
        tipo_certificado: formValue.tipoCertificado,
        nombre: ''
      };
      this.datosSubmitted.emit(datos);
    }
  }
}
