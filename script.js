document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for hero section
    const typingText = document.querySelector('.typing-text');
    const typingSubtext = document.querySelector('.typing-subtext');
    const mainText = "Professional Phone Repair Services";
    const subText = "Expert repairs for iPhone and Samsung devices";
    let mainIndex = 0;
    let subIndex = 0;
    let isMainComplete = false;

    function typeMainText() {
        if (mainIndex < mainText.length) {
            typingText.textContent = mainText.substring(0, mainIndex + 1);
            mainIndex++;
            setTimeout(typeMainText, 100);
        } else {
            isMainComplete = true;
            setTimeout(typeSubText, 500);
        }
    }

    function typeSubText() {
        if (subIndex < subText.length) {
            typingSubtext.textContent = subText.substring(0, subIndex + 1);
            subIndex++;
            setTimeout(typeSubText, 50);
        }
    }

    // Start typing animation
    setTimeout(typeMainText, 1000);

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    // Navigation toggle with smooth animation
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Animate hamburger to X
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Enhanced scroll-based animations with Intersection Observer
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate child elements
                const cards = entry.target.querySelectorAll('.service-card, .phone-card, .accessory-card, .info-item');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Image loading animation
    const images = document.querySelectorAll('.phone-card img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // Enhanced hover animations for cards
    const cards = document.querySelectorAll('.service-card, .phone-card, .accessory-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}); 