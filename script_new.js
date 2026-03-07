// Auto Language Detection
(function() {
    const currentPage = window.location.pathname;
    const isEnglishPage = currentPage.includes('index_en');
    const hasVisited = localStorage.getItem('lang_selected');
    
    if (!hasVisited) {
        const browserLang = navigator.language || navigator.userLanguage;
        const isVietnamese = browserLang.toLowerCase().startsWith('vi');
        
        if (!isVietnamese && !isEnglishPage && !currentPage.includes('index_en')) {
            localStorage.setItem('lang_selected', 'en');
            window.location.href = './index_en_new.html' + window.location.hash;
        } else {
            localStorage.setItem('lang_selected', isVietnamese ? 'vi' : 'en');
        }
    }
})();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate stats when in view
            if (entry.target.closest('.stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Stats Counter Animation
let statsAnimated = false;
function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
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
}, { threshold: 0.3 });

sections.forEach(section => {
    navObserver.observe(section);
});

// Feedback Loading
document.addEventListener('DOMContentLoaded', async () => {
    const feedbackMarquee = document.getElementById('feedback-marquee');
    if (!feedbackMarquee) return;

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

    const createCard = (data) => {
        const date = new Date(data.date).toLocaleDateString('vi-VN');
        return `
            <div class="feedback-card">
                <div class="feedback-header">
                    <img src="${data.avatar}" alt="${data.author}" class="feedback-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.author)}&background=6366f1&color=fff'">
                    <span class="feedback-author">${data.author}</span>
                    <span class="feedback-date">${date}</span>
                </div>
                <div class="feedback-content">
                    "${data.content}"
                </div>
            </div>
        `;
    };

    const cardsHTML = feedbackData.map(item => createCard(item)).join('');
    feedbackMarquee.innerHTML = cardsHTML + cardsHTML + cardsHTML;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
