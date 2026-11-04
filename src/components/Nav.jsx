import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap, MQ_MOVIMENTO } from '../lib/gsap.js';
import { WHATSAPP_URL } from '../data/conteudo.js';
import { IconLua, IconMenu, IconSol } from './Icons.jsx';
import { Logo } from './Logo.jsx';

const LINKS = [['#sobre', 'Sobre'], ['#trabalhos', 'Trabalhos'], ['#cobertura', 'Cobertura'], ['#depoimentos', 'Depoimentos'], ['#agenda', 'Agenda'], ['#contato', 'Contato']];
const LINKS_MENU = [['#sobre', 'Sobre o Kayo'], ['#trabalhos', 'Trabalhos'], ['#cobertura', 'Como funciona a cobertura'], ['#depoimentos', 'Depoimentos'], ['#faq', 'Perguntas frequentes'], ['#agenda', 'Agenda'], ['#contato', 'Contato']];

export default function Nav({ escuro, onTema, menu, onMenu, onFechaMenu, links }) {
  const prog = useRef(null);

  // a base do menu enche como uma barrinha de story, acompanhando a leitura da página
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOVIMENTO, () => {
      gsap.fromTo(prog.current, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="k-wrap k-navw">
      <nav className="k-nav" aria-label="Principal">
        <a className="k-logo" href="#topo" aria-label="Kayo Marques, voltar ao topo"><Logo size={40} tagline={false} /></a>
        <div className="k-links">
          {(links || LINKS).map(([href, nome]) => <a key={href} href={href}>{nome}</a>)}
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
            {(links || LINKS_MENU).map(([href, nome]) => <a key={href} href={href} onClick={onFechaMenu}>{nome}</a>)}
          </motion.div>
        )}
        </AnimatePresence>
        <span className="k-navprog" aria-hidden="true"><i ref={prog} /></span>
      </nav>
    </div>
  );
}
