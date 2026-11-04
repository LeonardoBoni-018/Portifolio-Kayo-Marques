import { useEffect, useRef, useState } from 'react';
import { CONVERSAS } from '../data/conteudo.js';
import { IconCoracao, IconDir, IconEsq } from './Icons.jsx';

const reduz = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DIGITANDO = 900;
const INTERVALO = 500;

// Uma conversa: na primeira vez que aparece, as bolhas entram em sequência, com "digitando…"
// antes das mensagens recebidas. Depois disso (ou com movimento reduzido) fica toda à mostra.
// As bolhas ocupam o espaço desde o início para o card não mudar de altura.
function Conversa({ c, ativa, naTela }) {
  const total = c.msgs.length + 1;
  const [passo, setPasso] = useState(0);
  const [digitando, setDigitando] = useState(false);
  const estado = useRef({ comecou: false, acabou: false });

  useEffect(() => {
    const st = estado.current;
    if (st.acabou) return undefined;
    if (!ativa || !naTela) {
      if (st.comecou) { st.acabou = true; setDigitando(false); setPasso(total); }
      return undefined;
    }
    if (reduz()) { st.acabou = true; setPasso(total); return undefined; }

    st.comecou = true;
    const timers = [];
    let t = 300;
    c.msgs.forEach((m, i) => {
      if (m.de === 'casal') {
        timers.push(setTimeout(() => { setPasso(i); setDigitando(true); }, t));
        t += DIGITANDO;
      } else {
        t += INTERVALO;
      }
      timers.push(setTimeout(() => { setDigitando(false); setPasso(i + 1); }, t));
    });
    t += INTERVALO;
    timers.push(setTimeout(() => { st.acabou = true; setPasso(total); }, t));
    return () => timers.forEach(clearTimeout);
  }, [ativa, naTela, c, total]);

  return (
    <article className={ativa ? 'k-dm on' : 'k-dm'} aria-hidden={!ativa} aria-label={'Conversa com ' + c.nomes}>
      <header className="k-dmtopo">
        <span className="k-dmav" aria-hidden="true">{c.iniciais}</span>
        <span className="k-dmquem"><b>{c.nomes}</b><small>{c.evento}, {c.data}</small></span>
      </header>
      <ol className="k-dmmsgs">
        {c.msgs.map((m, i) => (
          <li key={i} className={'k-dmlin ' + m.de}>
            {digitando && passo === i && <span className="k-dmdig" role="status" aria-label="digitando"><i /><i /><i /></span>}
            <p className={i < passo ? 'k-dmbolha on' : 'k-dmbolha'}>{m.txt}</p>
          </li>
        ))}
      </ol>
      <p className={passo >= total ? 'k-dmreage on' : 'k-dmreage'}><IconCoracao /> Kayo reagiu</p>
    </article>
  );
}

// DEPOIMENTOS: conversas de DM, uma por tipo de evento
export default function Depoimentos() {
  const caixa = useRef(null);
  const [atual, setAtual] = useState(0);
  const [naTela, setNaTela] = useState(false);
  const n = CONVERSAS.length;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setNaTela(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNaTela(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(caixa.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="depoimentos" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-dpgrid">
        <div className="k-rv">
          <h2 className="k-h2">O que chega na DM depois da festa</h2>
          <p className="k-sub" style={{ marginTop: 16 }}>Uma conversa de cada tipo de evento. <span className="k-exemplo">Conversas de exemplo</span></p>
          <div className="k-dptipos" role="group" aria-label="Escolher conversa">
            {CONVERSAS.map((c, i) => (
              <button key={c.evento} type="button" className={i === atual ? 'k-fbtn on k-dptipo' : 'k-fbtn k-dptipo'} onClick={() => setAtual(i)} aria-pressed={i === atual}>{c.evento}</button>
            ))}
          </div>
          <div className="k-dpsetas">
            <button type="button" className="k-ib" onClick={() => setAtual((atual - 1 + n) % n)} aria-label="Conversa anterior"><IconEsq size={18} w={2} /></button>
            <button type="button" className="k-ib" onClick={() => setAtual((atual + 1) % n)} aria-label="Próxima conversa"><IconDir size={18} w={2} /></button>
          </div>
        </div>
        <div className="k-dmpilha" ref={caixa}>
          {CONVERSAS.map((c, i) => <Conversa key={c.evento} c={c} ativa={i === atual} naTela={naTela} />)}
        </div>
      </div>
    </section>
  );
}
