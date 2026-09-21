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

type TipoFeedback =
  | ''
  | 'avaliacao'
  | 'erro'
  | 'sugestao'
  | 'contribuicao';

type TipoFeedbackPreenchido =
  Exclude<TipoFeedback, ''>;

type TipoContribuicao =
  | ''
  | 'apoio'
  | 'patrocinio'
  | 'parceria';

type TipoContribuicaoPreenchido =
  Exclude<TipoContribuicao, ''>;

interface OpcaoFeedback {
  id: TipoFeedbackPreenchido;
  nome: string;
  descricao: string;
  icone: string;
}

interface OpcaoContribuicao {
  id: TipoContribuicaoPreenchido;
  nome: string;
  descricao: string;
  icone: string;
}

interface FeedbackSalvo {
  id: number;
  usuario: string;
  time: TimeFavorito;
  avaliacao: number;
  tipo: TipoFeedbackPreenchido;
  contribuicao: TipoContribuicao;
  assunto: string;
  mensagem: string;
  email: string;
  data: string;
}

@Component({
  selector: 'app-feedback',

  imports: [
    Cabecalho,
    Rodape,
  ],

  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  private readonly autenticacao =
    inject(Autenticacao);

  private readonly temaService =
    inject(TemaService);

  private readonly roteador =
    inject(Router);

  private readonly chaveFeedbacks =
    'meu-manto-feedbacks';

  readonly usuario =
    this.autenticacao.obterUsuario();

  readonly timeFavorito:
    TimeFavorito =
      this.usuario?.time === 'vitoria'
        ? 'vitoria'
        : 'bahia';

  get temaSelecionado() {
    return this.temaService.tema();
  }

  /* =====================================================
     AVALIAÇÃO
  ===================================================== */

  readonly estrelas = [
    1,
    2,
    3,
    4,
    5,
  ];

  avaliacao = 0;

  selecionarAvaliacao(
    valor: number
  ) {
    this.avaliacao = valor;
  }

  get textoAvaliacao() {
    const textos:
      Record<number, string> = {
        1: 'Precisamos melhorar',
        2: 'Pode ficar melhor',
        3: 'Boa experiência',
        4: 'Muito bom!',
        5: 'Experiência excelente!',
      };

    return (
      textos[this.avaliacao] ?? ''
    );
  }

  /* =====================================================
     TIPOS DE FEEDBACK
  ===================================================== */

  readonly tipos:
    OpcaoFeedback[] = [
      {
        id: 'avaliacao',
        nome: 'Avaliação',
        descricao:
          'Conte o que achou da experiência no Meu Manto.',
        icone: '★',
      },
      {
        id: 'erro',
        nome: 'Erro ou problema',
        descricao:
          'Encontrou algo que não está funcionando corretamente?',
        icone: '!',
      },
      {
        id: 'sugestao',
        nome: 'Sugestão',
        descricao:
          'Tem uma ideia de recurso ou algo que podemos melhorar?',
        icone: '+',
      },
      {
        id: 'contribuicao',
        nome: 'Contribuição',
        descricao:
          'Interesse em apoio, patrocínio ou parceria com o projeto.',
        icone: '♥',
      },
    ];

  tipoSelecionado:
    TipoFeedback = '';

  selecionarTipo(
    tipo: TipoFeedbackPreenchido
  ) {
    this.tipoSelecionado = tipo;

    this.contribuicaoSelecionada = '';

    this.erroFormulario = '';
  }

  get nomeTipoSelecionado() {
    return (
      this.tipos.find(
        tipo =>
          tipo.id ===
          this.tipoSelecionado
      )?.nome ?? 'Feedback'
    );
  }

  /* =====================================================
     FORMULÁRIO
  ===================================================== */

  assunto = '';
  mensagem = '';
  email = '';

  erroFormulario = '';

  get placeholderAssunto() {
    switch (
      this.tipoSelecionado
    ) {
      case 'erro':
        return 'Ex.: Problema no calendário';

      case 'sugestao':
        return 'Ex.: Nova função para a comunidade';

      case 'contribuicao':
        return 'Ex.: Proposta de parceria';

      default:
        return 'Ex.: Minha experiência no Meu Manto';
    }
  }

  get placeholderMensagem() {
    switch (
      this.tipoSelecionado
    ) {
      case 'erro':
        return 'Explique onde o problema aconteceu e o que você estava tentando fazer...';

      case 'sugestao':
        return 'Conte sua ideia e como ela poderia melhorar o Meu Manto...';

      case 'contribuicao':
        return 'Conte como você gostaria de contribuir com o projeto...';

      default:
        return 'Conte o que você achou do site...';
    }
  }

  atualizarAssunto(
    evento: Event
  ) {
    const campo =
      evento.target as HTMLInputElement;

    this.assunto =
      campo.value;
  }

  atualizarMensagem(
    evento: Event
  ) {
    const campo =
      evento.target as HTMLTextAreaElement;

    this.mensagem =
      campo.value;
  }

  atualizarEmail(
    evento: Event
  ) {
    const campo =
      evento.target as HTMLInputElement;

    this.email =
      campo.value;
  }

  /* =====================================================
     CONTRIBUIÇÃO
  ===================================================== */

  readonly contribuicoes:
    OpcaoContribuicao[] = [
      {
        id: 'apoio',
        nome: 'Apoio',
        descricao:
          'Tenho interesse em apoiar o projeto.',
        icone: '♥',
      },
      {
        id: 'patrocinio',
        nome: 'Patrocínio',
        descricao:
          'Tenho interesse em patrocinar.',
        icone: '★',
      },
      {
        id: 'parceria',
        nome: 'Parceria',
        descricao:
          'Quero conversar sobre uma parceria.',
        icone: '↔',
      },
    ];

  contribuicaoSelecionada:
    TipoContribuicao = '';

  selecionarContribuicao(
    tipo: TipoContribuicaoPreenchido
  ) {
    this.contribuicaoSelecionada =
      tipo;
  }

  /* =====================================================
     ENVIO
  ===================================================== */

  enviado = false;

  protocolo = '';

  enviarFeedback(
    evento: Event
  ) {
    evento.preventDefault();

    this.erroFormulario = '';

    const assunto =
      this.assunto.trim();

    const mensagem =
      this.mensagem.trim();

    const email =
      this.email.trim();

    if (!this.tipoSelecionado) {
      this.erroFormulario =
        'Escolha o tipo de feedback.';

      return;
    }

    if (assunto.length < 3) {
      this.erroFormulario =
        'Digite um assunto com pelo menos 3 caracteres.';

      return;
    }

    if (mensagem.length < 10) {
      this.erroFormulario =
        'Explique um pouco mais. A mensagem precisa ter pelo menos 10 caracteres.';

      return;
    }

    if (
      this.tipoSelecionado ===
        'contribuicao' &&
      !this.contribuicaoSelecionada
    ) {
      this.erroFormulario =
        'Escolha como deseja contribuir.';

      return;
    }

    if (
      email &&
      !this.emailValido(email)
    ) {
      this.erroFormulario =
        'Digite um endereço de e-mail válido.';

      return;
    }

    const agora =
      new Date();

    const feedback:
      FeedbackSalvo = {
        id: agora.getTime(),

        usuario:
          this.usuario?.nome ??
          'Torcedor',

        time:
          this.timeFavorito,

        avaliacao:
          this.avaliacao,

        tipo:
          this.tipoSelecionado,

        contribuicao:
          this.contribuicaoSelecionada,

        assunto,

        mensagem,

        email,

        data:
          agora.toLocaleString(
            'pt-BR'
          ),
      };

    this.salvarFeedback(
      feedback
    );

    this.protocolo =
      `MM-${String(feedback.id)
        .slice(-6)}`;

    this.enviado = true;

    this.irParaTopo();
  }

  /* =====================================================
     LOCAL STORAGE
  ===================================================== */

  private salvarFeedback(
    feedback: FeedbackSalvo
  ) {
    const feedbacks =
      this.carregarFeedbacks();

    feedbacks.push(
      feedback
    );

    localStorage.setItem(
      this.chaveFeedbacks,
      JSON.stringify(
        feedbacks
      )
    );
  }

  private carregarFeedbacks():
    FeedbackSalvo[] {
    const dados =
      localStorage.getItem(
        this.chaveFeedbacks
      );

    if (!dados) {
      return [];
    }

    try {
      const convertido:
        unknown = JSON.parse(dados);

      return Array.isArray(
        convertido
      )
        ? convertido as FeedbackSalvo[]
        : [];
    } catch {
      return [];
    }
  }

  /* =====================================================
     VALIDAÇÕES
  ===================================================== */

  private emailValido(
    email: string
  ) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  }

  /* =====================================================
     APÓS ENVIO
  ===================================================== */

  novoFeedback() {
    this.limparFormulario();

    this.enviado = false;

    this.irParaTopo();
  }

  voltarMeuTime() {
    this.roteador.navigate([
      '/meu-time',
    ]);
  }

  /* =====================================================
     UTILITÁRIOS
  ===================================================== */

  private limparFormulario() {
    this.avaliacao = 0;

    this.tipoSelecionado = '';

    this.contribuicaoSelecionada = '';

    this.assunto = '';

    this.mensagem = '';

    this.email = '';

    this.erroFormulario = '';

    this.protocolo = '';
  }

  private irParaTopo() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}