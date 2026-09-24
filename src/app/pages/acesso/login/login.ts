import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  Autenticacao,
  TimeFavorito,
} from '../../../../services/autenticacao';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['../acesso.css', './login.css'],
})
export class Login {
  private autenticacao = inject(Autenticacao);
  private roteador = inject(Router);

  email = '';
  senha = '';
  mostrarSenha = false;
  time: TimeFavorito | '' = '';
  mensagemErro = '';

  readonly times = [
    { id: 'vitoria', nome: 'Vitória', escudo: 'img/ecv.png' },
    { id: 'bahia', nome: 'Bahia', escudo: 'img/ba.webp' },
  ];

  get timeSelecionado() {
    return this.times.find(time => time.id === this.time);
  }

  entrar(formulario: NgForm) {
    this.mensagemErro = '';

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagemErro =
        'Informe um e-mail válido, sua senha e selecione seu time.';
      return;
    }

    if (!this.autenticacao.entrar(this.email, this.senha, this.time)) {
      this.mensagemErro = 'E-mail ou senha incorretos.';
      return;
    }

    this.roteador.navigate(['/meu-time']);
  }
}
