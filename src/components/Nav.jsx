import { WHATSAPP_URL } from '../data.js';
import { IconLua, IconMenu, IconSol } from './Icons.jsx';

export default function Nav({ escuro, onTema, menu, onMenu, onFechaMenu }) {
  return (
    <div className="k-wrap k-navw">
      <nav className="k-nav" aria-label="Principal">
        <a className="k-logo" href="#topo">kayo marques</a>
        <div className="k-links">
          <a href="#destaques">Destaques</a>
          <a href="#historias">Histórias</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="k-navr">
          <a className="k-btn k-btn-pri k-navwa" href={WHATSAPP_URL} target="_blank" rel="noopener">Chamar no WhatsApp</a>
          <button type="button" className="k-ib" onClick={onTema} aria-label={escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'} aria-pressed={escuro}>
            {escuro ? <IconSol /> : <IconLua />}
          </button>
          <button type="button" className="k-ib k-menubtn" onClick={onMenu} aria-label="Abrir menu" aria-expanded={menu}>
            <IconMenu />
          </button>
        </div>
        {menu && (
          <div className="k-menu">
            <a href="#destaques" onClick={onFechaMenu}>Destaques</a>
            <a href="#historias" onClick={onFechaMenu}>Histórias</a>
            <a href="#cobertura" onClick={onFechaMenu}>Como funciona a cobertura</a>
            <a href="#contato" onClick={onFechaMenu}>Contato</a>
          </div>
        )}
      </nav>
    </div>
  );
}
