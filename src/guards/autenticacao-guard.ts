import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Autenticacao } from '../services/autenticacao';

export const autenticacaoGuard: CanActivateFn = () => {
  const autenticacao = inject(Autenticacao);
  const roteador = inject(Router);

  return autenticacao.estaLogado()
    ? true
    : roteador.createUrlTree(['/login']);
};

export const visitanteGuard: CanActivateFn = () => {
  const autenticacao = inject(Autenticacao);
  const roteador = inject(Router);

  return autenticacao.estaLogado()
    ? roteador.createUrlTree(['/meu-time'])
    : true;
};