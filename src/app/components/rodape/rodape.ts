import {
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import {
  RouterLink,
} from '@angular/router';

import {
  TemaService,
} from '../../../services/tema';

@Component({
  selector: 'app-rodape',

  imports: [
    RouterLink,
  ],

  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
})
export class Rodape {
  private temaService =
    inject(TemaService);

  @HostBinding(
    'class.modo-escuro'
  )
  get modoEscuro() {
    return (
      this.temaService.tema() ===
      'escuro'
    );
  }

  @HostBinding(
    'class.tema-vitoria'
  )
  get temaVitoria() {
    return (
      this.temaService.tema() ===
      'vitoria'
    );
  }

  @HostBinding(
    'class.tema-bahia'
  )
  get temaBahia() {
    return (
      this.temaService.tema() ===
      'bahia'
    );
  }
}