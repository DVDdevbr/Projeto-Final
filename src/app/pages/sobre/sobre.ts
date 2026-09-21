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

type SecaoSobre =
  | 'historia'
  | 'elenco'
  | 'comissao'
  | 'diretoria'
  | 'uniformes'
  | 'patrocinadores';

interface Pessoa {
  nome: string;
  cargo: string;
  descricao: string;
}

interface Fato {
  titulo: string;
  valor: string;
}

interface EventoHistorico {
  ano: string;
  titulo: string;
  descricao: string;
}

interface Jogador {
  numero: string;
  nome: string;
  posicao: string;
}

interface Uniforme {
  nome: string;
  categoria: string;
  tipo: string;
  descricao: string;
}

interface Patrocinador {
  nome: string;
  sigla: string;
  tipo: string;
}

@Component({
  selector: 'app-sobre',

  imports: [
    Cabecalho,
    Rodape,
  ],

  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {
  private readonly autenticacao =
    inject(Autenticacao);

  private readonly temaService =
    inject(TemaService);

  readonly usuario =
    this.autenticacao.obterUsuario();

  readonly timeFavorito:
    TimeFavorito =
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

  get temaSelecionado() {
    return this.temaService.tema();
  }

  /* =====================================================
     NAVEGAÇÃO
  ===================================================== */

  readonly secoes: {
    id: SecaoSobre;
    nome: string;
  }[] = [
    {
      id: 'historia',
      nome: 'História',
    },
    {
      id: 'elenco',
      nome: 'Elenco',
    },
    {
      id: 'comissao',
      nome: 'Comissão técnica',
    },
    {
      id: 'diretoria',
      nome: 'Diretoria',
    },
    {
      id: 'uniformes',
      nome: 'Uniformes',
    },
    {
      id: 'patrocinadores',
      nome: 'Patrocinadores',
    },
  ];

  secaoSelecionada:
    SecaoSobre = 'historia';

  selecionarSecao(
    secao: SecaoSobre
  ) {
    this.secaoSelecionada = secao;
  }

  /* =====================================================
     HISTÓRIA
  ===================================================== */

  readonly historia =
    this.timeFavorito === 'vitoria'
      ? 'O Esporte Clube Vitória faz parte da história do futebol baiano e construiu ao longo dos anos uma forte ligação com sua torcida. O clube carrega tradição, rivalidades marcantes e uma identidade reconhecida dentro e fora da Bahia.'
      : 'O Esporte Clube Bahia faz parte da história do futebol brasileiro e construiu ao longo dos anos uma forte ligação com sua torcida. O clube carrega tradição, conquistas importantes e uma identidade reconhecida dentro e fora da Bahia.';

  readonly fatos: Fato[] =
    this.timeFavorito === 'vitoria'
      ? [
          {
            titulo: 'Clube',
            valor: 'Esporte Clube Vitória',
          },
          {
            titulo: 'Cidade',
            valor: 'Salvador - BA',
          },
          {
            titulo: 'Estádio',
            valor: 'Barradão',
          },
          {
            titulo: 'Apelido',
            valor: 'Leão da Barra',
          },
        ]
      : [
          {
            titulo: 'Clube',
            valor: 'Esporte Clube Bahia',
          },
          {
            titulo: 'Cidade',
            valor: 'Salvador - BA',
          },
          {
            titulo: 'Estádio',
            valor: 'Arena Fonte Nova',
          },
          {
            titulo: 'Apelido',
            valor: 'Esquadrão de Aço',
          },
        ];

  readonly linhaDoTempo:
    EventoHistorico[] =
      this.timeFavorito === 'vitoria'
        ? [
            {
              ano: '1899',
              titulo: 'Fundação',
              descricao:
                'Início da história do Esporte Clube Vitória.',
            },
            {
              ano: '1902',
              titulo: 'Futebol',
              descricao:
                'O futebol passa a fazer parte das atividades do clube.',
            },
            {
              ano: '1986',
              titulo: 'Barradão',
              descricao:
                'O estádio Manoel Barradas passa a fazer parte da história rubro-negra.',
            },
            {
              ano: 'Hoje',
              titulo:
                'Uma paixão que continua',
              descricao:
                'Novas gerações mantêm viva a ligação entre clube e torcida.',
            },
          ]
        : [
            {
              ano: '1931',
              titulo: 'Fundação',
              descricao:
                'Início da história do Esporte Clube Bahia.',
            },
            {
              ano: '1959',
              titulo:
                'Conquista nacional',
              descricao:
                'Um dos capítulos mais importantes da história tricolor.',
            },
            {
              ano: '1988',
              titulo:
                'Novo título brasileiro',
              descricao:
                'Outro momento marcante na trajetória do clube.',
            },
            {
              ano: 'Hoje',
              titulo:
                'Uma paixão que continua',
              descricao:
                'Novas gerações mantêm viva a ligação entre clube e torcida.',
            },
          ];

  /* =====================================================
     ELENCO DEMONSTRATIVO
  ===================================================== */

  readonly jogadores:
    Jogador[] = [
      {
        numero: '1',
        nome: 'Goleiro',
        posicao: 'Goleiro',
      },
      {
        numero: '2',
        nome: 'Lateral',
        posicao: 'Defesa',
      },
      {
        numero: '3',
        nome: 'Zagueiro',
        posicao: 'Defesa',
      },
      {
        numero: '4',
        nome: 'Zagueiro',
        posicao: 'Defesa',
      },
      {
        numero: '6',
        nome: 'Lateral',
        posicao: 'Defesa',
      },
      {
        numero: '5',
        nome: 'Volante',
        posicao: 'Meio-campo',
      },
      {
        numero: '8',
        nome: 'Meia',
        posicao: 'Meio-campo',
      },
      {
        numero: '10',
        nome: 'Meia',
        posicao: 'Meio-campo',
      },
      {
        numero: '7',
        nome: 'Ponta',
        posicao: 'Ataque',
      },
      {
        numero: '9',
        nome: 'Centroavante',
        posicao: 'Ataque',
      },
      {
        numero: '11',
        nome: 'Ponta',
        posicao: 'Ataque',
      },
      {
        numero: '12',
        nome: 'Reserva',
        posicao: 'Elenco',
      },
    ];

  /* =====================================================
     COMISSÃO TÉCNICA
  ===================================================== */

  readonly comissao:
    Pessoa[] = [
      {
        nome: 'Treinador',
        cargo: 'Técnico',
        descricao:
          'Responsável pela organização e comando da equipe.',
      },
      {
        nome: 'Auxiliar técnico',
        cargo: 'Auxiliar',
        descricao:
          'Apoia o trabalho técnico e tático da equipe.',
      },
      {
        nome: 'Preparador físico',
        cargo: 'Preparação física',
        descricao:
          'Responsável pela preparação física dos atletas.',
      },
      {
        nome:
          'Preparador de goleiros',
        cargo: 'Goleiros',
        descricao:
          'Responsável pelo treinamento específico dos goleiros.',
      },
    ];

  /* =====================================================
     DIRETORIA
  ===================================================== */

  readonly diretoria:
    Pessoa[] = [
      {
        nome: 'Presidente',
        cargo: 'Presidência',
        descricao:
          'Representação institucional e administração do clube.',
      },
      {
        nome:
          'Diretor de futebol',
        cargo: 'Futebol',
        descricao:
          'Responsável pela gestão do departamento de futebol.',
      },
      {
        nome: 'Executivo',
        cargo: 'Gestão',
        descricao:
          'Atuação administrativa e planejamento estratégico.',
      },
      {
        nome: 'Coordenador',
        cargo: 'Coordenação',
        descricao:
          'Apoio à organização das atividades do futebol.',
      },
    ];

  /* =====================================================
     UNIFORMES
  ===================================================== */

  readonly uniformes:
    Uniforme[] = [
      {
        nome:
          'Uniforme principal',
        categoria: 'Jogo I',
        tipo: 'principal',
        descricao:
          'Representação demonstrativa do uniforme principal.',
      },
      {
        nome:
          'Uniforme reserva',
        categoria: 'Jogo II',
        tipo: 'reserva',
        descricao:
          'Representação demonstrativa do segundo uniforme.',
      },
      {
        nome:
          'Uniforme de goleiro',
        categoria: 'Goleiro',
        tipo: 'goleiro',
        descricao:
          'Representação demonstrativa do uniforme dos goleiros.',
      },
    ];

  /* =====================================================
     PATROCINADORES
  ===================================================== */

  readonly patrocinadores:
    Patrocinador[] = [
      {
        nome:
          'Patrocinador principal',
        sigla: 'P1',
        tipo: 'Master',
      },
      {
        nome:
          'Parceiro esportivo',
        sigla: 'P2',
        tipo:
          'Material esportivo',
      },
      {
        nome:
          'Parceiro oficial',
        sigla: 'P3',
        tipo: 'Parceiro',
      },
    ];

  /* =====================================================
     UTILITÁRIOS
  ===================================================== */

  obterInicial(
    nome: string
  ) {
    return (
      nome
        .trim()
        .charAt(0)
        .toUpperCase() || '?'
    );
  }
}