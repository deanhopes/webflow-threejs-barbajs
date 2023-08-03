import './styles/style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger);

let typeSplit = new SplitType('.split-text', {
    types: 'words',
    tagName: 'span'
})

// Get the characters
let words = document.querySelectorAll('.split-text .word');

// Set initial opacity
gsap.set(words, { opacity: 0.3 });

// Set up the timeline
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#textSection',
        start: 'top +=50%',
        end: 'bottom bottom',
        // pin: true,
        scrub: 4.75,
        markers: true
    }
})
    .to(words, {
        opacity: 1, // the text ends at 100% opacity
        stagger: 0.05,
    }, 0.1);
