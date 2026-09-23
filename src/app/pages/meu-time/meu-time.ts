import { Component, inject } from '@angular/core';
import { Autenticacao } from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';

import {
  CLUBES,
  PARTIDAS,
  ELENCOS,
  HISTORICO,
  TRANSMISSOES,
  EVENTOS,
  TimeFavorito,
} from './meu-time.dados';

type Opcao = '' | 'casa' | 'estadio' | 'torcida';

@Component({
  selector: 'app-meu-time',
  imports: [Cabecalho, Rodape],
  templateUrl: './meu-time.html',
  styleUrl: './meu-time.css',
})
export class MeuTime {
  private autenticacao = inject(Autenticacao);
  private temaService = inject(TemaService);

  readonly timeFavorito: TimeFavorito =
    this.autenticacao.obterUsuario()?.time === 'vitoria'
      ? 'vitoria'
      : 'bahia';

  readonly clubes = CLUBES;
  readonly nomeTime = CLUBES[this.timeFavorito].nome;
  readonly partidas = PARTIDAS[this.timeFavorito];
  readonly eventos = EVENTOS[this.timeFavorito];
  readonly elencos = ELENCOS;
  readonly historico = HISTORICO;
  readonly transmissoes = TRANSMISSOES;

  readonly nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  readonly diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  readonly opcoes: {
    id: Exclude<Opcao, ''>;
    titulo: string;
    texto: string;
    icone: string;
  }[] = [
    {
      id: 'casa',
      titulo: 'Em casa',
      texto: 'TV, streaming, YouTube e rádio',
      icone: '▣',
    },
    {
      id: 'estadio',
      titulo: 'No estádio',
      texto: 'Ingressos e informações do local',
      icone: '◉',
    },
    {
      id: 'torcida',
      titulo: 'Com a torcida',
      texto: 'Estabelecimentos e encontros',
      icone: '⚑',
    },
  ];

  indicePartida = 0;
  opcaoSelecionada: Opcao = '';

  mesCalendario = Number(this.partidas[0].data.slice(5, 7)) - 1;
  anoCalendario = Number(this.partidas[0].data.slice(0, 4));
  diaSelecionado: number | null = null;

  get temaSelecionado() {
    return this.temaService.tema();
  }

  get jogo() {
    return this.partidas[this.indicePartida];
  }

  get local() {
    return this.clubes[this.jogo.mandante];
  }

  get dataSelecionada() {
    return this.diaSelecionado === null
      ? ''
      : this.dataDoDia(this.diaSelecionado);
  }

  get partidasDoDia() {
    return this.partidas.filter(p => p.data === this.dataSelecionada);
  }

  get eventosDoDia() {
    return this.eventos.filter(e => e.data === this.dataSelecionada);
  }

  get mapaEstadio() {
    return this.mapa(this.local.endereco);
  }

  get chegadaSugerida() {
    const [hora, minuto] = this.jogo.horario.split(':').map(Number);

    return (
      `${String((hora + 22) % 24).padStart(2, '0')}:` +
      String(minuto).padStart(2, '0')
    );
  }

  get diasCalendario(): (number | null)[] {
    const inicio = new Date(
      this.anoCalendario,
      this.mesCalendario,
      1
    ).getDay();

    const total = new Date(
      this.anoCalendario,
      this.mesCalendario + 1,
      0
    ).getDate();

    const dias: (number | null)[] = Array(inicio).fill(null);

    for (let dia = 1; dia <= total; dia++) {
      dias.push(dia);
    }

    while (dias.length % 7) {
      dias.push(null);
    }

    return dias;
  }

  selecionarPartida(indice: number) {
    if (indice < 0 || indice >= this.partidas.length) {
      return;
    }

    this.indicePartida = indice;
    this.opcaoSelecionada = '';

    const [ano, mes, dia] = this.jogo.data.split('-').map(Number);

    this.anoCalendario = ano;
    this.mesCalendario = mes - 1;
    this.diaSelecionado = dia;
  }

  mudarPartida(direcao: number) {
    this.selecionarPartida(
      (this.indicePartida + direcao + this.partidas.length) %
      this.partidas.length
    );
  }

  selecionarOpcao(opcao: Exclude<Opcao, ''>) {
    this.opcaoSelecionada =
      this.opcaoSelecionada === opcao ? '' : opcao;
  }

  mudarMes(direcao: number) {
    const data = new Date(
      this.anoCalendario,
      this.mesCalendario + direcao,
      1
    );

    this.mesCalendario = data.getMonth();
    this.anoCalendario = data.getFullYear();
    this.diaSelecionado = null;
  }

  abrirEvento(data: string) {
    const [ano, mes, dia] = data.split('-').map(Number);

    this.anoCalendario = ano;
    this.mesCalendario = mes - 1;
    this.diaSelecionado = dia;
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;

    const indice = this.partidas.findIndex(
      partida => partida.data === this.dataSelecionada
    );

    if (indice !== -1) {
      this.selecionarPartida(indice);
    }
  }

  temPartida(dia: number) {
    return this.partidas.some(p => p.data === this.dataDoDia(dia));
  }

  temEvento(dia: number) {
    return this.eventos.some(e => e.data === this.dataDoDia(dia));
  }

  formatarData(data: string) {
    return data.split('-').reverse().join('/');
  }

  mapa(local: string) {
    return (
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(local)
    );
  }

  resultado(
    partida: typeof HISTORICO[number]
  ): 'vitória' | 'derrota' | 'empate' {
    const saldo =
      this.timeFavorito === 'vitoria'
        ? partida.vitoria - partida.bahia
        : partida.bahia - partida.vitoria;

    return saldo === 0 ? 'empate' : saldo > 0 ? 'vitória' : 'derrota';
  }

  descricaoDia(dia: number) {
    const itens = [
      this.temPartida(dia) ? 'com partida' : '',
      this.temEvento(dia) ? 'com evento da torcida' : '',
    ].filter(Boolean);

    return (
      `${dia} de ${this.nomesMeses[this.mesCalendario]} ` +
      `de ${this.anoCalendario}, ` +
      (itens.join(' e ') || 'sem programação')
    );
  }

  private dataDoDia(dia: number) {
    return (
      `${this.anoCalendario}-` +
      `${String(this.mesCalendario + 1).padStart(2, '0')}-` +
      String(dia).padStart(2, '0')
    );
  }
}