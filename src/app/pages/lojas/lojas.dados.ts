import { TimeFavorito } from '../../../services/autenticacao';

export interface Produto {
  id: number;
  nome: string;
  categoria: 'Camisas' | 'Acessórios';
  tipo: 'camisa' | 'treino' | 'casual' | 'caneca';
  precoAnterior: number;
  precoAtual: number;
  desconto: number;
}

interface Cupom {
  codigo: string;
  titulo: string;
  descricao: string;
  condicoes: string;
}

export interface Loja {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  endereco: string;
  produtos: Produto[];
  cupons: Cupom[];
}

function produto(
  id: number,
  nome: string,
  tipo: Produto['tipo'],
  precoAnterior: number,
  precoAtual: number
): Produto {
  return {
    id,
    nome,
    tipo,
    precoAnterior,
    precoAtual,
    categoria: tipo === 'caneca' ? 'Acessórios' : 'Camisas',
    desconto: Math.round((1 - precoAtual / precoAnterior) * 100),
  };
}

export function criarLojaOficial(time: TimeFavorito): Loja {
  const nomeTime = time === 'vitoria' ? 'Vitória' : 'Bahia';

  return {
    id: 'oficial',
    nome: time === 'vitoria' ? 'Loja Sou Nego' : 'Loja Esquadrão',
    sigla: time === 'vitoria' ? 'SN' : 'ES',
    descricao: `Encontre o manto e os acessórios do ${nomeTime} na loja oficial.`,
    endereco:
      time === 'vitoria'
        ? 'https://www.lojasounego.com.br/'
        : 'https://lojaesquadrao.com.br/',

    produtos: [
      produto(1, 'Camisa de jogo', 'camisa', 24990, 19990),
      produto(2, 'Camisa de treino', 'treino', 17990, 14990),
      produto(3, 'Caneca da torcida', 'caneca', 5990, 4490),
      produto(4, 'Camisa casual', 'casual', 11990, 8990),
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
}

export const LOJAS_PARCEIRAS: Loja[] = [
  {
    id: 'arquibancada',
    nome: 'Arquibancada Store',
    sigla: 'AS',
    descricao: 'Camisas e acessórios para vestir sua paixão pelo futebol.',
    endereco: '',

    produtos: [
      produto(11, 'Camisa da arquibancada', 'camisa', 15990, 11990),
      produto(12, 'Camisa de treino', 'treino', 13990, 9990),
      produto(13, 'Caneca dia de jogo', 'caneca', 5990, 3990),
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
      produto(21, 'Caneca da resenha', 'caneca', 6990, 4990),
      produto(22, 'Camisa da torcida', 'casual', 11990, 7990),
      produto(23, 'Caneca edição estádio', 'caneca', 7990, 5990),
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
      produto(31, 'Camisa casual premium', 'casual', 14990, 10990),
      produto(32, 'Camisa coleção torcida', 'camisa', 18990, 13990),
      produto(33, 'Camisa esportiva', 'treino', 12990, 8990),
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