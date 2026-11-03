import { useEffect, useRef, useState } from 'react';
import { gsap, MQ_MOVIMENTO, ScrollTrigger } from '../lib/gsap.js';
import { I, INSTAGRAM_URL, WHATSAPP_URL } from '../data.js';
import { Selo } from './Logo.jsx';

// o que passa pelas lentes do Kayo: cada linha acende ao cruzar o meio da tela e troca a foto ao lado
const LINHAS = [
  { t: 'O sim no jardim.', img: I.pCas, cap: 'Casamento' },
  { t: 'A hora do parabéns.', img: I.fesBolo, cap: 'Festa' },
  { t: 'A família no pôr do sol.', img: I.ensFam, cap: 'Ensaio' },
  { t: 'O prato saindo da cozinha.', img: I.marPrato, cap: 'Marca' },
  { t: 'Os stories no ar, com a festa acontecendo.', img: I.pTr, cap: 'Tempo real' }
];

// SOBRE: quem é o Kayo, com o retrato fixo enquanto as linhas passam
export default function Sobre() {
  const lista = useRef(null);
  const [ativo, setAtivo] = useState(-1);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      lista.current.classList.add('anima');
      const itens = [...lista.current.querySelectorAll('li')];
      const sts = itens.map((li, i) => ScrollTrigger.create({
        trigger: li, start: 'top 58%', end: 'bottom 58%',
        onEnter: () => setAtivo(i), onEnterBack: () => setAtivo(i),
        onLeaveBack: () => { if (i === 0) setAtivo(-1); }
      }));
      return () => { sts.forEach((s) => s.kill()); lista.current?.classList.remove('anima'); setAtivo(-1); };
    });
    return () => mm.revert();
  }, []);

  const fotos = [{ img: I.retrato, cap: null }].concat(LINHAS);
  const mostra = ativo + 1;

  return (
    <section id="sobre" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-sgrid">
        <div className="k-sfixo">
          <figure className="k-retrato">
            {fotos.map((f, i) => (
              <img key={i} src={f.img} alt={i === 0 ? 'Kayo Marques' : ''} loading="lazy" className={i === mostra ? 'on' : ''} />
            ))}
            <span className="k-sb" />
            <figcaption className="k-rcap">
              <Selo size={44} className="k-rselo" />
              <span><b>Kayo Marques</b><small>{mostra === 0 ? 'Videomaker, fotógrafo e storymaker' : fotos[mostra].cap}</small></span>
            </figcaption>
          </figure>
        </div>

        <div className="k-stexto">
          <h2 className="k-h2 k-rv">Quem está por trás de cada história</h2>
          <p className="k-sub k-rv" style={{ marginTop: 20 }}>Sou o Kayo Marques. Registro casamentos, eventos e conteúdos para marcas, em vídeo e foto, e coloco tudo no ar em tempo real. Criatividade é a prioridade por aqui.</p>
          <ul className="k-linhas" ref={lista} aria-label="O que passa pelas minhas lentes">
            {LINHAS.map((l, i) => <li key={l.t} className={i === ativo ? 'on' : ''}>{l.t}</li>)}
          </ul>
          <div className="k-ctas">
            <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">Bora criar?</a>
            <a className="k-btn k-btn-out" href={INSTAGRAM_URL} target="_blank" rel="noopener">11 mil no Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}
