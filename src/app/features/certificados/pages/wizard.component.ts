import { Component } from '@angular/core';
import { StepDatosComponent } from '../components/step-datos/step-datos.component';
import { StepPreviewComponent } from '../components/step-preview/step-preview.component';
import { StepDescargaComponent } from '../components/step-descarga/step-descarga.component';

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
  currentStep: number = 1;
  totalSteps: number = 4;
  datosUsuario: any = {};
  certificadoHTML: string = '';

  constructor() { }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setStep(step: number) {
    // Validar navegación: solo permitir ir a pasos completados o el siguiente paso
    if (step >= 1 && step <= this.totalSteps) {

      if (step < this.currentStep) {
        this.currentStep = step;
      }
      // Permitir ir al siguiente paso solo si hay datos
      else if (step === this.currentStep + 1) {

        if (step === 2 && Object.keys(this.datosUsuario).length === 0) {
          return;
        }
        this.currentStep = step;
      }
      // Permitir quedarse en el mismo paso
      else if (step === this.currentStep) {
        // No hacer nada
      }
    }
  }

  // Método para navegación directa sin restricciones (si se quiere permitir navegación libre)
  setStepDirect(step: number) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
    }
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  canAccessStep(step: number): boolean {
    // Permitir siempre ir al paso actual
    if (step === this.currentStep) {
      return true;
    }
    if (step < this.currentStep) {
      return true;
    }

    if (step === this.currentStep + 1) {
      if (step === 2) {
        return Object.keys(this.datosUsuario).length > 0;
      }
      return true;
    }

    return false;
  }

  getStepTitle(step: number): string {
    const titles = {
      1: 'Ingresar datos del certificado',
      2: 'Vista previa del certificado',
      3: 'Realizar pago',
      4: 'Descargar certificado'
    };
    return titles[step as keyof typeof titles] || '';
  }

  resetWizard() {
    this.currentStep = 1;
    this.datosUsuario = {};
    this.certificadoHTML = '';
  }

  onDatosSubmitted(datos: any) {
    this.datosUsuario = datos;
    this.setStep(2);
  }
}
