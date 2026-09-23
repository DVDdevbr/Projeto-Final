import { TimeFavorito } from '../../../services/autenticacao';

type NomeCargo = [nome: string, cargo: string];

interface Clube {
  nome: string;
  sigla: string;
  historia: string[];
  fatos: [titulo: string, valor: string][];
  marcos: [ano: string, titulo: string, descricao: string][];
  elenco: {
    posicao: string;
    jogadores: [nome: string, numero: number][];
  }[];
  comissao: NomeCargo[];
  diretoria: NomeCargo[];
  patrocinadores: NomeCargo[];
  imagens: string[];
  fontes: [nome: string, link: string][];
}

export const CLUBES: Record<TimeFavorito, Clube> = {
  vitoria: {
    nome: 'Vitória',
    sigla: 'VIT',

    historia: [
      'Fundado em Salvador em 13 de maio de 1899, o Vitória nasceu como Club de Cricket Victória. Os irmãos Arthur e Arthêmio Valente participaram da criação do clube, inicialmente voltado a outras modalidades e identificado pelas cores preta e branca.',
      'O futebol entrou na trajetória do clube em 1902, ano em que o vermelho e o preto passaram a compor sua identidade. O primeiro título baiano veio em 1908. Décadas depois, o Barradão, inaugurado em 1986, tornou-se uma das principais referências da torcida rubro-negra.',
      'O Leão foi vice-campeão brasileiro em 1993 e finalista da Copa do Brasil em 2010. Em 2023, conquistou a Série B, seu primeiro título nacional. A rivalidade com o Bahia e o apoio da torcida fazem parte da identidade do clube dentro e fora de Salvador.',
    ],

    fatos: [
      ['Clube', 'Esporte Clube Vitória'],
      ['Fundação', '13 de maio de 1899'],
      ['Cidade', 'Salvador - BA'],
      ['Estádio', 'Barradão'],
      ['Apelido', 'Leão da Barra'],
      ['Cores', 'Vermelho e preto'],
    ],

    marcos: [
      [
        '1899',
        'O início',
        'Fundação do clube no Corredor da Vitória, em Salvador.',
      ],
      [
        '1902',
        'A chegada do futebol',
        'Primeiro jogo: vitória por 2 a 0 sobre o São Paulo Bahia Football Club.',
      ],
      [
        '1908',
        'Primeiro estadual',
        'O clube conquista seu primeiro Campeonato Baiano.',
      ],
      [
        '1986',
        'A casa rubro-negra',
        'Inauguração do Estádio Manoel Barradas, o Barradão.',
      ],
      [
        '1993',
        'Final do Brasileiro',
        'O Vitória termina a Série A como vice-campeão.',
      ],
      [
        '2010',
        'Final da Copa do Brasil',
        'O Leão chega à decisão nacional e fica com o vice-campeonato.',
      ],
      [
        '2023',
        'Campeão da Série B',
        'Primeiro título nacional e retorno à elite do futebol brasileiro.',
      ],
    ],

    elenco: [
      {
        posicao: 'Goleiros',
        jogadores: [
          ['Lucas Arcanjo', 1],
          ['Fintelman', 35],
        ],
      },
      {
        posicao: 'Laterais',
        jogadores: [
          ['Nathan Mendes', 45],
          ['Ramon', 13],
        ],
      },
      {
        posicao: 'Zagueiros',
        jogadores: [
          ['Cacá', 25],
          ['Riccieli', 5],
        ],
      },
      {
        posicao: 'Volantes',
        jogadores: [
          ['Baralhas', 44],
          ['Martínez', 6],
        ],
      },
      {
        posicao: 'Meias',
        jogadores: [
          ['Matheuzinho', 10],
          ['Pochettino', 8],
        ],
      },
      {
        posicao: 'Pontas',
        jogadores: [
          ['Erick', 33],
          ['Osvaldo', 11],
        ],
      },
      {
        posicao: 'Centroavantes',
        jogadores: [
          ['Renato Kayzer', 79],
          ['Renê', 91],
        ],
      },
    ],

    comissao: [
      ['Jair Ventura', 'Treinador'],
      ['Emílio Faro', 'Auxiliar técnico'],
      ['Juninho Nogueira', 'Preparador físico'],
      ['Itamar Ferreira', 'Preparador de goleiros'],
    ],

    diretoria: [
      ['Fábio Rios Mota', 'Presidente do Conselho Gestor'],
      ['Djalma Nunes Abreu', 'Vice-presidente do Conselho Gestor'],
    ],

    patrocinadores: [
      ['7K Bet', 'Patrocinador máster'],
      ['Volt Sport', 'Material esportivo'],
      ['Viva Sorte Capitalização', 'Patrocinador'],
    ],

    imagens: ['uni1vit.png', 'uni2vit.png', 'unigolvit.png'],

    fontes: [
      ['História', 'https://ecvitoria.com.br/historia/'],
      ['Elenco', 'https://ecvitoria.com.br/elenco/masculino/'],
      [
        'Comissão',
        'https://ecvitoria.com.br/elenco/masculino/comissao-tecnica/',
      ],
      ['Gestão', 'https://ecvitoria.com.br/conselhos/gestor/'],
    ],
  },

  bahia: {
    nome: 'Bahia',
    sigla: 'BAH',

    historia: [
      'O Esporte Clube Bahia foi fundado em Salvador em 1º de janeiro de 1931. Sua formação reuniu antigos atletas do Clube Bahiano de Tênis e da Associação Atlética da Bahia, que haviam encerrado suas atividades no futebol. Waldemar Costa foi o primeiro presidente.',
      'O Tricolor conquistou o Campeonato Baiano já no ano de fundação. Em 1959, venceu a Taça Brasil, reconhecida como título brasileiro: a decisão terminou em março de 1960, com triunfo por 3 a 1 sobre o Santos no Maracanã. A conquista abriu caminho para sua participação na primeira Libertadores.',
      'O segundo título brasileiro veio na edição de 1988, decidida contra o Internacional em fevereiro de 1989. Conhecido como Esquadrão de Aço, o clube tem na Fonte Nova um dos principais símbolos de sua ligação com a torcida. O clássico Ba-Vi também ocupa um lugar central nessa trajetória.',
    ],

    fatos: [
      ['Clube', 'Esporte Clube Bahia'],
      ['Fundação', '1º de janeiro de 1931'],
      ['Cidade', 'Salvador - BA'],
      ['Estádio', 'Arena Fonte Nova'],
      ['Apelido', 'Esquadrão de Aço'],
      ['Cores', 'Azul, vermelho e branco'],
    ],

    marcos: [
      [
        '1931',
        'Nasce o Tricolor',
        'Fundação em janeiro e conquista do Campeonato Baiano no mesmo ano.',
      ],
      [
        '1959',
        'Primeiro título brasileiro',
        'Campeão da Taça Brasil em decisão contra o Santos, concluída em 1960.',
      ],
      [
        '1960',
        'Estreia continental',
        'O Bahia participa da primeira edição da Copa Libertadores.',
      ],
      [
        '1988',
        'Bicampeonato brasileiro',
        'O segundo título nacional é confirmado contra o Internacional em fevereiro de 1989.',
      ],
      [
        '2001',
        'Conquista regional',
        'O Esquadrão conquista a Copa do Nordeste.',
      ],
      [
        '2002',
        'Bi do Nordeste',
        'O clube repete a conquista regional na temporada seguinte.',
      ],
      [
        '2025',
        'Mais uma taça regional',
        'O Bahia volta a conquistar a Copa do Nordeste.',
      ],
    ],

    elenco: [
      {
        posicao: 'Goleiros',
        jogadores: [
          ['Ronaldo', 1],
          ['Léo Vieira', 22],
        ],
      },
      {
        posicao: 'Laterais',
        jogadores: [
          ['Román Gómez', 31],
          ['Luciano Juba', 46],
        ],
      },
      {
        posicao: 'Zagueiros',
        jogadores: [
          ['David Duarte', 33],
          ['Kanu', 4],
        ],
      },
      {
        posicao: 'Volantes',
        jogadores: [
          ['Caio Alexandre', 8],
          ['Nicolás Acevedo', 5],
        ],
      },
      {
        posicao: 'Meias',
        jogadores: [
          ['Everton Ribeiro', 10],
          ['Rodrigo Nestor', 11],
        ],
      },
      {
        posicao: 'Pontas',
        jogadores: [
          ['Ademir', 7],
          ['Erick Pulga', 16],
        ],
      },
      {
        posicao: 'Centroavantes',
        jogadores: [
          ['Willian José', 12],
          ['Everaldo', 27],
        ],
      },
    ],

    comissao: [
      ['Rogério Ceni', 'Treinador'],
      ['Charles Hembert', 'Auxiliar técnico'],
      ['José Mário Campeiz', 'Preparador físico'],
      ['Eduardo Varjão', 'Preparador de goleiros'],
    ],

    diretoria: [
      ['Raul Aguirre', 'CEO da SAF'],
      ['Cadu Santoro', 'Diretor executivo de futebol'],
      ['Natalia Bittencourt', 'Diretora de performance e saúde'],
      ['Vitor Ferraz', 'Diretor de operações e relações institucionais'],
    ],

    patrocinadores: [
      ['Puma', 'Material esportivo'],
      ['Banco BMG', 'Patrocinador'],
      ['Viva Sorte Capitalização', 'Patrocinador'],
    ],

    imagens: ['uni1bahia.png', 'uni2bah.png', 'unigolbah.png'],

    fontes: [
      ['História', 'https://www.esporteclubebahia.com.br/o-comeco/'],
      ['Elenco', 'https://www.esporteclubebahia.com.br/elenco/masculino/'],
      [
        'Comissão',
        'https://www.esporteclubebahia.com.br/elenco/masculino/comissao-tecnica/',
      ],
      ['Gestão', 'https://www.esporteclubebahia.com.br/diretoria/'],
    ],
  },
};