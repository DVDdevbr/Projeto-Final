import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autenticacao } from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';
import {
  criarLojaOficial,
  LOJAS_PARCEIRAS,
  Loja,
  Produto,
} from './lojas.dados';

@Component({
  selector: 'app-lojas',
  imports: [FormsModule, Cabecalho, Rodape],
  templateUrl: './lojas.html',
  styleUrl: './lojas.css',
})
export class Lojas {
  private readonly temaService = inject(TemaService);

  private readonly moeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  readonly timeFavorito =
    inject(Autenticacao).obterUsuario()?.time ?? 'bahia';

  readonly nomeTime = this.timeFavorito === 'vitoria' ? 'Vitória' : 'Bahia';
  readonly siglaTime = this.timeFavorito === 'vitoria' ? 'VIT' : 'BAH';
  readonly lojaOficial = criarLojaOficial(this.timeFavorito);
  readonly lojasParceiras = LOJAS_PARCEIRAS;
  readonly mensagemCupom = signal('');

  parceiraSelecionada = this.lojasParceiras[0];
  lojaAtual = this.lojaOficial;

  categoria: 'Todos' | Produto['categoria'] = 'Todos';
  ordem: 'destaques' | 'menor' | 'desconto' = 'destaques';

  get temaSelecionado() {
    return this.temaService.tema();
  }

  get ehOficial() {
    return this.lojaAtual.id === 'oficial';
  }

  get produtosFiltrados() {
    const produtos = this.lojaAtual.produtos.filter(
      p => this.categoria === 'Todos' || p.categoria === this.categoria
    );

    if (this.ordem === 'menor') {
      produtos.sort((a, b) => a.precoAtual - b.precoAtual);
    }

    if (this.ordem === 'desconto') {
      produtos.sort((a, b) => b.desconto - a.desconto);
    }

    return produtos;
  }

  selecionarLoja(loja: Loja) {
    this.lojaAtual = loja;

    if (!this.ehOficial) {
      this.parceiraSelecionada = loja;
    }

    this.limparFiltros();
    this.mensagemCupom.set('');
  }

  limparFiltros() {
    this.categoria = 'Todos';
    this.ordem = 'destaques';
  }

  formatarPreco(centavos: number) {
    return this.moeda.format(centavos / 100);
  }

  async copiarCupom(codigo: string) {
    const lojaAoCopiar = this.lojaAtual.id;
    let mensagem: string;

    try {
      await navigator.clipboard.writeText(codigo);
      mensagem = `${codigo} copiado! Código demonstrativo, sem validade nas lojas.`;
    } catch {
      mensagem = `Não foi possível copiar automaticamente. Selecione o código ${codigo} e copie manualmente.`;
    }

    if (this.lojaAtual.id === lojaAoCopiar) {
      this.mensagemCupom.set(mensagem);
    }
  }
}
