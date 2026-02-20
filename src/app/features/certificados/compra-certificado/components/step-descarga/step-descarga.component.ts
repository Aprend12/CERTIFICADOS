import { Component, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoService } from '../../core/services/certificado.service';
import { DownloadService } from '../../core/services/download.service';
import { CertificadoDatos } from '../../core/models/certificado.model';

@Component({
  selector: 'app-step-descarga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-descarga.component.html',
  styleUrls: ['./step-descarga.component.css']
})
export class StepDescargaComponent implements OnChanges {
  @Input() datos: CertificadoDatos = {
    documento_identidad: '',
    numero_estudiante: '',
    numero_programa: '',
    tipo_certificado: '',
    nombreEstudiante: ''
  };

  certificadoFinal: string = '';

  private certificadoService = inject(CertificadoService);
  private downloadService = inject(DownloadService);

  ngOnChanges() {
    this.generarCertificadoFinal();
  }

  generarCertificadoFinal() {
    this.certificadoFinal = this.certificadoService.generarCertificadoFinal(this.datos);
  }

  descargar() {
    alert('Certificado generado correctamente. En un sistema real, aquí se descargaría el PDF.');
    this.downloadService.descargar(this.certificadoFinal, 'certificado.html');
  }
}
