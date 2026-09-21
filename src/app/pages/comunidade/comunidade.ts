import {
  Component,
  inject,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

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

type CategoriaComunidade =
  | 'todas'
  | 'resenha'
  | 'noticias'
  | 'figurinhas'
  | 'jogos';

type CategoriaGrupo =
  Exclude<
    CategoriaComunidade,
    'todas'
  >;

interface CanalOficial {
  nome: string;
  tipo: string;
  descricao: string;
  icone: string;
  link: string;
}

interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  categoria: CategoriaGrupo;
  plataforma: string;
  membros: string;
  atividade: string;
  icone: string;
  link: string;
}

@Component({
  selector: 'app-comunidade',

  imports: [
    Cabecalho,
    Rodape,
  ],

  templateUrl: './comunidade.html',
  styleUrl: './comunidade.css',
})
export class Comunidade {
  private readonly autenticacao =
    inject(Autenticacao);

  private readonly temaService =
    inject(TemaService);

  private readonly roteador =
    inject(Router);

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

  get temaSelecionado() {
    return this.temaService.tema();
  }

  /* =====================================================
     CANAIS OFICIAIS
  ===================================================== */

  readonly canaisOficiais:
    CanalOficial[] = [
      {
        nome:
          `${this.nomeTime} no Instagram`,

        tipo: 'Instagram',

        descricao:
          'Publicações e conteúdos oficiais do clube.',

        icone: 'IG',

        link: '',
      },

      {
        nome:
          `${this.nomeTime} no Facebook`,

        tipo: 'Facebook',

        descricao:
          'Notícias e publicações oficiais.',

        icone: 'FB',

        link: '',
      },

      {
        nome:
          `${this.nomeTime} no YouTube`,

        tipo: 'YouTube',

        descricao:
          'Vídeos, entrevistas e bastidores.',

        icone: 'YT',

        link: '',
      },

      {
        nome:
          `Site oficial do ${this.nomeTime}`,

        tipo: 'Site',

        descricao:
          'Informações publicadas diretamente pelo clube.',

        icone: 'WWW',

        link: '',
      },
    ];

  /* =====================================================
     CATEGORIAS
  ===================================================== */

  readonly categorias: {
    nome: string;
    valor: CategoriaComunidade;
  }[] = [
    {
      nome: 'Todas',
      valor: 'todas',
    },

    {
      nome: 'Resenha',
      valor: 'resenha',
    },

    {
      nome: 'Notícias',
      valor: 'noticias',
    },

    {
      nome: 'Figurinhas',
      valor: 'figurinhas',
    },

    {
      nome: 'Dia de jogo',
      valor: 'jogos',
    },
  ];

  categoriaSelecionada:
    CategoriaComunidade = 'todas';

  /* =====================================================
     GRUPOS DEMONSTRATIVOS
  ===================================================== */

  readonly grupos: Grupo[] = [
    {
      id: 1,

      nome:
        `Resenha ${this.nomeTime}`,

      descricao:
        'Espaço para conversar sobre partidas, jogadores e o dia a dia do clube.',

      categoria: 'resenha',

      plataforma: 'WhatsApp',

      membros: '248',

      atividade: 'Muito ativo',

      icone: 'R',

      link: '',
    },

    {
      id: 2,

      nome:
        `Central de Notícias ${this.nomeTime}`,

      descricao:
        'Comunidade dedicada ao compartilhamento de notícias e informações do clube.',

      categoria: 'noticias',

      plataforma: 'Telegram',

      membros: '531',

      atividade: 'Ativo hoje',

      icone: 'N',

      link: '',
    },

    {
      id: 3,

      nome:
        `Figurinhas do ${this.nomeTime}`,

      descricao:
        'Memes, figurinhas e conteúdo descontraído para usar durante a resenha.',

      categoria: 'figurinhas',

      plataforma: 'WhatsApp',

      membros: '174',

      atividade: 'Ativo hoje',

      icone: 'F',

      link: '',
    },

    {
      id: 4,

      nome:
        'Resenha pré-jogo',

      descricao:
        'Grupo para conversar sobre escalação, expectativas e preparação antes das partidas.',

      categoria: 'jogos',

      plataforma: 'Telegram',

      membros: '302',

      atividade: 'Muito ativo',

      icone: '⚽',

      link: '',
    },

    {
      id: 5,

      nome:
        'Torcida na arquibancada',

      descricao:
        'Espaço demonstrativo para torcedores combinarem a experiência nos dias de jogo.',

      categoria: 'jogos',

      plataforma: 'WhatsApp',

      membros: '196',

      atividade: 'Ativo',

      icone: 'T',

      link: '',
    },

    {
      id: 6,

      nome:
        'Debate do Manto',

      descricao:
        'Comunidade para opiniões, análises e conversas sobre o momento do time.',

      categoria: 'resenha',

      plataforma: 'Facebook',

      membros: '684',

      atividade: 'Ativo hoje',

      icone: 'D',

      link: '',
    },
  ];

  /* =====================================================
     FILTROS
  ===================================================== */

  get gruposFiltrados():
    Grupo[] {
    if (
      this.categoriaSelecionada ===
      'todas'
    ) {
      return this.grupos;
    }

    return this.grupos.filter(
      grupo =>
        grupo.categoria ===
        this.categoriaSelecionada
    );
  }

  selecionarCategoria(
    categoria: CategoriaComunidade
  ) {
    this.categoriaSelecionada =
      categoria;
  }

  nomeCategoria(
    categoria: CategoriaGrupo
  ) {
    const nomes:
      Record<
        CategoriaGrupo,
        string
      > = {
        resenha: 'Resenha',
        noticias: 'Notícias',
        figurinhas: 'Figurinhas',
        jogos: 'Dia de jogo',
      };

    return nomes[categoria];
  }

  /* =====================================================
     LINKS
  ===================================================== */

  abrirLink(
    link: string
  ) {
    if (!link) {
      return;
    }

    window.open(
      link,
      '_blank',
      'noopener,noreferrer'
    );
  }

  /* =====================================================
     FEEDBACK
  ===================================================== */

  irParaFeedback() {
    this.roteador.navigate([
      '/feedback',
    ]);
  }
}