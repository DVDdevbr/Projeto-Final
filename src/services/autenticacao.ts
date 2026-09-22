import { Injectable } from '@angular/core';

export type TimeFavorito = 'vitoria' | 'bahia';

interface Conta {
  nome: string;
  email: string;
  senha: string;
  aceite: {
    versao: string;
    data: string;
  };
}

interface Perfil {
  nome: string;
  email: string;
  time: TimeFavorito;
}

@Injectable({ providedIn: 'root' })
export class Autenticacao {
  readonly versaoTermos = '22/09/2026';

  private contas: Conta[] = [];
  private usuarioAtual: Perfil | null = null;

  cadastrar(
    nome: string,
    email: string,
    senha: string,
    aceitouTermos: boolean
  ) {
    const emailFormatado = email.trim().toLowerCase();

    if (
      !aceitouTermos ||
      this.contas.some(conta => conta.email === emailFormatado)
    ) {
      return false;
    }

    this.contas.push({
      nome: nome.trim(),
      email: emailFormatado,
      senha,
      aceite: {
        versao: this.versaoTermos,
        data: new Date().toISOString(),
      },
    });

    return true;
  }

  entrar(email: string, senha: string, time: TimeFavorito | '') {
    if (time !== 'vitoria' && time !== 'bahia') {
      return false;
    }

    const conta = this.contas.find(
      conta =>
        conta.email === email.trim().toLowerCase() &&
        conta.senha === senha
    );

    if (!conta) {
      return false;
    }

    this.usuarioAtual = {
      nome: conta.nome,
      email: conta.email,
      time,
    };

    return true;
  }

  trocarTime(time: TimeFavorito) {
    if (
      !this.usuarioAtual ||
      (time !== 'vitoria' && time !== 'bahia')
    ) {
      return false;
    }

    this.usuarioAtual = { ...this.usuarioAtual, time };

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