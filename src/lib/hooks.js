import { useCallback, useEffect, useRef, useState } from 'react';
import { sincronizarMidia } from './media.js';

// Avança sozinho de `ms` em `ms` (a menos que `pausado`); navegar à mão reinicia o relógio.
// `tick` muda a cada troca e reinicia a animação da barrinha do story.
export function useStepper(n, ms, pausado) {
  const [st, setSt] = useState({ i: 0, tick: 0 });
  const [epoca, setEpoca] = useState(0);
  const pausadoRef = useRef(pausado);
  pausadoRef.current = pausado;

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausadoRef.current) setSt((s) => ({ i: (s.i + 1) % n, tick: s.tick + 1 }));
    }, ms);
    return () => clearInterval(id);
  }, [n, ms, epoca]);

  const ir = useCallback((i) => {
    setSt((s) => ({ i: ((i % n) + n) % n, tick: s.tick + 1 }));
    setEpoca((e) => e + 1);
  }, [n]);

  return [st.i, st.tick, ir];
}

// Depois de cada render: observa elementos novos e toca/pausa vídeos conforme o slide ativo.
export function useSincronizarMidia() {
  useEffect(() => { sincronizarMidia(); });
}

// classes das barrinhas de progresso do story
export function segs(n, atual, tick) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(i < atual ? 'k-sg done' : (i === atual ? 'k-sg cur ' + (tick % 2 ? 'a' : 'b') : 'k-sg'));
  return out;
}
