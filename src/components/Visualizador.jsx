import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { waTexto } from '../data/conteudo.js';
import { segs, useSincronizarMidia } from '../lib/hooks.js';
import { IconDir, IconEsq, IconFechar } from './Icons.jsx';
import Midia from './Midia.jsx';
import { Selo } from './Logo.jsx';

const SWIPE_MIN = 70;

// VISUALIZADOR EM TELA CHEIA: os stories de um destaque, um atrás do outro.
// Toque à esquerda ou à direita navega; Esc ou swipe para baixo fecha; o foco fica preso aqui
// enquanto está aberto e volta para onde estava ao fechar.
export default function Visualizador({ lista, v, vi, vt, onPrev, onNext, onFechar }) {
  useSincronizarMidia();
  const vc = lista[v];
  const raiz = useRef(null);
  const fechar = useRef(null);
  const toque = useRef(null);
  const acoes = useRef({});
  acoes.current = { onPrev, onNext, onFechar };

  useEffect(() => {
    const antes = document.activeElement;
    fechar.current.focus({ preventScroll: true });
    const tecla = (e) => {
      if (e.key === 'Escape') acoes.current.onFechar();
      else if (e.key === 'ArrowLeft') acoes.current.onPrev();
      else if (e.key === 'ArrowRight') acoes.current.onNext();
      else if (e.key === 'Tab') {
        const itens = [...raiz.current.querySelectorAll('button, a[href]')].filter((el) => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden');
        const primeiro = itens[0];
        const ultimo = itens[itens.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
      }
    };
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('keydown', tecla);
      if (antes && antes.focus) antes.focus({ preventScroll: true });
    };
  }, []);

  const inicioToque = (e) => {
    const t = e.touches[0];
    toque.current = { x: t.clientX, y: t.clientY };
  };
  const fimToque = (e) => {
    if (!toque.current) return;
    const t = e.changedTouches[0];
    const dy = t.clientY - toque.current.y;
    const dx = Math.abs(t.clientX - toque.current.x);
    toque.current = null;
    if (dy > SWIPE_MIN && dy > dx) onFechar();
  };

  return (
    <motion.div ref={raiz} className="k-vw" role="dialog" aria-modal="true" aria-label={'Destaque ' + vc.label}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <button type="button" className="k-varr" onClick={onPrev} aria-label="Anterior"><IconEsq size={20} w={2} /></button>
      <motion.div className="k-story k-vs" style={{ '--dur': '5s' }} onTouchStart={inicioToque} onTouchEnd={fimToque}
        initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}>
        {vc.items.map((it, i) => (
          <div key={v + '-' + i} className={i === vi ? 'k-sl on' : 'k-sl'}>
            <Midia img={it.img} v={it.v} alt={it.t} />
          </div>
        ))}
        <div className="k-st" />
        <div className="k-sb" />
        <div className="k-bars">{segs(vc.items.length, vi, vt).map((c, i) => <span key={i} className={c}><i /></span>)}</div>
        <div className="k-meta">
          <span className="k-av"><Selo size={32} /></span><span>{vc.label}</span><small>{vi + 1} de {vc.items.length}</small>
          <button ref={fechar} type="button" className="k-vx" onClick={onFechar} aria-label="Fechar"><IconFechar /></button>
        </div>
        <button type="button" className="k-tz l" onClick={onPrev} aria-label="Story anterior"><span className="k-arr"><IconEsq /></span></button>
        <button type="button" className="k-tz r" onClick={onNext} aria-label="Próximo story"><span className="k-arr"><IconDir /></span></button>
        <div className="k-caps">
          {vc.items.map((it, i) => (
            <div key={v + '-' + i} className={i === vi ? 'k-cp on' : 'k-cp'}>
              <span className="k-tag">{it.tipo}</span>
              <p className="k-ct">{it.t}</p>
              <div className="k-cact">
                <a className="k-cbtn" href={waTexto('Oi, Kayo! Vi o destaque ' + vc.label + ' ("' + it.t + '") no seu site e quero algo assim.')} target="_blank" rel="noopener">Quero algo assim</a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <button type="button" className="k-varr" onClick={onNext} aria-label="Próximo"><IconDir size={20} w={2} /></button>
    </motion.div>
  );
}
