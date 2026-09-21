import {
  Component,
  inject,
} from '@angular/core';

import {
  Autenticacao,
} from '../../../services/autenticacao';

import {
  TemaService,
} from '../../../services/tema';

import {
  Cabecalho,
} from '../../components/cabecalho/cabecalho';

import {
  Rodape,
} from '../../components/rodape/rodape';

type TimeFavorito =
  | 'vitoria'
  | 'bahia';

type OpcaoAcompanhamento =
  | ''
  | 'casa'
  | 'estadio'
  | 'torcida';

interface Partida {
  mandante: string;
  visitante: string;
  siglaMandante: string;
  siglaVisitante: string;
  competicao: string;
  data: string;
  horario: string;
  estadio: string;
  cidade: string;
  uniforme: string;
  escalacao: string;
}

@Component({
  selector: 'app-meu-time',

  imports: [
    Cabecalho,
    Rodape,
  ],

  templateUrl: './meu-time.html',
  styleUrl: './meu-time.css',
})
export class MeuTime {
  private readonly autenticacao =
    inject(Autenticacao);

  private readonly temaService =
    inject(TemaService);

  readonly usuario =
    this.autenticacao.obterUsuario();

  readonly timeFavorito: TimeFavorito =
    this.usuario?.time === 'vitoria'
      ? 'vitoria'
      : 'bahia';

  readonly nomeTime =
    this.timeFavorito === 'vitoria'
      ? 'Vitória'
      : 'Bahia';

  readonly siglaTime =
    this.timeFavorito === 'vitoria'
      ? 'VIT'
      : 'BAH';

  readonly estadioTime =
    this.timeFavorito === 'vitoria'
      ? 'Barradão'
      : 'Arena Fonte Nova';

  get temaSelecionado() {
    return this.temaService.tema();
  }

  /* =====================================================
     PARTIDAS
  ===================================================== */

  readonly jogosPrincipais:
    Record<TimeFavorito, Partida> = {
      vitoria: {
        mandante: 'Vitória',
        visitante: 'Bahia',
        siglaMandante: 'VIT',
        siglaVisitante: 'BAH',
        competicao: 'Partida demonstrativa',
        data: '27/09/2026',
        horario: '16h',
        estadio: 'Barradão',
        cidade: 'Salvador, BA',
        uniforme: 'Não divulgado',
        escalacao: 'Aguardando divulgação',
      },

      bahia: {
        mandante: 'Bahia',
        visitante: 'Vitória',
        siglaMandante: 'BAH',
        siglaVisitante: 'VIT',
        competicao: 'Partida demonstrativa',
        data: '28/09/2026',
        horario: '20h',
        estadio: 'Arena Fonte Nova',
        cidade: 'Salvador, BA',
        uniforme: 'Não divulgado',
        escalacao: 'Aguardando divulgação',
      },
    };

  readonly jogoPrincipal =
    this.jogosPrincipais[this.timeFavorito];

  readonly proximosJogos: Partida[] = [
    {
      mandante: 'Santos',
      visitante: this.nomeTime,
      siglaMandante: 'SAN',
      siglaVisitante: this.siglaTime,
      competicao: 'Partida demonstrativa',
      data: '04/10/2026',
      horario: '18h30',
      estadio: 'Vila Belmiro',
      cidade: 'Santos, SP',
      uniforme: 'Não divulgado',
      escalacao: 'Aguardando divulgação',
    },

    {
      mandante: 'Flamengo',
      visitante: this.nomeTime,
      siglaMandante: 'FLA',
      siglaVisitante: this.siglaTime,
      competicao: 'Partida demonstrativa',
      data: '11/10/2026',
      horario: '16h',
      estadio: 'Maracanã',
      cidade: 'Rio de Janeiro, RJ',
      uniforme: 'Não divulgado',
      escalacao: 'Aguardando divulgação',
    },

    {
      mandante: this.nomeTime,
      visitante: 'Palmeiras',
      siglaMandante: this.siglaTime,
      siglaVisitante: 'PAL',
      competicao: 'Partida demonstrativa',
      data: '18/10/2026',
      horario: '19h',
      estadio: this.estadioTime,
      cidade: 'Salvador, BA',
      uniforme: 'Não divulgado',
      escalacao: 'Aguardando divulgação',
    },
  ];

  readonly partidas: Partida[] = [
    this.jogoPrincipal,
    ...this.proximosJogos,
  ];

  indicePartida = 0;

  jogo =
    this.partidas[this.indicePartida];

  /* =====================================================
     CARROSSEL
  ===================================================== */

  selecionarPartida(indice: number) {
    if (
      indice < 0 ||
      indice >= this.partidas.length
    ) {
      return;
    }

    this.indicePartida = indice;
    this.jogo = this.partidas[indice];
    this.opcaoSelecionada = '';

    const {
      dia,
      mes,
      ano,
    } = this.obterDataPartida(this.jogo);

    this.diaSelecionado = dia;
    this.mesCalendario = mes - 1;
    this.anoCalendario = ano;
  }

  proximaPartida() {
    const proximoIndice =
      (this.indicePartida + 1) %
      this.partidas.length;

    this.selecionarPartida(
      proximoIndice
    );
  }

  partidaAnterior() {
    const indiceAnterior =
      (
        this.indicePartida -
        1 +
        this.partidas.length
      ) %
      this.partidas.length;

    this.selecionarPartida(
      indiceAnterior
    );
  }

  /* =====================================================
     ACOMPANHAMENTO
  ===================================================== */

  opcaoSelecionada:
    OpcaoAcompanhamento = '';

  selecionarOpcao(
    opcao: OpcaoAcompanhamento
  ) {
    this.opcaoSelecionada =
      this.opcaoSelecionada === opcao
        ? ''
        : opcao;
  }

  /* =====================================================
     CALENDÁRIO
  ===================================================== */

  readonly nomesMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  readonly diasSemana = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
  ];

  mesCalendario =
    this.obterDataPartida(
      this.partidas[0]
    ).mes - 1;

  anoCalendario =
    this.obterDataPartida(
      this.partidas[0]
    ).ano;

  diaSelecionado:
    number | null = null;

  get diasCalendario():
    (number | null)[] {
    const primeiroDia =
      new Date(
        this.anoCalendario,
        this.mesCalendario,
        1
      ).getDay();

    const quantidadeDias =
      new Date(
        this.anoCalendario,
        this.mesCalendario + 1,
        0
      ).getDate();

    const dias:
      (number | null)[] = [];

    for (
      let i = 0;
      i < primeiroDia;
      i++
    ) {
      dias.push(null);
    }

    for (
      let dia = 1;
      dia <= quantidadeDias;
      dia++
    ) {
      dias.push(dia);
    }

    while (
      dias.length % 7 !== 0
    ) {
      dias.push(null);
    }

    return dias;
  }

  buscarPartidaDoDia(
    dia: number
  ) {
    return this.partidas.findIndex(
      partida => {
        const {
          dia: diaJogo,
          mes: mesJogo,
          ano: anoJogo,
        } = this.obterDataPartida(
          partida
        );

        return (
          diaJogo === dia &&
          mesJogo ===
            this.mesCalendario + 1 &&
          anoJogo ===
            this.anoCalendario
        );
      }
    );
  }

  temPartida(
    dia: number
  ) {
    return (
      this.buscarPartidaDoDia(dia) !== -1
    );
  }

  mudarMes(
    direcao: number
  ) {
    const data =
      new Date(
        this.anoCalendario,
        this.mesCalendario + direcao,
        1
      );

    this.mesCalendario =
      data.getMonth();

    this.anoCalendario =
      data.getFullYear();

    this.diaSelecionado = null;
  }

  selecionarDia(
    dia: number
  ) {
    this.diaSelecionado = dia;

    const indice =
      this.buscarPartidaDoDia(dia);

    if (indice !== -1) {
      this.indicePartida = indice;
      this.jogo =
        this.partidas[indice];

      this.opcaoSelecionada = '';
    }
  }

  get partidaDoDia():
    Partida | null {
    if (
      this.diaSelecionado === null
    ) {
      return null;
    }

    const indice =
      this.buscarPartidaDoDia(
        this.diaSelecionado
      );

    return indice === -1
      ? null
      : this.partidas[indice];
  }

  descricaoDia(
    dia: number
  ) {
    const data =
      `${dia} de ` +
      `${this.nomesMeses[this.mesCalendario]} ` +
      `de ${this.anoCalendario}`;

    return this.temPartida(dia)
      ? `${data}, com partida`
      : `${data}, sem partida cadastrada`;
  }

  /* =====================================================
     UTILITÁRIOS
  ===================================================== */

  private obterDataPartida(
    partida: Partida
  ) {
    const [
      dia,
      mes,
      ano,
    ] =
      partida.data
        .split('/')
        .map(Number);

    return {
      dia,
      mes,
      ano,
    };
  }
}