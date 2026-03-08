document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Hamburger Animation (optional enhancement)
            hamburger.classList.toggle('toggle');
        });
    }
    
    // Scrolled Navigation Styling
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
            navLinks.classList.remove('active'); // Close menu when scrolling to top
        }
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Intersection Observer for scroll animations (fade-in, slide-up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want the animation only once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
    
    // Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending Message...';
            btn.disabled = true;
            btn.style.opacity = '0.8';
            
            // Simulate form submission network delay
            setTimeout(() => {
                btn.textContent = 'Message Sent ✨';
                btn.style.background = '#10b981'; // Success Green
                btn.style.opacity = '1';
                btn.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.4)';
                
                contactForm.reset();
                
                // Revert button back to original state
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = ''; // Reverts to CSS default
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                }, 4000);
            }, 1800);
        });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight when scrolling into the section
            if (scrollPosition >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});