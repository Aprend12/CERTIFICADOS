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
  imports: [StepDatosComponent, StepPreviewComponent, StepDescargaComponent],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent {
  wizardService: WizardService = inject(WizardService);
  private certificadoService: CertificadoService = inject(CertificadoService);

  datosUsuario: CertificadoDatos = {
    documento: '',
    codigo_estudiante: '',
    snies: '',
    tipo_certificado: '',
    nombre_completo: '',
  };

  getCertificadoHTML(): string {
    return this.certificadoService.generarPreview(this.datosUsuario);
  }

  getCertificadoTitulo(): string {
    return this.certificadoService.getTitulo(this.datosUsuario.tipo_certificado);
  }

  onDatosSubmitted(datos: CertificadoDatos) {
    this.datosUsuario = datos;
    this.certificadoService.setDatos(datos);
    this.wizardService.next();
  }

  onGoToStep2(data: { estudiante: any; carreras: any[]; tipoCertificado: string; documento: string; numeroEstudiante: string; codigoCarrera: string }) {
    const carreraElegida = data.carreras.find(c => c.snies === data.codigoCarrera);
    const datos: CertificadoDatos = {
      documento: data.documento,
      codigo_estudiante: data.numeroEstudiante,
      snies: carreraElegida?.snies || '',
      tipo_certificado: data.tipoCertificado,
      nombre_completo: data.estudiante?.nombre_completo || '',
    };

    this.datosUsuario = datos;
    this.certificadoService.setDatos(datos);
    this.wizardService.next();
  }

  getStepTitle(step: number): string {
    return this.wizardService.getStepTitle(step - 1);
  }

  isStepActive(step: number): boolean {
    return this.wizardService.isStepActive(step - 1);
  }

  isStepCompleted(step: number): boolean {
    return this.wizardService.isStepCompleted(step - 1);
  }

  canAccessStep(step: number): boolean {
    return this.wizardService.canAccessStep(step - 1);
  }

  setStep(step: number): void {
    this.wizardService.goTo(step - 1);
  }

  resetWizard() {
    this.wizardService.reset();
    this.datosUsuario = {
      documento: '',
      codigo_estudiante: '',
      snies: '',
      tipo_certificado: '',
      nombre_completo: '',
    };
    this.certificadoService.limpiar();
  }
}
