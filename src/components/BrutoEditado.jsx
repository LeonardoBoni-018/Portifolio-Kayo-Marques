import { useEffect, useRef, useState } from 'react';
import { BRUTO_EDITADO as B } from '../data/conteudo.js';
import { useSincronizarMidia } from '../lib/hooks.js';

const DESVIO_MAX = 0.08;

// BRUTO × EDITADO: o range invisível por cima dá arraste, toque e teclado; a camada do editado
// é recortada com clip-path. Com os dois vídeos em conteudo.js, eles tocam sincronizados.
export default function BrutoEditado() {
  const [p, setP] = useState(50);
  const bruto = useRef(null);
  const editado = useRef(null);
  const temVideo = !!(B.videoBruto && B.videoEditado);
  useSincronizarMidia();

  useEffect(() => {
    if (!temVideo) return undefined;
    const id = setInterval(() => {
      const a = bruto.current;
      const b = editado.current;
      if (a && b && Math.abs(a.currentTime - b.currentTime) > DESVIO_MAX) b.currentTime = a.currentTime;
    }, 250);
    return () => clearInterval(id);
  }, [temVideo]);

  return (
    <section id="bruto-editado" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-begrid">
        <div className="k-be k-rv" style={{ '--p': p + '%' }}>
          {temVideo ? (
            <>
              <video ref={bruto} className="k-v k-bebase" src={B.videoBruto} poster={B.img} muted loop playsInline preload="none" />
              <video ref={editado} className="k-v k-betopo" src={B.videoEditado} poster={B.img} muted loop playsInline preload="none" />
            </>
          ) : (
            <>
              <img className={B.simularBruto ? 'k-bebase simula' : 'k-bebase'} src={B.imgBruto || B.img} alt={'Bruto: ' + B.alt} loading="lazy" />
              <img className="k-betopo" src={B.img} alt={'Editado: ' + B.alt} loading="lazy" />
            </>
          )}
          <span className="k-beetq l" aria-hidden="true">Bruto</span>
          <span className="k-beetq r" aria-hidden="true">Editado</span>
          <span className="k-bebarra" aria-hidden="true"><i /></span>
          <input type="range" min="0" max="100" step="1" value={p} onChange={(e) => setP(+e.target.value)}
            aria-label="Comparar bruto e editado" aria-valuetext={p + '% do bruto à mostra'} />
        </div>
        <div className="k-rv" style={{ '--d': '.08s' }}>
          <h2 className="k-h2">Do bruto ao editado</h2>
          <p className="k-sub" style={{ marginTop: 16 }}>Arraste a barra para ver o que a edição faz com a mesma cena. <span className="k-exemplo">Simulação com foto de exemplo</span></p>
        </div>
      </div>
    </section>
  );
}
