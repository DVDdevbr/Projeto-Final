import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Autenticacao } from '../../../services/autenticacao';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private autenticacao = inject(Autenticacao);
  private roteador = inject(Router);

  email = '';
  senha = '';
  mensagemErro = '';

  entrar(formulario: NgForm) {
    this.mensagemErro = '';

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagemErro = 'Informe um e-mail válido e sua senha.';
      return;
    }

    const entrou = this.autenticacao.entrar(this.email, this.senha);

    if (!entrou) {
      this.mensagemErro = 'E-mail ou senha incorretos.';
      return;
    }

    this.roteador.navigate(['/meu-time']);
  }
}
