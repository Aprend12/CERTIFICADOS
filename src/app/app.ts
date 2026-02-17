/**Componente raíz de la aplicación Angular.*/
import { Component, signal } from '@angular/core';
import { WizardComponent } from './features/certificados/pages/wizard.component';
import { LogoHeaderComponent } from './shared/components/logo-header/logo-header.component';

@Component({
  selector: 'app-root',
  imports: [WizardComponent, LogoHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('certificado');
}
