import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Selo } from './Logo.jsx';

const CHAVE = 'kayo-abertura';

// só na primeira visita da sessão, e nunca com movimento reduzido
export function deveAbrir() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(CHAVE) !== '1';
  } catch (e) { return false; }
}

// ABERTURA: o selo no meio de anéis de story e um contador até 100, enquanto a página carrega
export default function Abertura({ onFim }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const dur = 1300;
    let t0 = 0;
    let raf = 0;
    const passo = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(passo);
      else {
        try { sessionStorage.setItem(CHAVE, '1'); } catch (e) { /* ignora */ }
        setTimeout(onFim, 180);
      }
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [onFim]);

  return (
    <motion.div className="k-abre" role="status" aria-label="Carregando"
      exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}>
      <div className="k-abreanel" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span key={i} className="k-abrecirc" style={{ '--r': i }}
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }} />
        ))}
        <Selo size={88} />
      </div>
      <p className="k-abrenum" aria-hidden="true">{String(n).padStart(3, '0')}</p>
    </motion.div>
  );
}
