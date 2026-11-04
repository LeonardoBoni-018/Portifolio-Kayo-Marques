// Conteúdo do site. As fotos e vídeos ficam em public/media/ e ainda são de exemplo
// (Unsplash e Pexels): para trocar pelas do Kayo, substitua os arquivos mantendo os nomes,
// ou edite os caminhos abaixo.

const base = import.meta.env.BASE_URL;
const foto = (nome) => `${base}media/fotos/${nome}.webp`;
const video = (nome) => `${base}media/videos/${nome}.mp4`;

export const WHATSAPP = '5518996018339';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;
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
export const CATS = [
  { label: 'Casamentos', cover: I.casVeu, items: [
    { t: 'O sim no jardim', tipo: 'Reel', img: I.pCas, v: V.cas },
    { t: 'Ensaio com véu', tipo: 'Fotos', img: I.casVeu },
    { t: 'Making of da noiva', tipo: 'Bastidores', img: I.casPreparo },
    { t: 'Detalhes do grande dia', tipo: 'Fotos', img: I.casVestido } ] },
  { label: 'Festas', cover: I.fesBaloes, items: [
    { t: 'Aniversário em tempo real', tipo: 'Tempo real', img: I.pFes, v: V.fes },
    { t: 'Hora do parabéns', tipo: 'Stories', img: I.fesBolo },
    { t: 'Festa infantil', tipo: 'Fotos', img: I.fesBaloes },
    { t: 'Decoração e diversão', tipo: 'Reel', img: I.fesCores } ] },
  { label: 'Ensaios', cover: I.ensGestCasal, items: [
    { t: 'Ensaio gestante', tipo: 'Fotos', img: I.ensGestCasal },
    { t: 'Família no pôr do sol', tipo: 'Fotos', img: I.ensFam },
    { t: 'Casal e pet', tipo: 'Fotos', img: I.ensPet },
    { t: 'Gestante em estúdio', tipo: 'Fotos', img: I.ensGest } ] },
  { label: 'Marcas', cover: I.marRest, items: [
    { t: 'Restaurante', tipo: 'Reel', img: I.marRest },
    { t: 'Gastronomia', tipo: 'Fotos', img: I.marPrato },
    { t: 'Salão de beleza', tipo: 'Bastidores', img: I.marSalao },
    { t: 'Estúdio de beleza', tipo: 'Fotos', img: I.marBeleza } ] },
  { label: 'Tempo real', cover: I.fesFilmando, items: [
    { t: 'Stories no ar', tipo: 'Tempo real', img: I.pTr, v: V.tr },
    { t: 'Vários olhares', tipo: 'Bastidores', img: I.fesFilmando },
    { t: 'Do celular para o feed', tipo: 'Bastidores', img: I.capDurante } ] }
];

// story do topo: c = categoria, i = item dentro dela
export const HERO = [
  { c: 4, i: 0, tag: 'Tempo real', d: 'Stories no ar enquanto a festa acontece.' },
  { c: 0, i: 0, tag: 'Casamento', d: 'Cada momento vira conteúdo na hora.' },
  { c: 1, i: 0, tag: 'Festa', d: 'Equipe de até 3 pessoas, de vários ângulos.' },
  { c: 2, i: 0, tag: 'Ensaio', d: 'Luz natural e muito afeto.' },
  { c: 3, i: 0, tag: 'Marca', d: 'Reels para aparecer bem no Instagram.' }
];

export const CAPS = [
  { k: 'Antes', t: 'Alinhamento e bastidores', d: 'Roteiro do dia e momentos que não podem faltar, combinados com você.', img: I.casPreparo, alt: 'Noiva se arrumando' },
  { k: 'Durante', t: 'Stories em tempo real', d: 'Equipe registrando de ângulos diferentes, com tudo indo ao ar na hora.', img: I.pTr, v: V.tr, alt: 'Pessoa filmando o evento com o celular' },
  { k: 'Depois', t: 'Reels e fotos editados', d: 'Vídeos verticais com edição ágil e fotos para guardar e postar.', img: I.capDepois, alt: 'Edição de vídeo no notebook' }
];

export const TIPOS = ['Casamento', 'Festa ou evento', 'Ensaio', 'Marca ou conteúdo'];
export const FRASES = {
  'Casamento': 'cobertura de casamento',
  'Festa ou evento': 'cobertura de festa ou evento',
  'Ensaio': 'ensaio fotográfico',
  'Marca ou conteúdo': 'conteúdo para marca'
};
