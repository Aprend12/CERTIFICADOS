import { Component, EventEmitter, Output, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { CertificadoDatos, PeriodoAcademico } from '../../core/models/certificado.model';
import { ApiService } from '../../core/services/api.service';

interface CarreraEstudiante {
  nombre: string;
  snies: string;
  nivel: string;
  jornada?: string;
  modalidad?: string;
}

interface EstudianteCertificado {
  documento_estudiante: string;
  codigo_estudiante: string;
  nombre_completo: string;
  snies: CarreraEstudiante[];
  hash_code?: string;
  historial_notas?: PeriodoAcademico[];
  programa_academico?: string;
  periodo_activo?: string;
  semestre_academico?: string;
  fecha_inicio_periodo?: string;
  fecha_fin_periodo?: string;
  jornada?: string;
}

interface HistorialPeriodo {
  periodo: string;
  materias: any[];
}

@Component({
  selector: 'app-step-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-datos.component.html',
  styleUrls: ['./step-datos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepDatosComponent {
  @Output() datosSubmitted = new EventEmitter<CertificadoDatos>();

  form: FormGroup;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  estudianteEncontrado: EstudianteCertificado | null = null;
  ultimoDocumentoVerificado: string = '';
  ultimoCodigoVerificado: string = '';
  estudianteNoEncontrado = false;
  verificando = false;
  nombreEstudiante: string = '';

  carrerasDisponibles: CarreraEstudiante[] = [];
  carreraSeleccionada: CarreraEstudiante | null = null;

  mostrarModalCarreras = false;
  carreraElegida: string = '';

  camposVacios = false;
  errorUsuarioNoEncontrado = false;
  errorModalCarreraNoSeleccionada = false;
  mostrarErrorCampos = false;
  mostrarErrorUsuario = false;

  private hashCodeActual: string = '';
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.form = this.fb.group({
      documento_estudiante: ['', [Validators.required]],
      codigo_estudiante: ['', [Validators.required]],
      tipo_certificado: ['', [Validators.required]],
      snies: ['']
    });
  }

  get tieneMultiplesCarreras(): boolean {
    return this.carrerasDisponibles.length > 1;
  }

  onInputChange() {
    this.mostrarErrorCampos = false;
    this.mostrarErrorUsuario = false;
  }

  verificarCertificado() {
    const documento_estudiante = this.form.get('documento_estudiante')?.value;
    const codigoEstudiante = this.form.get('codigo_estudiante')?.value;
    const tipoCertificado = this.form.get('tipo_certificado')?.value;

    if (!documento_estudiante || !codigoEstudiante) {
      this.estudianteNoEncontrado = false;
      this.estudianteEncontrado = null;
      this.carreraSeleccionada = null;
      this.carrerasDisponibles = [];
      this.ultimoDocumentoVerificado = '';
      this.ultimoCodigoVerificado = '';
      this.camposVacios = true;
      return;
    }

    if (documento_estudiante === this.ultimoDocumentoVerificado && codigoEstudiante === this.ultimoCodigoVerificado && this.estudianteEncontrado) {
      return;
    }

    this.verificando = true;

    this.apiService.validarEstudiante(documento_estudiante, codigoEstudiante, tipoCertificado).pipe(
      timeout(30000),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          this.mostrarErrorTimeout();
          this.mostrarErrorUsuario = true;
        } else if (err.status === 400) {
          this.errorUsuarioNoEncontrado = true;
          this.mostrarErrorUsuario = true;
        } else if (err.status === 404) {
          this.estudianteNoEncontrado = true;
          this.errorUsuarioNoEncontrado = true;
          this.mostrarErrorUsuario = true;
        } else {
          this.mostrarErrorUsuario = true;
        }
        this.verificando = false;
        this.cdr.detectChanges();
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.procesarRespuestaValidar(response, documento_estudiante, codigoEstudiante);
        }
        this.verificando = false;
        this.cdr.detectChanges();
      },
        error: (err) => {
          this.estudianteEncontrado = null;
          this.estudianteNoEncontrado = true;
          this.mostrarErrorUsuario = true;
          this.carreraSeleccionada = null;
          this.carrerasDisponibles = [];
          this.ultimoDocumentoVerificado = '';
          this.ultimoCodigoVerificado = '';
          this.verificando = false;
          this.cdr.detectChanges();
        }
    });
  }

  private mostrarErrorTimeout() {
    this.errorUsuarioNoEncontrado = true;
    this.camposVacios = true;
    this.mostrarErrorUsuario = true;
  }

  private procesarRespuestaValidar(response: any, documento_estudiante: string, codigoEstudiante: string) {
    const actionCode = response.action_code;

    if (actionCode === 'DATOS_PREPARADOS' && response.datos_certificado) {
      const datos = response.datos_certificado;
      this.hashCodeActual = datos.hash_code || '';
      
      const historialPeriodos: HistorialPeriodo[] = [];
      if (datos.historial_notas && Array.isArray(datos.historial_notas)) {
        for (const periodo of datos.historial_notas) {
          historialPeriodos.push({
            periodo: periodo.periodo || '',
            materias: periodo.materias || []
          });
        }
      }
      
      const estudiante: EstudianteCertificado = {
        documento_estudiante: documento_estudiante,
        codigo_estudiante: datos.codigo_estudiante || codigoEstudiante,
        nombre_completo: datos.nombre_estudiante || '',
        snies: [{
          nombre: datos.programa_academico || '',
          snies: datos.snies_programa || '',
          nivel: datos.nivel_academico || '',
          jornada: datos.jornada,
          modalidad: datos.modalidad
        }],
        hash_code: this.hashCodeActual,
        historial_notas: historialPeriodos,
        programa_academico: datos.programa_academico || '',
        periodo_activo: datos.periodo_activo || '',
        semestre_academico: datos.semestre_academico || '',
        fecha_inicio_periodo: datos.fecha_inicio_periodo || '',
        fecha_fin_periodo: datos.fecha_fin_periodo || '',
        jornada: datos.jornada || ''
      };

      this.estudianteEncontrado = estudiante;
      this.nombreEstudiante = datos.nombre_estudiante || '';
      this.estudianteNoEncontrado = false;
      this.carrerasDisponibles = estudiante.snies;
      this.ultimoDocumentoVerificado = documento_estudiante;
      this.ultimoCodigoVerificado = codigoEstudiante;
      this.carreraSeleccionada = estudiante.snies[0];
    } else if (response.mensaje && response.mensaje.includes('no encontrado')) {
      this.estudianteEncontrado = null;
      this.estudianteNoEncontrado = true;
      this.mostrarErrorUsuario = true;
      this.carrerasDisponibles = [];
      this.ultimoDocumentoVerificado = '';
      this.ultimoCodigoVerificado = '';
    } else if (response.action_code === 'SELECCIONAR_PROGRAMA' && response.programas) {
      const programas = response.programas || [];
      const nombreCompleto = response.estudiante?.nombre_estudiante || response.nombre_completo || '';
      
      const estudiante: EstudianteCertificado = {
        documento_estudiante: response.estudiante?.documento_estudiante || documento_estudiante,
        codigo_estudiante: response.estudiante?.codigo_estudiante || codigoEstudiante,
        nombre_completo: nombreCompleto,
        snies: programas.map((c: any) => ({
          nombre: c.programa || c.nombre || '',
          snies: c.snies_programa || c.snies || c.codigo || '',
          nivel: c.nivel || ''
        })),
        programa_academico: programas[0]?.programa || programas[0]?.nombre || '',
      };

      this.estudianteEncontrado = estudiante;
      this.nombreEstudiante = nombreCompleto;
      this.estudianteNoEncontrado = false;
      this.carrerasDisponibles = estudiante.snies;
      this.ultimoDocumentoVerificado = documento_estudiante;
      this.ultimoCodigoVerificado = codigoEstudiante;
      this.carreraSeleccionada = null;
    } else if (response.programas_disponibles?.length > 1) {
      const programas = response.programas_disponibles || [];
      const nombreCompleto = response.nombre_completo || '';
      
      const estudiante: EstudianteCertificado = {
        documento_estudiante: documento_estudiante,
        codigo_estudiante: codigoEstudiante,
        nombre_completo: nombreCompleto,
        snies: programas.map((c: any) => ({
          nombre: c.nombre || '',
          snies: c.snies || '',
          nivel: c.nivel || ''
        }))
      };

      this.estudianteEncontrado = estudiante;
      this.nombreEstudiante = nombreCompleto;
      this.estudianteNoEncontrado = false;
      this.carrerasDisponibles = estudiante.snies;
      this.ultimoDocumentoVerificado = documento_estudiante;
      this.ultimoCodigoVerificado = codigoEstudiante;
      this.carreraSeleccionada = null;
    } else {
      this.estudianteEncontrado = null;
      this.estudianteNoEncontrado = true;
      this.mostrarErrorUsuario = true;
      this.carrerasDisponibles = [];
      this.ultimoDocumentoVerificado = '';
      this.ultimoCodigoVerificado = '';
    }
  }

  continuar() {
    if (this.verificando) {
      return;
    }

    this.mostrarErrorCampos = false;
    this.mostrarErrorUsuario = false;

    const documento_estudiante = this.form.get('documento_estudiante')?.value;
    const codigoEstudiante = this.form.get('codigo_estudiante')?.value;
    const tipoCertificado = this.form.get('tipo_certificado')?.value;

    if (!documento_estudiante || !codigoEstudiante || !tipoCertificado) {
      this.mostrarErrorCampos = true;
      this.camposVacios = true;
      return;
    }

    const datosSinCambiar = documento_estudiante === this.ultimoDocumentoVerificado &&
                            codigoEstudiante === this.ultimoCodigoVerificado &&
                            this.estudianteEncontrado;

    if (!datosSinCambiar) {
      this.verificando = true;
      const sniesSeleccionado = this.carreraSeleccionada?.snies || '';
      
      this.apiService.validarEstudiante(documento_estudiante, codigoEstudiante, tipoCertificado, sniesSeleccionado).pipe(
        timeout(30000),
        catchError((err) => {
          if (err.name === 'TimeoutError') {
            this.mostrarErrorTimeout();
          } else if (err.status === 400) {
            this.errorUsuarioNoEncontrado = true;
            this.mostrarErrorUsuario = true;
            this.camposVacios = true;
          } else if (err.status === 404) {
            this.estudianteNoEncontrado = true;
            this.errorUsuarioNoEncontrado = true;
            this.mostrarErrorUsuario = true;
          } else if (err.status === 409) {
            this.procesarRespuestaValidar(err.error, documento_estudiante, codigoEstudiante);
            if (this.carrerasDisponibles.length > 1) {
              this.verificando = false;
              this.mostrarModalCarreras = true;
              this.cdr.detectChanges();
            } else {
              this.verificando = false;
              this.cdr.detectChanges();
            }
            return of(err.error);
          } else {
            this.errorUsuarioNoEncontrado = true;
            this.mostrarErrorUsuario = true;
          }
          this.verificando = false;
          this.cdr.detectChanges();
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (!response) return;
          
          this.procesarRespuestaValidar(response, documento_estudiante, codigoEstudiante);
          this.cdr.detectChanges();
          
          if (this.estudianteEncontrado) {
            this.verificando = false;
            this.mostrarErrorUsuario = false;
            this.mostrarErrorCampos = false;
            this.cdr.detectChanges();
            this.procesarContinuar();
          } else {
            this.verificando = false;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          if (err.status === 409 && err.error?.action_code === 'SELECCIONAR_PROGRAMA') {
            this.procesarRespuestaValidar(err.error, documento_estudiante, codigoEstudiante);
            if (this.carrerasDisponibles.length > 1) {
              this.verificando = false;
              this.mostrarModalCarreras = true;
              this.cdr.detectChanges();
            } else {
              this.verificando = false;
            }
            return;
          }
          
          let mensajeError = 'Error de conexión con el servidor';
          if (err.error && err.error.mensaje) {
            mensajeError = err.error.mensaje;
          } else if (err.message) {
            mensajeError = err.message;
          }
          
          this.mostrarErrorUsuario = true;
          this.errorUsuarioNoEncontrado = true;
          this.camposVacios = true;
          this.verificando = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.procesarContinuar();
    }
  }

  procesarContinuar() {
    if (this.tieneMultiplesCarreras) {
      this.mostrarModalCarreras = true;
    } else {
      const formValue = this.form.value;
      const programaNombre = this.carreraSeleccionada?.nombre || this.estudianteEncontrado?.programa_academico || '';
      const jornada = this.carreraSeleccionada?.jornada || this.estudianteEncontrado?.jornada || '';
      
      const datos: CertificadoDatos = {
        documento: formValue.documento_estudiante,
        codigo_estudiante: formValue.codigo_estudiante,
        snies: this.carreraSeleccionada?.snies || '',
        tipo_certificado: formValue.tipo_certificado,
        nombre_completo: this.nombreEstudiante,
        hash_code: this.hashCodeActual,
        historial_notas: this.estudianteEncontrado?.historial_notas || [],
        programa_academico: programaNombre,
        periodo_activo: this.estudianteEncontrado?.periodo_activo || '',
        semestre_academico: this.estudianteEncontrado?.semestre_academico || '',
        fecha_inicio_periodo: this.estudianteEncontrado?.fecha_inicio_periodo || '',
        fecha_fin_periodo: this.estudianteEncontrado?.fecha_fin_periodo || '',
        jornada: jornada
      };
      this.datosSubmitted.emit(datos);
    }
  }

  seleccionarCarrera() {
    this.errorModalCarreraNoSeleccionada = false;

    if (!this.carreraElegida) {
      this.errorModalCarreraNoSeleccionada = true;
      return;
    }

    if (this.carreraElegida && this.estudianteEncontrado) {
      const formValue = this.form.value;
      const sniesElegido = this.carreraElegida;
      const carreraElegidaData = this.carrerasDisponibles.find(c => c.snies === sniesElegido);

      this.verificando = true;
      this.mostrarModalCarreras = false;

      this.apiService.validarEstudiante(
        formValue.documento_estudiante,
        formValue.codigo_estudiante,
        formValue.tipo_certificado,
        sniesElegido
      ).pipe(
        timeout(15000),
        catchError((err) => {
          if (err.name === 'TimeoutError') {
            this.mostrarErrorTimeout();
          }
          this.verificando = false;
          this.cdr.detectChanges();
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (!response) return;
          
          this.procesarRespuestaValidar(response, formValue.documento_estudiante, formValue.codigo_estudiante);
          
          if (this.estudianteEncontrado && this.hashCodeActual) {
            this.verificando = false;
            this.cdr.detectChanges();
            
            const datos: CertificadoDatos = {
              documento: formValue.documento_estudiante,
              codigo_estudiante: formValue.codigo_estudiante,
              snies: sniesElegido,
              tipo_certificado: formValue.tipo_certificado,
              nombre_completo: this.nombreEstudiante,
              hash_code: this.hashCodeActual,
              historial_notas: this.estudianteEncontrado?.historial_notas || [],
              programa_academico: carreraElegidaData?.nombre || this.estudianteEncontrado?.programa_academico || '',
              periodo_activo: this.estudianteEncontrado?.periodo_activo || '',
              semestre_academico: this.estudianteEncontrado?.semestre_academico || '',
              fecha_inicio_periodo: this.estudianteEncontrado?.fecha_inicio_periodo || '',
              fecha_fin_periodo: this.estudianteEncontrado?.fecha_fin_periodo || '',
              jornada: this.estudianteEncontrado?.jornada || ''
            };
            
            this.carreraElegida = '';
            this.datosSubmitted.emit(datos);
          } else {
            this.verificando = false;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          this.verificando = false;
          this.errorUsuarioNoEncontrado = true;
          this.cdr.detectChanges();
        }
      });
    }
  }

  cerrarModal() {
    this.mostrarModalCarreras = false;
    this.carreraElegida = '';
    this.errorModalCarreraNoSeleccionada = false;
  }

  reset() {
    this.form.reset();
    this.estudianteEncontrado = null;
    this.estudianteNoEncontrado = false;
    this.verificando = false;
    this.nombreEstudiante = '';
    this.carrerasDisponibles = [];
    this.carreraSeleccionada = null;
    this.mostrarModalCarreras = false;
    this.carreraElegida = '';
    this.ultimoDocumentoVerificado = '';
    this.ultimoCodigoVerificado = '';
    this.camposVacios = false;
    this.errorUsuarioNoEncontrado = false;
    this.errorModalCarreraNoSeleccionada = false;
    this.mostrarErrorCampos = false;
    this.mostrarErrorUsuario = false;
  }
}
