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
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-step-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPreviewComponent implements AfterViewInit {

  /** HTML generado del certificado para mostrar en la vista previa */
  @Input() set certificadoHTML(val: string) {
    this._certHTML = val;
    this.certSafe = this.sanitizer.bypassSecurityTrustHtml(val);
  }

  private _certHTML = '';
  
  @Input() titulo: string = '';
  @Input() nombreEstudiante: string = '';
  @Input() documentoIdentidad: string = '';
  @Input() numeroEstudiante: string = '';

  certSafe: SafeHtml = '' as SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  get certHTML(): string {
    return this._certHTML;
  }
}