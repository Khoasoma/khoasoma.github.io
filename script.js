// Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});

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

    try {
        const response = await fetch('./assets/feedback.json');
        if (!response.ok) throw new Error('Failed to load feedback');

        const feedbackData = await response.json();

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
        // We need enough duplicates to fill the screen width + buffer
        // For simplicity, we'll just duplicate the entire set once or twice
        feedbackMarquee.innerHTML += cardsHTML + cardsHTML;

    } catch (error) {
        console.error('Error loading feedback:', error);
        feedbackMarquee.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem;">Unable to load feedback at this time.</p>';
    }
});