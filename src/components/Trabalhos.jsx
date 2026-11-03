import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { gsap, MQ_MOVIMENTO, ScrollTrigger } from '../lib/gsap.js';
import { CATS } from '../data.js';
import { useSincronizarMidia } from '../lib/hooks.js';
import { IconPlay } from './Icons.jsx';
import Midia from './Midia.jsx';

const FILTROS = [{ label: 'Todos', id: -1 }].concat(CATS.map((c, ci) => ({ label: c.label, id: ci })));
const SAIDA = [0.2, 0.8, 0.2, 1];

// em "Todos": 2 de cada categoria e 1 da última, 9 cards que fecham a grade sem buraco
function itensDoFeed(filtro) {
  const feed = [];
  CATS.forEach((c, ci) => {
    if (filtro !== -1 && filtro !== ci) return;
    const max = filtro !== -1 ? c.items.length : (ci === CATS.length - 1 ? 1 : 2);
    c.items.slice(0, max).forEach((it, ii) => {
      feed.push({ id: 'c' + ci + 'i' + ii, ci, ii, t: it.t, cat: c.label, img: it.img, v: it.v });
    });
  });
  return feed;
}

// TRABALHOS: feed com filtros por tipo (Motion: o destaque do filtro desliza e os cards se reorganizam)
export default function Trabalhos({ onAbrir }) {
  const [filtro, setFiltro] = useState(-1);
  useSincronizarMidia();

  // a altura do feed muda ao filtrar: as seções de scroll abaixo recalculam suas posições
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 650);
    return () => clearTimeout(id);
  }, [filtro]);

  // na primeira passagem, cada card abre como uma cortina de baixo para cima, em sequência.
  // Só clip-path e opacity: o transform fica livre para o Motion reorganizar o feed.
  const raiz = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      const cards = raiz.current.querySelectorAll('.k-card');
      gsap.set(cards, { clipPath: 'inset(22% 0% 0% 0%)', opacity: 0 });
      const sts = ScrollTrigger.batch(cards, {
        start: 'top 90%', once: true,
        onEnter: (lote) => gsap.to(lote, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, clearProps: 'clipPath' })
      });
      return () => { sts.forEach((s) => s.kill()); gsap.set(cards, { clearProps: 'clipPath,opacity' }); };
    });
    return () => mm.revert();
  }, []);

  const feed = itensDoFeed(filtro);

  return (
    <section id="trabalhos" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }} ref={raiz}>
      <div className="k-head">
        <h2 className="k-h2 k-rv">Um olhar para cada tipo de projeto</h2>
        <p className="k-sub k-rv" style={{ '--d': '.08s' }}>Filtre por tipo e toque num trabalho para assistir em tela cheia.</p>
      </div>
      <LayoutGroup>
        <div className="k-filters" role="group" aria-label="Filtrar trabalhos">
          {FILTROS.map((f) => (
            <button key={f.id} type="button" className={f.id === filtro ? 'k-fbtn on' : 'k-fbtn'} onClick={() => setFiltro(f.id)} aria-pressed={f.id === filtro}>
              {f.id === filtro && <motion.span layoutId="k-fpill" className="k-fpill" transition={{ duration: 0.35, ease: SAIDA }} />}
              <span className="k-fbtx">{f.label}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="k-feed" transition={{ duration: 0.5, ease: SAIDA }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {feed.map((t) => (
              <motion.button layout key={t.id} type="button" className="k-card" onClick={() => onAbrir(t.ci, t.ii)} aria-label={'Assistir ' + t.t}
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: SAIDA }}>
                <Midia img={t.img} v={t.v} preload="none" loading="lazy" />
                <span className="k-sb" />
                {t.v && <span className="k-play"><IconPlay /></span>}
                <span className="k-ci"><span className="k-tag">{t.cat}</span><h3>{t.t}</h3></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
