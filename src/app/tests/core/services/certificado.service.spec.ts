import { TestBed } from '@angular/core/testing';
import { CertificadoService } from '../../../features/certificados/compra-certificado/core/services/certificado.service';
import { HtmlBuilderService } from '../../../features/certificados/compra-certificado/core/services/html-builder.service';
import { CertificadoDatos } from '../../../features/certificados/compra-certificado/core/models/certificado.model';
import { vi } from 'vitest';

describe('CertificadoService', () => {
  let service: CertificadoService;
  let htmlBuilderSpy: any;

  beforeEach(() => {
    const spy = vi.fn().mockReturnValue('<div>Certificado HTML</div>');

    TestBed.configureTestingModule({
      providers: [
        CertificadoService,
        { provide: HtmlBuilderService, useValue: { build: spy } }
      ]
    });

    service = TestBed.inject(CertificadoService);
    htmlBuilderSpy = TestBed.inject(HtmlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get datos', () => {
    const datos: CertificadoDatos = {
      documento: '12345678',
      codigo_estudiante: '10236580',
      snies: '123456',
      tipo_certificado: 'sencillo',
      nombre_completo: 'Juan Pérez'
    };

    service.setDatos(datos);
    expect(service.getDatos()).toEqual(datos);
  });

  it('should clear datos', () => {
    const datos: CertificadoDatos = {
      documento: '12345678',
      codigo_estudiante: '10236580',
      snies: '123456',
      tipo_certificado: 'sencillo',
      nombre_completo: 'Juan Pérez'
    };

    service.setDatos(datos);
    service.limpiar();
    expect(service.getDatos()).toEqual({} as CertificadoDatos);
  });

  it('should return correct title for valid tipo', () => {
    expect(service.getTitulo('sencillo')).toBe('Certificado de Estudio Sencillo');
    expect(service.getTitulo('notas')).toBe('Certificado de Notas');
    expect(service.getTitulo('fechas')).toBe('Certificado con Fechas Académicas');
  });

  it('should return pension title for invalid tipo', () => {
    expect(service.getTitulo('invalid')).toBe('para pension');
  });

  it('should generate preview with masked data', () => {
    const datos: CertificadoDatos = {
      documento: '12345678',
      codigo_estudiante: '10236580',
      snies: '123456',
      tipo_certificado: 'sencillo',
      nombre_completo: 'Juan Pérez'
    };

    const preview = service.generarPreview(datos);

    expect(htmlBuilderSpy.build).toHaveBeenCalled();
    expect(preview).toBe('<div>Certificado HTML</div>');
  });

  it('should return placeholder for invalid tipo in preview', () => {
    const datos: CertificadoDatos = {
      documento: '12345678',
      codigo_estudiante: '10236580',
      snies: '123456',
      tipo_certificado: 'invalid',
      nombre_completo: 'Juan Pérez'
    };

    const preview = service.generarPreview(datos);

    expect(preview).toContain('Seleccione un tipo de certificado');
  });

  it('should generate final certificate without masked data', () => {
    const datos: CertificadoDatos = {
      documento: '12345678',
      codigo_estudiante: '10236580',
      snies: '123456',
      tipo_certificado: 'sencillo',
      nombre_completo: 'Juan Pérez'
    };

    const certificado = service.generarCertificadoFinal(datos);

    expect(htmlBuilderSpy.build).toHaveBeenCalled();
    expect(certificado).toBe('<div>Certificado HTML</div>');
  });

  it('should return empty string for invalid tipo in final certificate', () => {
    const datos: CertificadoDatos = {
      documento: '12345678',
      codigo_estudiante: '10236580',
      snies: '123456',
      tipo_certificado: 'invalid',
      nombre_completo: 'Juan Pérez'
    };

    const certificado = service.generarCertificadoFinal(datos);

    expect(certificado).toBe('');
  });
});