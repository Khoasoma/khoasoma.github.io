// Auto Language Detection
(function() {
    const currentPage = window.location.pathname;
    const isEnglishPage = currentPage.includes('index_en');
    const hasVisited = localStorage.getItem('lang_selected');
    
    // Only auto-redirect on first visit
    if (!hasVisited) {
        const browserLang = navigator.language || navigator.userLanguage;
        const isVietnamese = browserLang.toLowerCase().startsWith('vi');
        
        // If browser is not Vietnamese and we're on Vietnamese page, redirect to English
        if (!isVietnamese && !isEnglishPage && !currentPage.includes('index_en')) {
            localStorage.setItem('lang_selected', 'en');
            window.location.href = './index_en.html' + window.location.hash;
        } else {
            localStorage.setItem('lang_selected', isVietnamese ? 'vi' : 'en');
        }
    }
})();

// Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-chart-card')) {
                animateSkillBars(entry.target);
                animateRadialProgress(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .skill-chart-card').forEach((el) => {
    observer.observe(el);
});

// Animate Bar Charts
function animateSkillBars(container) {
    const bars = container.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const progress = bar.dataset.progress;
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

// Animate Radial Progress Charts
function animateRadialProgress(container) {
    const radials = container.querySelectorAll('.radial-progress');
    radials.forEach(radial => {
        const progress = radial.dataset.progress;
        const circle = radial.querySelector('.progress');
        if (circle) {
            const circumference = 283; // 2 * PI * 45 (radius)
            const offset = circumference - (circumference * progress) / 100;
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 200);
        }
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    // Animate hamburger (optional simple toggle)
    hamburger.classList.toggle('open');
});

// Close mobile menu when link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3 }); // Lower threshold for tall content

sections.forEach(section => {
    navObserver.observe(section);
});

// Feedback Loading & Interactive Carousel
document.addEventListener('DOMContentLoaded', async () => {
    const feedbackMarquee = document.getElementById('feedback-marquee');
    const feedbackContainer = document.getElementById('feedback-container');
    const pauseBtn = document.getElementById('feedback-pause');
    const dotsContainer = document.getElementById('feedback-dots');
    const prevBtn = document.querySelector('.feedback-prev');
    const nextBtn = document.querySelector('.feedback-next');
    
    if (!feedbackMarquee) return;

    // Fallback data for local file testing
    const fallbackData = [
        {"author": "Hanee", "avatar": "https://cdn.discordapp.com/avatars/786899329763377202/7076a8ac1d64b2cf932486bb22f31023.png?size=512", "content": "hoa dong than thien nhaaa\nho tro nhiet tinh \n100 diem mai yeu", "date": "2025-07-10T22:33:24.201+07:00"},
        {"author": "Merpp", "avatar": "https://cdn.discordapp.com/avatars/731236526473609306/91f8a17a7b3d00d350da92e92442c788.png?size=512", "content": "support tot plugins ngon lam nha", "date": "2025-08-03T12:42:26.239+07:00"},
        {"author": "Huykun", "avatar": "https://cdn.discordapp.com/avatars/772431736340611084/d0be65928d26de1d2c1f6ac76800881b.png?size=512", "content": "+1 legit @Dev | Khoasoma donut folia , file ngon như ông vậy", "date": "2025-08-03T21:24:29.277+07:00"},
        {"author": "FMTV", "avatar": "https://cdn.discordapp.com/avatars/925929920838922240/8651db63070053d49d15ecc9f0e5e886.png?size=512", "content": "+1 legit @Dev | Khoasoma matrix+lpx+exploitfixer hàng xịn múp", "date": "2025-08-16T09:54:21.691+07:00"},
        {"author": "Khang", "avatar": "https://cdn.discordapp.com/avatars/901327385897627648/7ffce4a572bb49f4af5b5ef741776db4.png?size=512", "content": "+1 legit @Supports | 0MinhEx1 mmoitems hỗ trợ nhiệt tình", "date": "2025-08-16T11:50:25.45+07:00"},
        {"author": "K", "avatar": "https://cdn.discordapp.com/avatars/1394488990291333261/f5accb5078bef8c69dc69dda85637a29.png?size=512", "content": "+1 legit @Dev | Khoasoma matrix+lpx+exploitfixer hàng xịn múp", "date": "2025-08-25T20:03:07.4+07:00"},
        {"author": "RKK_Beo123456", "avatar": "https://cdn.discordapp.com/avatars/1312398303987765309/ad799a181e35b7cfb674ecafbfaa83e8.png?size=512", "content": "+ legit @Supports | 0MinhEx1  mup qua tr", "date": "2025-09-30T21:30:11.601+07:00"},
        {"author": "NgọcNhimeomeozz (MoRyy)", "avatar": "https://cdn.discordapp.com/avatars/971411211751161947/cf005aba62630263bac94ff5c5a09074.png?size=512", "content": "+1 legit @Dev | Khoasoma matrix mups hon nyc", "date": "2025-10-11T09:57:22.52+07:00"}
    ];

    let feedbackData = fallbackData;

    try {
        const response = await fetch('./assets/feedback.json');
        if (response.ok) {
            const rawData = await response.json();
            feedbackData = rawData.filter(item => 
                item.content && 
                item.content.trim().length > 10 && 
                !item.content.toLowerCase().includes('started a thread')
            );
        }
    } catch (error) {
        console.log('Using fallback feedback data');
    }

    // Function to create a feedback card
    const createCard = (data, index) => {
        const date = new Date(data.date).toLocaleDateString();
        return `
            <div class="feedback-card" data-index="${index}">
                <div class="feedback-header">
                    <img src="${data.avatar}" alt="${data.author}" class="feedback-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${data.author}&background=random'">
                    <span class="feedback-author">${data.author}</span>
                    <span class="feedback-date">${date}</span>
                </div>
                <div class="feedback-content" title="${data.content}">
                    "${data.content}"
                </div>
            </div>
        `;
    };

    // Generate cards
    const cardsHTML = feedbackData.map((item, i) => createCard(item, i)).join('');
    feedbackMarquee.innerHTML = cardsHTML;
    // Duplicate for seamless infinite scroll
    feedbackMarquee.innerHTML += cardsHTML + cardsHTML;

    // Create dot indicators
    if (dotsContainer) {
        const dotsHTML = feedbackData.map((_, i) => 
            `<div class="feedback-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`
        ).join('');
        dotsContainer.innerHTML = dotsHTML;
    }

    // State
    let isPaused = false;
    let currentIndex = 0;
    const cardWidth = 350 + 24; // card width + gap
    const totalCards = feedbackData.length;

    // Drag state
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let currentTranslate = 0;

    // Pause/Play functionality
    function togglePause() {
        isPaused = !isPaused;
        feedbackContainer.classList.toggle('paused', isPaused);
        
        if (pauseBtn) {
            const icon = pauseBtn.querySelector('i');
            const text = pauseBtn.querySelector('span');
            if (isPaused) {
                pauseBtn.classList.add('paused');
                pauseBtn.classList.remove('playing');
                icon.className = 'fas fa-play';
                text.textContent = document.documentElement.lang === 'vi' ? 'Tiếp tục' : 'Play';
            } else {
                pauseBtn.classList.remove('paused');
                pauseBtn.classList.add('playing');
                icon.className = 'fas fa-pause';
                text.textContent = document.documentElement.lang === 'vi' ? 'Tạm dừng' : 'Pause';
            }
        }
    }

    // Navigate to specific card
    function goToCard(index) {
        currentIndex = index;
        const offset = -index * cardWidth;
        feedbackMarquee.style.animation = 'none';
        feedbackMarquee.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        document.querySelectorAll('.feedback-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Pause auto-scroll when manually navigating
        if (!isPaused) {
            togglePause();
        }
    }

    // Navigate prev/next
    function navigatePrev() {
        const newIndex = (currentIndex - 1 + totalCards) % totalCards;
        goToCard(newIndex);
    }

    function navigateNext() {
        const newIndex = (currentIndex + 1) % totalCards;
        goToCard(newIndex);
    }

    // Event Listeners
    if (pauseBtn) {
        pauseBtn.addEventListener('click', togglePause);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', navigatePrev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', navigateNext);
    }

    // Dot navigation
    document.querySelectorAll('.feedback-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToCard(index);
        });
    });

    // Drag to scroll
    if (feedbackContainer) {
        feedbackContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            feedbackMarquee.classList.add('dragging');
            startX = e.pageX - feedbackContainer.offsetLeft;
            
            // Get current transform
            const style = window.getComputedStyle(feedbackMarquee);
            const matrix = new DOMMatrix(style.transform);
            currentTranslate = matrix.m41;
        });

        feedbackContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - feedbackContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            feedbackMarquee.style.animation = 'none';
            feedbackMarquee.style.transform = `translateX(${currentTranslate + walk}px)`;
        });

        feedbackContainer.addEventListener('mouseup', () => {
            isDragging = false;
            feedbackMarquee.classList.remove('dragging');
            
            // Snap to nearest card
            const style = window.getComputedStyle(feedbackMarquee);
            const matrix = new DOMMatrix(style.transform);
            const currentPos = matrix.m41;
            const nearestIndex = Math.round(-currentPos / cardWidth);
            const clampedIndex = Math.max(0, Math.min(nearestIndex, totalCards - 1));
            goToCard(clampedIndex);
        });

        feedbackContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                feedbackMarquee.classList.remove('dragging');
            }
        });

        // Touch events for mobile
        feedbackContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            feedbackMarquee.classList.add('dragging');
            startX = e.touches[0].pageX - feedbackContainer.offsetLeft;
            
            const style = window.getComputedStyle(feedbackMarquee);
            const matrix = new DOMMatrix(style.transform);
            currentTranslate = matrix.m41;
        }, { passive: true });

        feedbackContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - feedbackContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            feedbackMarquee.style.animation = 'none';
            feedbackMarquee.style.transform = `translateX(${currentTranslate + walk}px)`;
        }, { passive: true });

        feedbackContainer.addEventListener('touchend', () => {
            isDragging = false;
            feedbackMarquee.classList.remove('dragging');
            
            const style = window.getComputedStyle(feedbackMarquee);
            const matrix = new DOMMatrix(style.transform);
            const currentPos = matrix.m41;
            const nearestIndex = Math.round(-currentPos / cardWidth);
            const clampedIndex = Math.max(0, Math.min(nearestIndex, totalCards - 1));
            goToCard(clampedIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const feedbackSection = document.getElementById('feedback');
        const rect = feedbackSection?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            if (e.key === 'ArrowLeft') navigatePrev();
            if (e.key === 'ArrowRight') navigateNext();
            if (e.key === ' ') {
                e.preventDefault();
                togglePause();
            }
        }
    });
});

/* ===== SMOOTH MOTION BLUR (lerp-based) ===== */
(function() {
    const mainEl = document.querySelector('.main-container');
    const bgImage = document.querySelector('.bg-image');

    // Remove all CSS transitions from mainEl so JS drives it entirely
    if (mainEl) mainEl.style.transition = 'none';

    let lastScrollY    = window.scrollY;
    let currentBlur    = 0;   // rendered blur
    let targetBlur     = 0;   // desired blur
    let currentParallax = 0;  // rendered parallax offset
    let targetParallax  = 0;  // desired parallax offset
    let rafId;

    const BLUR_LERP      = 0.10;  // how fast blur eases back to 0 (lower = smoother)
    const PARALLAX_LERP  = 0.06;  // bg parallax eases slowest for cinematic feel
    const MAX_BLUR       = 4;     // max px of blur
    const VEL_SCALE      = 0.20;  // how much velocity maps to blur px

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function onScroll() {
        const scrollY    = window.scrollY;
        const velocity   = Math.abs(scrollY - lastScrollY);
        lastScrollY      = scrollY;

        // Target blur spikes with velocity, target parallax follows scroll position
        targetBlur     = Math.min(velocity * VEL_SCALE, MAX_BLUR);
        targetParallax = scrollY * 0.10;
    }

    function tick() {
        // Smoothly interpolate both values
        currentBlur     = lerp(currentBlur,     targetBlur,     BLUR_LERP);
        currentParallax = lerp(currentParallax, targetParallax, PARALLAX_LERP);

        // Target blur decays to 0 every frame (velocity is a spike, not sustained)
        targetBlur = lerp(targetBlur, 0, 0.18);

        // Apply blur to content
        if (mainEl) {
            const b = currentBlur.toFixed(3);
            mainEl.style.filter    = currentBlur > 0.04 ? `blur(${b}px)` : '';
        }

        // Apply parallax to background
        if (bgImage) {
            const p = currentParallax.toFixed(2);
            bgImage.style.transform = `scale(1.05) translateY(${p}px)`;
        }

        rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Start the loop
    rafId = requestAnimationFrame(tick);
})();

/* ===== SMOOTH SCROLL WITH SPRING EASING ===== */
(function() {
    // Intercept anchor clicks for buttery smooth section transitions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const startY = window.scrollY;
            const targetY = target.getBoundingClientRect().top + window.scrollY - 70;
            const distance = targetY - startY;
            const duration = Math.min(Math.max(Math.abs(distance) * 0.5, 500), 1200);
            let startTime = null;

            // Spring easing function
            function easeInOutQuart(t) {
                return t < 0.5
                    ? 8 * t * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 4) / 2;
            }

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutQuart(progress);
                window.scrollTo(0, startY + distance * eased);
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    });
})();