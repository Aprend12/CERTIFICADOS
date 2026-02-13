import { Component, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoGeneratorService } from '../../../../core/services/certificado-generator.service';
import { CertificadoDatos } from '../../../../core/models/certificado.model';

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
    nombre: ''
  };

  certificadoFinal: string = '';

  private generatorService = inject(CertificadoGeneratorService);

  ngOnChanges() {
    this.generarCertificadoFinal();
  }

  generarCertificadoFinal() {
    this.certificadoFinal = this.generatorService.generarCertificadoFinal(this.datos);
  }

  descargar() {
    alert('Certificado generado correctamente. En un sistema real, aquí se descargaría el PDF.');
    this.generatorService.descargarCertificado(this.certificadoFinal, 'certificado.html');
  }
}
