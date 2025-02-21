// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typed = new Typed(".single", {
        strings: [
            "Go High Level Expert",
            "Marketing Automation Specialist",
            "Sales Funnel Strategist",
            "CRM Implementation Expert",
            "Digital Marketing Consultant"
        ],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
        cursorChar: '|',
        autoInsertCss: true,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navigation Bar Scroll Effect
    const nav = document.querySelector('.container');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // Scrolling down
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // Scrolling up
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add Animation on Scroll for Elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.hdr-container-inner > *').forEach(el => {
        observer.observe(el);
    });

    // Add loader animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('loader-hidden');
            loader.addEventListener('transitionend', () => {
                document.body.removeChild(loader);
            });
        }
    });

    // Add active state to navigation links
    const navLinks = document.querySelectorAll('.social-links');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '<i class="bx bx-menu"></i>';
            
            const nav = document.querySelector('.container');
            const parentLink = document.querySelector('.parent-link');
            
            if (!document.querySelector('.mobile-menu-btn')) {
                nav.insertBefore(mobileMenuBtn, parentLink);
            }

            mobileMenuBtn.addEventListener('click', () => {
                parentLink.classList.toggle('show');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    };

    // Initialize mobile menu
    createMobileMenu();

    // Update on window resize
    window.addEventListener('resize', createMobileMenu);

    // Add CSS styles for new features
    const style = document.createElement('style');
    style.textContent = `
        .scroll-down {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }

        .scroll-up {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.8rem;
            color: var(--text-color);
            cursor: pointer;
            transition: var(--transition);
        }

        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }

            .parent-link {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                padding: 1rem 0;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }

            .parent-link.show {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }

            .mobile-menu-btn.active {
                color: var(--primary-color);
            }
        }

        .active {
            color: var(--primary-color) !important;
        }

        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }

        .loader-hidden {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});