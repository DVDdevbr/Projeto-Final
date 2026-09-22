import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  Autenticacao,
  TimeFavorito,
} from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';
import { Cabecalho } from '../cabecalho/cabecalho';
import { Rodape } from '../rodape/rodape';

@Component({
  selector: 'app-trocar-time',
  imports: [RouterLink, Cabecalho, Rodape],
  templateUrl: './trocar-time.html',
  styleUrl: './trocar-time.css',
})
export class TrocarTime {
  private autenticacao = inject(Autenticacao);
  private roteador = inject(Router);

  readonly temaService = inject(TemaService);
  readonly timeAtual = this.autenticacao.obterUsuario()?.time;

  readonly times: {
    id: TimeFavorito;
    nome: string;
    escudo: string;
  }[] = [
    { id: 'vitoria', nome: 'Vitória', escudo: 'img/ecv.png' },
    { id: 'bahia', nome: 'Bahia', escudo: 'img/ba.webp' },
  ];

  selecionarTime(time: TimeFavorito) {
    if (!this.autenticacao.trocarTime(time)) {
      return;
    }

    const tema = this.temaService.tema();

    if (tema === 'vitoria' || tema === 'bahia') {
      this.temaService.selecionar(time);
    }

    this.roteador.navigate(['/meu-time']);
  }
}