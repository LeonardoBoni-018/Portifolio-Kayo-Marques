import { useEffect, useRef } from 'react';
import { RASTRO } from '../data/conteudo.js';

const PASSO = 80;
const MAX_ATIVAS = 14;

// RASTRO DE FOTOS: ao mover o mouse mais de 80px pela faixa, nasce uma miniatura ali, que entra,
// gira um pouco e some; é removida no animationend. Em tela de toque ou com movimento reduzido
// fica uma fileira fixa de fotos (o CSS troca uma pela outra).
export default function RastroFotos() {
  const camada = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return undefined;
    RASTRO.forEach((src) => { new Image().src = src; });

    const el = camada.current;
    let ultimo = null;
    let i = 0;
    const mover = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (ultimo && Math.hypot(x - ultimo.x, y - ultimo.y) < PASSO) return;
      ultimo = { x, y };
      if (el.childElementCount >= MAX_ATIVAS) return;
      const img = document.createElement('img');
      img.src = RASTRO[i++ % RASTRO.length];
      img.alt = '';
      img.className = 'k-rastrofoto';
      img.style.left = x + 'px';
      img.style.top = y + 'px';
      img.style.setProperty('--r', (Math.random() * 16 - 8).toFixed(1) + 'deg');
      img.addEventListener('animationend', () => img.remove());
      el.appendChild(img);
    };
    const sair = () => { ultimo = null; };
    const faixa = el.parentElement;
    faixa.addEventListener('pointermove', mover);
    faixa.addEventListener('pointerleave', sair);
    return () => {
      faixa.removeEventListener('pointermove', mover);
      faixa.removeEventListener('pointerleave', sair);
      el.replaceChildren();
    };
  }, []);

  return (
    <section className="k-rastro" aria-label="Fotos de eventos">
      <div className="k-rastrocam" ref={camada} aria-hidden="true" />
      <p className="k-rastrotx">Cada evento deixa um rastro</p>
      <div className="k-rastrofixo" aria-hidden="true">
        {RASTRO.slice(0, 5).map((src, i) => <img key={src} src={src} alt="" loading="lazy" style={{ '--r': (i % 2 ? 4 : -5) + 'deg' }} />)}
      </div>
    </section>
  );
}
