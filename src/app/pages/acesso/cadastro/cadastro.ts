import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Autenticacao } from '../../../../services/autenticacao';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrls: ['../acesso.css', './cadastro.css'],
})
export class Cadastro {
  private autenticacao = inject(Autenticacao);

  readonly versaoTermos = this.autenticacao.versaoTermos;

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mostrarSenha = false;
  mostrarConfirmacao = false;
  aceitouTermos = false;

  mensagemErro = '';
  mensagemSucesso = '';

  cadastrar(formulario: NgForm) {
    this.limparMensagens();

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagemErro = 'Confira os campos e o aceite dos termos.';
      return;
    }

    if (this.nome.trim().length < 2) {
      this.mensagemErro = 'Informe um nome com pelo menos 2 caracteres.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    if (!this.aceitouTermos) {
      this.mensagemErro = 'Leia e aceite os termos para criar sua conta.';
      return;
    }

    if (
      !this.autenticacao.cadastrar(
        this.nome,
        this.email,
        this.senha,
        this.aceitouTermos
      )
    ) {
      this.mensagemErro = 'Já existe uma conta com esse e-mail.';
      return;
    }

    this.mostrarSenha = false;
    this.mostrarConfirmacao = false;

    formulario.resetForm({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      aceitouTermos: false,
    });

    this.mensagemSucesso =
      'Conta criada! Clique em "Entrar" abaixo e escolha seu time.';
  }

  limparMensagens() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }
}
