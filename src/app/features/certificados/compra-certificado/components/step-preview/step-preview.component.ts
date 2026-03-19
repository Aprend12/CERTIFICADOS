/**
 * Componente que muestra la vista previa del certificado.
 * El certificado se escala visualmente para caber en el contenedor
 * manteniendo sus proporciones reales (tamaño carta).
 */
import {
  Component,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-step-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepPreviewComponent implements AfterViewInit {

  /** HTML generado del certificado para mostrar en la vista previa */
  @Input() set certificadoHTML(val: string) {
    this._certHTML = val;
    this.certSafe = this.sanitizer.bypassSecurityTrustHtml(val);
  }
  get certificadoHTML(): string { return this._certHTML; }
  private _certHTML: string = '';

  /** HTML sanitizado para el [innerHTML] */
  certSafe: SafeHtml = '';

  /** Título del certificado según el tipo seleccionado */
  @Input() titulo: string = '';

  /** Nombre completo del estudiante */
  @Input() nombreEstudiante: string = '';

  /** Número de documento de identidad del estudiante */
  @Input() documentoIdentidad: string = '';

  /** Número de código estudiantil */
  @Input() numeroEstudiante: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
