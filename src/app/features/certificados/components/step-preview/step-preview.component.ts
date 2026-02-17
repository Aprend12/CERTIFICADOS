/**Componente que muestra la vista previa del certificado.*/
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.css']
})
export class StepPreviewComponent {
  // HTML generado del certificado para mostrar en la vista previa
  @Input() certificadoHTML: string = '';
  // Título del certificado según el tipo seleccionado
  @Input() titulo: string = '';
  // Nombre completo del estudiante
  @Input() nombreEstudiante: string = '';
  // Número de documento de identidad del estudiante
  @Input() documentoIdentidad: string = '';
  // Número de código estudiantil
  @Input() numeroEstudiante: string = '';
}
