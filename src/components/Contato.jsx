import { useEffect, useRef, useState } from 'react';
import { gsap, MQ_MOVIMENTO } from '../lib/gsap.js';
import { FRASES, I, INSTAGRAM_URL, TIPOS, WHATSAPP_URL, waTexto } from '../data.js';
import { IconEnviar } from './Icons.jsx';
import { Selo } from './Logo.jsx';

// CONTATO: "responda o story" monta a mensagem que chega pronta no WhatsApp
export default function Contato() {
  const [tipo, setTipo] = useState('Casamento');
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
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
  const previa = 'Oi, Kayo! Aqui é ' + (nome.trim() || '[seu nome]') + '. Quero um orçamento de ' + FRASES[tipo] + dia + '.' + extra;

  return (
    <section id="contato" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-cgrid">
        <div className="k-rv">
          <h2 className="k-h2">Responda o story</h2>
          <p className="k-sub" style={{ marginTop: 16 }}>Escolha o tipo, a data e conte a ideia. A mensagem chega pronta no WhatsApp do Kayo.</p>
          <div className="k-ctas">
            <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp</a>
            <a className="k-btn k-btn-out" href={INSTAGRAM_URL} target="_blank" rel="noopener">@kayomaarques</a>
          </div>
          <p className="k-note">Vai chegar assim</p>
          <div className="k-bubble">{previa}</div>
        </div>

        <form className="k-reply k-rv" style={{ '--d': '.1s' }} onSubmit={(e) => e.preventDefault()} aria-label="Responder ao story do Kayo">
          <img className="k-bg" src={I.casVestido} alt="" />
          <div className="k-bars"><span className="k-sg done"><i /></span><span className="k-sg done"><i /></span><span className="k-sg"><i ref={barra} /></span></div>
          <div className="k-meta"><span className="k-av"><Selo size={32} /></span><span>kayomaarques</span><small>agora</small></div>
          <p className="k-q" id="k-q">O que você quer criar?</p>
          <div className="k-opts" role="group" aria-labelledby="k-q">
            {TIPOS.map((label) => (
              <button key={label} type="button" className={label === tipo ? 'k-opt on' : 'k-opt'} onClick={() => setTipo(label)} aria-pressed={label === tipo}>{label}</button>
            ))}
          </div>
          <div className="k-flds">
            <label className="k-fl">Seu nome<input className="k-inp" type="text" placeholder="Como você se chama?" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" /></label>
            <label className="k-fl">Data do evento<input className="k-inp" type="date" value={data} onChange={(e) => setData(e.target.value)} /></label>
          </div>
          <label className="k-fl">Sua ideia
            <span className="k-rbar">
              <input className="k-inp" type="text" placeholder="Enviar mensagem…" value={msg} onChange={(e) => setMsg(e.target.value)} />
              <a className="k-send" href={waTexto(previa)} target="_blank" rel="noopener" aria-label="Enviar pelo WhatsApp"><IconEnviar /></a>
            </span>
          </label>
        </form>
      </div>
    </section>
  );
}
