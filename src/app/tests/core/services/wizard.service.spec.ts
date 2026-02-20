import { TestBed } from '@angular/core/testing';
import { WizardService } from '../../../features/certificados/compra-certificado/core/services/wizard.service';

describe('WizardService', () => {
  let service: WizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have 4 total steps', () => {
    expect(service.totalSteps).toBe(4);
  });

  it('should return correct step titles', () => {
    expect(service.getStepTitle(0)).toBe('Ingresar datos del certificado');
    expect(service.getStepTitle(1)).toBe('Vista previa del certificado');
    expect(service.getStepTitle(2)).toBe('Realizar pago');
    expect(service.getStepTitle(3)).toBe('Descargar certificado');
  });

  it('should allow access to current and next step', () => {
    expect(service.canAccessStep(0)).toBe(true);
    expect(service.canAccessStep(1)).toBe(true);
    expect(service.canAccessStep(2)).toBe(false);
  });

  it('should navigate to next step', () => {
    expect(service.next()).toBe(true);
  });

  it('should not navigate beyond last step', () => {
    service.goTo(3);
    expect(service.next()).toBe(false);
  });

  it('should navigate to previous step', () => {
    service.goTo(2);
    expect(service.prev()).toBe(true);
  });

  it('should not navigate before first step', () => {
    expect(service.prev()).toBe(false);
  });

  it('should go to specific step', () => {
    service.goTo(2);
    expect(service.goTo(2)).toBe(true);
  });

  it('should not go to invalid step', () => {
    expect(service.goTo(10)).toBe(false);
    expect(service.goTo(-1)).toBe(false);
  });

  it('should reset to first step', () => {
    service.goTo(3);
    service.reset();
    expect(service.goTo(0)).toBe(true);
  });

  it('should check if step is active', () => {
    expect(service.isStepActive(0)).toBe(true);
    expect(service.isStepActive(1)).toBe(false);
  });
});
