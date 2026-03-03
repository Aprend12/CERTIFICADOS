import { Injectable, signal, computed } from '@angular/core';

export type StepName = 'datos' | 'preview' | 'pagos' | 'descarga';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private readonly steps: StepName[] = ['datos', 'preview', 'pagos', 'descarga'];
  private currentStepIndex = signal(0);

  currentStep = this.currentStepIndex.asReadonly();
  currentStepName = computed(() => this.steps[this.currentStepIndex()]);

  get totalSteps(): number {
    return this.steps.length;
  }

  getStepTitle(stepIndex: number): string {
    const titles: Record<StepName, string> = {
      datos: 'Ingresar datos del certificado',
      preview: 'Vista previa del certificado',
      pagos: 'Realizar pago',
      descarga: 'Descargar certificado'
    };
    return titles[this.steps[stepIndex]] || '';
  }

  canAccessStep(stepIndex: number): boolean {
    if (stepIndex <= this.currentStepIndex()) return true;
    if (stepIndex === this.currentStepIndex() + 1) return true;
    return false;
  }

  isPrevStepCompleted(stepIndex: number): boolean {
    return this.currentStepIndex() >= stepIndex - 1;
  }

  isStepActive(stepIndex: number): boolean {
    return this.currentStepIndex() === stepIndex;
  }

  isStepCompleted(stepIndex: number): boolean {
    return this.currentStepIndex() > stepIndex;
  }

  next(): boolean {
    if (this.currentStepIndex() < this.steps.length - 1) {
      this.currentStepIndex.update(v => v + 1);
      return true;
    }
    return false;
  }

  prev(): boolean {
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update(v => v - 1);
      return true;
    }
    return false;
  }

  goTo(step: StepName | number): boolean {
    const index = typeof step === 'number' ? step : this.steps.indexOf(step);
    if (index !== -1 && index >= 0 && index < this.steps.length) {
      this.currentStepIndex.set(index);
      return true;
    }
    return false;
  }

  reset(): void {
    this.currentStepIndex.set(0);
  }
}
