import { TestBed } from '@angular/core/testing';
import { CertificadoHorarioBuilder } from '../../../core/builders/certificado-horario.builder';
import { DatosCertificado } from '../../../core/models/certificado.model';

describe('CertificadoHorarioBuilder', () => {
  let builder: CertificadoHorarioBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    builder = new CertificadoHorarioBuilder();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build certificate with correct title', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('Certificado con Horario y Fechas');
  });

  it('should contain schedule table', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = builder.build(datos, false);
    
    expect(html).toContain('HORARIO DE CLASES');
    expect(html).toContain('DÍA');
    expect(html).toContain('HORA');
    expect(html).toContain('ASIGNATURA');
    expect(html).toContain('AULA');
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
