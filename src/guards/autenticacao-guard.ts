import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Autenticacao } from '../services/autenticacao';

export const autenticacaoGuard: CanActivateFn = () => {
  const autenticacao = inject(Autenticacao);
  const roteador = inject(Router);

  if (autenticacao.estaLogado()) {
    return true;
  }

  return roteador.createUrlTree(['/login']);
};