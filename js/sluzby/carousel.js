// Gallery Carousel for Service Pages
document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.getElementById('gallerySlider');
    const gallerySlides = Array.from(gallerySlider.children);
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryDotsContainer = document.getElementById('galleryDots');
    
    let currentGallerySlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    // Create dots
    for (let i = 0; i < gallerySlides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showGallerySlide(i));
        galleryDotsContainer.appendChild(dot);
    }

    const galleryDots = galleryDotsContainer.children;

    function showGallerySlide(n) {
        currentGallerySlide = (n + gallerySlides.length) % gallerySlides.length;
        
        const slideWidth = gallerySlides[0].offsetWidth;
        const translateX = -currentGallerySlide * slideWidth;
        gallerySlider.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        for (let i = 0; i < galleryDots.length; i++) {
            galleryDots[i].classList.remove('active');
        }
        galleryDots[currentGallerySlide].classList.add('active');
    }

    // Touch swipe support
    gallerySlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isDragging = true;
    }, {passive: true});

    gallerySlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, {passive: false});

    gallerySlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        isDragging = false;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showGallerySlide(currentGallerySlide + 1);
            } else {
                showGallerySlide(currentGallerySlide - 1);
            }
        }
    }

    // Button navigation
    if (galleryPrev && galleryNext) {
        galleryPrev.addEventListener('click', () => showGallerySlide(currentGallerySlide - 1));
        galleryNext.addEventListener('click', () => showGallerySlide(currentGallerySlide + 1));
    }

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            showGallerySlide(currentGallerySlide);
        }, 250);
    });
});
