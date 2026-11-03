import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Draggable, InertiaPlugin, Flip);

export { gsap, Draggable, InertiaPlugin, Flip };
