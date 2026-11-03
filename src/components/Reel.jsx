import { useEffect, useRef } from 'react';
import { gsap, MQ_MOVIMENTO, ScrollTrigger } from '../lib/gsap.js';
import { I, V } from '../data.js';

const suave = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const limita = (v) => Math.min(1, Math.max(0, v));

// REEL: o vídeo vertical começa pequeno e curvo, entre as duas metades do título,
// e conforme a rolagem se endireita e cresce até ocupar a altura da tela (Three.js).
// Sem WebGL ou com movimento reduzido, fica o <video> no tamanho final, sem efeito.
export default function Reel({ onAbrir }) {
  const sec = useRef(null);
  const palco = useRef(null);
  const video = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      const s = sec.current;
      let gl = null;
      let raf = 0;
      let visivel = false;
      let p = 0;

      const tamanhos = () => {
        const vh = palco.current.clientHeight;
        const celular = window.innerWidth < 761;
        const h1 = vh * (celular ? 0.9 : 0.86);
        const h0 = h1 * 0.46;
        return { h0, h1 };
      };

      const desenhar = () => {
        const e = suave(limita(p / 0.72));
        const { h0, h1 } = tamanhos();
        const altura = h0 + (h1 - h0) * e;
        const largura = altura * 9 / 16;
        s.style.setProperty('--meia', (largura / 2 + 28).toFixed(1) + 'px');
        s.style.setProperty('--fim', limita((p - 0.74) / 0.18).toFixed(3));
        if (gl) gl.quadro(e, largura, altura);
        else video.current.style.transform = `scale(${(altura / h1).toFixed(4)})`;
      };

      const loop = () => {
        desenhar();
        if (visivel) raf = requestAnimationFrame(loop);
      };

      import('../lib/reelGL.js').then(({ criarReelGL }) => {
        if (!sec.current) return;
        try {
          gl = criarReelGL(canvas.current, video.current);
          s.classList.add('gl');
          desenhar();
        } catch (e) { gl = null; }
      }).catch(() => { /* fica o <video> */ });

      s.classList.add('anima');
      const st = ScrollTrigger.create({
        trigger: s, start: 'top top', end: 'bottom bottom',
        onUpdate: (self) => { p = self.progress; if (!visivel) desenhar(); },
        onRefresh: () => { if (gl) gl.medir(); desenhar(); }
      });
      const io = new IntersectionObserver(([en]) => {
        visivel = en.isIntersecting;
        cancelAnimationFrame(raf);
        if (visivel) raf = requestAnimationFrame(loop);
      });
      io.observe(s);

      return () => {
        st.kill(); io.disconnect(); cancelAnimationFrame(raf);
        if (gl) gl.destruir();
        s.classList.remove('anima', 'gl');
        s.style.removeProperty('--meia'); s.style.removeProperty('--fim');
        if (video.current) video.current.style.transform = '';
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="k-reel" ref={sec} aria-labelledby="k-reelh">
      <div className="k-reelpin">
        <h2 className="k-reelh" id="k-reelh">
          <span className="k-reell">Cada festa</span>
          <span className="k-reelr">vira um filme</span>
        </h2>
        <div className="k-reelpalco" ref={palco}>
          <video ref={video} className="k-v k-reelvid" src={V.cas} poster={I.pCas} muted loop playsInline preload="metadata" />
          <canvas ref={canvas} className="k-reelcv" aria-hidden="true" />
        </div>
        <div className="k-reelcap">
          <span className="k-tag">Casamento</span>
          <p>O sim no jardim, em vídeo vertical para os stories.</p>
          <button type="button" className="k-btn k-btn-out" onClick={() => onAbrir(0, 0)}>Assistir o destaque</button>
        </div>
      </div>
    </section>
  );
}
