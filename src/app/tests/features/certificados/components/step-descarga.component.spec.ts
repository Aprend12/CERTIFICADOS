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
  };

  beforeEach(async () => {
    mockCertificadoService = {
      generarCertificadoFinal: vi.fn().mockReturnValue('<div>Certificado Final</div>')
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
      )
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
    expect(mockCertificadoService.generarCertificadoFinal).toHaveBeenCalledWith(mockDatos);
    expect(component.certificadoFinal).toBe('<div>Certificado Final</div>');
  });

  it('should request the certificate and eventually call download service, storing JSON', () => {
    component.datos = mockDatos;
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

    component.descargar();

    expect(mockApiService.generarCertificado).toHaveBeenCalledWith(
      expect.objectContaining({
        documento_identidad: mockDatos.documento,
        tipo_certificado: [mockDatos.tipo_certificado]
      })
    );
    expect(mockApiService.descargarCertificadoBlob).toHaveBeenCalledWith('token.pdf');
    expect(createObjectURLSpy).toHaveBeenCalled();

    expect(component.jsonHistory).toEqual([
      { step: 'generarCertificado', data: { mensaje: 'ok', pdf: 'token.pdf', hash: 'abc' } }
    ]);
    expect(component.fileName).toBe('token.pdf');
    expect(component.certificadoJson).toEqual({ mensaje: 'ok', pdf: 'token.pdf', hash: 'abc' });
  });

  it('should set error if blob is not a valid PDF', (done) => {
    component.datos = mockDatos;
    // override blob to be non-PDF small text
    mockApiService.descargarCertificadoBlob = vi.fn().mockReturnValue(
      of(new Blob(['not pdf'], { type: 'text/plain' }))
    );

    component.descargar();

    // wait a tick for FileReader to finish
    setTimeout(() => {
      expect(component.error).toContain('no es un PDF válido');
      done();
    }, 0);
  });

  it('should display certificate in template', () => {
    component.certificadoFinal = '<div>Test Certificate Content</div>';
    // mimic sanitizer behavior used in component
    component.certificadoFinalSafe = component.certificadoFinal as any;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.certificado')?.innerHTML).toContain('Test Certificate Content');
  });

  it('should have download button', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('.btn-descargar') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Descargar');
    expect(btn.disabled).toBe(false);
  });

  it('should update button text when filename is known', () => {
    component.fileName = 'certificado_TOAT-8977.pdf';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.btn-descargar') as HTMLButtonElement;
    expect(btn.textContent).toContain('certificado_TOAT-8977.pdf');
  });

  it('should display certificadoJson section', () => {
    component.certificadoJson = { codigo_verificacion: '123', nombre_pdf: 'foo.pdf' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('fieldset.json-preview + fieldset')).toBeTruthy();
    expect(compiled.textContent).toContain('codigo_verificacion');
  });

  it('should show error message in template when error exists', () => {
    component.error = 'some error';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')?.textContent).toContain('some error');
  });

  it('should display history entries in template', () => {
    component.jsonHistory = [
      { step: 'generarCertificado', data: { a: 1 } },
      { step: 'descriptor', data: { b: 2 } }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('fieldset.json-preview')).toBeTruthy();
    expect(compiled.textContent).toContain('generarCertificado');
    expect(compiled.textContent).toContain('"a": 1');
    expect(compiled.textContent).toContain('descriptor');
    expect(compiled.textContent).toContain('"b": 2');
  });

  it('should update button label when generating', () => {
    component.generando = true;
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.btn-descargar') as HTMLButtonElement;
    expect(btn.textContent).toContain('Generando');
    expect(btn.disabled).toBe(true);
  });

  it('should show title', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Certificado Generado');
  });

  it('should set error when documento is missing', () => {
    component.datos = { documento: '', codigo_estudiante: '', snies: '', tipo_certificado: '', nombre_completo: '' };
    component.descargar();
    expect(component.error).toContain('Falta documento');
    expect(mockApiService.generarCertificado).not.toHaveBeenCalled();
  });
});
