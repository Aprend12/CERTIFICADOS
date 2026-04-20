import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoData } from '../../core/models/verificar.model';

@Component({
  selector: 'app-mostrar-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-resultado.component.html',
  styleUrls: ['./mostrar-resultado.component.css']
})
export class MostrarResultadoComponent {
  @Input() certificadoData: CertificadoData | null = null;
  @Input() certificadoHTML: string = '';
  @Input() esValido: boolean = false;
  @Input() downloadUrl: string = '';
  @Output() volver = new EventEmitter<void>();

  descargarPdf() {
    if (this.downloadUrl) {
      window.open(this.downloadUrl, '_blank');
    }
  }

  onVolver() {
    this.volver.emit();
  }
}
