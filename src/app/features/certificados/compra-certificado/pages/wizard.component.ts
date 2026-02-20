import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StepDatosComponent } from '../components/step-datos/step-datos.component';
import { StepPreviewComponent } from '../components/step-preview/step-preview.component';
import { StepPagosComponent } from '../components/step-pagos/step-pagos.component';
import { StepDescargaComponent } from '../components/step-descarga/step-descarga.component';
import { WizardService } from '../core/services/wizard.service';
import { CertificadoService } from '../core/services/certificado.service';
import { CertificadoDatos } from '../core/models/certificado.model';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [ StepDatosComponent, StepPreviewComponent, StepDescargaComponent ],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})

export class WizardComponent {
  wizardService: WizardService = inject(WizardService);
  private certificadoService: CertificadoService = inject(CertificadoService);

  // Datos del usuario que serán ingresados en el primer paso del wizard
  datosUsuario: CertificadoDatos = {
    documento_identidad: '',
    numero_estudiante: '',
    numero_programa: '',
    tipo_certificado: '',
    nombreEstudiante: ''
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

  /**Maneja el evento cuando el estudiante tiene múltiples carreras.*/
  onGoToStep2(data: { estudiante: any; carreras: any[]; tipoCertificado: string; documento: string; numeroEstudiante: string; codigoCarrera: string }) {
    const carreraElegida = data.carreras.find(c => c.snies === data.codigoCarrera);
    const datos: CertificadoDatos = {
      documento_identidad: data.documento,
      numero_estudiante: data.numeroEstudiante,
      numero_programa: carreraElegida?.snies || '',
      tipo_certificado: data.tipoCertificado,
      nombreEstudiante: data.estudiante.nombre };

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
      tipo_certificado: '',
      nombreEstudiante: ''
    };
    this.certificadoService.limpiar();
  }
}
