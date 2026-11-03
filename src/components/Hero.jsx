import { useState } from 'react';
import { CATS, HERO, WHATSAPP_URL } from '../data.js';
import { segs, useSincronizarMidia, useStepper } from '../lib/hooks.js';
import { IconDir, IconEsq, IconSalvar } from './Icons.jsx';
import Midia from './Midia.jsx';
import { Selo } from './Logo.jsx';

// HERO: a frase da bio do Kayo + o story que avança com toque
export default function Hero({ pausado, onAbrir }) {
  const [h, tick, ir] = useStepper(HERO.length, 5000, pausado);
  const [salvos, setSalvos] = useState({});
  useSincronizarMidia();

  const slides = HERO.map((x) => ({ ...x, it: CATS[x.c].items[x.i] }));
  const salvo = !!salvos[h];

  return (
    <section className="k-wrap k-hero">
      <div className="k-hgrid">
        <div>
          <h1 className="k-h1 k-ld">Criatividade é a prioridade por aqui.</h1>
          <p className="k-lead k-ld" style={{ '--d': '.1s' }}>Casamentos, eventos e marcas contados em stories, em tempo real.</p>
          <div className="k-ctas k-ld" style={{ '--d': '.18s' }}>
            <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">Bora criar?</a>
            <a className="k-btn k-btn-out" href="#trabalhos">Ver trabalhos</a>
          </div>
        </div>

        <div className="k-ld" style={{ '--d': '.14s' }}>
          <div className="k-stagew">
            <div className="k-story" style={{ '--dur': '5s' }}>
              {slides.map((s, i) => (
                <div key={i} className={i === h ? 'k-sl on' : 'k-sl'}>
                  <Midia img={s.it.img} v={s.it.v} alt={s.it.t} />
                </div>
              ))}
              <div className="k-st" />
              <div className="k-sb" />
              <div className="k-bars">{segs(HERO.length, h, tick).map((c, i) => <span key={i} className={c}><i /></span>)}</div>
              <div className="k-meta"><span className="k-av"><Selo size={32} /></span><span>kayomaarques</span><small>{h + 1} de {HERO.length}</small></div>
              <button type="button" className="k-tz l" onClick={() => ir(h - 1)} aria-label="Story anterior"><span className="k-arr"><IconEsq /></span></button>
              <button type="button" className="k-tz r" onClick={() => ir(h + 1)} aria-label="Próximo story"><span className="k-arr"><IconDir /></span></button>
              <div className="k-caps">
                {slides.map((s, i) => (
                  <div key={i} className={i === h ? 'k-cp on' : 'k-cp'}>
                    <span className="k-tag">{s.tag}</span>
                    <p className="k-ct">{s.it.t}</p>
                    <p className="k-cd">{s.d}</p>
                    <div className="k-cact">
                      <button type="button" className="k-cbtn" onClick={() => onAbrir(s.c, s.i)}>Ver destaque</button>
                      <button type="button" className="k-cic" onClick={() => setSalvos((m) => ({ ...m, [h]: !m[h] }))} aria-label="Salvar story" aria-pressed={salvo}><IconSalvar cheio={salvo} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
