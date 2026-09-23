export const CLUBES = {
  vitoria: {
    nome: 'Vitória',
    escudo: 'img/ecv.png',
    estadio: 'Barradão',
    cidade: 'Salvador, BA',
    endereco: 'Rua Artêmio Castro Valente, Salvador',
    site: 'https://ecvitoria.com.br/',
  },
  bahia: {
    nome: 'Bahia',
    escudo: 'img/ba.webp',
    estadio: 'Arena Fonte Nova',
    cidade: 'Salvador, BA',
    endereco: 'Ladeira da Fonte das Pedras, Salvador',
    site: 'https://www.esporteclubebahia.com.br/',
  },
  santos: {
    nome: 'Santos',
    escudo: 'img/st.png',
    estadio: 'Vila Belmiro',
    cidade: 'Santos, SP',
    endereco: 'Rua Princesa Isabel, Santos',
    site: 'https://www.santosfc.com.br/',
  },
  flamengo: {
    nome: 'Flamengo',
    escudo: 'img/fla.png',
    estadio: 'Maracanã',
    cidade: 'Rio de Janeiro, RJ',
    endereco: 'Estádio do Maracanã, Rio de Janeiro',
    site: 'https://www.flamengo.com.br/',
  },
  palmeiras: {
    nome: 'Palmeiras',
    escudo: 'img/pal.png',
    estadio: 'Allianz Parque',
    cidade: 'São Paulo, SP',
    endereco: 'Allianz Parque, São Paulo',
    site: 'https://www.palmeiras.com.br/',
  },
};

export type Clube = keyof typeof CLUBES;
export type TimeFavorito = 'vitoria' | 'bahia';

export interface Partida {
  id: string;
  mandante: Clube;
  visitante: Clube;
  data: string;
  horario: string;
  classico?: boolean;
}

const BAVI: Partida = {
  id: 'bavi-demo',
  mandante: 'vitoria',
  visitante: 'bahia',
  data: '2026-09-27',
  horario: '16:00',
  classico: true,
};

export const PARTIDAS: Record<TimeFavorito, Partida[]> = {
  vitoria: [
    BAVI,
    {
      id: 'san-vit',
      mandante: 'santos',
      visitante: 'vitoria',
      data: '2026-10-04',
      horario: '18:30',
    },
    {
      id: 'fla-vit',
      mandante: 'flamengo',
      visitante: 'vitoria',
      data: '2026-10-11',
      horario: '16:00',
    },
    {
      id: 'vit-pal',
      mandante: 'vitoria',
      visitante: 'palmeiras',
      data: '2026-10-18',
      horario: '19:00',
    },
  ],

  bahia: [
    BAVI,
    {
      id: 'bah-fla',
      mandante: 'bahia',
      visitante: 'flamengo',
      data: '2026-10-04',
      horario: '21:00',
    },
    {
      id: 'pal-bah',
      mandante: 'palmeiras',
      visitante: 'bahia',
      data: '2026-10-10',
      horario: '18:30',
    },
    {
      id: 'bah-san',
      mandante: 'bahia',
      visitante: 'santos',
      data: '2026-10-17',
      horario: '16:00',
    },
  ],
};

export const ELENCOS = [
  {
    nome: 'Vitória',
    uniforme: 'img/uni1vit.webp',
    descricao: 'Camisa rubro-negra enviada para o protótipo.',
    jogadores:
      'Lucas Arcanjo; Brítez, Cacá, Luan Cândido e Ramon; ' +
      'Walace, Zé Vitor e Matheuzinho; Erick, Diego Tarzia e Renê.',
  },
  {
    nome: 'Bahia',
    uniforme: 'img/uni1bahia.webp',
    descricao: 'Camisa branca enviada para o protótipo.',
    jogadores:
      'Ronaldo; Roman Gomez, David Duarte, Ramos Mingo e Luciano Juba; ' +
      'Acevedo, Erick e Rodrigo Nestor; Kike Olivera, Erick Pulga e Alejo Véliz.',
  },
];

export const HISTORICO = [
  {
    data: '2026-08-23',
    vitoria: 0,
    bahia: 2,
    competicao: 'Brasileirão',
    fonte: 'https://www.esporteclubebahia.com.br/triunfo-no-classico/',
  },
  {
    data: '2026-01-25',
    vitoria: 0,
    bahia: 1,
    competicao: 'Baiano',
    fonte: 'https://www.esporteclubebahia.com.br/deu-bahea-6/',
  },
  {
    data: '2025-10-16',
    vitoria: 2,
    bahia: 1,
    competicao: 'Brasileirão',
    fonte:
      'https://www.bahianoticias.com.br/amp/esportes/vitoria/' +
      '30146-deu-leao-vitoria-vence-o-bahia-no-barradao-e-respira-na-luta-contra-o-rebaixamento',
  },
];

export const TRANSMISSOES = [
  {
    id: 'tv',
    categoria: 'TV aberta',
    nome: 'TVE Bahia',
    descricao:
      'Exemplo de emissora aberta. Exibição deste jogo não confirmada.',
    narrador: 'Mateus Damassa',
    comentarista: 'Rodrigo Araújo',
    acesso:
      'TV aberta; cobertura sujeita aos direitos de cada competição.',
    url: 'https://www.ba.gov.br/irdeb',
    icone: 'M3 7h18v14H3z M8 2l4 5 4-5',
  },
  {
    id: 'streaming',
    categoria: 'Streaming',
    nome: 'Premiere',
    descricao:
      'Exemplo de serviço por assinatura. Confira o plano e a programação.',
    narrador: 'Rembrandt Júnior',
    comentarista: 'Cabral Neto',
    acesso:
      'Assinatura; disponibilidade depende do plano e dos direitos de transmissão.',
    url: 'https://premiere.globo.com/',
    icone: 'M5 3l15 9-15 9z',
  },
  {
    id: 'youtube',
    categoria: 'YouTube',
    nome: 'TVE Bahia no YouTube',
    descricao:
      'Canal real. O exemplo não confirma imagens ao vivo deste jogo.',
    narrador: 'Mateus Damassa',
    comentarista: 'Rodrigo Araújo',
    acesso:
      'Canal gratuito; imagens da partida somente quando autorizadas.',
    url: 'https://www.youtube.com/tvebahia',
    icone: 'M3 5h18v14H3z M10 9l5 3-5 3z',
  },
  {
    id: 'radio',
    categoria: 'Rádio',
    nome: 'Rádio Sociedade da Bahia',
    descricao:
      'Exemplo de cobertura em áudio, sem imagens da partida.',
    narrador: 'Espedito Magrini',
    comentarista: 'Cáscio Cardoso',
    acesso:
      'Áudio pelo site da emissora. Equipe deste jogo ainda não confirmada.',
    url: 'https://www.sociedadeon.com.br/',
    icone: 'M3 8h18v13H3z M4 8l15-5 M7 13h4v4H7z M15 13h3 M15 17h3',
  },
];

export interface Evento {
  id: string;
  data: string;
  horario: string;
  titulo: string;
  local: string;
  descricao: string;
}

export const EVENTOS: Record<TimeFavorito, Evento[]> = {
  vitoria: [
    {
      id: 'aeronego',
      data: '2026-10-03',
      horario: '14:00',
      titulo: 'Aeronego — demonstração',
      local: 'Aeroporto de Salvador',
      descricao:
        'Apoio à delegação e jogadores antes da viagem para enfrentar o Santos. ' +
        'Encontro gratuito da torcida, sugerido para 13h30. ' +
        'Data, embarque e organização são fictícios.',
    },
  ],
  bahia: [],
};