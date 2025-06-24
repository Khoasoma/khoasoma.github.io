// Liquid Portfolio Main JavaScript
class LiquidPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupCounters();
        this.setupNavigation();
        this.setupSpotifyPlayer();
        this.setupDiscordStatus();
        this.setupScrollEffects();
        this.setupFAB();
    }

    // Typewriter effect
    setupTypewriter() {
        const roles = [
            'Creative Developer',
            'Minecraft Plugin Creator', 
            'Server Optimization Expert',
            'Community Builder',
            'Full-Stack Developer'
        ];

        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const typeElement = document.getElementById('roleText');
        if (!typeElement) return;

        const type = () => {
            const current = roles[currentRole];
            
            if (isDeleting) {
                typeElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typeElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && currentChar === current.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
            }

            setTimeout(type, speed);
        };

        type();
    }

    // Animated counters
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOut);
                
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = 80;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Spotify Player Simulation
    setupSpotifyPlayer() {
        const tracks = [
            {
                name: 'Chasing Cars',
                artist: 'Snow Patrol',
                album: 'Eyes Open',
                duration: 267, // 4:27
                cover: 'https://i.scdn.co/image/ab67616d0000b273e319baafd16e84f0408af2a0'
            }
        ];

        let currentTime = 87; // Start at 1:27
        let isPlaying = true;
        const track = tracks[0];

        const updatePlayer = () => {
            const trackNameEl = document.getElementById('trackName');
            const artistNameEl = document.getElementById('artistName');
            const albumNameEl = document.getElementById('albumName');
            const currentTimeEl = document.getElementById('currentTime');
            const totalTimeEl = document.getElementById('totalTime');
            const progressFill = document.getElementById('progressFill');
            const progressThumb = document.getElementById('progressThumb');
            const albumCover = document.getElementById('albumCover');

            if (trackNameEl) trackNameEl.textContent = track.name;
            if (artistNameEl) artistNameEl.textContent = track.artist;
            if (albumNameEl) albumNameEl.textContent = track.album;
            if (albumCover) albumCover.src = track.cover;
            if (totalTimeEl) totalTimeEl.textContent = this.formatTime(track.duration);

            if (isPlaying) {
                currentTime++;
                if (currentTime >= track.duration) {
                    currentTime = 0;
                }
            }

            if (currentTimeEl) currentTimeEl.textContent = this.formatTime(currentTime);
            
            const progress = (currentTime / track.duration) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (progressThumb) progressThumb.style.left = `${progress}%`;
        };

        // Update every second
        setInterval(updatePlayer, 1000);
        updatePlayer();

        // Player controls
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                isPlaying = !isPlaying;
                const icon = playBtn.querySelector('i');
                icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
            });
        }
    }

    // Discord Status Simulation
    setupDiscordStatus() {
        const activities = [
            {
                name: 'Visual Studio Code',
                details: 'Working on liquid-portfolio',
                state: 'Editing main.js',
                icon: 'fas fa-code'
            },
            {
                name: 'IntelliJ IDEA',
                details: 'Developing XenonFolia',
                state: 'Optimizing server performance',
                icon: 'fab fa-java'
            },
            {
                name: 'Discord',
                details: 'Managing AsakaMC',
                state: 'In voice channel',
                icon: 'fab fa-discord'
            }
        ];

        let currentActivity = 0;
        let activityTime = 0;

        const updateDiscordStatus = () => {
            const activity = activities[currentActivity];
            const activityNameEl = document.querySelector('.activity-name');
            const activityDetailsEl = document.querySelector('.activity-details');
            const activityTimeEl = document.getElementById('activityTime');
            const activityIconEl = document.querySelector('.activity-icon i');

            if (activityNameEl) activityNameEl.textContent = activity.name;
            if (activityDetailsEl) activityDetailsEl.textContent = activity.details;
            if (activityIconEl) activityIconEl.className = activity.icon;

            activityTime++;
            if (activityTimeEl) {
                const hours = Math.floor(activityTime / 3600);
                const minutes = Math.floor((activityTime % 3600) / 60);
                const seconds = activityTime % 60;
                activityTimeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }

            // Switch activity every 5 minutes
            if (activityTime % 300 === 0) {
                currentActivity = (currentActivity + 1) % activities.length;
                activityTime = 0;
            }
        };

        setInterval(updateDiscordStatus, 1000);
        updateDiscordStatus();
    }

    // Scroll Effects
    setupScrollEffects() {
        const nav = document.querySelector('.liquid-nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (nav) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    nav.style.transform = 'translateX(-50%) translateY(-100%)';
                } else {
                    nav.style.transform = 'translateX(-50%) translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        });

        // Parallax for liquid shapes
        const liquidShapes = document.querySelectorAll('.liquid-shape');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            liquidShapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Floating Action Button
    setupFAB() {
        const fabMain = document.getElementById('fabMain');
        const fabMenu = document.getElementById('fabMenu');
        const fabItems = document.querySelectorAll('.fab-item');

        if (fabMain && fabMenu) {
            let isOpen = false;

            fabMain.addEventListener('click', () => {
                isOpen = !isOpen;
                
                if (isOpen) {
                    fabMenu.classList.add('active');
                    fabMain.style.transform = 'rotate(45deg)';
                } else {
                    fabMenu.classList.remove('active');
                    fabMain.style.transform = 'rotate(0deg)';
                }
            });

            // FAB item actions
            fabItems.forEach(item => {
                item.addEventListener('click', () => {
                    const action = item.getAttribute('data-action');
                    
                    switch(action) {
                        case 'email':
                            window.open('mailto:khoa@kh0a.site');
                            break;
                        case 'github':
                            window.open('https://github.com/Khoasoma', '_blank');
                            break;
                        case 'discord':
                            window.open('https://discordapp.com/users/808974657994752050', '_blank');
                            break;
                    }
                });
            });
        }
    }

    // Utility function
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new LiquidPortfolio();
});

// Theme toggle
document.getElementById('themeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = document.body.classList.contains('light-theme') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    }
});

// Sound toggle
document.getElementById('soundToggle')?.addEventListener('click', () => {
    // Add sound functionality if needed
    console.log('Sound toggled');
});