import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validar-codigo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent {
  @Output() codigoIngresado = new EventEmitter<{ codigo: string; documento: string }>();
  @Input() verificando: boolean = false;

  codigo: string = '';
  documento: string = '';

  onValidar() {
    if (this.codigo.trim() && this.documento.trim()) {
      this.codigoIngresado.emit({
        codigo: this.codigo.trim(),
        documento: this.documento.trim()
      });
    }
  }
}
