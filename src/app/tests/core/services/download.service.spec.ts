import { TestBed } from '@angular/core/testing';
import { DownloadService } from '../../../features/certificados/compra-certificado/core/services/download.service';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
