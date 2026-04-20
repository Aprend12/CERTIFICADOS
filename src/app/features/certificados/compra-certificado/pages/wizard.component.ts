import { Component, inject, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  imports: [StepDatosComponent, StepPreviewComponent, StepPagosComponent, StepDescargaComponent],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements OnInit {
  @ViewChild(StepDatosComponent) stepDatos?: StepDatosComponent;
  
  wizardService: WizardService = inject(WizardService);
  private certificadoService: CertificadoService = inject(CertificadoService);

  ngOnInit() {
    this.resetWizard();
  }

  datosUsuario: CertificadoDatos = {
    documento: '',
    codigo_estudiante: '',
    snies: '',
    tipo_certificado: '',
    nombre_completo: '',
    hash_code: '',
    historial_notas: [],
    programa_academico: '',
    periodo_activo: '',
    semestre_academico: '',
    fecha_inicio_periodo: '',
    fecha_fin_periodo: '',
    jornada: ''
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

  continuarDesdePreview(): void {
    if (this.datosUsuario.documento && this.datosUsuario.tipo_certificado) {
      this.wizardService.next();
    }
  }

  onPagoCompletado(data: { hash_code: string; documento_estudiante: string; validado: boolean }) {
    if (data.validado) {
      this.datosUsuario.hash_code = data.hash_code;
      this.certificadoService.setDatos(this.datosUsuario);
    }
    this.setStep(4);
  }

  resetWizard() {
    this.wizardService.reset();
    this.datosUsuario = {
      documento: '',
      codigo_estudiante: '',
      snies: '',
      tipo_certificado: '',
      nombre_completo: '',
      hash_code: '',
      historial_notas: [],
      programa_academico: '',
      periodo_activo: '',
      semestre_academico: '',
      fecha_inicio_periodo: '',
      fecha_fin_periodo: '',
      jornada: ''
    };
    this.certificadoService.limpiar();
    this.stepDatos?.reset();
  }

}
