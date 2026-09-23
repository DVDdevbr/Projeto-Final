import { Component, inject } from '@angular/core';
import { Autenticacao } from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';
import { CLUBES } from './sobre.dados';

type Secao =
  | 'historia'
  | 'elenco'
  | 'comissao'
  | 'diretoria'
  | 'uniformes'
  | 'patrocinadores';

@Component({
  selector: 'app-sobre',
  imports: [Cabecalho, Rodape],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {
  private readonly temaService = inject(TemaService);

  readonly clube =
    CLUBES[inject(Autenticacao).obterUsuario()?.time ?? 'bahia'];

  readonly secoes: { id: Secao; nome: string; titulo: string }[] = [
    {
      id: 'historia',
      nome: 'História',
      titulo: 'Uma história carregada no manto.',
    },
    {
      id: 'elenco',
      nome: 'Elenco',
      titulo: 'Quem veste o manto.',
    },
    {
      id: 'comissao',
      nome: 'Comissão técnica',
      titulo: 'Por trás de cada partida.',
    },
    {
      id: 'diretoria',
      nome: 'Diretoria',
      titulo: 'Gestão do clube.',
    },
    {
      id: 'uniformes',
      nome: 'Uniformes',
      titulo: 'O manto dentro do Meu Manto.',
    },
    {
      id: 'patrocinadores',
      nome: 'Patrocinadores',
      titulo: 'Marcas que apoiam o clube.',
    },
  ];

  secaoSelecionada = this.secoes[0];

  readonly uniformes = [
    'Uniforme principal',
    'Uniforme reserva',
    'Uniforme de goleiro',
  ].map((nome, indice) => ({
    nome,
    imagem: `img/${this.clube.imagens[indice]}`,
  }));

  get temaSelecionado() {
    return this.temaService.tema();
  }
}