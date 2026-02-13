import { Component, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoGeneratorService } from '../../../../core/services/certificado-generator.service';
import { CertificadoDatos } from '../../../../core/models/certificado.model';

@Component({
  selector: 'app-step-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.css']
})
export class StepPreviewComponent implements OnChanges {
  @Input() datos: CertificadoDatos = {
    documento_identidad: '',
    numero_estudiante: '',
    numero_programa: '',
    tipo_certificado: '',
    nombre: ''
  };

  certificadoHTML: string = '';

  generatorService = inject(CertificadoGeneratorService);

  ngOnChanges() {
    this.generarCertificado();
  }

  generarCertificado() {
    this.certificadoHTML = this.generatorService.generarPreview(this.datos);
  }

  getTitulo(tipo: string): string {
    return this.generatorService.getTitulo(tipo);
  }
}
