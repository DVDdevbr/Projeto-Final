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

type Categoria =
  | 'todas'
  | 'clube'
  | 'partidas'
  | 'mercado'
  | 'bastidores';

type CategoriaNoticia =
  Exclude<Categoria, 'todas'>;

interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  categoria: CategoriaNoticia;
  data: string;
  fonte: string;
  link: string;
  destaque?: boolean;
}

interface Comentario {
  id: number;
  noticiaId: number;
  autor: string;
  texto: string;
  data: string;
}

@Component({
  selector: 'app-noticias',

  imports: [
    Cabecalho,
    Rodape,
  ],

  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias {
  private readonly autenticacao =
    inject(Autenticacao);

  private readonly temaService =
    inject(TemaService);

  private readonly chaveComentarios =
    'meu-manto-comentarios';

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

  get temaSelecionado() {
    return this.temaService.tema();
  }

  /* =====================================================
     CATEGORIAS
  ===================================================== */

  readonly categorias: {
    nome: string;
    valor: Categoria;
  }[] = [
    {
      nome: 'Todas',
      valor: 'todas',
    },
    {
      nome: 'Clube',
      valor: 'clube',
    },
    {
      nome: 'Partidas',
      valor: 'partidas',
    },
    {
      nome: 'Mercado',
      valor: 'mercado',
    },
    {
      nome: 'Bastidores',
      valor: 'bastidores',
    },
  ];

  categoriaSelecionada:
    Categoria = 'todas';

  /* =====================================================
     NOTÍCIAS DEMONSTRATIVAS
  ===================================================== */

  readonly noticias: Noticia[] = [
    {
      id: 1,

      titulo:
        `${this.nomeTime} inicia preparação ` +
        `para o próximo compromisso`,

      resumo:
        `O elenco do ${this.nomeTime} iniciou ` +
        `a preparação para a próxima partida. ` +
        `A comissão técnica trabalha os últimos ` +
        `ajustes antes do confronto.`,

      categoria: 'clube',

      data: '20/09/2026',

      fonte:
        'Fonte demonstrativa',

      link: '',

      destaque: true,
    },

    {
      id: 2,

      titulo:
        `Comissão técnica trabalha estratégias ` +
        `para a próxima partida`,

      resumo:
        `A atividade teve foco em organização ` +
        `tática, movimentação e preparação do ` +
        `elenco para o próximo compromisso.`,

      categoria: 'partidas',

      data: '19/09/2026',

      fonte:
        'Fonte demonstrativa',

      link: '',
    },

    {
      id: 3,

      titulo:
        `${this.nomeTime} acompanha movimentações ` +
        `do mercado`,

      resumo:
        `O departamento de futebol acompanha ` +
        `o mercado em busca de oportunidades ` +
        `para fortalecer o elenco.`,

      categoria: 'mercado',

      data: '18/09/2026',

      fonte:
        'Fonte demonstrativa',

      link: '',
    },

    {
      id: 4,

      titulo:
        `Bastidores mostram preparação ` +
        `dos jogadores`,

      resumo:
        `Treinamentos e atividades internas ` +
        `marcaram mais um dia de preparação ` +
        `do grupo.`,

      categoria: 'bastidores',

      data: '17/09/2026',

      fonte:
        'Fonte demonstrativa',

      link: '',
    },

    {
      id: 5,

      titulo:
        `Torcida se prepara para acompanhar ` +
        `o próximo jogo`,

      resumo:
        `A expectativa cresce para o próximo ` +
        `compromisso do ${this.nomeTime}, com ` +
        `mobilização dos torcedores.`,

      categoria: 'partidas',

      data: '16/09/2026',

      fonte:
        'Fonte demonstrativa',

      link: '',
    },

    {
      id: 6,

      titulo:
        `Clube divulga nova programação ` +
        `de atividades`,

      resumo:
        `O ${this.nomeTime} organizou a agenda ` +
        `da semana com treinamentos e preparação ` +
        `para os próximos compromissos.`,

      categoria: 'clube',

      data: '15/09/2026',

      fonte:
        'Fonte demonstrativa',

      link: '',
    },
  ];

  get noticiasFiltradas():
    Noticia[] {
    if (
      this.categoriaSelecionada ===
      'todas'
    ) {
      return this.noticias;
    }

    return this.noticias.filter(
      noticia =>
        noticia.categoria ===
        this.categoriaSelecionada
    );
  }

  get noticiaDestaque():
    Noticia | null {
    return (
      this.noticiasFiltradas.find(
        noticia =>
          noticia.destaque
      ) ??
      this.noticiasFiltradas[0] ??
      null
    );
  }

  selecionarCategoria(
    categoria: Categoria
  ) {
    this.categoriaSelecionada =
      categoria;

    this.fecharComentarios();
  }

  /* =====================================================
     ABRIR NOTÍCIA
  ===================================================== */

  abrirNoticia(
    noticia: Noticia
  ) {
    /*
      Os links continuam vazios enquanto
      utilizamos notícias demonstrativas.

      Quando forem adicionadas fontes reais,
      basta preencher "link".
    */

    if (!noticia.link) {
      return;
    }

    window.open(
      noticia.link,
      '_blank',
      'noopener,noreferrer'
    );
  }

  /* =====================================================
     COMENTÁRIOS
  ===================================================== */

  noticiaAberta:
    number | null = null;

  textoComentario = '';

  comentarios: Comentario[] =
    this.carregarComentarios();

  alternarComentarios(
    noticiaId: number
  ) {
    if (
      this.noticiaAberta ===
      noticiaId
    ) {
      this.fecharComentarios();
      return;
    }

    this.noticiaAberta =
      noticiaId;

    this.textoComentario = '';
  }

  atualizarTextoComentario(
    evento: Event
  ) {
    const campo =
      evento.target as HTMLTextAreaElement;

    this.textoComentario =
      campo.value;
  }

  adicionarComentario(
    noticiaId: number,
    evento: Event
  ) {
    evento.preventDefault();

    const texto =
      this.textoComentario.trim();

    if (texto.length < 2) {
      return;
    }

    const comentario:
      Comentario = {
        id: Date.now(),

        noticiaId,

        autor:
          this.usuario?.nome ??
          'Torcedor',

        texto,

        data:
          new Date()
            .toLocaleDateString(
              'pt-BR'
            ),
      };

    this.comentarios = [
      comentario,
      ...this.comentarios,
    ];

    this.salvarComentarios();

    this.textoComentario = '';
  }

  obterComentarios(
    noticiaId: number
  ): Comentario[] {
    return this.comentarios.filter(
      comentario =>
        comentario.noticiaId ===
        noticiaId
    );
  }

  quantidadeComentarios(
    noticiaId: number
  ) {
    return this.comentarios.filter(
      comentario =>
        comentario.noticiaId ===
        noticiaId
    ).length;
  }

  obterInicial(
    nome: string
  ) {
    return (
      nome
        .trim()
        .charAt(0)
        .toUpperCase() ||
      '?'
    );
  }

  private fecharComentarios() {
    this.noticiaAberta = null;
    this.textoComentario = '';
  }

  /* =====================================================
     LOCAL STORAGE
  ===================================================== */

  private carregarComentarios():
    Comentario[] {
    const dados =
      localStorage.getItem(
        this.chaveComentarios
      );

    if (!dados) {
      return [];
    }

    try {
      const comentarios:
        unknown = JSON.parse(dados);

      return Array.isArray(comentarios)
        ? comentarios as Comentario[]
        : [];
    } catch {
      return [];
    }
  }

  private salvarComentarios() {
    localStorage.setItem(
      this.chaveComentarios,
      JSON.stringify(
        this.comentarios
      )
    );
  }
}