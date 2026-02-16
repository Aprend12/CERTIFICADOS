import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoDatos } from '../../../../core/models/certificado.model';

@Component({
  selector: 'app-step-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.css']
})
export class StepPreviewComponent {
  @Input() certificadoHTML: string = '';
  @Input() titulo: string = '';
  @Input() documentoIdentidad: string = '';
  @Input() numeroEstudiante: string = '';
}
