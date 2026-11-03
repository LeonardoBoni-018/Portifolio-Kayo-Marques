import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, Flip } from '../lib/gsap.js';
import { CATS } from '../data.js';
import { useSincronizarMidia } from '../lib/hooks.js';
import { reduzMovimento } from '../lib/media.js';
import { IconPlay } from './Icons.jsx';
import Midia from './Midia.jsx';

const FILTROS = [{ label: 'Todos', id: -1 }].concat(CATS.slice(0, 4).map((c, ci) => ({ label: c.label, id: ci })));

export default function Destaques({ onAbrir }) {
  const [filtro, setFiltro] = useState(-1);
  const flipRef = useRef(null);
  useSincronizarMidia();

  const filtrar = (id) => {
    if (id === filtro) return;
    try { if (!reduzMovimento()) flipRef.current = Flip.getState('.k-card'); } catch (e) { /* ignora */ }
    setFiltro(id);
  };

  // GSAP Flip: os cards do feed deslizam para a nova posição ao filtrar
  useLayoutEffect(() => {
    const st = flipRef.current;
    if (!st) return;
    flipRef.current = null;
    try {
      Flip.from(st, { targets: '.k-card', duration: 0.6, ease: 'power2.inOut', absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45 }) });
    } catch (e) { /* ignora */ }
  }, [filtro]);

  const feed = [];
  CATS.slice(0, 4).forEach((c, ci) => {
    if (filtro !== -1 && filtro !== ci) return;
    c.items.forEach((it, ii) => {
      if (filtro === -1 && ii > 1) return;
      feed.push({ id: 'c' + ci + 'i' + ii, ci, ii, t: it.t, cat: c.label, img: it.img, v: it.v });
    });
  });

  return (
    <section id="destaques" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-head">
        <h2 className="k-h2 k-rv">Um story para cada tipo de projeto</h2>
        <p className="k-sub k-rv" style={{ '--d': '.08s' }}>Toque num círculo para assistir em tela cheia.</p>
      </div>
      <div className="k-hls k-rv" style={{ '--d': '.12s' }}>
        {CATS.map((c, ci) => (
          <button key={c.label} type="button" className="k-hl" onClick={() => onAbrir(ci, 0)} aria-label={'Assistir destaque ' + c.label}>
            <span className="k-ring"><img src={c.cover} alt="" /></span>
            <b>{c.label}</b>
            <small>{c.items.length} stories</small>
          </button>
        ))}
      </div>
      <div className="k-filters" role="group" aria-label="Filtrar trabalhos">
        {FILTROS.map((f) => (
          <button key={f.id} type="button" className={f.id === filtro ? 'k-fbtn on' : 'k-fbtn'} onClick={() => filtrar(f.id)} aria-pressed={f.id === filtro}>{f.label}</button>
        ))}
      </div>
      <div className="k-feed">
        {feed.map((t) => (
          <button key={t.id} type="button" className="k-card" data-flip-id={t.id} onClick={() => onAbrir(t.ci, t.ii)} aria-label={'Assistir ' + t.t}>
            <Midia img={t.img} v={t.v} preload="none" loading="lazy" />
            <span className="k-sb" />
            {t.v && <span className="k-play"><IconPlay /></span>}
            <span className="k-ci"><span className="k-tag">{t.cat}</span><h3>{t.t}</h3></span>
          </button>
        ))}
      </div>
    </section>
  );
}
