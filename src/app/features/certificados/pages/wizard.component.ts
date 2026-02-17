/**Componente principal del wizard de certificados académicos.*/
import { Component, inject } from '@angular/core';
import { StepDatosComponent } from '../components/step-datos/step-datos.component';
import { StepPreviewComponent } from '../components/step-preview/step-preview.component';
import { StepPagosComponent } from '../components/step-pagos/step-pagos.component';
import { StepDescargaComponent } from '../components/step-descarga/step-descarga.component';
import { WizardService } from '../../../core/services/wizard.service';
import { CertificadoService } from '../../../core/services/certificado.service';
import { CertificadoDatos } from '../../../core/models/certificado.model';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    StepDatosComponent,
    StepPreviewComponent,
    StepDescargaComponent,
  ],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})

export class WizardComponent {
  wizardService = inject(WizardService);
  private certificadoService = inject(CertificadoService);

  // Datos del usuario que serán ingresados en el primer paso del wizard
  datosUsuario: CertificadoDatos = {
    documento_identidad: '',
    numero_estudiante: '',
    numero_programa: '',
    tipo_certificado: ''
  };

  /**Genera la vista previa del certificado en formato HTML.*/
  getCertificadoHTML(): string {
    return this.certificadoService.generarPreview(this.datosUsuario);
  }

  /** Obtiene el título del certificado según el tipo seleccionado.*/
  getCertificadoTitulo(): string {
    return this.certificadoService.getTitulo(this.datosUsuario.tipo_certificado);
  }

  /**Maneja el evento de envío de datos desde el componente StepDatos.*/
  onDatosSubmitted(datos: CertificadoDatos) {
    this.datosUsuario = datos;
    this.certificadoService.setDatos(datos);
    this.wizardService.next();
  }

  /**Obtiene el título de un paso específico del wizard.*/
  getStepTitle(step: number): string {
    return this.wizardService.getStepTitle(step - 1);
  }

  /**Verifica si un paso específico está activo.*/
  isStepActive(step: number): boolean {
    return this.wizardService.isStepActive(step - 1);
  }

  /**Verifica si un paso específico ha sido completado.*/
  isStepCompleted(step: number): boolean {
    return this.wizardService.isStepCompleted(step - 1);
  }

  /**Verifica si el usuario puede acceder a un paso específico.*/
  canAccessStep(step: number): boolean {
    return this.wizardService.canAccessStep(step - 1);
  }

  /**Navega a un paso específico del wizard.*/
  setStep(step: number): void {
    this.wizardService.goTo(step - 1);
  }

  /**Reinicia el wizard al estado inicial.*/
  resetWizard() {
    this.wizardService.reset();
    this.datosUsuario = {
      documento_identidad: '',
      numero_estudiante: '',
      numero_programa: '',
      tipo_certificado: ''
    };
    this.certificadoService.limpiar();
  }
}
