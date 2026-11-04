import { FAQ } from '../data/conteudo.js';

// FAQ: <details> nativo, então abre e fecha com teclado e sem depender de script.
// O atributo name faz com que só uma resposta fique aberta por vez.
export default function Faq() {
  return (
    <section id="faq" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-fqgrid">
        <div className="k-rv">
          <h2 className="k-h2">O que é storymaker?</h2>
          <p className="k-sub" style={{ marginTop: 16 }}>É quem conta o seu evento nos stories enquanto ele acontece. <span className="k-exemplo">Respostas a confirmar</span></p>
        </div>
        <div className="k-fqlista k-rv" style={{ '--d': '.08s' }}>
          {FAQ.map((f) => (
            <details key={f.q} className="k-fq" name="k-faq">
              <summary>{f.q}<span className="k-fqmais" aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
