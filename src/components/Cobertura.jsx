import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { CAPS, WHATSAPP_URL } from '../data.js';
import { useSincronizarMidia } from '../lib/hooks.js';
import Midia from './Midia.jsx';

const limita = (v) => Math.min(1, Math.max(0, v));

// COBERTURA: os três capítulos andam na horizontal conforme a rolagem desce,
// e as barrinhas de story no topo enchem junto. No celular e com movimento reduzido, viram uma coluna.
export default function Cobertura() {
  const sec = useRef(null);
  const trilho = useRef(null);
  const barras = useRef([]);
  useSincronizarMidia();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const s = sec.current;
      const t = trilho.current;
      const distancia = () => Math.max(0, t.scrollWidth - t.clientWidth);
      const altura = () => { s.style.height = (window.innerHeight + distancia()) + 'px'; };
      s.classList.add('anima');
      altura();
      ScrollTrigger.addEventListener('refreshInit', altura);
      const st = ScrollTrigger.create({
        trigger: s, start: 'top top', end: 'bottom bottom', invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(t, { x: -distancia() * p });
          barras.current.forEach((b, i) => { if (b) b.style.transform = `scaleX(${limita(p * CAPS.length - i)})`; });
        }
      });
      return () => {
        st.kill();
        ScrollTrigger.removeEventListener('refreshInit', altura);
        s.classList.remove('anima');
        s.style.height = '';
        gsap.set(t, { clearProps: 'transform' });
        barras.current.forEach((b) => { if (b) b.style.transform = ''; });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="cobertura" className="k-cob" ref={sec} style={{ scrollMarginTop: 88 }}>
      <div className="k-cobpin">
        <div className="k-wrap k-cobhead">
          <div>
            <h2 className="k-h2">Antes, durante e depois</h2>
            <p className="k-sub" style={{ marginTop: 12 }}>A festa passa, as memórias ficam. Role para acompanhar a cobertura.</p>
          </div>
          <div className="k-cobbars" aria-hidden="true">
            {CAPS.map((k, i) => (
              <span key={k.k} className="k-cobbar"><span className="k-sg"><i ref={(el) => { barras.current[i] = el; }} /></span>{k.k}</span>
            ))}
          </div>
        </div>
        <ol className="k-cobtrilho" ref={trilho}>
          {CAPS.map((k) => (
            <li key={k.k} className="k-cobp">
              <div className="k-cobmid"><Midia img={k.img} v={k.v} alt={k.alt} preload="none" loading="lazy" /></div>
              <div className="k-cobtx">
                <h3 className="k-cobk">{k.k}</h3>
                <p className="k-cobt">{k.t}</p>
                <p className="k-cobd">{k.d}</p>
              </div>
            </li>
          ))}
          <li className="k-cobfim">
            <p className="k-cobt">Quer isso no seu evento?</p>
            <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">Quero cobertura no meu evento</a>
          </li>
        </ol>
      </div>
    </section>
  );
}
