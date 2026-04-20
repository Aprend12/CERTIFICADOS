import { Component, Output, EventEmitter, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

declare var ePayco: any;

interface Banco {
  c: string;
  n: string;
  e: string;
  bg: string;
  cl: string;
  tipo?: string;
}

@Component({
  selector: 'app-step-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './step-pagos.component.html',
  styleUrls: ['./step-pagos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPagosComponent {
  @Output() goToDownload = new EventEmitter<{ hash_code: string; documento_estudiante: string; validado: boolean }>();
  @Input() nombreCertificado: string = '';
  @Input() hashCode: string = '';
  @Input() documentoEstudiante: string = '';

  private apiService = inject(ApiService);

  step: number = 1;
  bancoSeleccionado: boolean = false;
  procesandoPago: boolean = false;
  mostrarError: boolean = false;

  readonly PRECIO_CERTIFICADO = 18000;

  metodoPago: string = '';
  tipoTarjeta: string = 'credito';
  nombreCompleto: string = '';
  email: string = '';
  telefono: string = '';
  tipoDocumento: string = 'CC';
  numeroDocumento: string = '';

  refPago: string = '';

  selBanco: Banco | null = null;
  bancosFiltrados: Banco[] = [];

  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';
  nombreTarjeta: string = '';

  bancos: Banco[] = [
    { c: '1007', n: 'Bancolombia', e: 'B', bg: '#f4a024', cl: '#000', tipo: 'banco' },
    { c: '1022', n: 'Banco de Bogotá', e: 'BB', bg: '#003f87', cl: '#fff', tipo: 'banco' },
    { c: '1040', n: 'Banco Agrario', e: 'BA', bg: '#006400', cl: '#fff', tipo: 'banco' },
    { c: '1032', n: 'Caja Social', e: 'CS', bg: '#c60c30', cl: '#fff', tipo: 'banco' },
    { c: '1062', n: 'Falabella', e: 'F', bg: '#ed1c24', cl: '#fff', tipo: 'banco' },
    { c: '1006', n: 'Davivienda', e: 'D', bg: '#d61f28', cl: '#fff', tipo: 'banco' },
    { c: '1009', n: 'Citibank', e: 'C', bg: '#003b70', cl: '#fff', tipo: 'banco' },
    { c: '1060', n: 'Bancoomeva', e: 'BO', bg: '#00a651', cl: '#fff', tipo: 'banco' },
    { c: '1551', n: 'Nequi', e: 'N', bg: '#8e44ad', cl: '#fff', tipo: 'billetera' },
    { c: '1552', n: 'Daviplata', e: 'DP', bg: '#c0392b', cl: '#fff', tipo: 'billetera' },
    { c: '1283', n: 'CFA', e: 'CFA', bg: '#1abc9c', cl: '#fff', tipo: 'banco' },
    { c: '1066', n: 'Bancoop', e: 'BOP', bg: '#f39c12', cl: '#fff', tipo: 'banco' },
  ];

  constructor() {
    this.bancosFiltrados = [...this.bancos];
  }

  get datosPagoEpaycoValidos(): boolean {
    return !!(
      this.nombreCompleto.trim() &&
      this.email.trim() &&
      this.telefono.trim() &&
      this.numeroDocumento.trim()
    );
  }

  get datosTarjetaValidos(): boolean {
    const fechaValida = this.validarFechaExpiracion(this.fechaExpiracion);
    return !!(
      this.numeroTarjeta.replace(/\s/g, '').length >= 16 &&
      this.nombreTarjeta.trim() &&
      fechaValida &&
      this.cvv.length >= 3 &&
      this.numeroDocumento.trim()
    );
  }

  private validarFechaExpiracion(fecha: string): boolean {
    if (!fecha || fecha.length !== 5) return false;
    const match = fecha.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;
    
    const mes = parseInt(match[1], 10);
    const anio = parseInt('20' + match[2], 10);
    const ahora = new Date();
    const fechaExp = new Date(anio, mes - 1);
    
    return fechaExp > ahora;
  }

  getStepLabel(): string {
    const labels: { [key: number]: string } = {
      1: 'Método de pago',
      2: 'Datos del pagador',
      3: 'Confirmar pago',
      4: 'Procesando',
      5: 'Pago aprobado',
      6: 'Pago fallido',
      7: 'Pago pendiente'
    };
    return labels[this.step] || '';
  }

  getMetodoNombre(): string {
    if (this.metodoPago === 'epayco') {
      return 'Epayco';
    }
    return 'Tarjeta';
  }

  getRandomRef(): string {
    if (!this.refPago) {
      this.refPago = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    return this.refPago;
  }

  resetRef(): void {
    this.refPago = '';
  }

  getNumeroTarjetaOculto(): string {
    if (this.numeroTarjeta.length >= 4) {
      return '•••• ' + this.numeroTarjeta.slice(-4);
    }
    return '•••• ••••';
  }

  formatTarjeta(event: Event) {
    let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    this.numeroTarjeta = parts.join(' ');
  }

  formatFecha(event: Event) {
    let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.fechaExpiracion = value;
  }

  irA(n: number) {
    this.step = n;
    if (n === 1) {
      this.procesandoPago = false;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filtrar(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.bancosFiltrados = this.bancos.filter(b => b.n.toLowerCase().includes(query));
  }

  elegirBanco(b: Banco) {
    this.selBanco = b;
    this.bancoSeleccionado = true;
    this.mostrarError = false;
  }

  continuarBanco() {
    this.bancoSeleccionado = true;
    this.mostrarError = false;
    this.irA(2);
  }

  validarContinuar(step: number): boolean {
    this.mostrarError = false;
    if (step === 1 && !this.metodoPago) {
      this.mostrarError = true;
      return false;
    }
    if (step === 2 && this.metodoPago === 'epayco' && !this.datosPagoEpaycoValidos) {
      this.mostrarError = true;
      return false;
    }
    if (step === 2 && this.metodoPago === 'tarjeta' && !this.datosTarjetaValidos) {
      this.mostrarError = true;
      return false;
    }
    return true;
  }

  irASiguiente(step: number) {
    if (step === 1) {
      if (!this.metodoPago) {
        this.mostrarError = true;
        return;
      }
      this.irA(2);
    } else if (this.validarContinuar(step)) {
      this.irA(3);
    }
  }

  seleccionarOtroBanco() {
    this.selBanco = null;
    this.bancoSeleccionado = false;
    this.mostrarError = false;
  }

  procesarPago() {
    if (this.procesandoPago) return;
    this.procesandoPago = true;
    
    this.resetRef();
    this.refPago = this.getRandomRef();
    this.irA(4);
    this.iniciarPagoEpayco();
  }

  iniciarPagoEpayco() {
    const refPago = 'CERT-' + this.refPago;
    const valor = this.PRECIO_CERTIFICADO;
    const iva = Math.round(valor * 0.19);
    const valorTotal = valor + iva;

    const dataEpayco = {
      name: 'Certificado Académico',
      description: 'Certificado académico - Universidad',
      invoice: refPago,
      currency: 'cop',
      amount: valorTotal,
      tax: iva,
      tax_base: valor,
      country: 'CO',
      lang: 'es',
      external: 'false',
      confirmation: '',
      responseUrl: window.location.href,
      email: this.email,
      name_billing: this.nombreCompleto,
      address_billing: '',
      mobilephone_billing: this.telefono,
      document_billing: this.numeroDocumento,
    };

    if (typeof ePayco !== 'undefined') {
      ePayco.checkout.open({
        test: true,
        data: dataEpayco,
        onConfirm: (response: any) => {
          if (response.success) {
            this.mostrarResultado();
          } else {
            this.mostrarFallido();
          }
        },
        onError: (response: any) => {
          this.mostrarFallido();
        },
        onCancelled: (response: any) => {
          this.irA(3);
        }
      });
    } else {
      setTimeout(() => {
        this.mostrarResultado();
      }, 3000);
    }
  }

  mostrarResultado() {
    this.procesandoPago = false;
    this.irA(5);
  }

  mostrarFallido() {
    this.procesandoPago = false;
    this.irA(6);
  }

  irADescarga() {
    if (!this.hashCode || !this.documentoEstudiante) {
      this.mostrarError = true;
      return;
    }

    this.procesandoPago = true;
    this.apiService.validarPago({
      hash_code: this.hashCode,
      documento_estudiante: this.documentoEstudiante,
      numero_desprendible: this.refPago || 'PAY-' + Date.now()
    }).pipe(
      timeout(15000),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          this.mostrarError = true;
        }
        this.procesandoPago = false;
        this.goToDownload.emit({
          hash_code: this.hashCode,
          documento_estudiante: this.documentoEstudiante,
          validado: false
        });
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (!response) return;
        this.procesandoPago = false;
        const pagoValidado = response.action_code === 'PAGO_APROBADO';
        this.goToDownload.emit({
          hash_code: this.hashCode,
          documento_estudiante: this.documentoEstudiante,
          validado: pagoValidado
        });
      },
      error: (err) => {
        this.procesandoPago = false;
        this.goToDownload.emit({
          hash_code: this.hashCode,
          documento_estudiante: this.documentoEstudiante,
          validado: false
        });
      }
    });
  }
}
