import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, GenerarCertificadoRequest, GenerarCertificadoResponse } from '../../../../../features/certificados/compra-certificado/core/services/api.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to generar certificado endpoint', () => {
    const request: GenerarCertificadoRequest = {
      hash_code: 'abc123',
      documento_estudiante: '1234'
    };

    service.generarCertificado(request).subscribe();

    const req = httpMock.expectOne('/certificado/generar');
    expect(req.request.method).toBe('POST');
    req.flush({ mensaje: 'ok', pdf: 'token.pdf', hash: 'abc' } as GenerarCertificadoResponse);
  });
});