import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Autenticacao } from '../../../services/autenticacao';
import { Tema, TemaService } from '../../../services/tema';

type Menu = 'principal' | 'perfil';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
  host: {
    '[class.modo-escuro]': "temaSelecionado === 'escuro'",
    '[class.tema-vitoria]': "temaSelecionado === 'vitoria'",
    '[class.tema-bahia]': "temaSelecionado === 'bahia'",
    '(document:click)': 'fecharAoClicarFora($event)',
    '(document:keydown.escape)': 'fecharComEscape()',
  },
})
export class Cabecalho {
  private autenticacao = inject(Autenticacao);
  private roteador = inject(Router);
  private temaService = inject(TemaService);
  private elemento = inject(ElementRef<HTMLElement>);

  @ViewChild('botaoMenu')
  botaoMenu?: ElementRef<HTMLButtonElement>;

  @ViewChild('botaoPerfil')
  botaoPerfil?: ElementRef<HTMLButtonElement>;

  menuAberto: Menu | null = null;

  readonly links = [
    {
      rota: '/meu-time',
      nome: 'Meu Time',
      descricao: 'Jogos, agenda e onde acompanhar',
      icone: '⚡',
    },
    {
      rota: '/noticias',
      nome: 'Notícias',
      descricao: 'As novidades do seu clube',
      icone: 'N',
    },
    {
      rota: '/comunidade',
      nome: 'Comunidade',
      descricao: 'Encontre outros torcedores',
      icone: 'C',
    },
    {
      rota: '/sobre',
      nome: 'Sobre',
      descricao: 'Conheça melhor o seu clube',
      icone: 'S',
    },
    {
      rota: '/lojas',
      nome: 'Lojas',
      descricao: 'Lojas oficiais, ofertas e cupons',
      icone: 'L',
    },
    {
      rota: '/feedback',
      nome: 'Feedback',
      descricao: 'Ajude a melhorar o Meu Manto',
      icone: 'F',
    },
  ];

  get usuario() {
    return this.autenticacao.obterUsuario();
  }

  get timeFavorito() {
    return this.usuario?.time ?? 'bahia';
  }

  get nomeTime() {
    return this.timeFavorito === 'vitoria' ? 'Vitória' : 'Bahia';
  }

  get temaSelecionado() {
    return this.temaService.tema();
  }

  get temas(): { id: Tema; nome: string; descricao: string }[] {
    return [
      { id: 'padrao', nome: 'Meu Manto', descricao: 'Tema padrão' },
      { id: 'escuro', nome: 'Escuro', descricao: 'Modo escuro' },
      {
        id: this.timeFavorito,
        nome: this.nomeTime,
        descricao: 'Tema do seu time',
      },
    ];
  }

  constructor() {
    this.temaService.validarTemaDoUsuario(this.timeFavorito);
  }

  alternarMenu(menu: Menu) {
    this.menuAberto = this.menuAberto === menu ? null : menu;
  }

  fecharMenus() {
    this.menuAberto = null;
  }

  fecharAoClicarFora(evento: Event) {
    if (
      evento.target instanceof Node &&
      !this.elemento.nativeElement.contains(evento.target)
    ) {
      this.fecharMenus();
    }
  }

  fecharComEscape() {
    const botao =
      this.menuAberto === 'principal'
        ? this.botaoMenu
        : this.botaoPerfil;

    if (this.menuAberto) {
      this.fecharMenus();
      botao?.nativeElement.focus();
    }
  }

  selecionarTema(tema: Tema) {
    if (
      (tema === 'vitoria' || tema === 'bahia') &&
      tema !== this.timeFavorito
    ) {
      return;
    }

    this.temaService.selecionar(tema);
  }

  sair() {
    if (!window.confirm('Tem certeza de que deseja sair da sua conta?')) {
      return;
    }

    this.fecharMenus();
    this.autenticacao.sair();
    this.roteador.navigate(['/login']);
  }
}