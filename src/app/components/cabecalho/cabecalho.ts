import {
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

import {
  Autenticacao,
} from '../../../services/autenticacao';

import {
  Tema,
  TemaService,
} from '../../../services/tema';

@Component({
  selector: 'app-cabecalho',

  imports: [
    RouterLink,
    RouterLinkActive,
  ],

  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  private autenticacao =
    inject(Autenticacao);

  private roteador =
    inject(Router);

  private temaService =
    inject(TemaService);

  /* =====================================================
     USUÁRIO
  ===================================================== */

  usuario =
    this.autenticacao.obterUsuario();

  timeFavorito:
    'vitoria' | 'bahia' =
      this.usuario?.time === 'vitoria'
        ? 'vitoria'
        : 'bahia';

  nomeTime =
    this.timeFavorito === 'vitoria'
      ? 'Vitória'
      : 'Bahia';

  /* =====================================================
     MENU PRINCIPAL
  ===================================================== */

  menuAberto = false;

  alternarMenu() {
    this.menuAberto =
      !this.menuAberto;

    /*
      Nunca deixamos o menu principal
      e o perfil abertos juntos.
    */

    if (this.menuAberto) {
      this.menuPerfilAberto = false;
    }
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  /* =====================================================
     MENU DO PERFIL
  ===================================================== */

  menuPerfilAberto = false;

  alternarMenuPerfil() {
    this.menuPerfilAberto =
      !this.menuPerfilAberto;

    if (this.menuPerfilAberto) {
      this.menuAberto = false;
    }
  }

  fecharMenus() {
    this.menuAberto = false;
    this.menuPerfilAberto = false;
  }

  /* =====================================================
     TEMA GLOBAL
  ===================================================== */

  get temaSelecionado(): Tema {
    return this.temaService.tema();
  }

  selecionarTema(
    tema: Tema
  ) {
    /*
      Segurança extra:
      o usuário só pode selecionar
      o tema do clube favorito dele.
    */

    if (
      tema === 'vitoria' ||
      tema === 'bahia'
    ) {
      if (
        tema !== this.timeFavorito
      ) {
        return;
      }
    }

    this.temaService.selecionar(
      tema
    );
  }

  /* =====================================================
     CLASSES DO TEMA NO COMPONENTE
  ===================================================== */

  @HostBinding(
    'class.modo-escuro'
  )
  get modoEscuro() {
    return (
      this.temaSelecionado ===
      'escuro'
    );
  }

  @HostBinding(
    'class.tema-vitoria'
  )
  get temaVitoria() {
    return (
      this.temaSelecionado ===
      'vitoria'
    );
  }

  @HostBinding(
    'class.tema-bahia'
  )
  get temaBahia() {
    return (
      this.temaSelecionado ===
      'bahia'
    );
  }

  /* =====================================================
     INICIALIZAÇÃO
  ===================================================== */

  constructor() {
    /*
      Se outro usuário tiver utilizado
      o navegador anteriormente com
      outro clube, impedimos que o
      tema daquele clube permaneça.
    */

    this.temaService
      .validarTemaDoUsuario(
        this.timeFavorito
      );
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  sair() {
    this.fecharMenus();

    this.autenticacao.sair();

    this.roteador.navigate([
      '/login',
    ]);
  }
}