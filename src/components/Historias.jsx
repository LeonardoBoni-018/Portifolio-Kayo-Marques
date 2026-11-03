import { useEffect, useRef } from 'react';
import { gsap, Draggable } from '../lib/gsap.js';
import { CATS } from '../data.js';
import { reduzMovimento } from '../lib/media.js';
import { IconDir, IconEsq } from './Icons.jsx';

// até 10 fotos (sem vídeo) das quatro primeiras categorias
const ANEL = [];
CATS.slice(0, 4).forEach((c, ci) => c.items.forEach((it, ii) => { if (ANEL.length < 10 && !it.v) ANEL.push({ ci, ii, t: it.t, cat: c.label, img: it.img }); }));
const PASSO = 360 / ANEL.length;

// HISTÓRIAS: anel 3D. GSAP Draggable + Inertia giram o anel; parado, ele gira devagar sozinho
export default function Historias({ pausado, onAbrir }) {
  const ringEl = useRef(null);
  const ringInEl = useRef(null);
  const proxyEl = useRef(null);
  const r = useRef({ rot: 0, moved: false, segurando: false });
  const pausadoRef = useRef(pausado);
  pausadoRef.current = pausado;
  const onAbrirRef = useRef(onAbrir);
  onAbrirRef.current = onAbrir;

  useEffect(() => {
    const st = r.current;
    const aplica = () => gsap.set(ringInEl.current, { rotationY: st.rot });
    let drag = null;
    try {
      drag = Draggable.create(proxyEl.current, {
        type: 'x', trigger: ringEl.current, inertia: true, allowNativeTouchScrolling: true, dragClickables: true, minimumMovement: 4,
        onPress() { st.segurando = true; st.moved = false; this._r0 = st.rot; this._x0 = this.x; },
        onDrag() { st.moved = true; st.rot = this._r0 + (this.x - this._x0) * 0.25; aplica(); },
        onThrowUpdate() { st.rot = this._r0 + (this.x - this._x0) * 0.25; aplica(); },
        onRelease() { if (!this.isThrowing) st.segurando = false; },
        onThrowComplete() { st.segurando = false; },
        onClick(e) {
          const b = e && e.target && e.target.closest ? e.target.closest('.k-r3') : null;
          if (b) { st.moved = false; onAbrirRef.current(+b.getAttribute('data-ci'), +b.getAttribute('data-ii')); }
        },
        snap: { x: (v) => { const passo = PASSO / 0.25; return Math.round(v / passo) * passo; } }
      })[0];
    } catch (e) { /* sem arrastar: setas continuam funcionando */ }
    const tick = () => { if (!st.segurando && !reduzMovimento() && !pausadoRef.current) { st.rot -= 0.06; aplica(); } };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); if (drag) drag.kill(); };
  }, []);

  const girar = (dir) => {
    const st = r.current;
    const alvo = Math.round((st.rot + dir * PASSO) / PASSO) * PASSO;
    st.segurando = true;
    const o = { r: st.rot };
    gsap.to(o, { r: alvo, duration: reduzMovimento() ? 0 : 0.7, ease: 'power3.out',
      onUpdate: () => { st.rot = o.r; gsap.set(ringInEl.current, { rotationY: o.r }); },
      onComplete: () => { st.segurando = false; } });
  };

  return (
    <section id="historias" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-center k-rv">
        <h2 className="k-h2">Gire e escolha uma história</h2>
        <p className="k-sub" style={{ marginTop: 12 }}>Arraste para os lados. Toque num story para abrir.</p>
      </div>
      <div className="k-r3w" ref={ringEl}>
        <div className="k-r3in" ref={ringInEl}>
          {ANEL.map((a, i) => (
            <button key={i} type="button" className="k-r3" style={{ '--i': i }} data-ci={a.ci} data-ii={a.ii} aria-label={'Abrir ' + a.t}
              onClick={() => { if (r.current.moved) { r.current.moved = false; return; } onAbrir(a.ci, a.ii); }}>
              <img src={a.img} alt="" decoding="async" />
              <span className="k-sb" />
              <span className="k-ci"><span className="k-tag">{a.cat}</span><h3>{a.t}</h3></span>
            </button>
          ))}
        </div>
        <div className="k-proxy" ref={proxyEl} aria-hidden="true" />
      </div>
      <div className="k-hint">
        <button type="button" className="k-ib" onClick={() => girar(1)} aria-label="Girar para a esquerda"><IconEsq size={18} w={2} /></button>
        <span>Arraste ou use as setas</span>
        <button type="button" className="k-ib" onClick={() => girar(-1)} aria-label="Girar para a direita"><IconDir size={18} w={2} /></button>
      </div>
    </section>
  );
}
