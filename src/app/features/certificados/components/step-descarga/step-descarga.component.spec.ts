import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepDescargaComponent } from './step-descarga.component';
import { CertificadoService } from '../../../../core/services/certificado.service';
import { DownloadService } from '../../../../core/services/download.service';
import { CertificadoDatos } from '../../../../core/models/certificado.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';

describe('StepDescargaComponent', () => {
  let component: StepDescargaComponent;
  let fixture: ComponentFixture<StepDescargaComponent>;
  let mockCertificadoService: any;
  let mockDownloadService: any;

  const mockDatos: CertificadoDatos = {
    documento_identidad: '12345678',
    numero_estudiante: '10236580',
    numero_programa: '123456',
    tipo_certificado: 'sencillo',
    nombre: 'Test User'
  };

  beforeEach(async () => {
    mockCertificadoService = {
      generarCertificadoFinal: vi.fn().mockReturnValue('<div>Certificado Final</div>')
    };

    mockDownloadService = {
      descargar: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [StepDescargaComponent],
      providers: [
        { provide: CertificadoService, useValue: mockCertificadoService },
        { provide: DownloadService, useValue: mockDownloadService }
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

  it('should call download service when descargar is called', () => {
    component.certificadoFinal = '<div>Test</div>';
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    component.descargar();
    expect(mockDownloadService.descargar).toHaveBeenCalledWith('<div>Test</div>', 'certificado.html');
  });
});
