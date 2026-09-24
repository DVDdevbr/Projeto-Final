import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Autenticacao, TimeFavorito } from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';

type TipoFeedback = 'avaliacao' | 'erro' | 'sugestao' | 'contribuicao';
type TipoContribuicao = 'apoio' | 'patrocinio' | 'parceria';

interface Opcao<T> {
  id: T;
  nome: string;
  descricao: string;
  icone: string;
}

interface OpcaoFeedback extends Opcao<TipoFeedback> {
  assunto: string;
  mensagem: string;
}

interface FeedbackSalvo {
  id: number;
  usuario: string;
  time: TimeFavorito;
  avaliacao: number;
  tipo: TipoFeedback;
  contribuicao: TipoContribuicao | '';
  assunto: string;
  mensagem: string;
  email: string;
  data: string;
}

@Component({
  selector: 'app-feedback',
  imports: [FormsModule, RouterLink, Cabecalho, Rodape],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  private readonly usuario = inject(Autenticacao).obterUsuario();
  private readonly chaveFeedbacks = 'meu-manto-feedbacks';

  readonly tema = inject(TemaService).tema;
  readonly estrelas = [1, 2, 3, 4, 5];

  readonly textosAvaliacao = [
    '',
    'Precisamos melhorar',
    'Pode ficar melhor',
    'Boa experiência',
    'Muito bom!',
    'Experiência excelente!',
  ];

  readonly tipos: OpcaoFeedback[] = [
    {
      id: 'avaliacao',
      nome: 'Avaliação',
      descricao: 'Conte o que achou da experiência no Meu Manto.',
      icone: '★',
      assunto: 'Ex.: Minha experiência no Meu Manto',
      mensagem: 'Conte o que você achou do site...',
    },
    {
      id: 'erro',
      nome: 'Erro ou problema',
      descricao: 'Encontrou algo que não está funcionando corretamente?',
      icone: '!',
      assunto: 'Ex.: Problema no calendário',
      mensagem: 'Explique onde o problema aconteceu e o que você estava tentando fazer...',
    },
    {
      id: 'sugestao',
      nome: 'Sugestão',
      descricao: 'Tem uma ideia de recurso ou algo que podemos melhorar?',
      icone: '+',
      assunto: 'Ex.: Nova função para a comunidade',
      mensagem: 'Conte sua ideia e como ela poderia melhorar o Meu Manto...',
    },
    {
      id: 'contribuicao',
      nome: 'Contribuição',
      descricao: 'Interesse em apoio, patrocínio ou parceria com o projeto.',
      icone: '♥',
      assunto: 'Ex.: Proposta de parceria',
      mensagem: 'Conte como você gostaria de contribuir com o projeto...',
    },
  ];

  readonly contribuicoes: Opcao<TipoContribuicao>[] = [
    {
      id: 'apoio',
      nome: 'Apoio',
      descricao: 'Tenho interesse em apoiar o projeto.',
      icone: '♥',
    },
    {
      id: 'patrocinio',
      nome: 'Patrocínio',
      descricao: 'Tenho interesse em patrocinar.',
      icone: '★',
    },
    {
      id: 'parceria',
      nome: 'Parceria',
      descricao: 'Quero conversar sobre uma parceria.',
      icone: '↔',
    },
  ];

  avaliacao = 0;
  tipoSelecionado: TipoFeedback | '' = '';
  contribuicaoSelecionada: TipoContribuicao | '' = '';
  assunto = '';
  mensagem = '';
  email = '';
  erroFormulario = '';
  protocolo = '';
  enviado = false;

  get tipoAtual() {
    return this.tipos.find(tipo => tipo.id === this.tipoSelecionado);
  }

  selecionarTipo(tipo: TipoFeedback) {
    this.tipoSelecionado = tipo;
    this.contribuicaoSelecionada = '';
    this.erroFormulario = '';
  }

  enviarFeedback() {
    if (this.enviado) return;

    const assunto = this.assunto.trim();
    const mensagem = this.mensagem.trim();
    const email = this.email.trim();
    const tipo = this.tipoSelecionado;

    this.erroFormulario = '';

    if (!tipo) {
      this.erroFormulario = 'Escolha o tipo de feedback.';
    } else if (assunto.length < 3) {
      this.erroFormulario = 'Digite um assunto com pelo menos 3 caracteres.';
    } else if (mensagem.length < 10) {
      this.erroFormulario =
        'Explique um pouco mais. A mensagem precisa ter pelo menos 10 caracteres.';
    } else if (tipo === 'contribuicao' && !this.contribuicaoSelecionada) {
      this.erroFormulario = 'Escolha como deseja contribuir.';
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.erroFormulario = 'Digite um endereço de e-mail válido.';
    }

    if (this.erroFormulario || !tipo) return;

    const agora = new Date();

    const feedback: FeedbackSalvo = {
      id: agora.getTime(),
      usuario: this.usuario?.nome ?? 'Torcedor',
      time: this.usuario?.time === 'vitoria' ? 'vitoria' : 'bahia',
      avaliacao: this.avaliacao,
      tipo,
      contribuicao: this.contribuicaoSelecionada,
      assunto,
      mensagem,
      email,
      data: agora.toLocaleString('pt-BR'),
    };

    try {
      const dados: unknown = JSON.parse(
        localStorage.getItem(this.chaveFeedbacks) ?? '[]'
      );

      if (!Array.isArray(dados)) throw new Error('Histórico inválido');

      localStorage.setItem(
        this.chaveFeedbacks,
        JSON.stringify([...dados, feedback])
      );
    } catch {
      this.erroFormulario =
        'Não foi possível salvar o feedback neste navegador. Tente novamente.';
      return;
    }

    this.protocolo = `MM-${String(feedback.id).slice(-6)}`;
    this.enviado = true;
    this.irParaTopo();
  }

  novoFeedback() {
    this.avaliacao = 0;
    this.tipoSelecionado = '';
    this.contribuicaoSelecionada = '';
    this.assunto = '';
    this.mensagem = '';
    this.email = '';
    this.erroFormulario = '';
    this.protocolo = '';
    this.enviado = false;
    this.irParaTopo();
  }

  private irParaTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}