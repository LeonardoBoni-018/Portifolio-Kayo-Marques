import { useEffect, useRef, useState } from 'react';
import { RASTRO } from '../data/conteudo.js';

const PASSO = 80;
const MAX_ATIVAS = 14;

// RASTRO DE FOTOS: um leque de fotos sempre à mostra. Mover o ponteiro mais de 80px pela área faz
// nascer uma miniatura ali, que entra, gira um pouco e some (removida no animationend). No celular,
// tocar ou deslizar para os lados faz o mesmo, e deslizar na vertical continua rolando a página
// (touch-action: pan-y). A dica explica o gesto e sai no primeiro uso. Com movimento reduzido, fica só o leque.
export default function RastroFotos() {
  const camada = useRef(null);
  const [usou, setUsou] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    RASTRO.forEach((src) => { new Image().src = src; });

    const el = camada.current;
    let ultimo = null;
    let i = 0;
    const criar = (x, y) => {
      if (el.childElementCount >= MAX_ATIVAS) return;
      setUsou(true);
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
    const ponto = (e) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const mover = (e) => {
      const p = ponto(e);
      if (!ultimo) { ultimo = p; return; }
      if (Math.hypot(p.x - ultimo.x, p.y - ultimo.y) < PASSO) return;
      ultimo = p;
      criar(p.x, p.y);
    };
    const tocar = (e) => {
      if (e.pointerType === 'mouse') return;
      const p = ponto(e);
      ultimo = p;
      criar(p.x, p.y);
    };
    const sair = () => { ultimo = null; };
    const faixa = el.parentElement;
    faixa.addEventListener('pointerdown', tocar);
    faixa.addEventListener('pointermove', mover);
    faixa.addEventListener('pointerleave', sair);
    faixa.addEventListener('pointercancel', sair);
    return () => {
      faixa.removeEventListener('pointerdown', tocar);
      faixa.removeEventListener('pointermove', mover);
      faixa.removeEventListener('pointerleave', sair);
      faixa.removeEventListener('pointercancel', sair);
      el.replaceChildren();
    };
  }, []);

  return (
    <section className="k-rastro" aria-label="Fotos de eventos">
      <div className="k-rastrocam" ref={camada} aria-hidden="true" />
      <div className="k-rastrofixo" aria-hidden="true">
        {RASTRO.slice(0, 5).map((src, i) => <img key={src} src={src} alt="" loading="lazy" style={{ '--r': (i - 2) * 5 + 'deg', '--y': Math.abs(i - 2) * 8 + 'px' }} />)}
      </div>
      <p className="k-rastrotx">Um rastro de momentos</p>
      <p className={usou ? 'k-rastrodica usou' : 'k-rastrodica'} aria-hidden="true">
        <span className="k-dicamouse">Passe o mouse por aqui para espalhar as fotos</span>
        <span className="k-dicatoque">Toque ou deslize o dedo para os lados para espalhar as fotos</span>
      </p>
    </section>
  );
}
