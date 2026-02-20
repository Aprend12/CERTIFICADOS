import { TestBed } from '@angular/core/testing';
import { HtmlBuilderService } from '../../../features/certificados/compra-certificado/core/services/html-builder.service';
import { DatosCertificado } from '../../../features/certificados/compra-certificado/core/models/certificado.model';

describe('HtmlBuilderService', () => {
  let service: HtmlBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build sencillo certificate', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = service.build('sencillo', datos, false);

    expect(html).toContain('CONSTANCIA DE ESTUDIO');
    expect(html).toContain('Test User');
    expect(html).toContain('12345678');
  });

  it('should build notas certificate', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = service.build('notas', datos, false);

    expect(html).toContain('REGISTRO DE NOTAS');
  });

  it('should build dates certificate', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = service.build('fechas', datos, false);

    expect(html).toContain('CONSTANCIA DE ESTUDIO CON FECHAS');
    expect(html).toContain('2025-1');
    expect(html).toContain('5');
  });

  it('should mask data when preview is true', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = service.build('sencillo', datos, true);

    expect(html).toContain('*********************');
    expect(html).not.toContain('Test User');
  });

  it('should return default certificate for unknown type', () => {
    const datos: DatosCertificado = createMockDatos();
    const html = service.build('unknown' as any, datos, false);

    expect(html).toContain('CONSTANCIA DE ESTUDIO');
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
