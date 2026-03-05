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

// Feedback Loading & Marquee Logic
document.addEventListener('DOMContentLoaded', async () => {
    const feedbackMarquee = document.getElementById('feedback-marquee');
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
            // Filter out empty/useless feedback
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
    const createCard = (data) => {
        const date = new Date(data.date).toLocaleDateString();
        return `
            <div class="feedback-card">
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
    const cardsHTML = feedbackData.map(item => createCard(item)).join('');

    // Inject original cards
    feedbackMarquee.innerHTML = cardsHTML;

    // Duplicate for seamless infinite scroll
    feedbackMarquee.innerHTML += cardsHTML + cardsHTML;
});