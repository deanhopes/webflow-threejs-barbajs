import './styles/style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

gsap.registerPlugin(ScrollTrigger);

// Install Lenis
const lenis = new Lenis()

// Sync GSAP with Lenis
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// Install SplitType
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
    fixedWidth: '30vw',
    gap: '1rem',
    // snap: true,
    easing: 'ease-in-out',
    drag: true,
    arrows: false,
    pagination: false,
    // infinite: true,
});

splide.mount()

// Set up ScrollTrigger
const scrollTrigger = ScrollTrigger.create({
    trigger: '.page-wrapper', // Change '.splide' to the class/id of the element you want to use as the trigger
    start: 'top top',
    end: '+=15% +=50%',
    markers: true,
    scrub: 40, // Adjust for smoothness, 0 is instant, higher values make it smoother
    onUpdate: (self) => {
        const progress = self.progress;
        const slideCount = splide.length - 1;
        const currentSlide = Math.round(progress * slideCount);
        if (splide.index !== currentSlide) {
            splide.go(currentSlide);
        }
    }
});

// Add moved event listener to Splide
splide.on('moved', (newIndex) => {
    // Calculate new progress
    const newProgress = newIndex / (splide.length - 1);
    //Manually update ScrollTrigger's progress
    ScrollTrigger.scrollerProxy(newProgress * scrollTrigger.end);
});