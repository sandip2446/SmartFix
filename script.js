document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for hero section
    const typingText = document.querySelector('.typing-text');
    const typingSubtext = document.querySelector('.typing-subtext');
    
    const headings = [
        {
            main: "Professional Phone Repair Services",
            sub: "Expert repairs for iPhone and Samsung devices"
        },
        {
            main: "Quality Used Phones Available",
            sub: "Certified pre-owned devices with warranty"
        },
        {
            main: "Premium Accessories & Cases",
            sub: "Protect your device with style"
        },
        {
            main: "Fast & Reliable Service",
            sub: "Same day repairs for most issues"
        },
        {
            main: "Repair at Your Doorstep!",
            sub: "Fix your phone in the comfort of your home"
        }
    ];

    let currentIndex = 0;
    let isDeleting = false;
    let mainText = '';
    let subText = '';
    let mainIndex = 0;
    let subIndex = 0;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 2000;

    function typeText() {
        const currentHeading = headings[currentIndex];
        
        if (!isDeleting) {
            // Typing
            if (mainIndex < currentHeading.main.length) {
                mainText = currentHeading.main.substring(0, mainIndex + 1);
                typingText.textContent = mainText;
                mainIndex++;
                setTimeout(typeText, typingSpeed);
            } else if (subIndex < currentHeading.sub.length) {
                subText = currentHeading.sub.substring(0, subIndex + 1);
                typingSubtext.textContent = subText;
                subIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Finished typing both texts
                isDeleting = true;
                setTimeout(typeText, pauseTime);
            }
        } else {
            // Deleting
            if (subText.length > 0) {
                subText = currentHeading.sub.substring(0, subText.length - 1);
                typingSubtext.textContent = subText;
                setTimeout(typeText, deletingSpeed);
            } else if (mainText.length > 0) {
                mainText = currentHeading.main.substring(0, mainText.length - 1);
                typingText.textContent = mainText;
                setTimeout(typeText, deletingSpeed);
            } else {
                // Finished deleting both texts
                isDeleting = false;
                mainIndex = 0;
                subIndex = 0;
                currentIndex = (currentIndex + 1) % headings.length;
                setTimeout(typeText, 500);
            }
        }
    }

    // Start the typing animation
    setTimeout(typeText, 1000);

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

    // Sliders functionality
    function setupSlider(sliderId, leftButtonId, rightButtonId) {
        const slider = document.getElementById(sliderId);
        const leftButton = document.getElementById(leftButtonId);
        const rightButton = document.getElementById(rightButtonId);

        if (slider && leftButton && rightButton) {
            let scrollAmount = 0;
            const slideWidth = slider.querySelector('.slide-item').offsetWidth;
            const maxScroll = slider.scrollWidth - slider.clientWidth;

            // Function to update arrow visibility
            function updateArrowVisibility() {
                leftButton.style.display = scrollAmount <= 0 ? 'none' : 'flex';
                rightButton.style.display = scrollAmount >= maxScroll ? 'none' : 'flex';
            }

            // Initial arrow visibility
            updateArrowVisibility();

            leftButton.addEventListener('click', () => {
                scrollAmount = Math.max(scrollAmount - slideWidth, 0);
                slider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                updateArrowVisibility();
            });

            rightButton.addEventListener('click', () => {
                scrollAmount = Math.min(scrollAmount + slideWidth, maxScroll);
                slider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                updateArrowVisibility();
            });

            // Update scroll amount and arrow visibility on manual scroll
            slider.addEventListener('scroll', () => {
                scrollAmount = slider.scrollLeft;
                updateArrowVisibility();
            });

            // Update on window resize
            window.addEventListener('resize', () => {
                const newSlideWidth = slider.querySelector('.slide-item').offsetWidth;
                const newMaxScroll = slider.scrollWidth - slider.clientWidth;
                scrollAmount = Math.min(scrollAmount, newMaxScroll);
                updateArrowVisibility();
            });
        }
    }

    // Setup all sliders
    setupSlider('phonesSlider', 'phonesSliderLeft', 'phonesSliderRight');
    setupSlider('casesSlider', 'casesSliderLeft', 'casesSliderRight');
    setupSlider('screenSlider', 'screenSliderLeft', 'screenSliderRight');
    setupSlider('chargersSlider', 'chargersSliderLeft', 'chargersSliderRight');
    setupSlider('cablesSlider', 'cablesSliderLeft', 'cablesSliderRight');

    // Card Flip Animation - Unified handler for all card types
    function setupCardFlip() {
        // Handle all types of cards (phones, accessories, and cables)
        const allCards = document.querySelectorAll('.phone-card, .accessory-card, .cable-card');
        
        allCards.forEach(card => {
            const detailButton = card.querySelector('.detail-button');
            const closeButton = card.querySelector('.close-details');
            
            if (detailButton) {
                detailButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.add('flipped');
                });
            }
            
            if (closeButton) {
                closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.remove('flipped');
                });
            }
        });
    }

    // Initialize card flip functionality
    setupCardFlip();
}); 