import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from './wizard.component';
import { WizardService } from '../../../core/services/wizard.service';
import { CertificadoService } from '../../../core/services/certificado.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent],
      providers: [
        WizardService,
        CertificadoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty datosUsuario', () => {
    expect(component.datosUsuario.documento_identidad).toBe('');
    expect(component.datosUsuario.numero_estudiante).toBe('');
  });

  it('should have wizardService defined', () => {
    expect(component.wizardService).toBeTruthy();
  });

  it('should call next on datos submitted', () => {
    const wizardService = TestBed.inject(WizardService);
    const nextSpy = vi.spyOn(wizardService, 'next');
    component.onDatosSubmitted({
      documento_identidad: '123',
      numero_estudiante: '456',
      numero_programa: '789',
      tipo_certificado: 'sencillo',
      nombre: 'Test'
    });
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should reset wizard', () => {
    const wizardService = TestBed.inject(WizardService);
    const certificadoService = TestBed.inject(CertificadoService);
    const resetSpy = vi.spyOn(wizardService, 'reset');
    const limpiarSpy = vi.spyOn(certificadoService, 'limpiar');
    component.resetWizard();
    expect(resetSpy).toHaveBeenCalled();
    expect(limpiarSpy).toHaveBeenCalled();
  });
});
