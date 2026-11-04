// Conteúdo do site. As fotos e vídeos ficam em public/media/ e ainda são de exemplo
// (Unsplash e Pexels): para trocar pelas do Kayo, substitua os arquivos mantendo os nomes,
// ou edite os caminhos abaixo.

const base = import.meta.env.BASE_URL;
const foto = (nome) => `${base}media/fotos/${nome}.webp`;
const video = (nome) => `${base}media/videos/${nome}.mp4`;

export const WHATSAPP = '5518996018339';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;
export const TELEFONE = '(18) 99601-8339';
export const INSTAGRAM_URL = 'https://www.instagram.com/kayomaarques/';
export const waTexto = (texto) => `${WHATSAPP_URL}?text=${encodeURIComponent(texto)}`;

export const I = {
  casVeu: foto('casamento-veu'),
  casPreparo: foto('casamento-preparo'),
  casVestido: foto('casamento-vestido'),
  casNoiva: foto('casamento-noiva'),
  fesBolo: foto('festa-bolo'),
  fesBaloes: foto('festa-baloes'),
  fesFilmando: foto('festa-filmando'),
  fesCores: foto('festa-cores'),
  ensGestCasal: foto('ensaio-gestante-casal'),
  ensGest: foto('ensaio-gestante'),
  ensFam: foto('ensaio-familia'),
  ensPet: foto('ensaio-pet'),
  marRest: foto('marca-restaurante'),
  marPrato: foto('marca-prato'),
  marSalao: foto('marca-salao'),
  marBeleza: foto('marca-beleza'),
  capDurante: foto('cobertura-durante'),
  capDepois: foto('cobertura-depois'),
  pCas: foto('poster-casamento'),
  pFes: foto('poster-festa'),
  pTr: foto('poster-tempo-real'),
  retrato: foto('kayo-retrato')
};

export const V = {
  cas: video('casamento'),
  fes: video('festa'),
  tr: video('tempo-real')
};

// trabalhos (feed com filtros), story do topo e visualizador saem daqui
// TODO: confirmar com o Kayo (fotos de chá revelação e 15 anos ainda são de outros eventos)
export const CATS = [
  { label: 'Casamentos', noFeed: 3, cover: I.casVeu, items: [
    { t: 'O sim no jardim', tipo: 'Reel', img: I.pCas, v: V.cas },
    { t: 'Ensaio com véu', tipo: 'Fotos', img: I.casVeu },
    { t: 'Making of da noiva', tipo: 'Bastidores', img: I.casPreparo },
    { t: 'Detalhes do grande dia', tipo: 'Fotos', img: I.casVestido } ] },
  { label: 'Chá revelação', noFeed: 2, cover: I.fesBaloes, items: [
    { t: 'A revelação em tempo real', tipo: 'Tempo real', img: I.pFes, v: V.fes },
    { t: 'Os futuros pais', tipo: 'Fotos', img: I.ensGestCasal },
    { t: 'Balões e decoração', tipo: 'Stories', img: I.fesBaloes },
    { t: 'A espera em estúdio', tipo: 'Fotos', img: I.ensGest } ] },
  { label: '15 anos', noFeed: 2, cover: I.fesCores, items: [
    { t: 'Hora do parabéns', tipo: 'Stories', img: I.fesBolo },
    { t: 'Decoração e diversão', tipo: 'Reel', img: I.fesCores },
    { t: 'A família reunida', tipo: 'Fotos', img: I.ensFam },
    { t: 'Stories no ar', tipo: 'Tempo real', img: I.pTr, v: V.tr } ] },
  { label: 'Marcas', noFeed: 2, cover: I.marRest, items: [
    { t: 'Restaurante', tipo: 'Reel', img: I.marRest },
    { t: 'Gastronomia', tipo: 'Fotos', img: I.marPrato },
    { t: 'Salão de beleza', tipo: 'Bastidores', img: I.marSalao },
    { t: 'Estúdio de beleza', tipo: 'Fotos', img: I.marBeleza } ] }
];

// destaques em círculo, com stories próprios (não repetem os itens do feed)
// TODO: confirmar com o Kayo (trocar pelos destaques reais do Instagram dele)
export const DESTAQUES = [
  { label: 'Casamentos', cover: I.casNoiva, items: [
    { t: 'A noiva antes da cerimônia', tipo: 'Stories', img: I.casNoiva },
    { t: 'O vestido à espera', tipo: 'Stories', img: I.casVestido } ] },
  { label: 'Chá revelação', cover: I.ensGest, items: [
    { t: 'A contagem regressiva', tipo: 'Stories', img: I.ensGest },
    { t: 'A festa da revelação', tipo: 'Stories', img: I.fesBaloes } ] },
  { label: '15 anos', cover: I.fesBolo, items: [
    { t: 'O bolo e as velas', tipo: 'Stories', img: I.fesBolo },
    { t: 'A pista cheia', tipo: 'Stories', img: I.fesCores } ] },
  { label: 'Marcas', cover: I.marSalao, items: [
    { t: 'Um dia no salão', tipo: 'Stories', img: I.marSalao },
    { t: 'O prato do dia', tipo: 'Stories', img: I.marPrato } ] },
  { label: 'Bastidores', cover: I.capDurante, items: [
    { t: 'Do celular para o feed', tipo: 'Bastidores', img: I.capDurante },
    { t: 'Vários olhares', tipo: 'Bastidores', img: I.fesFilmando },
    { t: 'A edição depois da festa', tipo: 'Bastidores', img: I.capDepois } ] }
];

// story do topo: c = categoria, i = item dentro dela
export const HERO = [
  { c: 2, i: 3, tag: 'Tempo real', d: 'Stories no ar enquanto a festa acontece.' },
  { c: 0, i: 0, tag: 'Casamento', d: 'Cada momento vira conteúdo na hora.' },
  { c: 1, i: 0, tag: 'Chá revelação', d: 'Equipe de até 3 pessoas, de vários ângulos.' },
  { c: 2, i: 0, tag: '15 anos', d: 'Cada detalhe da festa nos stories.' },
  { c: 3, i: 0, tag: 'Marca', d: 'Reels para aparecer bem no Instagram.' }
];

export const CAPS = [
  { k: 'Antes', t: 'Alinhamento e bastidores', d: 'Roteiro do dia e momentos que não podem faltar, combinados com você.', img: I.casPreparo, alt: 'Noiva se arrumando' },
  { k: 'Durante', t: 'Stories em tempo real', d: 'Equipe registrando de ângulos diferentes, com tudo indo ao ar na hora.', img: I.pTr, v: V.tr, alt: 'Pessoa filmando o evento com o celular' },
  { k: 'Depois', t: 'Reels e fotos editados', d: 'Vídeos verticais com edição ágil e fotos para guardar e postar.', img: I.capDepois, alt: 'Edição de vídeo no notebook' }
];

export const TIPOS = ['Casamento', 'Chá revelação', '15 anos', 'Marca'];
export const FRASES = {
  'Casamento': 'cobertura de casamento',
  'Chá revelação': 'cobertura de chá revelação',
  '15 anos': 'cobertura de 15 anos',
  'Marca': 'conteúdo para marca'
};

// Agenda: dias já fechados e dias com última vaga, em AAAA-MM-DD. O resto fica livre.
// TODO: confirmar com o Kayo (datas reais; hoje são exemplos)
export const AGENDA = {
  fechadas: ['2026-11-07', '2026-11-14', '2026-11-20', '2026-12-05', '2026-12-12', '2026-12-19', '2027-01-09', '2027-01-23', '2027-02-13'],
  ultimaVaga: ['2026-11-21', '2026-12-26', '2027-01-16', '2027-02-06']
};

// Linha do tempo de um casamento: horário, momento e minutos até ir ao ar.
// TODO: confirmar com o Kayo (horários e tempos reais de postagem de um evento dele)
export const MOMENTOS = [
  { hora: '15:20', t: 'Os detalhes do vestido', min: 6, img: I.casVestido, alt: 'Vestido de noiva pendurado perto das flores' },
  { hora: '16:05', t: 'A noiva se arrumando', min: 4, img: I.casPreparo, alt: 'Noiva colocando os brincos' },
  { hora: '17:00', t: 'A entrada da noiva', min: 3, img: I.casNoiva, alt: 'Noiva pronta para a cerimônia' },
  { hora: '17:25', t: 'O sim no jardim', min: 2, img: I.pCas, v: V.cas, alt: 'Noivos se olhando no jardim' },
  { hora: '18:40', t: 'O ensaio com véu', min: 8, img: I.casVeu, alt: 'Casal abraçado sob o véu' },
  { hora: '20:30', t: 'A festa no ar', min: 1, img: I.pTr, v: V.tr, alt: 'Convidada filmando a festa com o celular' }
];

// Depoimentos em formato de DM: nomes, datas e mensagens são fictícios.
// TODO: confirmar com o Kayo (trocar por conversas reais, com autorização de quem aparece)
export const CONVERSAS = [
  { evento: 'Casamento', nomes: 'Ana e Bruno (exemplo)', iniciais: 'AB', data: 'data de exemplo', msgs: [
    { de: 'casal', txt: 'Kayo, acordamos e fomos direto ver os stories do casamento!' },
    { de: 'kayo', txt: 'Que bom! Foi um dia lindo de registrar.' },
    { de: 'casal', txt: 'Quem não pôde ir acompanhou tudo pelo celular, parecia que estava lá.' }
  ] },
  { evento: 'Chá revelação', nomes: 'Carla e Davi (exemplo)', iniciais: 'CD', data: 'data de exemplo', msgs: [
    { de: 'casal', txt: 'A família inteira viu a revelação na mesma hora que a gente!' },
    { de: 'kayo', txt: 'O grito de vocês foi o melhor take do dia.' },
    { de: 'casal', txt: 'Já salvamos tudo para mostrar quando o bebê crescer.' }
  ] },
  { evento: '15 anos', nomes: 'Elisa (exemplo)', iniciais: 'EL', data: 'data de exemplo', msgs: [
    { de: 'casal', txt: 'Minhas amigas repostaram os stories a noite inteira!' },
    { de: 'kayo', txt: 'Sua entrada ficou incrível.' },
    { de: 'casal', txt: 'Foi a festa que eu queria, e ainda ficou tudo guardado.' }
  ] }
];

// Perguntas frequentes sobre o trabalho de storymaker.
// TODO: confirmar com o Kayo (todas as respostas são rascunho)
export const FAQ = [
  { q: 'O que o storymaker entrega?', a: 'Stories e vídeos verticais do seu evento, gravados e publicados enquanto ele acontece.' },
  { q: 'Quando os stories são postados?', a: 'Durante o evento, poucos minutos depois de cada momento.' },
  { q: 'Posta no meu perfil ou no do Kayo?', a: 'Combinamos antes do evento em qual perfil os stories vão ao ar.' },
  { q: 'O que recebo depois da festa?', a: 'O material gravado para guardar e postar quando quiser. O formato e o prazo são combinados na contratação.' },
  { q: 'Qual equipamento é usado?', a: 'Celular, para o conteúdo ficar pronto na hora e no formato vertical dos stories.' },
  { q: 'Com quanta antecedência devo reservar?', a: 'Quanto antes melhor, porque cada data atende um evento. Chame no WhatsApp para ver se a sua está livre.' }
];
