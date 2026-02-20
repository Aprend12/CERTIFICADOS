import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepDatosComponent } from '../../../../features/certificados/compra-certificado/components/step-datos/step-datos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('StepDatosComponent', () => {
  let component: StepDatosComponent;
  let fixture: ComponentFixture<StepDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepDatosComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StepDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit datosSubmitted when form is valid', () => {
    const emitSpy = vi.spyOn(component.datosSubmitted, 'emit');

    component.form.patchValue({
      documento_identidad: '1005256864',
      numero_estudiante: '10236580',
      tipo_certificado: 'sencillo'
    });

    component.estudianteEncontrado = {
      nombre: 'Test Student',
      documento: '1005256864',
      carreras: [{ programa: 'Test Program', snies: '123456', semestre: '5', periodo: '2025-1' }]
    };
    component.carreraSeleccionada = { programa: 'Test Program', snies: '123456', semestre: '5', periodo: '2025-1' };

    component.continuar();

    expect(emitSpy).toHaveBeenCalledWith({
      documento_identidad: '1005256864',
      numero_estudiante: '10236580',
      numero_programa: '123456',
      tipo_certificado: 'sencillo',
      nombreEstudiante: 'Test Student'
    });
  });

  it('should not emit when form is invalid', () => {
    const emitSpy = vi.spyOn(component.datosSubmitted, 'emit');
    component.form.patchValue({ documento_identidad: '' });
    component.continuar();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should filter non-numeric characters', () => {
    const event = { target: { value: 'abc123def' } } as any;
    component.filterNumbers(event, 'documento_identidad');
    expect(component.form.get('documento_identidad')?.value).toBe('123');
  });
});
