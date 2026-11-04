import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { CATS, DESTAQUES, INSTAGRAM_URL, TELEFONE, WHATSAPP_URL } from './data/conteudo.js';
import { iniciarMidia, pararMidia } from './lib/media.js';
import { ScrollTrigger } from './lib/gsap.js';
import Abertura, { deveAbrir } from './components/Abertura.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import LinhaTempo from './components/LinhaTempo.jsx';
import Sobre from './components/Sobre.jsx';
import Depoimentos from './components/Depoimentos.jsx';
import Faq from './components/Faq.jsx';
import SeloConstrucao from './components/SeloConstrucao.jsx';
import Trabalhos from './components/Trabalhos.jsx';
import Cobertura from './components/Cobertura.jsx';
import Contato from './components/Contato.jsx';
import Visualizador from './components/Visualizador.jsx';
import { IconWhats } from './components/Icons.jsx';

const CHAVE_TEMA = 'kayo-tema-v2';
const CHAVE_VISTOS = 'kayo-destaques-vistos';
const LISTAS = { feed: CATS, destaques: DESTAQUES };

function temaSalvo() {
  try { return localStorage.getItem(CHAVE_TEMA) === 'escuro' ? 'escuro' : 'claro'; } catch (e) { return 'claro'; }
}

function vistosSalvos() {
  try { return JSON.parse(localStorage.getItem(CHAVE_VISTOS)) || []; } catch (e) { return []; }
}

// próximo story do visualizador: acaba a categoria, passa para a seguinte; acaba tudo, fecha
function avanca(s) {
  if (s.v < 0) return s;
  const lista = LISTAS[s.lista];
  if (s.vi + 1 < lista[s.v].items.length) return { ...s, vi: s.vi + 1, vt: s.vt + 1 };
  if (s.v + 1 < lista.length) return { ...s, v: s.v + 1, vi: 0, vt: s.vt + 1 };
  return { ...s, v: -1 };
}

function volta(s) {
  if (s.v < 0) return s;
  if (s.vi > 0) return { ...s, vi: s.vi - 1, vt: s.vt + 1 };
  if (s.v > 0) return { ...s, v: s.v - 1, vi: LISTAS[s.lista][s.v - 1].items.length - 1, vt: s.vt + 1 };
  return { ...s, vt: s.vt + 1 };
}

export default function App() {
  const [tema, setTema] = useState(temaSalvo);
  const [io, setIo] = useState(false);
  const [menu, setMenu] = useState(false);
  const [vis, setVis] = useState({ lista: 'feed', v: -1, vi: 0, vt: 0 });
  const [vistos, setVistos] = useState(vistosSalvos);
  const [vEpoca, setVEpoca] = useState(0);
  const [abrindo, setAbrindo] = useState(deveAbrir);
  const fimAbertura = useCallback(() => setAbrindo(false), []);

  // fotos e fontes mudam a altura das seções: as posições do scroll são recalculadas no fim do carregamento
  useEffect(() => {
    const refaz = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') refaz(); else window.addEventListener('load', refaz);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refaz);
    return () => window.removeEventListener('load', refaz);
  }, []);
  const escuro = tema === 'escuro';
  const vAberto = vis.v >= 0;

  useEffect(() => {
    setIo(iniciarMidia());
    return pararMidia;
  }, []);

  // o visualizador avança sozinho a cada 5s; navegar à mão reinicia o relógio
  useEffect(() => {
    if (!vAberto) return undefined;
    const id = setInterval(() => setVis(avanca), 5000);
    return () => clearInterval(id);
  }, [vAberto, vEpoca]);

  // o anel do destaque fica cinza assim que ele é aberto, e continua assim nas próximas visitas
  useEffect(() => {
    if (vis.lista !== 'destaques' || vis.v < 0) return;
    const label = DESTAQUES[vis.v].label;
    setVistos((atual) => {
      if (atual.includes(label)) return atual;
      const novo = [...atual, label];
      try { localStorage.setItem(CHAVE_VISTOS, JSON.stringify(novo)); } catch (e) { /* ignora */ }
      return novo;
    });
  }, [vis.lista, vis.v]);

  const toggleTema = () => {
    const novo = escuro ? 'claro' : 'escuro';
    setTema(novo);
    try { localStorage.setItem(CHAVE_TEMA, novo); } catch (e) { /* ignora */ }
  };

  const abrirV = useCallback((c, i, lista = 'feed') => {
    setVis((s) => ({ lista, v: c, vi: i, vt: s.vt + 1 }));
    setVEpoca((e) => e + 1);
    setMenu(false);
  }, []);
  const abrirDestaque = useCallback((i) => abrirV(i, 0, 'destaques'), [abrirV]);
  const vNext = () => { setVis(avanca); setVEpoca((e) => e + 1); };
  const vPrev = () => { setVis(volta); setVEpoca((e) => e + 1); };
  const fecharV = () => setVis((s) => ({ ...s, v: -1 }));

  return (
    <MotionConfig reducedMotion="user">
    <div className={'k-app ' + (escuro ? 'dark' : '') + (io ? ' io' : '') + (abrindo ? ' espera' : '')} id="topo">
      <AnimatePresence>{abrindo && <Abertura key="abertura" onFim={fimAbertura} />}</AnimatePresence>

      <Nav escuro={escuro} onTema={toggleTema} menu={menu} onMenu={() => setMenu((m) => !m)} onFechaMenu={() => setMenu(false)} />

      <main>
        <Hero pausado={vAberto || abrindo} onAbrir={abrirV} />
        <LinhaTempo />
        <Sobre />
        <Trabalhos onAbrir={abrirV} vistos={vistos} onAbrirDestaque={abrirDestaque} />
        <Cobertura />
        <Depoimentos />
        <Faq />
        <Contato />
      </main>

      <footer className="k-wrap k-foot">
        <SeloConstrucao />
        <p className="k-mast"><span className="k-mastin">kayo marques</span></p>
        <div className="k-frow">
          <span>Videomaker, fotógrafo e storymaker</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">11 mil seguidores no Instagram</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">{TELEFONE}</a>
        </div>
        <p className="k-frow" style={{ marginTop: 16, fontSize: 13 }}>Protótipo. Fotos e vídeos de exemplo (Unsplash e Pexels), no lugar das fotos reais do Kayo.</p>
      </footer>

      {/* BARRA FIXA (celular) */}
      <div className="k-dock">
        <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener"><IconWhats />WhatsApp</a>
        <a className="k-btn k-btn-out" href="#trabalhos">Trabalhos</a>
      </div>

      <AnimatePresence>
        {vAberto && <Visualizador key="visualizador" lista={LISTAS[vis.lista]} v={vis.v} vi={vis.vi} vt={vis.vt} onPrev={vPrev} onNext={vNext} onFechar={fecharV} />}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
