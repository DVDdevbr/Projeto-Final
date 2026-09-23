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

  private readonly chaveSessao = 'meu-manto-sessao';

  private contas: Conta[] = [];
  private usuarioAtual: Perfil | null = this.carregarSessao();

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

    this.salvarSessao();

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
    this.salvarSessao();

    return true;
  }

  estaLogado() {
    return this.usuarioAtual !== null;
  }

  obterUsuario() {
    return this.usuarioAtual;
  }

  sair() {
    // Remove a sessão salva antes de encerrar a sessão em memória.
    localStorage.removeItem(this.chaveSessao);
    this.usuarioAtual = null;
  }

  private salvarSessao() {
    localStorage.setItem(
      this.chaveSessao,
      JSON.stringify(this.usuarioAtual)
    );
  }

  private carregarSessao(): Perfil | null {
    try {
      const sessao = localStorage.getItem(this.chaveSessao);

      if (!sessao) {
        return null;
      }

      const perfil: unknown = JSON.parse(sessao);

      if (
        typeof perfil === 'object' &&
        perfil !== null &&
        'nome' in perfil &&
        typeof perfil.nome === 'string' &&
        'email' in perfil &&
        typeof perfil.email === 'string' &&
        'time' in perfil &&
        (perfil.time === 'vitoria' || perfil.time === 'bahia')
      ) {
        return {
          nome: perfil.nome,
          email: perfil.email,
          time: perfil.time,
        };
      }

      return null;
    } catch {
      return null;
    }
  }
}