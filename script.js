// ==================== Smooth Scrolling ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== Navbar Background on Scroll ====================
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and stats
document.querySelectorAll('.project-card, .stat, .skill-category, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== Skill Bar Animation ====================
const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'fillBar 1.5s ease forwards';
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(el => {
    skillObserver.observe(el);
});

// Add animation keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fillBar {
        from {
            width: 0 !important;
        }
        to {
            width: var(--target-width) !important;
        }
    }
`;
document.head.appendChild(style);

// ==================== Mobile Menu Toggle (Optional) ====================
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        }
    }
}

// Initial call and on resize
window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);

// ==================== Form Submission (Optional) ====================
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('감사합니다! 메시지를 받았습니다.');
        this.reset();
    });
}

// ==================== Dark Mode Toggle (Optional) ====================
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

window.addEventListener('load', initDarkMode);

console.log('✅ Portfolio JavaScript loaded successfully!');
