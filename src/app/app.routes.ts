/**Configuración de rutas de la aplicación Angular.*/
import { Routes } from '@angular/router';
import { WizardComponent } from './features/certificados/compra-certificado/pages/wizard.component';
import { VerificarCertificadoComponent } from './features/certificados/validacion/verificar-certificado/pages/verificar-certificado.component';

export const routes: Routes = [
  { path: '', redirectTo: 'compra-certificado', pathMatch: 'full' },
  { path: 'compra-certificado', component: WizardComponent },
  { path: 'validacion', component: VerificarCertificadoComponent },
  { path: '**', redirectTo: 'compra-certificado' }
];
