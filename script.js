// ===================================
// WEBELO DESIGNS - JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // CAROUSEL FUNCTIONALITY
    // ===================================
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.review-card'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Create indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = Array.from(document.querySelectorAll('.indicator'));

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-play carousel
        let autoplay = setInterval(nextSlide, 5000);

        // Pause on hover
        track.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });

        track.addEventListener('mouseleave', () => {
            autoplay = setInterval(nextSlide, 5000);
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoplay);
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            autoplay = setInterval(nextSlide, 5000);
        });
    }


    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===================================
    // ANIMATE ON SCROLL
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .rating-card, .showcase-item, .repair-card, .team-member, .pricing-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // ACTIVE PAGE HIGHLIGHT
    // ===================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ===================================
    // DYNAMIC YEAR IN FOOTER
    // ===================================
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', new Date().getFullYear());
        }
    });

    // ===================================
    // SHOWCASE ITEM CLICK - REDIRECT TO CLIENT SITES
    // ===================================
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const projectName = this.querySelector('h3').textContent;
            let url = '';
            
            if (projectName === 'Mostly Harmless') {
                url = 'https://mostlyharmlessyt.com';
                } else if (projectName === 'Northfield Snow Services') {
                url = 'https://northfieldsnow.com';
            } else if (projectName === 'Brennan Warner') {
                url = 'https://brennanwarner.com';
            } else if (projectName === 'YegSirens') {
                url = 'https://yegsirens.com';
            } else if (projectName === 'DracoFlareStudios') {
                url = 'https://dracoflarestudios.com';
            }
            
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window resize handler with debounce
window.addEventListener('resize', debounce(() => {
    // Recalculate carousel dimensions on resize
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(document.querySelectorAll('.review-card'));
        if (slides.length > 0) {
            const currentTransform = track.style.transform;
            const currentIndex = parseInt(currentTransform.match(/-?\d+/) || 0) / 100;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }
}, 250));
