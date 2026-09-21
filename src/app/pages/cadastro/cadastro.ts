import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Autenticacao } from '../../../services/autenticacao';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private autenticacao = inject(Autenticacao);

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  time = '';

  mensagemErro = '';
  mensagemSucesso = '';

  cadastrar(formulario: NgForm) {
    this.limparMensagens();

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagemErro = 'Confira os campos destacados.';
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

    const cadastrou = this.autenticacao.cadastrar(
      this.nome,
      this.email,
      this.senha,
      this.time
    );

    if (!cadastrou) {
      this.mensagemErro = 'Já existe uma conta com esse e-mail.';
      return;
    }

    formulario.resetForm({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      time: '',
    });

    this.mensagemSucesso =
      'Conta criada! Clique em "Entrar" abaixo para acessar.';
  }

  limparMensagens() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }
}
