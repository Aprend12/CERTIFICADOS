/**Componente presentacional que muestra el encabezado con el logo institucional.*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.css']
})
export class LogoHeaderComponent {}
