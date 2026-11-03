const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', 'aria-hidden': true };

export const IconSol = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" strokeWidth="1.8" {...base}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></svg>
);

export const IconLua = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinejoin="round" {...base}><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" /></svg>
);

export const IconMenu = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" strokeWidth="1.8" {...base}><path d="M4 8h16M4 16h16" /></svg>
);

export const IconEsq = ({ size = 16, w = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={w} strokeLinejoin="round" {...base}><path d="M15 5l-7 7 7 7" /></svg>
);

export const IconDir = ({ size = 16, w = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={w} strokeLinejoin="round" {...base}><path d="M9 5l7 7-7 7" /></svg>
);

export const IconSalvar = ({ cheio }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={cheio ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M6 3.5h12v17l-6-4.2-6 4.2z" /></svg>
);

export const IconPlay = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" /></svg>
);

export const IconPausa = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
);

export const IconTocar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
);

export const IconEnviar = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" {...base}><path d="M21 3L10.5 13.5" /><path d="M21 3l-6.5 18-4-7.5L3 9.5z" /></svg>
);

export const IconWhats = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.9" strokeLinejoin="round" {...base}><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" /></svg>
);

export const IconFechar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
