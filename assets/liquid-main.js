/**
 * 🌊 LIQUID GLASS PORTFOLIO - MAIN JAVASCRIPT
 * Enhanced interactions and animations for liquid glass design
 * Author: Khoasoma
 * Version: 2.0
 * Date: 2025-06-29
 */

// ========================================
// 🎯 MAIN APPLICATION CLASS
// ========================================

class LiquidPortfolio {
    constructor() {
        this.isLoaded = false;
        this.isMobile = window.innerWidth <= 768;
        this.sounds = {};
        this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        this.theme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.showLoading();
            
            // Initialize all modules
            await this.initializeModules();
            
            // Set theme
            this.setTheme(this.theme);
            
            // Hide loading screen
            await this.hideLoading();
            
            // Start animations
            this.startAnimations();
            
            this.isLoaded = true;
            console.log('🌊 Liquid Portfolio initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
            this.hideLoading();
        }
    }

    async initializeModules() {
        const modules = [
            this.initNavigation(),
            this.initHeroSection(),
            this.initSkillsAnimation(),
            this.initProjectsInteraction(),
            this.initContactForm(),
            this.initFloatingActionButton(),
            this.initThemeToggle(),
            this.initSoundEffects(),
            this.initScrollEffects(),
            this.initLiquidAnimation(),
            this.initResponsiveHandlers()
        ];

        await Promise.allSettled(modules);
    }

    // ========================================
    // 🎬 LOADING SYSTEM
    // ========================================

    showLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('progressBar');
        const loadingStatus = document.getElementById('loadingStatus');

        if (!loadingScreen) return;

        const steps = [
            'Initializing liquid interface...',
            'Loading glass components...',
            'Preparing animations...',
            'Optimizing performance...',
            'Almost ready...'
        ];

        let currentStep = 0;
        let progress = 0;

        const updateProgress = () => {
            progress += Math.random() * 25 + 5;
            progress = Math.min(progress, 95);
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            if (loadingStatus && currentStep < steps.length) {
                loadingStatus.textContent = steps[currentStep];
                currentStep++;
            }

            if (progress < 95) {
                setTimeout(updateProgress, 300 + Math.random() * 200);
            }
        };

        updateProgress();
    }

    async hideLoading() {
        return new Promise((resolve) => {
            const loadingScreen = document.getElementById('loadingScreen');
            const progressBar = document.getElementById('progressBar');
            
            if (progressBar) {
                progressBar.style.width = '100%';
            }

            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        resolve();
                    }, 500);
                } else {
                    resolve();
                }
            }, 500);
        });
    }

    // ========================================
    // 🧭 NAVIGATION SYSTEM
    // ========================================

    initNavigation() {
        const nav = document.getElementById('navLiquid');
        const mobileMenuBtn = document.getElementById('mobileMenu');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!nav) return;

        // Mobile menu toggle
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                mobileMenuBtn.setAttribute('aria-expanded', !isActive);
                
                this.playSound('click');
            });
        }

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }

                    this.playSound('whoosh');
                }
            });
        });

        // Navigation scroll spy
        this.initScrollSpy();

        // Navigation hide/show on scroll
        this.initNavScrollBehavior();
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

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
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    initNavScrollBehavior() {
        const nav = document.getElementById('navLiquid');
        if (!nav) return;

        let lastScrollY = window.scrollY;
        let isScrollingDown = false;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            isScrollingDown = currentScrollY > lastScrollY && currentScrollY > 100;

            if (isScrollingDown && !nav.classList.contains('nav-hidden')) {
                nav.style.transform = 'translate(-50%, -100%)';
                nav.style.opacity = '0.8';
            } else if (!isScrollingDown && currentScrollY > 100) {
                nav.style.transform = 'translate(-50%, 0)';
                nav.style.opacity = '1';
            }

            lastScrollY = currentScrollY;
        });
    }

    // ========================================
    // 🏠 HERO SECTION ANIMATIONS
    // ========================================

    initHeroSection() {
        this.initTypingAnimation();
        this.initStatsCounter();
        this.initTechPillsInteraction();
        this.initActivityTimer();
        this.initMusicPlayer();
    }

    initTypingAnimation() {
        const typeElement = document.getElementById('roleText');
        if (!typeElement) return;

        const roles = [
            'Creative Developer',
            'Minecraft Expert',
            'Server Architect',
            'Performance Optimizer',
            'Plugin Developer'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typeElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typeElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
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
                    let currentNumber = 0;
                    const increment = finalNumber / 100;
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        target.textContent = Math.floor(currentNumber);
                        
                        if (currentNumber >= finalNumber) {
                            target.textContent = finalNumber;
                            clearInterval(timer);
                        }
                    }, 20);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    initTechPillsInteraction() {
        const techPills = document.querySelectorAll('.tech-pill');
        
        techPills.forEach(pill => {
            pill.addEventListener('mouseenter', () => {
                this.playSound('hover');
                pill.style.transform = 'translateY(-4px) scale(1.05)';
            });
            
            pill.addEventListener('mouseleave', () => {
                pill.style.transform = 'translateY(0) scale(1)';
            });
            
            pill.addEventListener('click', () => {
                this.playSound('click');
                const tech = pill.getAttribute('data-tech');
                this.showTechInfo(tech);
            });
        });
    }

    showTechInfo(tech) {
        const techInfo = {
            java: 'Expert in Java development with 3+ years of experience in enterprise applications and Minecraft plugins.',
            python: 'Proficient in Python for automation, data analysis, and backend development.',
            node: 'Experienced with Node.js for building scalable server-side applications and APIs.',
            docker: 'Skilled in containerization and deployment using Docker for consistent development environments.'
        };

        const info = techInfo[tech] || 'Technology information not available.';
        
        // Create toast notification
        this.showToast(info, 'info');
    }

    initActivityTimer() {
        const activityTime = document.getElementById('activityTime');
        if (!activityTime) return;

        const startTime = new Date();
        startTime.setHours(startTime.getHours() - 2);

        const updateTime = () => {
            const now = new Date();
            const diff = now - startTime;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            activityTime.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0')}`;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    initMusicPlayer() {
        const progressFill = document.querySelector('.progress-fill');
        if (!progressFill) return;

        let progress = 30;
        const duration = 287; // 4:47 in seconds
        const current = Math.floor(duration * progress / 100);

        const updateProgress = () => {
            progress += 0.1;
            if (progress > 100) progress = 0;
            
            progressFill.style.width = `${progress}%`;
            
            const currentTime = Math.floor(duration * progress / 100);
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            
            const timeDisplay = document.querySelector('.progress-time');
            if (timeDisplay) {
                timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        };

        setInterval(updateProgress, 100);
    }

    // ========================================
    // 📊 SKILLS ANIMATION
    // ========================================

    initSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const targetWidth = skillBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillBar.style.width = `${targetWidth}%`;
                        this.playSound('progress');
                    }, 200);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // ========================================
    // 💼 PROJECTS INTERACTION
    // ========================================

    initProjectsInteraction() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                if (this.isMobile) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
            
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });

        // Project links interaction
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.playSound('click');
                
                // Add ripple effect
                this.createRipple(e, link);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ========================================
    // 📬 CONTACT FORM
    // ========================================

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('.form-input');
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');
        const textarea = document.getElementById('contactMessage');
        const charCounter = document.querySelector('.char-count');

        // Input validation and effects
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
                this.updateCharCounter(input, charCounter);
            });
            
            input.addEventListener('focus', () => {
                this.playSound('focus');
                this.addInputFocusEffect(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });

        // Auto-resize textarea
        if (textarea) {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
        }

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form, submitBtn, formStatus);
        });
    }

    validateInput(input) {
        const fieldGroup = input.closest('.field-group');
        const errorElement = fieldGroup.querySelector('.field-error');
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        fieldGroup.classList.remove('error');
        errorElement.textContent = '';

        const value = input.value.trim();
        const inputType = input.type;

        // Required validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (inputType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Text length validation
        else if (input.id === 'contactName' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
        else if (input.id === 'contactMessage' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        else if (input.id === 'contactMessage' && value.length > 500) {
            isValid = false;
            errorMessage = 'Message must not exceed 500 characters';
        }

        if (!isValid) {
            fieldGroup.classList.add('error');
            errorElement.textContent = errorMessage;
            this.playSound('error');
        } else if (value) {
            this.playSound('success');
        }

        return isValid;
    }

    updateCharCounter(input, charCounter) {
        if (input.id === 'contactMessage' && charCounter) {
            const currentLength = input.value.length;
            const maxLength = 500;
            
            charCounter.textContent = currentLength;
            
            const counterContainer = charCounter.parentElement;
            counterContainer.classList.remove('warning', 'error');
            
            if (currentLength > maxLength * 0.8) {
                counterContainer.classList.add(currentLength > maxLength ? 'error' : 'warning');
            }
        }
    }

    addInputFocusEffect(input) {
        const fieldGroup = input.closest('.field-group');
        const existingRipple = fieldGroup.querySelector('.focus-ripple');
        
        if (existingRipple) {
            existingRipple.remove();
        }

        const ripple = document.createElement('div');
        ripple.className = 'focus-ripple';
        ripple.style.cssText = `
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary-blue), transparent);
            animation: focusRipple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        fieldGroup.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    async handleFormSubmission(form, submitBtn, formStatus) {
        // Validate all inputs
        const inputs = form.querySelectorAll('.form-input');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormStatus('Please fix the errors above', 'error', formStatus);
            return;
        }

        // Show loading state
        this.setFormLoading(true, submitBtn);
        this.playSound('submit');

        try {
            // Simulate API call
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            await this.submitContactForm(data);
            
            // Success
            this.showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success', formStatus);
            form.reset();
            this.resetFormFields(form);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Something went wrong. Please try again or contact me directly.', 'error', formStatus);
            this.playSound('error');
        } finally {
            this.setFormLoading(false, submitBtn);
        }
    }

    async submitContactForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    setFormLoading(isLoading, submitBtn) {
        submitBtn.disabled = isLoading;
        submitBtn.classList.toggle('loading', isLoading);
    }

    showFormStatus(message, type, statusElement) {
        statusElement.textContent = message;
        statusElement.className = `form-status show ${type}`;
        
        setTimeout(() => {
            statusElement.classList.remove('show');
        }, 5000);
    }

    resetFormFields(form) {
        const fieldGroups = form.querySelectorAll('.field-group');
        fieldGroups.forEach(group => {
            group.classList.remove('error');
        });
        
        const charCounter = form.querySelector('.char-count');
        if (charCounter) {
            charCounter.textContent = '0';
            charCounter.parentElement.classList.remove('warning', 'error');
        }
    }

    // ========================================
    // 🚀 FLOATING ACTION BUTTON
    // ========================================

    initFloatingActionButton() {
        const fabMain = document.getElementById('fabMain');
        const fabMenu = document.getElementById('fabMenu');
        const fabItems = document.querySelectorAll('.fab-item');

        if (!fabMain || !fabMenu) return;

        let isOpen = false;

        // Toggle FAB menu
        fabMain.addEventListener('click', () => {
            isOpen = !isOpen;
            
            fabMenu.classList.toggle('active', isOpen);
            fabMain.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
            fabMain.setAttribute('aria-expanded', isOpen);
            
            this.playSound('click');
        });

        // FAB item actions
        fabItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                this.handleFabAction(action);
                this.playSound('click');
            });
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container') && isOpen) {
                isOpen = false;
                fabMenu.classList.remove('active');
                fabMain.style.transform = 'rotate(0deg)';
                fabMain.setAttribute('aria-expanded', 'false');
            }
        });
    }

    handleFabAction(action) {
        switch (action) {
            case 'email':
                window.open('mailto:khoa@kh0a.site');
                break;
            case 'github':
                window.open('https://github.com/Khoasoma', '_blank');
                break;
            case 'discord':
                window.open('https://discordapp.com/users/808974657994752050', '_blank');
                break;
            case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    }

    // ========================================
    // 🌙 THEME SYSTEM
    // ========================================

    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
            this.playSound('switch');
        });

        // Update theme toggle icon
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.theme);
        localStorage.setItem('theme', this.theme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }

    // ========================================
    // 🔊 SOUND SYSTEM
    // ========================================

    initSoundEffects() {
        const soundToggle = document.getElementById('soundToggle');
        if (!soundToggle) return;

        // Load sound effects
        this.loadSounds();

        // Sound toggle
        soundToggle.addEventListener('click', () => {
            this.toggleSound();
        });

        // Update sound toggle icon
        this.updateSoundIcon();
    }

    loadSounds() {
        const soundFiles = {
            click: this.createTone(800, 100, 'square', 0.1),
            hover: this.createTone(1000, 50, 'sine', 0.05),
            whoosh: this.createTone(400, 200, 'sine', 0.1),
            success: this.createTone(660, 150, 'sine', 0.1),
            error: this.createTone(300, 300, 'square', 0.1),
            focus: this.createTone(1200, 80, 'sine', 0.05),
            submit: this.createTone(880, 200, 'sine', 0.1),
            progress: this.createTone(1100, 100, 'sine', 0.08),
            switch: this.createTone(700, 120, 'triangle', 0.08)
        };

        this.sounds = soundFiles;
    }

    createTone(frequency, duration, type = 'sine', volume = 0.1) {
        return () => {
            if (!this.soundEnabled) return;

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        };
    }

    playSound(soundName) {
        if (this.sounds[soundName] && this.soundEnabled) {
            try {
                this.sounds[soundName]();
            } catch (error) {
                console.warn('Could not play sound:', error);
            }
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('soundEnabled', this.soundEnabled);
        this.updateSoundIcon();
        
        if (this.soundEnabled) {
            this.playSound('switch');
        }
    }

    updateSoundIcon() {
        const soundToggle = document.getElementById('soundToggle');
        if (!soundToggle) return;

        const icon = soundToggle.querySelector('i');
        if (this.soundEnabled) {
            icon.className = 'fas fa-volume-up';
            soundToggle.setAttribute('aria-label', 'Disable sound effects');
        } else {
            icon.className = 'fas fa-volume-mute';
            soundToggle.setAttribute('aria-label', 'Enable sound effects');
        }
    }

    // ========================================
    // 📜 SCROLL EFFECTS
    // ========================================

    initScrollEffects() {
        // Parallax effect for liquid orbs
        this.initParallaxEffect();
        
        // Fade in animation for sections
        this.initScrollAnimation();
        
        // Progress indicator
        this.initScrollProgress();
    }

    initParallaxEffect() {
        const liquidOrbs = document.querySelectorAll('.liquid-orb');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            liquidOrbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrollY * speed);
                orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    initScrollAnimation() {
        const animateElements = document.querySelectorAll('.glass-card, .section-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    initScrollProgress() {
        // Create scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: var(--z-toast);
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        });
    }

    // ========================================
    // 🌊 LIQUID ANIMATION
    // ========================================

    initLiquidAnimation() {
        const canvas = document.getElementById('liquidCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Liquid particle system
        const particles = [];
        const particleCount = this.isMobile ? 30 : 60;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.radius * 2
                );
                gradient.addColorStop(0, `rgba(56, 189, 248, ${particle.opacity})`);
                gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }

    // ========================================
    // 📱 RESPONSIVE HANDLERS
    // ========================================

    initResponsiveHandlers() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.handleResize();
            }, 250);
        });

        // Touch device optimizations
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            this.initTouchOptimizations();
        }
    }

    handleResize() {
        // Re-initialize liquid animation for new canvas size
        this.initLiquidAnimation();
        
        // Adjust FAB position on mobile
        const fabContainer = document.querySelector('.fab-container');
        if (fabContainer && this.isMobile) {
            fabContainer.style.bottom = 'var(--space-md)';
            fabContainer.style.right = 'var(--space-md)';
        }
    }

    initTouchOptimizations() {
        // Improve touch targets
        const touchTargets = document.querySelectorAll('button, a, .tech-pill, .skill-tag');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
        });

        // Disable hover effects on touch devices
        const hoverElements = document.querySelectorAll('.project-card, .glass-card');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-hover');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-hover');
                }, 300);
            });
        });
    }

    // ========================================
    // 🚨 UTILITY METHODS
    // ========================================

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: var(--space-lg);
            background: var(--glass-white);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-md);
            color: var(--text-primary);
            z-index: var(--z-toast);
            opacity: 0;
            transform: translateX(100%);
            transition: all var(--transition-base);
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Hide toast
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    }

    startAnimations() {
        // Start liquid orb animations
        const liquidOrbs = document.querySelectorAll('.liquid-orb');
        liquidOrbs.forEach((orb, index) => {
            orb.style.animationDelay = `${index * -5}s`;
        });

        // Start music bars animation
        const musicBars = document.querySelectorAll('.music-bars .bar');
        musicBars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.2}s`;
        });

        // Start status dot animations
        const statusDots = document.querySelectorAll('.status-dot, .live-dot');
        statusDots.forEach(dot => {
            dot.style.animation = 'statusPulse 2s ease-in-out infinite';
        });
    }

    // Performance monitoring
    logPerformance() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`🚀 Page loaded in ${loadTime}ms`);
        }
    }
}

// ========================================
// 🎬 CSS ANIMATIONS (via JavaScript)
// ========================================

// Add focus ripple animation
const focusRippleCSS = `
@keyframes focusRipple {
    0% {
        transform: scaleX(0);
        opacity: 1;
    }
    100% {
        transform: scaleX(1);
        opacity: 0;
    }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.touch-device .project-card:hover {
    transform: none !important;
}

.touch-hover {
    background: var(--glass-white-hover) !important;
    border-color: var(--glass-border-hover) !important;
}
`;

// Inject CSS
const styleElement = document.createElement('style');
styleElement.textContent = focusRippleCSS;
document.head.appendChild(styleElement);

// ========================================
// 🚀 INITIALIZE APPLICATION
// ========================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.liquidPortfolio = new LiquidPortfolio();
    });
} else {
    window.liquidPortfolio = new LiquidPortfolio();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        const liquidOrbs = document.querySelectorAll('.liquid-orb');
        liquidOrbs.forEach(orb => {
            orb.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        const liquidOrbs = document.querySelectorAll('.liquid-orb');
        liquidOrbs.forEach(orb => {
            orb.style.animationPlayState = 'running';
        });
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('💥 JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    if (window.liquidPortfolio) {
        window.liquidPortfolio.logPerformance();
    }
});

console.log('🌊 Liquid Portfolio JavaScript loaded successfully!');
