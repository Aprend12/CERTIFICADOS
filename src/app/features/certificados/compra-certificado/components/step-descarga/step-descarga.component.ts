import { Component, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoService } from '../../core/services/certificado.service';
import { DownloadService } from '../../core/services/download.service';
import { ApiService } from '../../core/services/api.service';
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
    documento: '',
    codigo_estudiante: '',
    snies: '',
    tipo_certificado: '',
    nombre_completo: '',
  };

  certificadoFinal: string = '';
  generando = false;
  error: string | null = null;

  private certificadoService = inject(CertificadoService);
  private downloadService = inject(DownloadService);
  private apiService = inject(ApiService);

  ngOnChanges() {
    this.generarCertificadoFinal();
  }

  generarCertificadoFinal() {
    this.certificadoFinal = this.certificadoService.generarCertificadoFinal(this.datos);
  }

  descargar() {
    this.generando = true;
    this.error = null;

    const tipoCertificadoMap: Record<string, string[]> = {
      'sencillo': ['datos_basicos'],
      'notas': ['notas'],
      'fechas': ['fechas'],
      'fechas_jornada': ['fechas', 'jornada'],
      'pension': ['pension'],
      'homologacion': ['homologacion'],
      'grado': ['grado'],
      'conducta': ['conducta'],
      'horario': ['horario', 'fechas'],
      'practica': ['practica']
    };

    const request = {
      documento_identidad: this.datos.documento,
      tipo_certificado: tipoCertificadoMap[this.datos.tipo_certificado] || ['datos_basicos'],
      snies: this.datos.snies || undefined
    };

    this.apiService.generarCertificado(request).subscribe({
      next: (response) => {
        this.generando = false;
        this.apiService.descargarCertificado(response.pdf).subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = response.pdf;
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: () => {
            this.downloadService.descargar(this.certificadoFinal, 'certificado.html');
          }
        });
      },
      error: (err) => {
        this.generando = false;
        this.error = 'Error al generar el certificado. Descargando versión local.';
        this.downloadService.descargar(this.certificadoFinal, 'certificado.html');
      }
    });
  }
}
