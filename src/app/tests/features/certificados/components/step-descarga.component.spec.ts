import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepDescargaComponent } from '../../../../features/certificados/compra-certificado/components/step-descarga/step-descarga.component';
import { CertificadoService } from '../../../../features/certificados/compra-certificado/core/services/certificado.service';
import { CertificadoDatos } from '../../../../features/certificados/compra-certificado/core/models/certificado.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { ApiService } from '../../../../features/certificados/compra-certificado/core/services/api.service';

describe('StepDescargaComponent', () => {
  let component: StepDescargaComponent;
  let fixture: ComponentFixture<StepDescargaComponent>;
  let mockCertificadoService: any;
  let mockApiService: any;

  const mockDatos: CertificadoDatos = {
    documento: '12345678',
    codigo_estudiante: '10236580',
    snies: '123456',
    tipo_certificado: 'sencillo',
    nombre_completo: 'juan perez',
    hash_code: 'abc123'
  };

  beforeEach(async () => {
    mockCertificadoService = {
      generarCertificadoFinal: vi.fn().mockReturnValue('<div>Certificado Final</div>'),
      generarCertificadoConDatos: vi.fn().mockReturnValue('<div>Certificado Final</div>')
    };


    mockApiService = {
      generarCertificado: vi.fn().mockReturnValue(
        of({ mensaje: 'ok', pdf: 'token.pdf', hash: 'abc' })
      ),
      descargarCertificado: vi.fn().mockReturnValue(
        of({ mensaje: 'ok', nombre_pdf: 'token.pdf' })
      ),
      descargarCertificadoBlob: vi.fn().mockReturnValue(
        of(new Blob(['foo'], { type: 'application/pdf' }))
      ),
      getDownloadUrl: vi.fn().mockReturnValue('https://example.com/file.pdf')
    };

    await TestBed.configureTestingModule({
      imports: [StepDescargaComponent],
      providers: [
        { provide: CertificadoService, useValue: mockCertificadoService },
        { provide: ApiService, useValue: mockApiService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(StepDescargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate final certificate on ngOnChanges', () => {
    component.datos = mockDatos;
    component.ngOnChanges();
    expect(mockCertificadoService.generarCertificadoConDatos).toHaveBeenCalled();
    expect(component.certificadoFinal).toBe('<div>Certificado Final</div>');
  });

  it('should not generate certificate when hash_code is missing', () => {
    component.datos = { ...mockDatos, hash_code: '' };
    component.ngOnChanges();
    expect(component.error).toContain('hash_code');
    expect(mockCertificadoService.generarCertificadoConDatos).not.toHaveBeenCalled();
  });

  it('should request the certificate when descargar is called', async () => {
    component.datos = mockDatos;

    component.descargar();

    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockApiService.generarCertificado).toHaveBeenCalled();
  });

  it('should set error when documento is missing', () => {
    component.datos = { documento: '', codigo_estudiante: '', snies: '', tipo_certificado: '', nombre_completo: '' };
    component.descargar();
    expect(component.error).toContain('Falta documento');
    expect(mockApiService.generarCertificado).not.toHaveBeenCalled();
  });

  it('should display certificate HTML when certificadoFinal is set', () => {
    component.certificadoFinal = '<div>Test Certificate Content</div>';
    component.certificadoFinalSafe = component.certificadoFinal as any;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('Test Certificate Content');
  });

  it('should have download button', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('.btn-primary') as HTMLButtonElement;
    expect(btn).toBeTruthy();
  });

  it('should display error message when error exists', () => {
    component.error = 'test error message';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('test error message');
  });
});