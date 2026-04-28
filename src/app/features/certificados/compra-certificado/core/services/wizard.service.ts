import { Injectable, signal, computed } from '@angular/core';

/** Step names in the certificate purchase wizard flow. */
export type StepName = 'datos' | 'preview' | 'pagos' | 'descarga';

/**
 * Service for managing the wizard navigation state.
 * Handles step transitions, validation, and access control.
 */
@Injectable({
  providedIn: 'root'
})
export class WizardService {
  /** Ordered list of wizard steps */
  private readonly steps: StepName[] = ['datos', 'preview', 'pagos', 'descarga'];
  /** Current step index stored as a signal for reactive updates */
  private currentStepIndex = signal(0);

  /** Read-only signal for current step index */
  currentStep = this.currentStepIndex.asReadonly();
  /** Computed signal for current step name */
  currentStepName = computed(() => this.steps[this.currentStepIndex()]);

  /** Total number of steps in the wizard */
  get totalSteps(): number {
    return this.steps.length;
  }

  /**
   * Get the display title for a given step index.
   * @param stepIndex - The zero-based index of the step
   * @returns The localized title for the step
   */
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
