/**
 * Enhanced Smooth Scroll Animation
 * Supports multiple animation styles with buttery smooth transitions
 */
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
    staggerDelay: 100,
    enableParallax: true,
    parallaxIntensity: 0.3
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupScrollAnimations();
    setupSmoothScroll();
    if (CONFIG.enableParallax) {
      setupParallaxEffects();
    }
  }

  // Main scroll animation using Intersection Observer
  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-fade, .fade-up, .fade-in, .slide-in-left, .slide-in-right');
    
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger effect for siblings
          const siblings = entry.target.parentElement?.querySelectorAll('.fade-up, .scroll-fade');
          const siblingIndex = siblings ? Array.from(siblings).indexOf(entry.target) : 0;
          const delay = siblingIndex * CONFIG.staggerDelay;

          requestAnimationFrame(() => {
            setTimeout(() => {
              entry.target.classList.add('show', 'in-view');
              entry.target.style.transitionDelay = '0s'; // Reset delay after animation
            }, delay);
          });

          // Unobserve after animation (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.threshold,
      rootMargin: CONFIG.rootMargin
    });

    animatedElements.forEach(el => {
      // Set initial state
      el.style.willChange = 'transform, opacity';
      observer.observe(el);
    });
  }

  // Enhanced smooth scroll for anchor links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        // Calculate offset for fixed navbar
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        // Smooth scroll with custom easing
        smoothScrollTo(targetPosition, 800);
      });
    });
  }

  // Custom smooth scroll function with easing
  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Parallax effect for background elements
  function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.bg-image, .hero-visual, .avatar-glow');
    
    let ticking = false;
    
    function updateParallax() {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = el.classList.contains('bg-image') ? 0.15 : CONFIG.parallaxIntensity;
        const yPos = scrollY * speed;
        
        requestAnimationFrame(() => {
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });
      
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
  }
})();