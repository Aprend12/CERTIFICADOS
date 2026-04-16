import { Component, inject, ViewChild, OnInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  imports: [StepDatosComponent, StepPreviewComponent, StepPagosComponent, StepDescargaComponent],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements OnInit, OnDestroy {
  @ViewChild(StepDatosComponent) stepDatos?: StepDatosComponent;
  
  wizardService: WizardService = inject(WizardService);
  private certificadoService: CertificadoService = inject(CertificadoService);
  private platformId = inject(PLATFORM_ID);

  epaycoPublicKey: string = '';

  ngOnInit() {
    this.resetWizard();
    if (isPlatformBrowser(this.platformId)) {
      this.epaycoPublicKey = this.getEpaycoKey();
    }
  }

  private getEpaycoKey(): string {
    const metaKey = document.querySelector('meta[name="epayco-key"]');
    if (metaKey) {
      return metaKey.getAttribute('content') || '';
    }
    return '';
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

  onGoToStep2(data: { estudiante: any; carreras: any[]; tipoCertificado: string; documento: string; numeroEstudiante: string; codigoCarrera: string }) {
    const carreraElegida = data.carreras.find(c => c.snies === data.codigoCarrera);
    const datos: CertificadoDatos = {
      documento: data.documento,
      codigo_estudiante: data.numeroEstudiante,
      snies: carreraElegida?.snies || '',
      tipo_certificado: data.tipoCertificado,
      nombre_completo: data.estudiante?.nombre_completo || '',
      programa_academico: carreraElegida?.nombre || '',
      jornada: carreraElegida?.jornada || '',
      periodo_activo: data.estudiante?.periodo_activo || '',
      semestre_academico: data.estudiante?.semestre_academico || '',
      fecha_inicio_periodo: data.estudiante?.fecha_inicio_periodo || '',
      fecha_fin_periodo: data.estudiante?.fecha_fin_periodo || '',
      historial_notas: data.estudiante?.historial_notas || []
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
    };
    this.certificadoService.limpiar();
    this.stepDatos?.reset();
  }

  ngOnDestroy() {}
}
