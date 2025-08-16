document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth Scrolling Function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 80; // Height of the navbar
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // Navigation link smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Hero button functionality
    document.querySelectorAll('.hero-cta .btn-primary').forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick && onclick.includes('scrollToSection')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const match = onclick.match(/scrollToSection\(['"]([^'"]+)['"]\)/);
                if (match) {
                    scrollToSection(match[1]);
                }
            });
        }
    });
    
    // Navbar scroll effects
    let lastScrollY = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = 'none';
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.section-header, .feature-card, .project-card, .certification-card, .testimonial-card, .contact-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Button click ripple effect
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute; border-radius: 50%; transform: scale(0);
                animation: ripple 0.6s linear; background-color: rgba(255, 255, 255, 0.3);
                left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation keyframes to the document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
        .fade-in { animation: fadeInUp 0.6s ease-out forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    
    // Console message
    console.log('%c🚀 Welcome to Tejas V\'s Portfolio!', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
});
