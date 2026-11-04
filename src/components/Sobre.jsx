import { useEffect, useRef } from 'react';
import { gsap, MQ_MOVIMENTO } from '../lib/gsap.js';
import { I, INSTAGRAM_URL, WHATSAPP_URL } from '../data/conteudo.js';
import { Selo } from './Logo.jsx';
import { IconInsta } from './Icons.jsx';

const FAZ = [
  { t: 'Vídeo', d: 'Reels e filmes verticais com edição ágil.' },
  { t: 'Foto', d: 'Eventos e marcas com luz natural.' },
  { t: 'Tempo real', d: 'Stories no ar enquanto a festa acontece.' }
];

// SOBRE: um mosaico em que cada bloco carrega um fato (retrato, apresentação, seguidores,
// bastidores e o que ele faz), sem área vazia. Inspirado nos mosaicos de portfólio de
// fotógrafos no Awwwards. Movimento leve: os blocos entram em sequência (a revelação da
// página), o retrato se afasta devagar ao rolar e o número de seguidores conta uma vez.
export default function Sobre() {
  const raiz = useRef(null);
  const num = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      const q = gsap.utils.selector(raiz.current);
      gsap.fromTo(q('.k-bretrato img'), { scale: 1.14 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: raiz.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      const n = { v: 0 };
      gsap.to(n, {
        v: 11, duration: 1.4, ease: 'power2.out',
        onUpdate: () => { if (num.current) num.current.textContent = Math.round(n.v); },
        scrollTrigger: { trigger: num.current, start: 'top 85%', once: true }
      });
      return () => { if (num.current) num.current.textContent = '11'; };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="sobre" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }} ref={raiz}>
      <div className="k-bento">
        <figure className="k-bc k-bretrato k-rv">
          <img src={I.retrato} alt="Kayo Marques" loading="lazy" />
          <span className="k-sb" />
          <figcaption className="k-rcap">
            <Selo size={44} className="k-rselo" />
            <span><b>Kayo Marques</b><small>Videomaker, fotógrafo e storymaker</small></span>
          </figcaption>
        </figure>

        <div className="k-bc k-bola k-rv" style={{ '--d': '.08s' }}>
          <h2 className="k-h2">Olá, eu sou o Kayo.</h2>
          <p>Registro casamentos, chás revelação, 15 anos e marcas em vídeo e foto, e coloco tudo no ar enquanto o evento acontece.</p>
          <a className="k-perfil" href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram @kayomaarques, 11 mil seguidores">
            <Selo size={44} className="k-perfilselo" />
            <span className="k-perfiltx">
              <b>@kayomaarques</b>
              <small><span ref={num}>11</span> mil seguidores no Instagram</small>
            </span>
            <IconInsta />
          </a>
        </div>

        <figure className="k-bc k-bbast k-rv" style={{ '--d': '.24s' }}>
          <img src={I.capDurante} alt="Equipe registrando um evento" loading="lazy" />
          <span className="k-sb" />
          <figcaption>Equipe de até 3 pessoas, registrando de vários ângulos.</figcaption>
        </figure>

        <div className="k-bc k-bfaz k-rv" style={{ '--d': '.32s' }}>
          <ul>
            {FAZ.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}
          </ul>
          <a className="k-btn k-bfazbtn" href={WHATSAPP_URL} target="_blank" rel="noopener">Bora criar?</a>
        </div>
      </div>
    </section>
  );
}
