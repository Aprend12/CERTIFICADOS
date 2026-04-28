/**Root component for the Angular application.*/
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoHeaderComponent } from './shared/components/logo-header/logo-header.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LogoHeaderComponent, NotificationsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('certificado');
}
