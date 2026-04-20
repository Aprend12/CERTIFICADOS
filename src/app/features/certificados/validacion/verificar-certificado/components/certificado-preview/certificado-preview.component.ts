import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-certificado-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-descarga">
      <div class="form-container">
        <div class="preview-section">
          <h3 class="preview-title">Certificado</h3>
          <div class="pdf-stage">
            <div *ngIf="loading" class="loading">
              Cargando certificado...
            </div>
            <iframe
              *ngIf="pdfSrc && !loading"
              [src]="pdfSrc"
              class="pdf-iframe"
              title="Certificado">
            </iframe>
            <div *ngIf="!pdfSrc && !loading" class="no-pdf">
              No se pudo cargar el certificado
            </div>
          </div>
        </div>

        <div class="buttons-container">
          <button type="button" class="btn btn-primary" (click)="onDescargar.emit()" [disabled]="descargando">
            {{ descargando ? 'Descargando...' : 'Descargar PDF' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .step-descarga {
      width: 100%;
    }
    .form-container {
      max-width: 900px;
      margin: 0 auto;
    }
    .preview-section {
      margin-bottom: 20px;
    }
    .preview-title {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 15px;
    }
    .pdf-stage {
      background: #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      min-height: 600px;
    }
    .pdf-iframe {
      width: 100%;
      height: 600px;
      border: none;
    }
    .loading, .no-pdf {
      padding: 50px;
      text-align: center;
      color: #666;
    }
    .no-pdf {
      color: #d32f2f;
    }
    .buttons-container {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
    }
    .btn {
      padding: 12px 30px;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #ff8800;
      color: white;
    }
    .btn-primary:hover {
      background: #e67e00;
    }
    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadoPreviewComponent {
  @Input() pdfSrc: any = null;
  @Input() loading: boolean = false;
  @Input() descargando: boolean = false;
  @Output() onDescargar = new EventEmitter<void>();
}
