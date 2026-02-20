//Servicio que gestiona el flujo del wizard de certificados.

import { Injectable, signal, computed } from '@angular/core';

// Tipos de pasos disponibles en el wizard

export type StepName = 'datos' | 'preview' | 'pagos' | 'descarga';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  // Definición de los pasos del wizard en orden
  private readonly steps: StepName[] = ['datos', 'preview', 'pagos', 'descarga'];

  // Señal reactiva que almacena el índice del paso actual
  private currentStepIndex = signal(0);

  // Exposición de solo lectura de la señal del paso actual
  currentStep = this.currentStepIndex.asReadonly();

  // Computed property que obtiene el nombre del paso actual
  currentStepName = computed(() => this.steps[this.currentStepIndex()]);

// Obtiene el número total de pasos en el wizard.

  get totalSteps(): number {
    return this.steps.length;
  }

// Obtiene el título de un paso específico.

  getStepTitle(stepIndex: number): string {
    const titles: Record<StepName, string> = {
      datos: 'Ingresar datos del certificado',
      preview: 'Vista previa del certificado',
      pagos: 'Realizar pago',
      descarga: 'Descargar certificado'
    };
    return titles[this.steps[stepIndex]] || '';
  }

// Verifica si se puede acceder a un paso específico.

  canAccessStep(stepIndex: number): boolean {
    if (stepIndex <= this.currentStepIndex()) return true;
    if (stepIndex === this.currentStepIndex() + 1) return true;
    return false;
  }

// Verifica si el paso anterior ha sido completado.

  isPrevStepCompleted(stepIndex: number): boolean {
    return this.currentStepIndex() >= stepIndex - 1;
  }

// Verifica si un paso específico está activo (es el paso actual).

  isStepActive(stepIndex: number): boolean {
    return this.currentStepIndex() === stepIndex;
  }

//Verifica si un paso específico ha sido completado.
  isStepCompleted(stepIndex: number): boolean {
    return this.currentStepIndex() > stepIndex;
  }

// Avanza al siguiente paso del wizard.
  next(): boolean {
    if (this.currentStepIndex() < this.steps.length - 1) {
      this.currentStepIndex.update(v => v + 1);
      return true;
    }
    return false;
  }

// Retrocede al paso anterior del wizard.

  prev(): boolean {
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update(v => v - 1);
      return true;
    }
    return false;
  }

 // Navega a un paso específico del wizard.
  goTo(step: StepName | number): boolean {
    const index = typeof step === 'number' ? step : this.steps.indexOf(step);
    if (index !== -1 && index >= 0 && index < this.steps.length) {
      this.currentStepIndex.set(index);
      return true;
    }
    return false;
  }

  //Reinicia el primer paso de wizzard
  reset(): void {
    this.currentStepIndex.set(0);
  }
}
