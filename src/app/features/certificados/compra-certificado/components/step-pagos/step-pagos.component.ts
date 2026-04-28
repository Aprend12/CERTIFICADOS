import { Component, Output, EventEmitter, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

/** External ePayco payment gateway global object */
declare var ePayco: any;

/** Bank or payment method information. */
interface Banco {
  c: string;
  n: string;
  e: string;
  bg: string;
  cl: string;
  tipo?: string;
}

/**
 * Component for handling payment step in the certificate purchase wizard.
 * Supports multiple payment methods including credit cards and digital wallets.
 */
@Component({
  selector: 'app-step-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './step-pagos.component.html',
  styleUrls: ['./step-pagos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPagosComponent {
  /** Event emitted when payment is completed and user can proceed to download */
  @Output() goToDownload = new EventEmitter<{ hash_code: string; documento_estudiante: string; validado: boolean }>();
  @Input() nombreCertificado: string = '';
  @Input() hashCode: string = '';
  @Input() documentoEstudiante: string = '';

  private apiService = inject(ApiService);
  private notificationService = inject(NotificationService);

  /** Current payment step (1-7) */
  step: number = 1;
  /** Whether a bank has been selected */
  bancoSeleccionado: boolean = false;
  /** Processing payment state */
  procesandoPago: boolean = false;
  /** Error display flag */
  mostrarError: boolean = false;

  /** Certificate price in COP */
  readonly PRECIO_CERTIFICADO = 18000;

  /** Payment method selection */
  metodoPago: string = '';
  /** Card type (credit/debit) */
  tipoTarjeta: string = 'credito';
  /** Cardholder full name */
  nombreCompleto: string = '';
  /** Payer email */
  email: string = '';
  /** Payer phone number */
  telefono: string = '';
  /** Document type (CC, CE, etc.) */
  tipoDocumento: string = 'CC';
  /** Payer document number */
  numeroDocumento: string = '';

  /** Payment reference number */
  refPago: string = '';

  /** Selected bank/wallet */
  selBanco: Banco | null = null;
  /** Filtered bank list for search */
  bancosFiltrados: Banco[] = [];

  /** Credit card number */
  numeroTarjeta: string = '';
  /** Card expiration date (MM/YY) */
  fechaExpiracion: string = '';
  /** Card CVV code */
  cvv: string = '';
  /** Name on card */
  nombreTarjeta: string = '';

  /** Available banks and digital wallets */
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
      this.notificationService.error('Faltan datos del certificado. No se puede continuar.');
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
          this.notificationService.error('Tiempo de espera agotado. Intente nuevamente.');
        } else {
          const mensaje = err.error?.mensaje || 'Error al validar el pago';
          this.notificationService.error(mensaje);
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
        if (!pagoValidado) {
          this.notificationService.error(response.mensaje || 'El pago no fue aprobado');
        } else {
          this.notificationService.success('Pago aprobado correctamente');
        }
        this.goToDownload.emit({
          hash_code: this.hashCode,
          documento_estudiante: this.documentoEstudiante,
          validado: pagoValidado
        });
      },
      error: (err) => {
        this.procesandoPago = false;
        const mensaje = err.error?.mensaje || 'Error al validar el pago';
        this.notificationService.error(mensaje);
        this.goToDownload.emit({
          hash_code: this.hashCode,
          documento_estudiante: this.documentoEstudiante,
          validado: false
        });
      }
    });
  }
}
