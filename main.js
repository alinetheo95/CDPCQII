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

// New fade section after GIFs with discrete scrolling
const fadeSection2 = document.querySelector('.fade-scroll-section-2');
const fadeLayers2 = document.querySelectorAll('.fade-layer-2');
const nextSubtitle = document.querySelector('.fade-scroll-section-2 + .subtitle-section');

let currentLayerIndex = -1;

window.addEventListener('scroll', () => {
    if (!fadeSection2) return;
    
    const sectionTop = fadeSection2.offsetTop;
    const sectionHeight = fadeSection2.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    const progress = (scrollPos - sectionTop) / sectionHeight;
    
    // Calculate which layer should be visible based on progress
    const targetLayer = Math.floor(progress * fadeLayers2.length);
    
    // Only update if we've moved to a different layer
    if (targetLayer !== currentLayerIndex && targetLayer >= 0 && targetLayer < fadeLayers2.length) {
        currentLayerIndex = targetLayer;
        
        // Show all layers up to and including current layer
        fadeLayers2.forEach((layer, index) => {
            if (index <= currentLayerIndex) {
                layer.classList.add('active');
            } else {
                layer.classList.remove('active');
            }
        });
    }
    
    // Hide all if before or after section
    if (progress < 0 || progress >= 1) {
        fadeLayers2.forEach(layer => layer.classList.remove('active'));
        currentLayerIndex = -1;
    }
    
    // Fade out all layers when scrolling into the next subtitle section
    if (nextSubtitle) {
        const subtitleTop = nextSubtitle.offsetTop;
        const fadeOutStart = subtitleTop - window.innerHeight;
        
        if (scrollPos > fadeOutStart) {
            const fadeProgress = (scrollPos - fadeOutStart) / (window.innerHeight / 2);
            const opacity = Math.max(0, 1 - fadeProgress);
            
            fadeLayers2.forEach(layer => {
                layer.style.opacity = opacity;
            });
        } else {
            // Reset opacity when not in fade-out zone
            fadeLayers2.forEach(layer => {
                if (layer.classList.contains('active')) {
                    layer.style.opacity = 1;
                }
            });
        }
    }
});

const videoOverlaySection = document.querySelector('.video-overlay-section');
const baseImage = document.querySelector('.base-image');
const overlayGif = document.querySelector('.overlay-gif');

window.addEventListener('scroll', () => {
    if (!videoOverlaySection) return;
    
    const sectionTop = videoOverlaySection.offsetTop;
    const sectionHeight = videoOverlaySection.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    const progress = (scrollPos - sectionTop) / sectionHeight;
    
    // Show both image and GIF together when in section
    if (progress > 0 && progress < 1) {
        baseImage.classList.add('active');
        overlayGif.classList.add('active');
    } else {
        baseImage.classList.remove('active');
        overlayGif.classList.remove('active');
    }
});