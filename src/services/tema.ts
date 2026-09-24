import { Injectable, signal } from '@angular/core';

export type Tema =
  | 'padrao'
  | 'escuro'
  | 'vitoria'
  | 'bahia'
  | 'vitoria-escuro'
  | 'bahia-escuro';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private readonly chaveTema = 'meu-manto-tema';

  tema = signal<Tema>(this.carregarTema());

  selecionar(tema: Tema) {
    this.tema.set(tema);
    localStorage.setItem(this.chaveTema, tema);
  }

  validarTemaDoUsuario(timeFavorito: 'vitoria' | 'bahia') {
    const tema = this.tema();

    if (
      tema !== 'padrao' &&
      tema !== 'escuro' &&
      tema !== timeFavorito &&
      tema !== `${timeFavorito}-escuro`
    ) {
      this.selecionar('padrao');
    }
  }

  private carregarTema(): Tema {
    const salvo = localStorage.getItem(this.chaveTema);

    switch (salvo) {
      case 'padrao':
      case 'escuro':
      case 'vitoria':
      case 'bahia':
      case 'vitoria-escuro':
      case 'bahia-escuro':
        return salvo;
      default:
        return 'padrao';
    }
  }
}