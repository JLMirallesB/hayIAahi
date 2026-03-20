// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. Add smooth fade-in animation to sections
    // ============================================
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s forwards`;
    });

    // ============================================
    // 2. Intersection Observer for scroll reveals
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // 3. Interactive hourglass hover effect
    // ============================================
    const hourglassContainer = document.querySelector('.hourglass-container');
    if (hourglassContainer) {
        hourglassContainer.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.animation = 'hourglassFlip 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite';
            }
        });

        hourglassContainer.addEventListener('mouseleave', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.animation = 'hourglassFlip 6s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite';
            }
        });
    }

    // ============================================
    // 4. Parallax effect on scroll
    // ============================================
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrollY * 0.5}px)`;
            header.style.opacity = Math.max(0.7, 1 - scrollY * 0.001);
        }
    }, { passive: true });

    // ============================================
    // 5. Dynamic CSS animations
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-40px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .revealed {
            animation: fadeInUp 0.6s ease-out forwards !important;
        }

        /* Text shimmer effect on hover */
        section h2:hover {
            animation: shimmer 0.6s ease-in-out;
        }

        @keyframes shimmer {
            0%, 100% {
                text-shadow: 0 0 0px rgba(0, 0, 0, 0);
            }
            50% {
                text-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            }
        }

        /* Subtle line animation */
        section {
            transition: border-left-color 0.3s ease-out;
        }

        section:hover {
            border-left-color: #ff0000;
        }

        /* Status box pulse */
        .status {
            animation: subtlePulse 4s ease-in-out infinite;
        }

        @keyframes subtlePulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.05);
            }
            50% {
                box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // 6. Add visual feedback to interactive elements
    // ============================================
    const interactive = document.querySelectorAll('section h2, .status-text');
    interactive.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function(e) {
            // Visual feedback on click
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.background = '#ff0000';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'rippleOut 0.6s ease-out forwards';
            document.body.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to dynamically created styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleOut {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('✓ Animations and interactions loaded successfully');
});
