import { Injectable } from '@angular/core';

interface Perfil {
  nome: string;
  email: string;
  time: string;
}

interface Conta extends Perfil {
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class Autenticacao {
  private contas: Conta[] = [];
  private usuarioAtual: Perfil | null = null;

  cadastrar(nome: string, email: string, senha: string, time: string) {
    const emailFormatado = email.trim().toLowerCase();

    const contaExistente = this.contas.find(
      conta => conta.email === emailFormatado
    );

    if (contaExistente) {
      return false;
    }

    this.contas.push({
      nome: nome.trim(),
      email: emailFormatado,
      senha: senha,
      time: time,
    });

    return true;
  }

  entrar(email: string, senha: string) {
    const emailFormatado = email.trim().toLowerCase();

    const conta = this.contas.find(
      conta => conta.email === emailFormatado && conta.senha === senha
    );

    if (!conta) {
      return false;
    }

    this.usuarioAtual = {
      nome: conta.nome,
      email: conta.email,
      time: conta.time,
    };

    return true;
  }

  estaLogado() {
    return this.usuarioAtual !== null;
  }

  obterUsuario() {
    return this.usuarioAtual;
  }

  sair() {
    this.usuarioAtual = null;
  }
}