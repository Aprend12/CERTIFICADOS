import { TestBed } from '@angular/core/testing';
import { CertificadoPracticaBuilder } from '../../../features/certificados/compra-certificado/core/builders/certificado-practica.builder';
import { DatosCertificado } from '../../../features/certificados/compra-certificado/core/models/certificado.model';

describe('CertificadoPracticaBuilder', () => {
  let builder: CertificadoPracticaBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    builder = new CertificadoPracticaBuilder();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build certificate with student data', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Test User');
    expect(html).toContain('12345678');
    expect(html).toContain('Desarrollo de Software');
  });

  it('should contain footer with signature', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('MAGDA CAROLINA REYES RINCÓN');
    expect(html).toContain('Vicerrectora');
  });

  it('should contain student information', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Test User');
    expect(html).toContain('12345678');
  });

  it('should mask data when preview is true', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, true);
    
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