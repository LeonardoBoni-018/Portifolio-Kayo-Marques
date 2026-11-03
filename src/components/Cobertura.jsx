import { CAPS, WHATSAPP_URL } from '../data.js';
import { useSincronizarMidia, useStepper } from '../lib/hooks.js';
import Midia from './Midia.jsx';

// COBERTURA: capítulos antes, durante e depois
export default function Cobertura({ pausado }) {
  const [c, tick, ir] = useStepper(CAPS.length, 6500, pausado);
  useSincronizarMidia();

  return (
    <section id="cobertura" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-center k-rv">
        <h2 className="k-h2">Antes, durante e depois</h2>
        <p className="k-sub" style={{ marginTop: 12 }}>A festa passa, as memórias ficam. Toque num capítulo para pular.</p>
      </div>
      <div className="k-player k-rv" style={{ '--dur': '6.5s', '--d': '.08s' }}>
        {CAPS.map((k, i) => (
          <div key={i} className={i === c ? 'k-sl on' : 'k-sl'}>
            <Midia img={k.img} v={k.v} alt={k.alt} preload="none" loading="lazy" />
          </div>
        ))}
        <div className="k-st" style={{ height: '32%' }} />
        <div className="k-sb" />
        <div className="k-pbars">
          {CAPS.map((k, i) => (
            <button key={i} type="button" className={i === c ? 'k-pb on' : 'k-pb'} onClick={() => ir(i)} aria-pressed={i === c} aria-label={`Capítulo ${i + 1}: ${k.k}`}>
              <span className={i < c ? 'k-sg done' : (i === c ? 'k-sg cur ' + (tick % 2 ? 'a' : 'b') : 'k-sg')}><i /></span>
              <span className="k-lb">{k.k}</span>
            </button>
          ))}
        </div>
        <div className="k-pcaps">
          {CAPS.map((k, i) => (
            <div key={i} className={i === c ? 'k-cp on' : 'k-cp'}><p className="k-ct">{k.t}</p><p className="k-cd">{k.d}</p></div>
          ))}
        </div>
      </div>
      <div className="k-pfoot">
        <span>Capítulo {c + 1} de {CAPS.length}: {CAPS[c].k.toLowerCase()}</span>
        <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">Quero cobertura no meu evento</a>
      </div>
    </section>
  );
}
