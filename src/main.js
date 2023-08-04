import './styles/style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

gsap.registerPlugin(ScrollTrigger);

let typeSplit = new SplitType('.split-text', {
    types: 'words',
    tagName: 'span'
})

// Get the characters
let words = document.querySelectorAll('.split-text .word');

// Set initial opacity
gsap.set(words, { opacity: 0.3 });

// Set up the timeline for words opacity
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#textSection',
        start: 'top +=50%',
        end: 'bottom bottom',
        scrub: 4.75,
        // markers: true
    }
})
    .to(words, {
        opacity: 1,
        stagger: 0.05,
    }, 0.1);


var splide = new Splide('.splide', {
    fixedWidth: '40vw',
    fixedHeight: '40vw',
    gap: '1rem',
    rewind: true,
    rewindByDrag: true,
    perMove: 2,
    autoplay: true,
    interval: 3000,
    easing: 'cubic-bezier(.42,.65,.27,.99)',
    drag: true,
    pagination: false,
    infinite: true,
});

var bar = splide.root.querySelector('.carousel-progress-bar');
splide.on('mounted move', function () {
    var end = splide.Components.Controller.getEnd() - 1;
    var rate = Math.min((splide.index) / end, 1);
    bar.style.width = String(rate * 100) + '%';
});

splide.mount()
