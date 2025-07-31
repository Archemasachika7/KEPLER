// Enhanced Theme Toggle with Smooth Transitions
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    document.body.setAttribute('data-theme', theme);
    updateThemeToggleIcon(theme);
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Smooth theme transition
    body.style.transition = 'all 0.3s ease';
    body.setAttribute('data-theme', newTheme);
    updateThemeToggleIcon(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Enhanced Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
                initializeMainAnimations();
            }, 800);
        }, 2000);
    });
}

// Initialize Main Animations
function initializeMainAnimations() {
    initializeParallaxEffects();
    initializeMagneticEffects();
    initializeScrollAnimations();
    initializeTiltEffects();
    initializeZoomEffects();
}

// Advanced Parallax Effects
function initializeParallaxEffects() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Background layers parallax
        const bgLayers = document.querySelectorAll('.bg-layer');
        bgLayers.forEach((layer, index) => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });

        // Particles parallax
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.001 + index) * 20;
            particle.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });

        // Orbit rings parallax
        const rings = document.querySelectorAll('.orbit-ring');
        rings.forEach((ring, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            ring.style.transform = `translate(-50%, -50%) translateY(${yPos}px)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    updateParallax();
}

// Magnetic Effect for Interactive Elements
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic-element, .magnetic-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s ease';
            element.style.transform = 'scale(1.05)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = 'scale(1) translate(0, 0)';
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transition = 'transform 0.1s ease';
            element.style.transform = `scale(1.05) translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
    });
}

// Scroll-based Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .course-card, .testimonial-card, .path-step'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) rotateX(-10deg)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transformStyle = 'preserve-3d';
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -15;
            const rotateY = (x - centerX) / centerX * 15;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Zoom Effects
function initializeZoomEffects() {
    const heroLogo = document.querySelector('.hero-logo');
    const ctaLogo = document.querySelector('.cta-logo img');
    
    // Hero logo zoom on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.001;
        const scale = 1 + rate;
        
        if (heroLogo && scrolled < window.innerHeight) {
            heroLogo.style.transform = `scale(${Math.min(scale, 2)}) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Logo hover zoom effects
    [heroLogo, ctaLogo].forEach(logo => {
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.transition = 'transform 0.3s ease';
                logo.style.transform = logo.style.transform + ' scale(1.1)';
            });

            logo.addEventListener('mouseleave', () => {
                logo.style.transition = 'transform 0.3s ease';
                logo.style.transform = logo.style.transform.replace(' scale(1.1)', '');
            });
        }
    });
}

// Enhanced Typing Animation
class AdvancedTypeWriter {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetweenWords = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetweenWords = delayBetweenWords;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            // Add sparkle effect
            this.element.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.5)';
            setTimeout(() => {
                this.element.style.textShadow = 'none';
            }, 100);
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            typeSpeed = this.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    start() {
        this.type();
    }
}

function initializeTypingAnimation() {
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const words = [
            'JavaScript', 'Master DSA', 'React & Node.js', 'Python & Django',
            'Machine Learning', 'Crack Your First Internship', 'System Design',
            'Cloud Computing', 'Mobile Development', 'Your Dream Career'
        ];
        
        const typeWriter = new AdvancedTypeWriter(typedTextElement, words);
        setTimeout(() => typeWriter.start(), 1000);
    }
}

// Enhanced Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const counter = entry.target;
                const increment = target / 200;
                let count = 0;
                
                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count).toLocaleString();
                        
                        // Add glow effect
                        counter.style.textShadow = '0 0 20px rgba(99, 102, 241, 0.6)';
                        setTimeout(() => {
                            counter.style.textShadow = 'none';
                        }, 50);
                        
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Course Filter System
function initializeCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            
            courseCards.forEach((card, index) => {
                const cardLevel = card.getAttribute('data-level');
                const shouldShow = filterValue === 'all' || cardLevel === filterValue;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) rotateX(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) rotateX(-10deg)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Progress Bar Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const randomProgress = Math.floor(Math.random() * 60) + 20;
                
                setTimeout(() => {
                    progressBar.style.width = randomProgress + '%';
                    
                    // Add shimmer effect
                    progressBar.style.background = `
                        linear-gradient(90deg, 
                            var(--accent-primary), 
                            var(--accent-secondary), 
                            var(--accent-tertiary),
                            var(--accent-primary)
                        )
                    `;
                    progressBar.style.backgroundSize = '200% 100%';
                    progressBar.style.animation = 'shimmer 2s ease-in-out';
                    
                    // Update lesson count
                    const courseCard = progressBar.closest('.course-card');
                    const progressText = courseCard?.querySelector('.course-progress span');
                    if (progressText) {
                        const totalLessons = parseInt(progressText.textContent.split('/')[1]);
                        const completedLessons = Math.floor((randomProgress / 100) * totalLessons);
                        progressText.textContent = `${completedLessons}/${totalLessons} lessons`;
                    }
                }, Math.random() * 500);
                
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Navbar Effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo');
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Background opacity
        const opacity = Math.min(scrollTop / 100, 0.95);
        const theme = document.body.getAttribute('data-theme');
        const bgColor = theme === 'dark' 
            ? `rgba(15, 23, 42, ${opacity})` 
            : `rgba(255, 255, 255, ${opacity})`;
        
        navbar.style.background = bgColor;
        
        // Hide/show navbar
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Logo scale effect
        const scale = Math.max(1 - (scrollTop / 1000), 0.8);
        navLogo.style.transform = `scale(${scale})`;
        
        lastScrollTop = scrollTop;
    });
}

// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const opacity = Math.max(1 - (scrolled / 300), 0);
            scrollIndicator.style.opacity = opacity;
        });
    }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add shimmer animation to CSS dynamically
function addShimmerAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLoadingScreen();
    initializeTypingAnimation();
    animateCounters();
    initializeCourseFilters();
    initializeProgressBars();
    initializeNavbarEffects();
    initializeScrollIndicator();
    addShimmerAnimation();
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        updateThemeToggleIcon(theme);
    }
});

// Performance optimization
window.addEventListener('beforeunload', () => {
    // Cleanup any running animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
});
