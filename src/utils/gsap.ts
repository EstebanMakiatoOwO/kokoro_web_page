import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger once, all components import from here
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
