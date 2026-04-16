import { TestBed } from '@angular/core/testing';
import { CertificadoSencilloBuilder } from '../../../features/certificados/compra-certificado/core/builders/certificado-sencillo.builder';
import { DatosCertificado } from '../../../features/certificados/compra-certificado/core/models/certificado.model';

describe('CertificadoSencilloBuilder', () => {
  let builder: CertificadoSencilloBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    builder = new CertificadoSencilloBuilder();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build certificate with correct title', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Constancia de Estudio');
    expect(html).toContain('CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE');
    expect(html).toContain('804.006.527-3');
  });

  it('should contain student information', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Test User');
    expect(html).toContain('12345678');
    expect(html).toContain('10236580');
    expect(html).toContain('Desarrollo de Software');
  });

  it('should contain SNIES information', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('12345');
    expect(html).toContain('SNIES');
  });

  it('should contain footer with signature', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('MAGDA CAROLINA REYES RINCÓN');
    expect(html).toContain('Vicerrectora Académica');
  });

  it('should mask data when preview is true', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, true);
    
    expect(html).toContain('*********************');
    expect(html).not.toContain('Test User');
    expect(html).not.toContain('12345678');
  });

  it('should contain certification text', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Hace Constar');
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