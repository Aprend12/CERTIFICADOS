import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-pagos.component.html',
  styleUrls: ['./step-pagos.component.css']
})
export class StepPagosComponent {
  mensaje: string = 'Próximamente: Sistema de pagos';
}
