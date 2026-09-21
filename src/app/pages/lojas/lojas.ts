import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Autenticacao } from '../../../services/autenticacao';
import { TemaService } from '../../../services/tema';

import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  precoAnterior: number;
  precoAtual: number;
}

interface Cupom {
  codigo: string;
  titulo: string;
  descricao: string;
  condicoes: string;
}

interface Loja {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  endereco: string;
  produtos: Produto[];
  cupons: Cupom[];
}

@Component({
  selector: 'app-lojas',
  imports: [FormsModule, Cabecalho, Rodape],
  templateUrl: './lojas.html',
  styleUrl: './lojas.css',
})
export class Lojas {
  private autenticacao = inject(Autenticacao);
  private temaService = inject(TemaService);

  usuario = this.autenticacao.obterUsuario();

  timeFavorito = this.usuario?.time === 'vitoria' ? 'vitoria' : 'bahia';
  nomeTime = this.timeFavorito === 'vitoria' ? 'Vitória' : 'Bahia';
  siglaTime = this.timeFavorito === 'vitoria' ? 'VIT' : 'BAH';

  abaSelecionada: 'oficial' | 'parceiras' = 'oficial';
  indiceParceira = 0;

  categoria = 'Todos';
  ordem = 'destaques';

  mensagemCupom = signal('');

  lojaOficial: Loja = {
    id: 'oficial',
    nome: this.timeFavorito === 'vitoria' ? 'Loja Sou Nego' : 'Loja Esquadrão',
    sigla: this.timeFavorito === 'vitoria' ? 'SN' : 'ES',
    descricao: `Encontre o manto e os acessórios do ${this.nomeTime} na loja oficial.`,
    endereco:
      this.timeFavorito === 'vitoria'
        ? 'https://www.lojasounego.com.br/'
        : 'https://lojaesquadrao.com.br/',

    produtos: [
      {
        id: 1,
        nome: 'Camisa de jogo',
        categoria: 'Camisas',
        tipo: 'camisa',
        precoAnterior: 24990,
        precoAtual: 19990,
      },
      {
        id: 2,
        nome: 'Camisa de treino',
        categoria: 'Camisas',
        tipo: 'treino',
        precoAnterior: 17990,
        precoAtual: 14990,
      },
      {
        id: 3,
        nome: 'Caneca da torcida',
        categoria: 'Acessórios',
        tipo: 'caneca',
        precoAnterior: 5990,
        precoAtual: 4490,
      },
      {
        id: 4,
        nome: 'Camisa casual',
        categoria: 'Camisas',
        tipo: 'casual',
        precoAnterior: 11990,
        precoAtual: 8990,
      },
    ],

    cupons: [
      {
        codigo: 'MANTO10-DEMO',
        titulo: '10% de desconto',
        descricao: 'Exemplo de benefício para uma futura parceria.',
        condicoes:
          'Simulação de desconto em produtos selecionados, sem acumular com outras ofertas.',
      },
      {
        codigo: 'FRETE-DEMO',
        titulo: 'Frete grátis',
        descricao: 'Exemplo de benefício para compras na loja.',
        condicoes:
          'Simulação de frete grátis em compras acima de R$ 199, sujeito à região de entrega.',
      },
    ],
  };

  lojasParceiras: Loja[] = [
    {
      id: 'arquibancada',
      nome: 'Arquibancada Store',
      sigla: 'AS',
      descricao: 'Camisas e acessórios para vestir sua paixão pelo futebol.',
      endereco: '',

      produtos: [
        {
          id: 11,
          nome: 'Camisa da arquibancada',
          categoria: 'Camisas',
          tipo: 'camisa',
          precoAnterior: 15990,
          precoAtual: 11990,
        },
        {
          id: 12,
          nome: 'Camisa de treino',
          categoria: 'Camisas',
          tipo: 'treino',
          precoAnterior: 13990,
          precoAtual: 9990,
        },
        {
          id: 13,
          nome: 'Caneca dia de jogo',
          categoria: 'Acessórios',
          tipo: 'caneca',
          precoAnterior: 5990,
          precoAtual: 3990,
        },
      ],

      cupons: [
        {
          codigo: 'ARQUI10-DEMO',
          titulo: '10% na primeira compra',
          descricao: 'Exemplo de cupom da Arquibancada Store.',
          condicoes:
            'Simulação para a primeira compra, com desconto em itens selecionados.',
        },
        {
          codigo: 'ARQUIFRETE-DEMO',
          titulo: 'Entrega por nossa conta',
          descricao: 'Exemplo de benefício de frete grátis.',
          condicoes:
            'Simulação para compras acima de R$ 150, conforme a região.',
        },
      ],
    },

    {
      id: 'resenha',
      nome: 'Resenha do Torcedor',
      sigla: 'RT',
      descricao: 'Presentes e acessórios para acompanhar cada partida.',
      endereco: '',

      produtos: [
        {
          id: 21,
          nome: 'Caneca da resenha',
          categoria: 'Acessórios',
          tipo: 'caneca',
          precoAnterior: 6990,
          precoAtual: 4990,
        },
        {
          id: 22,
          nome: 'Camisa da torcida',
          categoria: 'Camisas',
          tipo: 'casual',
          precoAnterior: 11990,
          precoAtual: 7990,
        },
        {
          id: 23,
          nome: 'Caneca edição estádio',
          categoria: 'Acessórios',
          tipo: 'caneca',
          precoAnterior: 7990,
          precoAtual: 5990,
        },
      ],

      cupons: [
        {
          codigo: 'RESENHA15-DEMO',
          titulo: '15% em acessórios',
          descricao: 'Exemplo de cupom da Resenha do Torcedor.',
          condicoes:
            'Simulação de desconto apenas na categoria de acessórios.',
        },
        {
          codigo: 'RESENHA20-DEMO',
          titulo: 'R$ 20 de desconto',
          descricao: 'Exemplo de benefício para uma compra maior.',
          condicoes:
            'Simulação de R$ 20 de desconto em compras acima de R$ 180.',
        },
      ],
    },

    {
      id: 'manto',
      nome: 'Manto & Companhia',
      sigla: 'MC',
      descricao: 'Estilo e futebol para os dias de jogo e para o dia a dia.',
      endereco: '',

      produtos: [
        {
          id: 31,
          nome: 'Camisa casual premium',
          categoria: 'Camisas',
          tipo: 'casual',
          precoAnterior: 14990,
          precoAtual: 10990,
        },
        {
          id: 32,
          nome: 'Camisa coleção torcida',
          categoria: 'Camisas',
          tipo: 'camisa',
          precoAnterior: 18990,
          precoAtual: 13990,
        },
        {
          id: 33,
          nome: 'Camisa esportiva',
          categoria: 'Camisas',
          tipo: 'treino',
          precoAnterior: 12990,
          precoAtual: 8990,
        },
      ],

      cupons: [
        {
          codigo: 'COMPANHIA10-DEMO',
          titulo: '10% em camisas',
          descricao: 'Exemplo de cupom da Manto & Companhia.',
          condicoes:
            'Simulação de desconto em camisas selecionadas da coleção.',
        },
        {
          codigo: 'COMPANHIAFRETE-DEMO',
          titulo: 'Frete grátis',
          descricao: 'Exemplo de benefício para sua próxima compra.',
          condicoes:
            'Simulação de frete grátis em compras acima de R$ 200.',
        },
      ],
    },
  ];

  get temaSelecionado() {
    return this.temaService.tema();
  }

  get lojaAtual(): Loja {
    return this.abaSelecionada === 'oficial'
      ? this.lojaOficial
      : this.lojasParceiras[this.indiceParceira];
  }

  get produtosFiltrados() {
    const produtos = this.lojaAtual.produtos.filter(
      (produto) =>
        this.categoria === 'Todos' || produto.categoria === this.categoria,
    );

    if (this.ordem === 'menor') {
      produtos.sort((a, b) => a.precoAtual - b.precoAtual);
    }

    if (this.ordem === 'desconto') {
      produtos.sort(
        (a, b) =>
          this.desconto(b.precoAnterior, b.precoAtual) -
          this.desconto(a.precoAnterior, a.precoAtual),
      );
    }

    return produtos;
  }

  selecionarAba(aba: 'oficial' | 'parceiras') {
    this.abaSelecionada = aba;
    this.limparFiltros();
    this.mensagemCupom.set('');
  }

  selecionarParceira(indice: number) {
    this.indiceParceira = indice;
    this.limparFiltros();
    this.mensagemCupom.set('');
  }

  limparFiltros() {
    this.categoria = 'Todos';
    this.ordem = 'destaques';
  }

  desconto(precoAnterior: number, precoAtual: number) {
    return Math.round(((precoAnterior - precoAtual) / precoAnterior) * 100);
  }

  formatarPreco(centavos: number) {
    return (centavos / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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
