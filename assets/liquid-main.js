/**
 * 🌊 OPTIMIZED LIQUID GLASS PORTFOLIO - SIMPLIFIED JAVASCRIPT
 * Essential functionality with performance focus
 * Author: Khoasoma
 * Version: 3.0 - Optimized
 */

class OptimizedLiquidPortfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPortfolio());
        } else {
            this.setupPortfolio();
        }
    }

    setupPortfolio() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupAccessibility();
        this.setupPerformanceOptimizations();
        
        console.log('🌊 Optimized Liquid Portfolio initialized!');
    }

    /* ========================================
       🧭 NAVIGATION
       ======================================== */
    
    setupNavigation() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav state
                    this.updateActiveNav(link);
                }
            });
        });

        // Update navigation on scroll
        this.setupScrollSpy();
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                    
                    if (activeLink) {
                        this.updateActiveNav(activeLink);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    /* ========================================
       📜 SCROLL EFFECTS
       ======================================== */
    
    setupScrollEffects() {
        // Fade in animation for elements
        const animateElements = document.querySelectorAll('.glass-effect, .project-card, .skill-card');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initial setup for fade animation
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            fadeObserver.observe(element);
        });

        // Simple parallax for background elements
        this.setupLightParallax();
    }

    setupLightParallax() {
        const parallaxElements = document.querySelectorAll('#home::before');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.1;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${parallax}px, 0)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Only add scroll listener if user prefers motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.addEventListener('scroll', requestTick, { passive: true });
        }
    }

    /* ========================================
       📝 FORM HANDLING
       ======================================== */
    
    setupFormHandling() {
        const contactForm = document.querySelector('form');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        // Enhanced form UX
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.handleInputFocus(input));
            input.addEventListener('blur', () => this.handleInputBlur(input));
        });
    }

    handleFormSubmission(form) {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showFormMessage('Thank you! Your message has been sent.', 'success');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    }

    handleInputFocus(input) {
        input.parentElement.classList.add('focused');
    }

    handleInputBlur(input) {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    }

    showFormMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            text-align: center;
            animation: fadeIn 0.3s ease-out;
        `;

        const form = document.querySelector('form');
        form.appendChild(messageElement);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.remove();
            }
        }, 5000);
    }

    /* ========================================
       ♿ ACCESSIBILITY
       ======================================== */
    
    setupAccessibility() {
        // Enhanced keyboard navigation
        this.setupKeyboardNavigation();
        
        // Skip to content link
        this.addSkipLink();
        
        // ARIA live regions for dynamic content
        this.setupAriaLiveRegions();
    }

    setupKeyboardNavigation() {
        // Trap focus in modals (if any)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAnyModals();
            }
        });

        // Enhanced focus management
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('keyboard-focus');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('keyboard-focus');
            });
        });
    }

    addSkipLink() {
        if (document.querySelector('.skip-link')) return;

        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary);
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
            skipLink.classList.remove('sr-only');
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
            skipLink.classList.add('sr-only');
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add ID to main content if it doesn't exist
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    setupAriaLiveRegions() {
        // Create announcement region for dynamic content
        if (!document.querySelector('[aria-live]')) {
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.id = 'live-region';
            document.body.appendChild(liveRegion);
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    closeAnyModals() {
        // Close any open modals/overlays
        const modals = document.querySelectorAll('.modal, .overlay');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    /* ========================================
       🚀 PERFORMANCE OPTIMIZATIONS
       ======================================== */
    
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize animations for low-end devices
        this.optimizeAnimations();
        
        // Handle visibility changes
        this.setupVisibilityHandling();
        
        // Performance monitoring
        this.monitorPerformance();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.classList.add('reduced-motion');
        }

        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('[style*="animation"]');
            
            animations.forEach(element => {
                if (document.hidden) {
                    element.style.animationPlayState = 'paused';
                } else {
                    element.style.animationPlayState = 'running';
                }
            });
        });
    }

    setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause any running operations
                this.pauseOperations();
            } else {
                // Resume operations
                this.resumeOperations();
            }
        });
    }

    pauseOperations() {
        // Pause any continuous operations when tab is hidden
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    resumeOperations() {
        // Resume operations when tab becomes visible
        // Restart any paused animations or operations
    }

    monitorPerformance() {
        if ('performance' in window && 'timing' in window.performance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const timing = window.performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
                    
                    console.log(`🚀 Performance Metrics:
                        - Total Load Time: ${loadTime}ms
                        - DOM Ready: ${domReady}ms
                        - Interactive: ${timing.domInteractive - timing.navigationStart}ms`);
                    
                    // Log if load time is concerning
                    if (loadTime > 3000) {
                        console.warn('⚠️ Load time is over 3 seconds. Consider further optimizations.');
                    }
                }, 0);
            });
        }
    }

    /* ========================================
       🔧 UTILITY METHODS
       ======================================== */
    
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

/* ========================================
   🚀 INITIALIZE APPLICATION
   ======================================== */

// Initialize the optimized portfolio
window.optimizedPortfolio = new OptimizedLiquidPortfolio();

// Add basic CSS animations via JavaScript for critical path
const criticalCSS = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.keyboard-focus {
    outline: 2px solid var(--primary) !important;
    outline-offset: 2px !important;
}

.form-message {
    animation: fadeIn 0.3s ease-out;
}

.reduced-motion *,
.reduced-motion *::before,
.reduced-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}
`;

// Inject critical CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = criticalCSS;
document.head.appendChild(styleSheet);

// Error handling
window.addEventListener('error', (e) => {
    console.error('💥 JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Log success
console.log('🌊 Optimized Liquid Portfolio loaded successfully!');