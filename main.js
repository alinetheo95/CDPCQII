// Layers 1 and 2 fade in
const fadeSection = document.querySelector('.fade-scroll-section');
const fadeLayers = document.querySelectorAll('.fade-layer');
const staticSection = document.querySelector('.layer-section');

window.addEventListener('scroll', () => {
    if (!fadeSection) return;
    
    const sectionTop = fadeSection.offsetTop;
    const sectionHeight = fadeSection.offsetHeight;
    const scrollPos = window.scrollY;
    
    const progress = (scrollPos - sectionTop) / sectionHeight;
    
    // Fade in layers 1 and 2
    fadeLayers.forEach((layer, index) => {
        const layerStart = index / fadeLayers.length;
        
        if (progress >= layerStart) {
            layer.classList.add('active');
        } else {
            layer.classList.remove('active');
        }
    });
    
    // Fade out layers 1 and 2 when scrolling into static layer 3
    if (staticSection) {
        const staticTop = staticSection.offsetTop;
        const fadeOutStart = staticTop - window.innerHeight;
        
        if (scrollPos > fadeOutStart) {
            const fadeProgress = (scrollPos - fadeOutStart) / (window.innerHeight / 2);
            const opacity = Math.max(0, 1 - fadeProgress);
            
            fadeLayers.forEach(layer => {
                layer.style.opacity = opacity;
            });
        }
    }
});

const gifSection = document.querySelector('.gif-scroll-section');
const staticLayer = document.querySelector('.background-grid');
const gifContainers = document.querySelectorAll('.gif-container');

let lastScrollTime = 0;
const scrollThrottle = 100;

window.addEventListener('scroll', () => {
    if (!gifSection) return;
    
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottle) return;
    lastScrollTime = now;
    
    const sectionTop = gifSection.offsetTop;
    const sectionHeight = gifSection.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    const progress = (scrollPos - sectionTop) / sectionHeight;
    
    console.log('Progress:', progress);
    
    if (progress < 0) {
        staticLayer.classList.remove('active');
        gifContainers.forEach(c => c.classList.remove('active'));
    } else if (progress > 1) {
        staticLayer.classList.remove('active');
        gifContainers.forEach(c => c.classList.remove('active'));
    } else if (progress < 0.25) {
        // Show background + GIF 1 immediately
        staticLayer.classList.add('active');
        gifContainers[0].classList.add('active');
        gifContainers[1].classList.remove('active');
        gifContainers[2].classList.remove('active');
    } else if (progress < 0.4) {
        // Transition: just background
        staticLayer.classList.add('active');
        gifContainers.forEach(c => c.classList.remove('active'));
    } else if (progress < 0.6) {
        // Show GIF 2
        staticLayer.classList.add('active');
        gifContainers[0].classList.remove('active');
        gifContainers[1].classList.add('active');
        gifContainers[2].classList.remove('active');
    } else if (progress < 0.75) {
        // Transition: just background
        staticLayer.classList.add('active');
        gifContainers.forEach(c => c.classList.remove('active'));
    } else {
        // Show GIF 3
        staticLayer.classList.add('active');
        gifContainers[0].classList.remove('active');
        gifContainers[1].classList.remove('active');
        gifContainers[2].classList.add('active');
    }
});