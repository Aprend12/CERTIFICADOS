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

  it('should have form with required fields', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('documento_estudiante')).toBeTruthy();
    expect(component.form.get('codigo_estudiante')).toBeTruthy();
    expect(component.form.get('tipo_certificado')).toBeTruthy();
  });

  it('should have tieneMultiplesCarreras as false initially', () => {
    expect(component.tieneMultiplesCarreras).toBe(false);
  });
});