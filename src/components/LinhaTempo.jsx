import { useEffect, useRef, useState } from 'react';
import { MOMENTOS } from '../data/conteudo.js';
import { useSincronizarMidia } from '../lib/hooks.js';
import { Selo } from './Logo.jsx';
import Midia from './Midia.jsx';

// faixa da tela que "ativa" um momento. Abaixo de 960px o celular fixo cobre o meio da tela,
// então a faixa desce para a área em que a lista está visível
const FAIXA_TELA = '-45% 0px -45% 0px';
const FAIXA_CELULAR = '-62% 0px -28% 0px';

// LINHA DO TEMPO: a prova do tempo real. O celular fica fixo e troca de story
// conforme cada momento do evento cruza o centro da tela.
export default function LinhaTempo() {
  const lista = useRef(null);
  const [ativo, setAtivo] = useState(0);
  useSincronizarMidia();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)');
    let io = null;
    const observar = () => {
      if (io) io.disconnect();
      if (!('IntersectionObserver' in window)) return;
      io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) setAtivo(+e.target.dataset.i); });
      }, { rootMargin: mq.matches ? FAIXA_CELULAR : FAIXA_TELA });
      lista.current.querySelectorAll('li').forEach((li) => io.observe(li));
    };
    observar();
    mq.addEventListener('change', observar);
    return () => { mq.removeEventListener('change', observar); if (io) io.disconnect(); };
  }, []);

  const ir = (i, el) => {
    setAtivo(i);
    el.closest('li').scrollIntoView({ block: 'center' });
  };

  const atual = MOMENTOS[ativo];

  return (
    <section id="tempo-real" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-head">
        <h2 className="k-h2 k-rv">Um casamento, minuto a minuto</h2>
        <p className="k-sub k-rv" style={{ '--d': '.08s' }}>Cada momento vai para os stories poucos minutos depois de acontecer. <span className="k-exemplo">Horários de exemplo</span></p>
      </div>

      <div className="k-ltgrid">
        <div className="k-ltfixo">
          <div className="k-story k-ltcel">
            {MOMENTOS.map((m, i) => (
              <div key={m.hora} className={i === ativo ? 'k-sl on' : 'k-sl'}>
                <Midia img={m.img} v={m.v} alt={m.alt} loading="lazy" />
              </div>
            ))}
            <div className="k-st" />
            <div className="k-sb" />
            <div className="k-bars">
              {MOMENTOS.map((m, i) => <span key={m.hora} className={i <= ativo ? 'k-sg done' : 'k-sg'}><i /></span>)}
            </div>
            <div className="k-meta">
              <span className="k-av"><Selo size={32} /></span>
              <span>kayomaarques</span>
              <span className="k-ltvivo"><i aria-hidden="true" />AO VIVO</span>
            </div>
            <div className="k-caps" aria-live="polite">
              <div className="k-cp on" key={atual.hora}>
                <span className="k-tag">{atual.hora}</span>
                <p className="k-ct">{atual.t}</p>
                <p className="k-cd">postado +{atual.min} min depois</p>
              </div>
            </div>
          </div>
        </div>

        <ol className="k-ltlista" ref={lista}>
          {MOMENTOS.map((m, i) => (
            <li key={m.hora} data-i={i}>
              <button type="button" className={i === ativo ? 'k-ltitem on' : 'k-ltitem'} aria-current={i === ativo ? 'step' : undefined} onClick={(e) => ir(i, e.currentTarget)}>
                <time className="k-lthora">{m.hora}</time>
                <span className="k-lttit">{m.t}</span>
                <span className="k-ltmin">+{m.min} min</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
