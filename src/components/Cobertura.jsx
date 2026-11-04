import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { CAPS, WHATSAPP_URL } from '../data/conteudo.js';
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
    // no celular o trilho vira coluna: cada capítulo ganha a foto se aproximando devagar
    // conforme a rolagem e o texto subindo uma vez ao aparecer
    mm.add('(max-width: 760px) and (prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(sec.current);
      const sts = [];
      q('.k-cobp').forEach((p) => {
        const midia = p.querySelector('.k-cobmid img, .k-cobmid video');
        if (midia) {
          sts.push(gsap.fromTo(midia, { scale: 1.16 }, {
            scale: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'center center', scrub: 0.6 }
          }));
        }
        sts.push(gsap.fromTo(p.querySelector('.k-cobtx'), { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: p.querySelector('.k-cobtx'), start: 'top 88%', once: true }
        }));
      });
      return () => sts.forEach((t) => { t.scrollTrigger && t.scrollTrigger.kill(); });
    });
    return () => mm.revert();
  }, []);

  // preto e branco que ganha cor: a mídia colore ao chegar à faixa central da tela.
  // Horizontal no trilho do desktop, vertical na coluna do celular. Com movimento reduzido fica em cores.
  useEffect(() => {
    const mm = gsap.matchMedia();
    const marcar = (rootMargin) => {
      const s = sec.current;
      s.classList.add('pb');
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => e.target.classList.toggle('cor', e.isIntersecting));
      }, { rootMargin });
      s.querySelectorAll('.k-cobp').forEach((p) => io.observe(p));
      return () => {
        io.disconnect();
        s.classList.remove('pb');
        s.querySelectorAll('.k-cobp').forEach((p) => p.classList.remove('cor'));
      };
    };
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => marcar('0px -38% 0px -38%'));
    mm.add('(max-width: 760px) and (prefers-reduced-motion: no-preference)', () => marcar('-38% 0px -38% 0px'));
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
