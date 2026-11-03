import { I, INSTAGRAM_URL, WHATSAPP_URL } from '../data.js';
import { Selo } from './Logo.jsx';

const FAZ = [
  { t: 'Vídeo', d: 'Reels e filmes verticais com edição ágil, prontos para postar.' },
  { t: 'Foto', d: 'Ensaios e eventos com luz natural, para guardar e compartilhar.' },
  { t: 'Tempo real', d: 'Stories no ar enquanto a festa acontece, com equipe de até 3 pessoas.' }
];

// SOBRE: quem é o Kayo, antes dos trabalhos
export default function Sobre() {
  return (
    <section id="sobre" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-sgrid">
        <figure className="k-retrato k-rv">
          <img src={I.retrato} alt="Kayo Marques" loading="lazy" />
          <span className="k-sb" />
          <figcaption className="k-rcap">
            <Selo size={44} className="k-rselo" />
            <span><b>Kayo Marques</b><small>Videomaker, fotógrafo e storymaker</small></span>
          </figcaption>
        </figure>

        <div className="k-rv" style={{ '--d': '.08s' }}>
          <p className="k-kick">Prazer, Kayo</p>
          <h2 className="k-h2">Quem está por trás de cada história</h2>
          <p className="k-sub" style={{ marginTop: 20 }}>Sou o Kayo Marques. Registro casamentos, eventos e conteúdos para marcas, em vídeo e foto, e coloco tudo no ar em tempo real. Criatividade é a prioridade por aqui.</p>
          <ul className="k-faz">
            {FAZ.map((f) => (
              <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>
            ))}
          </ul>
          <div className="k-ctas">
            <a className="k-btn k-btn-pri" href={WHATSAPP_URL} target="_blank" rel="noopener">Bora criar?</a>
            <a className="k-btn k-btn-out" href={INSTAGRAM_URL} target="_blank" rel="noopener">11 mil no Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}
