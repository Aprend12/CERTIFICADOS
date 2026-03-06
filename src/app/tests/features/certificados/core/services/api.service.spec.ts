import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, GenerarCertificadoRequest, GenerarCertificadoResponse, DescargarCertificado } from '../../../../features/certificados/compra-certificado/core/services/api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch a PDF blob through the two-step download flow', (done) => {
    const request: GenerarCertificadoRequest = {
      documento_identidad: '1234',
      tipo_certificado: ['datos_basicos']
    };

    // subscribe to the helper
    service.generarYObtenerPdf(request).subscribe({
      next: blob => {
        expect(blob instanceof Blob).toBe(true);
        done();
      },
      error: () => {
        done.fail('should not have errored');
      }
    });

    // first call: generarCertificado
    const req1 = httpMock.expectOne('/api/generar/certificado');
    expect(req1.request.method).toBe('POST');
    req1.flush({ mensaje: 'ok', pdf: 'token.pdf', hash: 'abc' } as GenerarCertificadoResponse);

    // second call: descriptor
    const req2 = httpMock.expectOne('/api/descargar/certificado/token.pdf');
    expect(req2.request.method).toBe('GET');
    expect(req2.request.headers.get('Accept')).toContain('application/json');
    req2.flush({ mensaje: 'ok', nombre_pdf: 'token.pdf' } as DescargarCertificado);

    // third call: actual blob
    const req3 = httpMock.expectOne('/api/descargar/certificado/token.pdf');
    expect(req3.request.method).toBe('GET');
    expect(req3.request.responseType).toBe('blob');
    req3.flush(new Blob(['foo'], { type: 'application/pdf' }));
  });

  it('should error if the first response has no pdf token', (done) => {
    const request: GenerarCertificadoRequest = {
      documento_identidad: '1234',
      tipo_certificado: ['datos_basicos']
    };

    service.generarYObtenerPdf(request).subscribe({
      next: () => done.fail('should not emit blob'),
      error: err => {
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toContain('identificador de PDF');
        done();
      }
    });

    const req1 = httpMock.expectOne('/api/generar/certificado');
    req1.flush({ mensaje: 'ok', pdf: '' } as any);
  });

  it('should wrap descriptor parsing failures', (done) => {
    const request: GenerarCertificadoRequest = {
      documento_identidad: '1234',
      tipo_certificado: ['datos_basicos']
    };

    service.generarYObtenerPdf(request).subscribe({
      next: () => done.fail('should not succeed'),
      error: err => {
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toContain('Respuesta inválida');
        done();
      }
    });

    const req1 = httpMock.expectOne('/api/generar/certificado');
    req1.flush({ mensaje: 'ok', pdf: 'token.pdf', hash: 'abc' } as GenerarCertificadoResponse);

    const req2 = httpMock.expectOne('/api/descargar/certificado/token.pdf');
    req2.flush('<html>oops</html>', { headers: { 'Content-Type': 'text/html' } });
  });
});
