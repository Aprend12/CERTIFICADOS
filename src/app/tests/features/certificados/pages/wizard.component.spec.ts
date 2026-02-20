import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from '../../../../features/certificados/compra-certificado/pages/wizard.component';
import { WizardService } from '../../../../features/certificados/compra-certificado/core/services/wizard.service';
import { CertificadoService } from '../../../../features/certificados/compra-certificado/core/services/certificado.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { vi } from 'vitest';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent, RouterModule.forRoot([])],
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
    const wizardService = TestBed.inject(WizardService) as any;
    const nextSpy = vi.spyOn(wizardService, 'next');
    component.onDatosSubmitted({
      documento_identidad: '123',
      numero_estudiante: '456',
      numero_programa: '789',
      tipo_certificado: 'sencillo',
      nombreEstudiante:'test users'
    });
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should reset wizard', () => {
    const wizardService = TestBed.inject(WizardService) as any;
    const certificadoService = TestBed.inject(CertificadoService) as any;
    const resetSpy = vi.spyOn(wizardService, 'reset');
    const limpiarSpy = vi.spyOn(certificadoService, 'limpiar');
    component.resetWizard();
    expect(resetSpy).toHaveBeenCalled();
    expect(limpiarSpy).toHaveBeenCalled();
  });
});
