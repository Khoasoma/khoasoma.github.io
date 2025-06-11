document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = getComputedStyle(root).getPropertyValue('--background').trim();
        const newTheme = currentTheme === '#1a1b26' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function applyTheme(theme) {
        if (theme === 'light') {
            root.style.setProperty('--background', '#ffffff');
            root.style.setProperty('--surface', '#f5f5f5');
            root.style.setProperty('--surface-alt', '#e0e0e0');
            root.style.setProperty('--text', '#333333');
            root.style.setProperty('--text-secondary', '#666666');
            themeIcon.textContent = '🌙';
        } else {
            root.style.setProperty('--background', '#1a1b26');
            root.style.setProperty('--surface', '#24273a');
            root.style.setProperty('--surface-alt', '#2a2d4a');
            root.style.setProperty('--text', '#ffffff');
            root.style.setProperty('--text-secondary', '#b9bbbe');
            themeIcon.textContent = '☀️';
        }
    }
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .community-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
});
