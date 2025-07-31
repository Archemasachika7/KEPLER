// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Global animation timeline
let masterTimeline = gsap.timeline();

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
        gsap.to(themeToggle, {
            rotation: 360,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                gsap.set(themeToggle, { rotation: 0 });
            }
        });
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Smooth theme transition
    gsap.to(body, {
        filter: "brightness(0.8)",
        duration: 0.3,
        onComplete: () => {
            body.setAttribute('data-theme', newTheme);
            updateThemeToggleIcon(newTheme);
            localStorage.setItem('theme', newTheme);
            gsap.to(body, {
                filter: "brightness(1)",
                duration: 0.3
            });
        }
    });
}

// Enhanced Loading Screen with Logo Animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingLogo = loadingScreen.querySelector('.custom-logo img');
    const loadingText = loadingScreen.querySelector('span');
    const loadingDots = loadingScreen.querySelectorAll('.loading-dots span');
    
    // Create loading animation timeline
    const loadingTL = gsap.timeline();
    
    loadingTL
        .from(loadingLogo, {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        })
        .from(loadingText, {
            opacity: 0,
            y: 20,
            duration: 0.5
        }, "-=0.5")
        .from(loadingDots, {
            scale: 0,
            stagger: 0.1,
            duration: 0.3
        }, "-=0.3");

    window.addEventListener('load', () => {
        setTimeout(() => {
            gsap.to(loadingScreen, {
                opacity: 0,
                scale: 1.1,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    loadingScreen.remove();
                    initializeMainAnimations();
                }
            });
        }, 2000);
    });
}

// Initialize Main Page Animations
function initializeMainAnimations() {
    // Hero section entrance animations
    initializeHeroAnimations();
    
    // Logo zoom effect
    initializeLogoZoom();
    
    // Parallax effects
    initializeParallaxEffects();
    
    // Magnetic effects
    initializeMagneticEffects();
    
    // Scroll-triggered animations
    initializeScrollAnimations();
    
    // Tilt effects for cards
    initializeTiltEffects();
}

// Hero Section Animations
function initializeHeroAnimations() {
    const heroLogo = document.querySelector('.hero-logo-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelector('.hero-stats');
    const heroElements = document.querySelectorAll('.fade-in-up');

    // Hero entrance timeline
    const heroTL = gsap.timeline({ delay: 0.5 });
    
    heroTL
        .from(heroLogo, {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.7)"
        })
        .from(heroTitle, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from(heroSubtitle, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4")
        .from('.typing-animation', {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, "-=0.3")
        .from(heroButtons.children, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2")
        .from(heroStats.children, {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4
        }, "-=0.2");

    // Continuous logo animation
    gsap.to(heroLogo, {
        y: -10,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });

    // Logo glow animation
    gsap.to('.logo-glow', {
        scale: 1.2,
        opacity: 0.5,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });
}

// Logo Zoom Transition Effect
function initializeLogoZoom() {
    const logoZoomSection = document.getElementById('logoZoomSection');
    const zoomLogo = logoZoomSection.querySelector('.zoom-logo img');
    const zoomContent = logoZoomSection.querySelector('.zoom-content');

    ScrollTrigger.create({
        trigger: logoZoomSection,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
            gsap.fromTo(zoomLogo, 
                {
                    scale: 0.5,
                    rotation: 0,
                    opacity: 0.5
                },
                {
                    scale: 1.2,
                    rotation: 360,
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out"
                }
            );
        }
    });

    // Zoom effect on scroll
    gsap.to(zoomLogo, {
        scale: 2,
        scrollTrigger: {
            trigger: logoZoomSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

// Advanced Parallax Effects
function initializeParallaxEffects() {
    // Background grid parallax
    gsap.to('.background-grid', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // Floating shapes parallax
    gsap.utils.toArray('.shape').forEach((shape, index) => {
        gsap.to(shape, {
            yPercent: -30 * (index + 1),
            xPercent: 10 * (index + 1),
            rotation: 360,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    });

    // Orbit rings parallax
    gsap.utils.toArray('.orbit-ring').forEach((ring, index) => {
        gsap.to(ring, {
            yPercent: -20 * (index + 1),
            rotation: 180 * (index % 2 === 0 ? 1 : -1),
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    });

    // Text parallax effects
    gsap.utils.toArray('.parallax-text').forEach(text => {
        gsap.to(text, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: text,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // General parallax layers
    gsap.utils.toArray('.parallax-layer').forEach(layer => {
        const speed = layer.dataset.speed || 0.5;
        gsap.to(layer, {
            yPercent: -50 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    });
}

// Magnetic Effect for Interactive Elements
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic-element, .magnetic-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Scroll-Triggered Animations
function initializeScrollAnimations() {
    // Feature cards animation
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.fromTo(card, 
            {
                y: 100,
                opacity: 0,
                rotationX: -15
            },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            }
        );
    });

    // Course cards animation
    gsap.utils.toArray('.course-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 80,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            }
        );
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Stats counter animation
    initializeCounterAnimation();
}

// Tilt Effects for Cards
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.set(element, { transformPerspective: 1000 });
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;

            gsap.to(element, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: "power2.out",
                transformOrigin: "center"
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// Enhanced Counter Animation
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                gsap.fromTo(counter, 
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        onUpdate: function() {
                            counter.textContent = Math.floor(this.targets()[0].innerText).toLocaleString();
                        }
                    }
                );
            }
        });
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
        }

        // Add GSAP animation to each character
        gsap.fromTo(this.element, 
            { scale: 1.1, color: "var(--accent-secondary)" },
            { scale: 1, color: "var(--accent-primary)", duration: 0.1 }
        );

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
            'JavaScript & TypeScript', 'React & Next.js', 'Python & Django', 
            'Data Structures & Algorithms', 'Machine Learning & AI', 'Cloud Computing',
            'System Design', 'Mobile Development', 'DevOps & Deployment', 'Your Dream Career'
        ];
        
        const typeWriter = new AdvancedTypeWriter(typedTextElement, words);
        
        // Start typing animation after hero loads
        setTimeout(() => {
            typeWriter.start();
        }, 2000);
    }
}

// Enhanced Course Filter System
function initializeCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button with animation
            filterBtns.forEach(b => {
                gsap.to(b, {
                    scale: 1,
                    duration: 0.2
                });
                b.classList.remove('active');
            });
            
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2
            });
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            
            courseCards.forEach((card, index) => {
                const cardLevel = card.getAttribute('data-level');
                const shouldShow = filterValue === 'all' || cardLevel === filterValue;
                
                if (shouldShow) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        delay: index * 0.05
                    });
                    card.style.display = 'block';
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                        duration: 0.3,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Enhanced Progress Bar Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            onEnter: () => {
                const randomProgress = Math.floor(Math.random() * 60) + 20;
                
                gsap.to(bar, {
                    width: `${randomProgress}%`,
                    duration: 1.5,
                    ease: "power2.out",
                    delay: Math.random() * 0.5
                });
                
                // Update lesson count
                const courseCard = bar.closest('.course-card');
                const progressText = courseCard?.querySelector('.progress-text');
                if (progressText) {
                    const totalLessons = parseInt(progressText.textContent.split('/')[1]);
                    const completedLessons = Math.floor((randomProgress / 100) * totalLessons);
                    
                    gsap.to({ value: 0 }, {
                        value: completedLessons,
                        duration: 1.5,
                        ease: "power2.out",
                        onUpdate: function() {
                            progressText.textContent = `${Math.floor(this.targets()[0].value)}/${totalLessons} lessons`;
                        }
                    });
                }
            }
        });
    });
}

// Enhanced Navbar Effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo');
    
    ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            const progress = self.progress;
            const opacity = Math.min(progress * 10, 0.95);
            
            gsap.to(navbar, {
                background: document.body.getAttribute('data-theme') === 'dark' 
                    ? `rgba(15, 23, 42, ${opacity})` 
                    : `rgba(255, 255, 255, ${opacity})`,
                duration: 0.3
            });
        }
    });

    // Logo scale effect on scroll
    ScrollTrigger.create({
        start: "top top",
        end: "200px top",
        onUpdate: (self) => {
            const scale = 1 - (self.progress * 0.1);
            gsap.to(navLogo, {
                scale: scale,
                duration: 0.3
            });
        }
    });
}

// Scroll Indicator Animation
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        ScrollTrigger.create({
            start: "top top",
            end: "100px top",
            onUpdate: (self) => {
                gsap.to(scrollIndicator, {
                    opacity: 1 - self.progress,
                    y: self.progress * 20,
                    duration: 0.3
                });
            }
        });
    }
}

// Demo Video Player
function playDemoVideo() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(20px);
        opacity: 0;
    `;
    
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: var(--bg-card);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: var(--shadow-xl);
        transform: scale(0.8);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 900px;
        height: 500px;
        background: var(--accent-gradient);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        gap: 1rem;
    `;
    placeholder.innerHTML = `
        <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
        <div>Interactive Demo Video</div>
        <div style="font-size: 1rem; opacity: 0.8;">Coming Soon - Experience Kepler's Full Platform</div>
    `;
    
    // Animation entrance
    gsap.set(modal, { opacity: 0 });
    gsap.set(videoContainer, { scale: 0.5, rotation: -10 });
    
    closeBtn.addEventListener('click', () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => document.body.removeChild(modal)
        });
        gsap.to(videoContainer, {
            scale: 0.5,
            rotation: 10,
            duration: 0.3
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    videoContainer.appendChild(closeBtn);
    videoContainer.appendChild(placeholder);
    modal.appendChild(videoContainer);
    document.body.appendChild(modal);
    
    // Animate entrance
    gsap.to(modal, { opacity: 1, duration: 0.3 });
    gsap.to(videoContainer, { 
        scale: 1, 
        rotation: 0, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
    });
}

// Smooth scrolling utility
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: section, offsetY: 80 },
            ease: "power2.inOut"
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLoadingScreen();
    initializeTypingAnimation();
    initializeCourseFilters();
    initializeProgressBars();
    initializeNavbarEffects();
    initializeScrollIndicator();
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        updateThemeToggleIcon(theme);
    }
});

// Performance optimization - Cleanup on page unload
window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");
});
