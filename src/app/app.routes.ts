import { Routes } from '@angular/router';

import {
  Login,
} from './pages/login/login';

import {
  Cadastro,
} from './pages/cadastro/cadastro';

import {
  MeuTime,
} from './pages/meu-time/meu-time';

import {
  Noticias,
} from './pages/noticias/noticias';

import {
  Comunidade,
} from './pages/comunidade/comunidade';

import {
  Sobre,
} from './pages/sobre/sobre';

import {
  Feedback,
} from './pages/feedback/feedback';

import { 
  Lojas 
} from './pages/lojas/lojas';

import {
  autenticacaoGuard,
} from '../guards/autenticacao-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'cadastro',
    component: Cadastro,
  },

  {
    path: 'meu-time',
    component: MeuTime,
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'noticias',
    component: Noticias,
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'comunidade',
    component: Comunidade,
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'sobre',
    component: Sobre,
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'feedback',
    component: Feedback,
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'lojas',
    component: Lojas,
    canActivate: [autenticacaoGuard],
    title: 'Lojas | Meu Manto',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
