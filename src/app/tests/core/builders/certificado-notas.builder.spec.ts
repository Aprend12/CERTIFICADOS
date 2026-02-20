import { TestBed } from '@angular/core/testing';
import { CertificadoNotasBuilder } from '../../../features/certificados/compra-certificado/core/builders/certificado-notas.builder';
import { DatosCertificado } from '../../../features/certificados/compra-certificado/core/models/certificado.model';

describe('CertificadoNotasBuilder', () => {
  let builder: CertificadoNotasBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    builder = new CertificadoNotasBuilder();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build certificate with correct title', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('REGISTRO DE NOTAS');
  });

  it('should contain grades table', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Módulo / Asignaturas');
    expect(html).toContain('Créditos');
    expect(html).toContain('Nota');
  });

  it('should mask data when preview is true', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, true);
    
    expect(html).toContain('*********************');
    expect(html).not.toContain('Test User');
  });

  function createMockDatos(): DatosCertificado {
    return {
      nombre: 'Test User',
      documento: '12345678',
      programa: 'Desarrollo de Software',
      snies: '12345',
      semestre: '5',
      periodo: '2025-1',
      fecha_expedicion: '2025-01-15',
      fecha_inicio: '2025-01-01',
      fecha_fin: '2025-06-30',
      jornada: 'Diurna',
      codigo: '10236580'
    };
  }
});
