import { Injectable, signal } from '@angular/core';

export type Tema =
  | 'padrao'
  | 'escuro'
  | 'vitoria'
  | 'bahia';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private readonly chaveTema = 'meu-manto-tema';

  tema = signal<Tema>(this.carregarTema());

  selecionar(tema: Tema) {
    this.tema.set(tema);

    localStorage.setItem(
      this.chaveTema,
      tema
    );
  }

  validarTemaDoUsuario(
    timeFavorito: 'vitoria' | 'bahia'
  ) {
    const temaAtual = this.tema();

    const temaDeClube =
      temaAtual === 'vitoria' ||
      temaAtual === 'bahia';

    if (
      temaDeClube &&
      temaAtual !== timeFavorito
    ) {
      this.selecionar('padrao');
    }
  }

  private carregarTema(): Tema {
    const temaSalvo =
      localStorage.getItem(
        this.chaveTema
      );

    if (
      temaSalvo === 'padrao' ||
      temaSalvo === 'escuro' ||
      temaSalvo === 'vitoria' ||
      temaSalvo === 'bahia'
    ) {
      return temaSalvo;
    }

    return 'padrao';
  }
}