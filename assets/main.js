/**
 * 🌊 SIMPLE LIQUID GLASS PORTFOLIO
 * Optimized JavaScript for performance and simplicity
 * Author: Khoasoma
 * Date: 2025-07-01
 */

// ========================================
// 🎯 MAIN APPLICATION CLASS
// ========================================
class LiquidPortfolio {
  constructor() {
    this.isLoaded = false;
    this.isMobile = window.innerWidth <= 768;
    this.theme = localStorage.getItem('theme') || 'dark';
    this.scrollY = 0;
    
    this.init();
  }

  async init() {
    try {
      // Set initial theme
      this.setTheme(this.theme);
      
      // Initialize components
      this.initNavigation();
      this.initHero();
      this.initScrollEffects();
      this.initTheme();
      this.initContactForm();
      this.initMobileMenu();
      this.initScrollToTop();
      
      // Hide loading screen
      this.hideLoading();
      
      // Start animations
      this.startAnimations();
      
      this.isLoaded = true;
      console.log('🌊 Liquid Portfolio loaded successfully!');
      
    } catch (error) {
      console.error('❌ Error initializing portfolio:', error);
      this.hideLoading();
    }
  }

  // ========================================
  // 🎬 LOADING MANAGEMENT
  // ========================================
  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => loading.remove(), 500);
      }, 1000);
    }
  }

  // ========================================
  // 🧭 NAVIGATION
  // ========================================
  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll navigation
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          // Update active nav
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          
          // Smooth scroll
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          this.closeMobileMenu();
        }
      });
    });

    // Scroll spy
    this.initScrollSpy(sections, navLinks);
  }

  initScrollSpy(sections, navLinks) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          
          navLinks.forEach(link => link.classList.remove('active'));
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ========================================
  // 📱 MOBILE MENU
  // ========================================
  initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    
    if (navMenu && mobileToggle) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  }

  // ========================================
  // 🏠 HERO SECTION
  // ========================================
  initHero() {
    this.initTypingAnimation();
    this.initStatsCounter();
  }

  initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const texts = [
      'Creative Developer',
      'Minecraft Expert',
      'Server Architect',
      'Performance Optimizer',
      'Plugin Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalNumber = parseInt(target.getAttribute('data-target'));
          this.animateCounter(target, finalNumber);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16); // ~60fps
  }

  // ========================================
  // 📜 SCROLL EFFECTS
  // ========================================
  initScrollEffects() {
    this.initScrollAnimations();
    this.initParallax();
    this.initNavbarScroll();
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    this.scrollY = window.pageYOffset;
    this.updateScrollToTop();
  }

  initScrollAnimations() {
    const elements = document.querySelectorAll('.glass-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
  }

  initParallax() {
    const orbs = document.querySelectorAll('.liquid-orb');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    });
  }

  initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
          navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // ========================================
  // 🌙 THEME SYSTEM
  // ========================================
  initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    this.updateThemeIcon();
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(this.theme);
    localStorage.setItem('theme', this.theme);
    this.updateThemeIcon();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    if (this.theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }

  // ========================================
  // 📬 CONTACT FORM
  // ========================================
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleFormSubmit(form);
    });

    // Input validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateInput(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  async handleFormSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all inputs
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Show loading state
    this.setLoadingState(submitBtn, true);

    try {
      // Simulate API call
      await this.simulateFormSubmission(formData);
      
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
    } catch (error) {
      this.showNotification('Something went wrong. Please try again.', 'error');
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';

    if (input.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email';
      }
    }

    if (!isValid) {
      this.showInputError(input, message);
    } else {
      this.clearError(input);
    }

    return isValid;
  }

  showInputError(input, message) {
    this.clearError(input);
    
    const error = document.createElement('div');
    error.className = 'input-error';
    error.textContent = message;
    error.style.cssText = `
      color: var(--accent-red);
      font-size: var(--font-size-sm);
      margin-top: var(--space-xs);
    `;
    
    input.style.borderColor = 'var(--accent-red)';
    input.parentNode.appendChild(error);
  }

  clearError(input) {
    const error = input.parentNode.querySelector('.input-error');
    if (error) {
      error.remove();
    }
    input.style.borderColor = '';
  }

  setLoadingState(button, loading) {
    if (loading) {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
      button.disabled = false;
      button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }

  async simulateFormSubmission(formData) {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for demo
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 2000);
    });
  }

  // ========================================
  // 🔝 SCROLL TO TOP
  // ========================================
  initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  updateScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    if (this.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  // ========================================
  // 🔔 NOTIFICATIONS
  // ========================================
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 100px;
        right: var(--space-lg);
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: var(--space-md);
        color: var(--text-primary);
        z-index: var(--z-tooltip);
        opacity: 0;
        transform: translateX(100%);
        transition: all var(--transition-base);
        max-width: 300px;
        box-shadow: var(--glass-shadow);
        border-left: 4px solid ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)'};
      ">
        ${message}
      </div>
    `;

    document.body.appendChild(notification);
    const notificationEl = notification.querySelector('div');

    // Show notification
    setTimeout(() => {
      notificationEl.style.opacity = '1';
      notificationEl.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
      notificationEl.style.opacity = '0';
      notificationEl.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  // ========================================
  // 🎬 ANIMATIONS
  // ========================================
  startAnimations() {
    // Stagger animations for better performance
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Start floating animations for orbs
    const orbs = document.querySelectorAll('.liquid-orb');
    orbs.forEach((orb, index) => {
      orb.style.animationDelay = `${index * -5}s`;
    });
  }

  // ========================================
  // 📱 RESPONSIVE HELPERS
  // ========================================
  handleResize() {
    this.isMobile = window.innerWidth <= 768;
    
    // Close mobile menu on resize
    if (!this.isMobile) {
      this.closeMobileMenu();
    }
  }
}

// ========================================
// 🚀 INITIALIZE APPLICATION
// ========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  // Initialize the main application
  window.liquidPortfolio = new LiquidPortfolio();
  
  // Handle resize events
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      window.liquidPortfolio.handleResize();
    }, 250);
  });
  
  // Handle visibility change for performance
  document.addEventListener('visibilitychange', () => {
    const orbs = document.querySelectorAll('.liquid-orb');
    orbs.forEach(orb => {
      orb.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
  });
}

// ========================================
// 🔧 UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ========================================
// 🌟 PERFORMANCE MONITORING
// ========================================
window.addEventListener('load', () => {
  // Log performance metrics
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`🚀 Page loaded in ${loadTime}ms`);
  }
  
  // Log memory usage if available
  if (window.performance && window.performance.memory) {
    const memory = window.performance.memory;
    console.log(`💾 Memory: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB used`);
  }
});

console.log('🌊 Liquid Portfolio JavaScript loaded successfully!');
