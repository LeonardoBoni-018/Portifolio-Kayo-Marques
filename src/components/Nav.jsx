import { AnimatePresence, motion } from 'motion/react';
import { WHATSAPP_URL } from '../data.js';
import { IconLua, IconMenu, IconSol } from './Icons.jsx';
import { Logo } from './Logo.jsx';

export default function Nav({ escuro, onTema, menu, onMenu, onFechaMenu }) {
  return (
    <div className="k-wrap k-navw">
      <nav className="k-nav" aria-label="Principal">
        <a className="k-logo" href="#topo" aria-label="Kayo Marques, voltar ao topo"><Logo size={40} tagline={false} /></a>
        <div className="k-links">
          <a href="#sobre">Sobre</a>
          <a href="#trabalhos">Trabalhos</a>
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
        <AnimatePresence>
        {menu && (
          <motion.div className="k-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}>
            <a href="#sobre" onClick={onFechaMenu}>Sobre o Kayo</a>
            <a href="#trabalhos" onClick={onFechaMenu}>Trabalhos</a>
            <a href="#cobertura" onClick={onFechaMenu}>Como funciona a cobertura</a>
            <a href="#contato" onClick={onFechaMenu}>Contato</a>
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
