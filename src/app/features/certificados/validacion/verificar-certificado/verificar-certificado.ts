/**Componente principal del wizard de certificados académicos.*/
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [],
  templateUrl: './verificar-certificado.html',
  styleUrls: ['./verificar-certificado.css']
})

export class VerificarCertificado {
validarCertificado(arg0: string) {
throw new Error('Method not implemented.');
}
mostrarError: any;
certificadoHTML: any;
certificadoValido: any;

}
