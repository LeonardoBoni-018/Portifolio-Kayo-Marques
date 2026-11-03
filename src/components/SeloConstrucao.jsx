import { useEffect, useRef } from 'react';
import { gsap, MQ_MOVIMENTO } from '../lib/gsap.js';

// O selo desenhado a partir das suas linhas de construção, conforme o rodapé entra na tela.
// Sem script ou com movimento reduzido, aparece pronto, com as guias apagadas.
export default function SeloConstrucao() {
  const svg = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      const q = gsap.utils.selector(svg.current);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: svg.current, start: 'top 92%', end: 'top 40%', scrub: 0.6 }
      });
      tl.fromTo(q('.k-gd'), { strokeDashoffset: 1, opacity: 0.9 }, { strokeDashoffset: 0, stagger: 0.06, duration: 0.5 })
        .fromTo(q('.k-gc'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5 }, 0.15)
        .fromTo(q('.k-anel'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5 }, 0.45)
        .fromTo(q('.k-barra'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.25 }, 0.7)
        .fromTo(q('.k-letra'), { opacity: 0, y: 3 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.25 }, 0.8)
        .to(q('.k-gd, .k-gc'), { opacity: 0.3, duration: 0.3 }, 1);
      // o "kayo marques" grande sobe de dentro da sua linha logo depois do selo
      const mast = document.querySelector('.k-mastin');
      const tm = mast && gsap.fromTo(mast, { yPercent: 105 }, {
        yPercent: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: mast.parentElement, start: 'top 95%', once: true }
      });
      return () => { tl.scrollTrigger && tl.scrollTrigger.kill(); if (tm) tm.scrollTrigger && tm.scrollTrigger.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <svg ref={svg} className="k-construcao" viewBox="-96 -14 256 92" role="img" aria-label="Logo Kayo Marques">
      <g className="k-guias">
        <line className="k-gd" pathLength="1" x1="-96" y1="20" x2="160" y2="20" />
        <line className="k-gd" pathLength="1" x1="-96" y1="40.5" x2="160" y2="40.5" />
        <line className="k-gd" pathLength="1" x1="-96" y1="32" x2="160" y2="32" />
        <line className="k-gd" pathLength="1" x1="32" y1="-14" x2="32" y2="78" />
        <line className="k-gd" pathLength="1" x1="9" y1="-14" x2="55" y2="78" />
        <line className="k-gd" pathLength="1" x1="55" y1="-14" x2="9" y2="78" />
        <circle className="k-gc" pathLength="1" cx="32" cy="32" r="38" />
        <circle className="k-gc" pathLength="1" cx="32" cy="32" r="20" />
      </g>
      <circle className="k-anel" pathLength="1" cx="32" cy="32" r="29.5" transform="rotate(-90 32 32)" />
      <line className="k-barra" pathLength="1" x1="32" y1="20" x2="32" y2="44" />
      <text className="k-letra" x="20.5" y="40.5" textAnchor="middle">k</text>
      <text className="k-letra" x="44.5" y="40.5" textAnchor="middle">m</text>
    </svg>
  );
}
