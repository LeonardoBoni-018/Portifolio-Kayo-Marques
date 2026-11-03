// Revelação ao rolar (.k-rv) e controle dos vídeos (video.k-v).
// Só toca o vídeo visível e do slide ativo (economiza bateria e dados no celular).

let io = null;
let vio = null;
let vistos = new WeakSet();
let ativo = false;
let reduz = false;

export const reduzMovimento = () => reduz;

export function iniciarMidia() {
  reduz = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  vistos = new WeakSet();
  ativo = true;
  try {
    if ('IntersectionObserver' in window) {
      if (!reduz) {
        io = new IntersectionObserver((es) => {
          es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      }
      vio = new IntersectionObserver((es) => { es.forEach((e) => { e.target.__vis = e.isIntersecting; }); tocar(); }, { threshold: 0.25 });
    }
  } catch (e) { /* sem observers: tudo aparece e os vídeos tocam */ }
  sincronizarMidia();
  return !!io;
}

export function pararMidia() {
  if (io) io.disconnect();
  if (vio) vio.disconnect();
  io = null; vio = null; ativo = false;
}

// chamada depois de cada render que pode trocar slides ou montar elementos novos
export function sincronizarMidia() {
  if (!ativo) return;
  try {
    if (io) document.querySelectorAll('.k-rv').forEach((el) => { if (!vistos.has(el)) { vistos.add(el); io.observe(el); } });
    document.querySelectorAll('video.k-v').forEach((v) => {
      v.muted = true; v.defaultMuted = true;
      if (!vistos.has(v)) { vistos.add(v); if (vio) vio.observe(v); else v.__vis = true; }
    });
  } catch (e) { /* ignora */ }
  tocar();
}

function tocar() {
  try {
    document.querySelectorAll('video.k-v').forEach((v) => {
      const sl = v.closest('.k-sl');
      const on = !sl || sl.classList.contains('on');
      if (v.__vis && on && !reduz) { if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } }
      else if (!v.paused) v.pause();
    });
  } catch (e) { /* ignora */ }
}
