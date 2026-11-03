import { useEffect, useRef } from 'react';
import { gsap, MQ_MOVIMENTO } from '../lib/gsap.js';
import { I, WHATSAPP_URL } from '../data.js';

const FRASE = 'Registro casamentos, festas, ensaios e marcas em vídeo e foto, e coloco tudo no ar enquanto o evento acontece.';

const FAZ = [
  { t: 'Vídeo', d: 'Reels e filmes verticais com edição ágil.' },
  { t: 'Foto', d: 'Ensaios e eventos com luz natural.' },
  { t: 'Tempo real', d: 'Stories no ar durante a festa, com equipe de até 3 pessoas.' }
];

// SOBRE: apresentação em formato editorial (um "olá" grande, o retrato e linhas com rótulo).
// Movimento leve: o retrato surge de baixo uma vez, as palavras da frase ganham cor ao rolar
// e as divisórias se desenham. Sem script ou com movimento reduzido, tudo aparece pronto.
export default function Sobre() {
  const raiz = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      const q = gsap.utils.selector(raiz.current);
      const foto = q('.k-abfoto')[0];
      const umaVez = { trigger: foto, start: 'top 82%', once: true };
      gsap.fromTo(foto, { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.3, ease: 'power3.out', scrollTrigger: umaVez });
      gsap.fromTo(q('.k-abfoto img'), { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { ...umaVez } });
      gsap.fromTo(q('.k-abw'), { opacity: 0.22 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: q('.k-abfrase')[0], start: 'top 80%', end: 'bottom 45%', scrub: 0.8 }
      });
      q('.k-abln').forEach((ln) => {
        gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: ln, start: 'top 88%', once: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="sobre" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }} ref={raiz}>
      <div className="k-abtopo">
        <h2 className="k-abola">Olá, eu sou o Kayo.</h2>
        <figure className="k-abfoto">
          <img src={I.retrato} alt="Kayo Marques" loading="lazy" />
        </figure>
      </div>

      <dl className="k-ablista">
        <div className="k-abrow">
          <span className="k-abln" aria-hidden="true" />
          <dt>Sobre</dt>
          <dd>
            <p className="k-abfrase">{FRASE.split(' ').map((w, i) => <span key={i} className="k-abw">{w} </span>)}</p>
          </dd>
        </div>
        <div className="k-abrow">
          <span className="k-abln" aria-hidden="true" />
          <dt>O que eu faço</dt>
          <dd>
            <ul className="k-abfaz">
              {FAZ.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}
            </ul>
            <a className="k-btn k-btn-pri k-abcta" href={WHATSAPP_URL} target="_blank" rel="noopener">Bora criar?</a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
