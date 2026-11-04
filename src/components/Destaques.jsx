import { DESTAQUES } from '../data/conteudo.js';

// DESTAQUES: círculos com stories próprios, acima dos filtros do feed.
// O anel fica colorido até o destaque ser visto, e cinza depois (App guarda em localStorage).
export default function Destaques({ vistos, onAbrir }) {
  return (
    <div className="k-dslinha k-rv" style={{ '--d': '.12s' }} role="group" aria-label="Destaques">
      {DESTAQUES.map((d, i) => {
        const visto = vistos.includes(d.label);
        return (
          <button key={d.label} type="button" className={visto ? 'k-ds visto' : 'k-ds'} onClick={() => onAbrir(i)} aria-label={'Assistir destaque ' + d.label + (visto ? ', já visto' : '')}>
            <span className="k-dsanel"><img src={d.cover} alt="" loading="lazy" /></span>
            <span className="k-dsnome">{d.label}</span>
          </button>
        );
      })}
    </div>
  );
}
