import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autenticacao } from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';

type Categoria = 'todas' | 'clube' | 'partidas' | 'mercado' | 'bastidores';

interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  categoria: Exclude<Categoria, 'todas'>;
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
  imports: [Cabecalho, Rodape, FormsModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias {
  private readonly temaService = inject(TemaService);
  private readonly chaveComentarios = 'meu-manto-comentarios';

  readonly usuario = inject(Autenticacao).obterUsuario();
  readonly nomeTime = this.usuario?.time === 'vitoria' ? 'Vitória' : 'Bahia';
  readonly siglaTime = this.usuario?.time === 'vitoria' ? 'VIT' : 'BAH';

  readonly categorias: { nome: string; valor: Categoria }[] = [
    { nome: 'Todas', valor: 'todas' },
    { nome: 'Clube', valor: 'clube' },
    { nome: 'Partidas', valor: 'partidas' },
    { nome: 'Mercado', valor: 'mercado' },
    { nome: 'Bastidores', valor: 'bastidores' },
  ];

  categoriaSelecionada: Categoria = 'todas';
  noticiaAberta: number | null = null;
  textoComentario = '';
  comentarios = this.carregarComentarios();

  readonly noticias: Noticia[] = ([
    {
      id: 1,
      titulo: `${this.nomeTime} inicia preparação para o próximo compromisso`,
      resumo: `O elenco do ${this.nomeTime} iniciou a preparação para a próxima partida. A comissão técnica trabalha os últimos ajustes antes do confronto.`,
      categoria: 'clube',
      data: '20/09/2026',
      destaque: true,
    },
    {
      id: 2,
      titulo: 'Comissão técnica trabalha estratégias para a próxima partida',
      resumo: 'A atividade teve foco em organização tática, movimentação e preparação do elenco para o próximo compromisso.',
      categoria: 'partidas',
      data: '19/09/2026',
    },
    {
      id: 3,
      titulo: `${this.nomeTime} acompanha movimentações do mercado`,
      resumo: 'O departamento de futebol acompanha o mercado em busca de oportunidades para fortalecer o elenco.',
      categoria: 'mercado',
      data: '18/09/2026',
    },
    {
      id: 4,
      titulo: 'Bastidores mostram preparação dos jogadores',
      resumo: 'Treinamentos e atividades internas marcaram mais um dia de preparação do grupo.',
      categoria: 'bastidores',
      data: '17/09/2026',
    },
    {
      id: 5,
      titulo: 'Torcida se prepara para acompanhar o próximo jogo',
      resumo: `A expectativa cresce para o próximo compromisso do ${this.nomeTime}, com mobilização dos torcedores.`,
      categoria: 'partidas',
      data: '16/09/2026',
    },
    {
      id: 6,
      titulo: 'Clube divulga nova programação de atividades',
      resumo: `O ${this.nomeTime} organizou a agenda da semana com treinamentos e preparação para os próximos compromissos.`,
      categoria: 'clube',
      data: '15/09/2026',
    },
  ] satisfies Omit<Noticia, 'fonte' | 'link'>[]).map(noticia => ({
    ...noticia,
    fonte: 'Fonte demonstrativa',
    link: '',
  }));

  get temaSelecionado() {
    return this.temaService.tema();
  }

  get noticiasFiltradas() {
    return this.categoriaSelecionada === 'todas'
      ? this.noticias
      : this.noticias.filter(n => n.categoria === this.categoriaSelecionada);
  }

  get noticiaDestaque() {
    const noticias = this.noticiasFiltradas;
    return noticias.find(n => n.destaque) ?? noticias[0] ?? null;
  }

  selecionarCategoria(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.noticiaAberta = null;
    this.textoComentario = '';
  }

  abrirNoticia(noticia: Noticia) {
    if (noticia.link) {
      window.open(noticia.link, '_blank', 'noopener,noreferrer');
    }
  }

  alternarComentarios(noticiaId: number) {
    this.noticiaAberta = this.noticiaAberta === noticiaId ? null : noticiaId;
    this.textoComentario = '';
  }

  obterComentarios(noticiaId: number) {
    return this.comentarios.filter(c => c.noticiaId === noticiaId);
  }

  obterInicial(nome: string) {
    return nome.trim().charAt(0).toUpperCase() || '?';
  }

  adicionarComentario(noticiaId: number) {
    const texto = this.textoComentario.trim();

    if (texto.length < 2 || texto.length > 280) return;

    this.comentarios = [
      {
        id: Date.now(),
        noticiaId,
        autor: this.usuario?.nome ?? 'Torcedor',
        texto,
        data: new Date().toLocaleDateString('pt-BR'),
      },
      ...this.comentarios,
    ];

    localStorage.setItem(
      this.chaveComentarios,
      JSON.stringify(this.comentarios)
    );

    this.textoComentario = '';
  }

  private carregarComentarios(): Comentario[] {
    try {
      const dados: unknown = JSON.parse(
        localStorage.getItem(this.chaveComentarios) ?? '[]'
      );

      return Array.isArray(dados) ? dados.filter(this.ehComentario) : [];
    } catch {
      return [];
    }
  }

  private ehComentario(valor: unknown): valor is Comentario {
    if (!valor || typeof valor !== 'object') return false;

    const c = valor as Partial<Comentario>;

    return (
      typeof c.id === 'number' &&
      typeof c.noticiaId === 'number' &&
      typeof c.autor === 'string' &&
      typeof c.texto === 'string' &&
      typeof c.data === 'string'
    );
  }
}