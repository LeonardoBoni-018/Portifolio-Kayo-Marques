import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// os efeitos ligados ao scroll só rodam aqui: tela de 761px ou mais não é exigência,
// mas movimento reduzido é: nesse caso cada seção já mostra o estado final no CSS
export const MQ_MOVIMENTO = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger };
