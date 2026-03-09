import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './step-pagos.component.html',
  styleUrls: ['./step-pagos.component.css']
})
export class StepPagosComponent {
  @Output() goToDownload = new EventEmitter<void>();

  step: number = 1;
  wizardStep: number = 3;
  bancoSeleccionado: boolean = false;

  metodoPago: string = '';
  tipoPse: string = 'banco';
  tipoCuenta: string = 'ahorros';
  tipoTarjeta: string = 'credito';
  nombreCompleto: string = '';
  email: string = '';
  telefono: string = '';
  tipoDocumento: string = 'CC';
  numeroDocumento: string = '';

  selBanco: Banco | null = null;
  selBilletera: string = '';
  telefonoBilletera: string = '';
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

  getProgress(): string {
    const progress: { [key: number]: string } = {
      1: '20%',
      2: '45%',
      3: '70%',
      4: '85%'
    };
    return progress[this.step] || '0%';
  }

  getMetodoNombre(): string {
    if (this.metodoPago === 'pse') {
      if (this.tipoPse === 'billetera') {
        return this.selBilletera === 'nequi' ? 'Nequi' : 'Daviplata';
      }
      return 'PSE';
    }
    return 'Tarjeta';
  }

  getRandomRef(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  getFechaActual(): string {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const anio = now.getFullYear();
    const hora = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${anio} – ${hora}:${min}`;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filtrar(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.bancosFiltrados = this.bancos.filter(b => b.n.toLowerCase().includes(query));
  }

  elegirBanco(b: Banco) {
    this.selBanco = b;
    this.bancoSeleccionado = true;
  }

  continuarBanco() {
    this.bancoSeleccionado = true;
    this.irA(2);
  }

  seleccionarOtroBanco() {
    this.selBanco = null;
    this.bancoSeleccionado = false;
  }

  esBilletera(): boolean {
    return false;
  }

  necesitaTipoCuenta(): boolean {
    return false;
  }

  procesarPago() {
    this.irA(4);
  }

  mostrarResultado() {
    this.irA(5);
  }

  mostrarFallido() {
    this.irA(6);
  }

  irADescarga() {
    this.wizardStep = 4;
    this.goToDownload.emit();
  }
}
