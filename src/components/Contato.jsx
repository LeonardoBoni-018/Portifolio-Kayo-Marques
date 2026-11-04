import { useEffect, useRef, useState } from 'react';
import { gsap, MQ_MOVIMENTO } from '../lib/gsap.js';
import { FRASES, HORAS, I, INSTAGRAM_URL, TIPOS, WHATSAPP_URL, waTexto } from '../data/conteudo.js';
import { IconEnviar } from './Icons.jsx';
import { Selo } from './Logo.jsx';

// CONTATO: "responda o story". Stickers de enquete e de emoji montam a mensagem
// que chega pronta no WhatsApp. A data pode vir da Agenda.
export default function Contato({ data, onData }) {
  const [tipo, setTipo] = useState('Casamento');
  const [horas, setHoras] = useState(HORAS.padrao);
  const [nome, setNome] = useState('');
  const [msg, setMsg] = useState('');
  const barra = useRef(null);

  // a terceira barrinha do story do formulário enche enquanto ele entra na tela
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      gsap.fromTo(barra.current, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: barra.current.closest('form'), start: 'top 85%', end: 'center 45%', scrub: 0.5 }
      });
    });
    return () => mm.revert();
  }, []);

  let dia = '';
  if (data) { const p = data.split('-'); if (p.length === 3) dia = ' para o dia ' + p[2] + '/' + p[1] + '/' + p[0]; }
  const extra = msg.trim() ? ' ' + msg.trim() : '';
  const previa = 'Oi, Kayo! Aqui é ' + (nome.trim() || '[seu nome]') + '. Quero um orçamento de ' + FRASES[tipo] + dia + ', com ' + horas + ' horas de cobertura.' + extra;

  // fração do trilho: o emoji e o preenchimento acompanham o polegar invisível do range, e o emoji cresce com o valor
  const f = (horas - HORAS.min) / (HORAS.max - HORAS.min);

  return (
    <section id="contato" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-cgrid">
        <div className="k-rv">
          <h2 className="k-h2">Responda o story</h2>
          <p className="k-sub" style={{ marginTop: 16 }}>Escolha o evento, as horas e a data. A mensagem chega pronta no WhatsApp do Kayo.</p>
          <div className="k-ctas">
            <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp</a>
            <a className="k-btn k-btn-out" href={INSTAGRAM_URL} target="_blank" rel="noopener">@kayomaarques</a>
          </div>
          <p className="k-note">Vai chegar assim</p>
          <div className="k-bubble">{previa}</div>
        </div>

        <form className="k-reply k-rv" tabIndex={-1} style={{ '--d': '.1s' }} onSubmit={(e) => e.preventDefault()} aria-label="Responder ao story do Kayo">
          <img className="k-bg" src={I.casVestido} alt="" loading="lazy" />
          <div className="k-bars"><span className="k-sg done"><i /></span><span className="k-sg done"><i /></span><span className="k-sg"><i ref={barra} /></span></div>
          <div className="k-meta"><span className="k-av"><Selo size={32} /></span><span>kayomaarques</span><small>agora</small></div>

          <div className="k-sticker">
            <p className="k-stq" id="k-q">O que você quer criar?</p>
            <div className="k-enq" role="group" aria-labelledby="k-q">
              {TIPOS.map((label) => (
                <button key={label} type="button" className={label === tipo ? 'k-enqop on' : 'k-enqop'} onClick={() => setTipo(label)} aria-pressed={label === tipo}>{label}</button>
              ))}
            </div>
          </div>

          <div className="k-sticker">
            <p className="k-stq" id="k-h">Quantas horas de cobertura? <output htmlFor="k-horas">{horas}h</output></p>
            <div className="k-sli" style={{ '--f': f, '--e': 0.85 + f * 0.95 }}>
              <span className="k-slifill" />
              <span className="k-sliemo" aria-hidden="true">{HORAS.emoji}</span>
              <input id="k-horas" type="range" min={HORAS.min} max={HORAS.max} step="1" value={horas} onChange={(e) => setHoras(+e.target.value)} aria-labelledby="k-h" aria-valuetext={horas + ' horas'} />
            </div>
          </div>

          <div className="k-flds">
            <label className="k-fl">Seu nome<input className="k-inp" type="text" placeholder="Como você se chama?" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" /></label>
            <label className="k-fl">Data do evento<input className="k-inp" type="date" value={data} onChange={(e) => onData(e.target.value)} /></label>
          </div>
          <label className="k-fl">Sua ideia<input className="k-inp" type="text" placeholder="Conte como imagina o evento…" value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
          <a className="k-cbtn k-renvia" href={waTexto(previa)} target="_blank" rel="noopener"><IconEnviar />Enviar pelo WhatsApp</a>
        </form>
      </div>
    </section>
  );
}
