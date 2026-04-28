/**
 * Component that displays the certificate preview.
 * The certificate is visually scaled to fit in the container
 * while maintaining its real proportions (letter size).
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