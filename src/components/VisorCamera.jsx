import { useEffect, useRef, useState } from 'react';

const relogio = (s) => '00:00:' + String(s % 60).padStart(2, '0');

// Visor de câmera sobre um card do feed: quatro cantos que fecham em direção à borda,
// ponto vermelho e timecode correndo só enquanto o card está em hover ou foco.
// Em telas de toque, liga no card que estiver no centro da tela.
export default function VisorCamera() {
  const raiz = useRef(null);
  const [on, setOn] = useState(false);
  const [seg, setSeg] = useState(0);

  useEffect(() => {
    const card = raiz.current.closest('.k-card');
    const liga = () => setOn(true);
    const desliga = () => setOn(false);
    const foco = () => { if (card.matches(':focus-visible')) setOn(true); };

    if (window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '-45% 0px -45% 0px' });
      io.observe(card);
      return () => io.disconnect();
    }
    card.addEventListener('mouseenter', liga);
    card.addEventListener('mouseleave', desliga);
    card.addEventListener('focus', foco);
    card.addEventListener('blur', desliga);
    return () => {
      card.removeEventListener('mouseenter', liga);
      card.removeEventListener('mouseleave', desliga);
      card.removeEventListener('focus', foco);
      card.removeEventListener('blur', desliga);
    };
  }, []);

  useEffect(() => {
    setSeg(0);
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [on]);

  return (
    <span ref={raiz} className={on ? 'k-visor on' : 'k-visor'} aria-hidden="true">
      <i className="k-vc a" /><i className="k-vc b" /><i className="k-vc c" /><i className="k-vc d" />
      <span className="k-rec"><i />REC {relogio(seg)}</span>
    </span>
  );
}
