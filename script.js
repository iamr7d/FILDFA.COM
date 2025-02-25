// Modern background effect
const createGradientAnimation = () => {
    const bg = document.querySelector('.gradient-bg');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);

        bg.style.background = `
            radial-gradient(
                circle at ${x}% ${y}%, 
                rgba(139, 92, 246, 0.15) 0%, 
                rgba(30, 34, 45, 0.2) 50%,
                #0B0F19 100%
            )
        `;
    });
};

// Smooth scroll behavior
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// Intersection Observer for fade-in animations
const initFadeAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.hero-content > *, .logo-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

// Navbar scroll effect
const initNavbarEffect = () => {
    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.background = 'rgba(11, 15, 25, 0.8)';
        } else if (currentScroll > lastScroll) {
            nav.style.background = 'rgba(11, 15, 25, 0.95)';
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
            nav.style.background = 'rgba(11, 15, 25, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
};

// Button hover effects
const initButtonEffects = () => {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
};

// Theme toggle functionality
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get theme from localStorage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' 
                        ? 'dark' 
                        : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
};

// Initialize all effects
window.addEventListener('DOMContentLoaded', () => {
    createGradientAnimation();
    initSmoothScroll();
    initFadeAnimations();
    initNavbarEffect();
    initButtonEffects();
    initThemeToggle();
});
