import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  private steps = ['datos', 'preview', 'descarga'];
  private currentStepIndex = signal(0);

  /** Paso actual */
  currentStep = this.currentStepIndex.asReadonly();

  /** Nombre del paso actual */
  stepName() {
    return this.steps[this.currentStepIndex()];
  }

  next() {
    if (this.currentStepIndex() < this.steps.length - 1) {
      this.currentStepIndex.update(v => v + 1);
    }
  }

  prev() {
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update(v => v - 1);
    }
  }

  goTo(step: 'datos' | 'preview' | 'descarga') {
    const index = this.steps.indexOf(step);
    if (index !== -1) {
      this.currentStepIndex.set(index);
    }
  }

  reset() {
    this.currentStepIndex.set(0);
  }
}
