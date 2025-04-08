import './particles.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('shadow-lg');
        return;
    }
    
    if (currentScroll > lastScroll) {
        header.classList.add('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Reveal animations for elements
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

revealElements.forEach(element => revealObserver.observe(element));