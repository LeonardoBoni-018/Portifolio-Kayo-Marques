import { useState } from 'react';
import { AGENDA } from '../data/conteudo.js';
import { IconDir, IconEsq } from './Icons.jsx';

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const SEMANA_LONGA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const ROTULO = { livre: 'livre', ultima: 'última vaga', fechado: 'fechado', passado: 'já passou' };
const MESES_A_FRENTE = 12;

const doisDig = (n) => String(n).padStart(2, '0');
const paraIso = (a, m, d) => `${a}-${doisDig(m + 1)}-${doisDig(d)}`;

function estadoDoDia(iso, hojeIso) {
  if (iso < hojeIso) return 'passado';
  if (AGENDA.fechadas.includes(iso)) return 'fechado';
  if (AGENDA.ultimaVaga.includes(iso)) return 'ultima';
  return 'livre';
}

// AGENDA: calendário mensal. Clicar num dia livre preenche a data do formulário e rola até ele.
// Sempre desenha 6 semanas, para a altura da página não mudar ao trocar de mês.
export default function Agenda({ data, onEscolher }) {
  const agora = new Date();
  const hojeIso = paraIso(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const base = agora.getFullYear() * 12 + agora.getMonth();
  const [indice, setIndice] = useState(base);
  const ano = Math.floor(indice / 12);
  const mes = indice % 12;

  const inicio = new Date(ano, mes, 1).getDay();
  const nDias = new Date(ano, mes + 1, 0).getDate();
  const dias = [];
  for (let d = 1; d <= nDias; d++) {
    const iso = paraIso(ano, mes, d);
    dias.push({ d, iso, sem: (inicio + d - 1) % 7, estado: estadoDoDia(iso, hojeIso) });
  }

  const sabados = dias.filter((x) => x.sem === 6 && x.estado !== 'passado');
  const livres = sabados.filter((x) => x.estado !== 'fechado').length;

  const escolher = (iso) => {
    onEscolher(iso);
    const form = document.querySelector('#contato form');
    document.getElementById('contato').scrollIntoView();
    if (form) form.focus({ preventScroll: true });
  };

  return (
    <section id="agenda" className="k-wrap k-sec" style={{ scrollMarginTop: 88 }}>
      <div className="k-aggrid">
        <div className="k-rv">
          <h2 className="k-h2">Veja se a sua data está livre</h2>
          <p className="k-agres" aria-live="polite">{livres} de {sabados.length} {sabados.length === 1 ? 'sábado livre' : 'sábados livres'} em {MESES[mes]}</p>
          <p className="k-sub">Toque num dia livre e ele já vai para a sua mensagem. <span className="k-exemplo">Datas de exemplo</span></p>
          <ul className="k-agleg">
            <li><i className="k-agcor livre" />Livre</li>
            <li><i className="k-agcor ultima" />Última vaga</li>
            <li><i className="k-agcor fechado" />Fechado</li>
          </ul>
        </div>

        <div className="k-agcal k-rv" style={{ '--d': '.08s' }}>
          <div className="k-agtopo">
            <button type="button" className="k-ib" onClick={() => setIndice(indice - 1)} disabled={indice <= base} aria-label="Mês anterior"><IconEsq size={18} w={2} /></button>
            <p className="k-agmes" aria-live="polite">{MESES[mes]} de {ano}</p>
            <button type="button" className="k-ib" onClick={() => setIndice(indice + 1)} disabled={indice >= base + MESES_A_FRENTE} aria-label="Próximo mês"><IconDir size={18} w={2} /></button>
          </div>
          <div className="k-agdias">
            {SEMANA.map((s) => <span key={s} className="k-agsem" aria-hidden="true">{s}</span>)}
            {Array.from({ length: inicio }, (_, i) => <span key={'v' + i} />)}
            {dias.map((x) => {
              const clicavel = x.estado === 'livre' || x.estado === 'ultima';
              return (
                <button key={x.iso} type="button" disabled={!clicavel} onClick={() => escolher(x.iso)}
                  className={'k-agd ' + x.estado + (x.iso === data ? ' sel' : '')} aria-pressed={x.iso === data}
                  aria-label={`${x.d} de ${MESES[mes]}, ${SEMANA_LONGA[x.sem]}, ${ROTULO[x.estado]}`}>{x.d}</button>
              );
            })}
            {Array.from({ length: 42 - inicio - nDias }, (_, i) => <span key={'f' + i} className="k-agvazio" />)}
          </div>
        </div>
      </div>
    </section>
  );
}
