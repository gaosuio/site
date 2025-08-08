document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const isNumeric = !isNaN(parseFloat(finalValue));
            
            if (isNumeric) {
                const numericValue = parseFloat(finalValue);
                let currentValue = 0;
                const increment = numericValue / 60;
                
                const updateCounter = () => {
                    if (currentValue < numericValue) {
                        currentValue += increment;
                        stat.textContent = Math.floor(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = finalValue;
                    }
                };
                updateCounter();
            }
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger stats animation when hero comes into view
                if (entry.target.classList.contains('hero')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section, .tech-card, .solution-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Dynamic particle system for interconnect diagram
    const createParticles = () => {
        const diagram = document.querySelector('.interconnect-diagram');
        if (!diagram) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                box-shadow: 0 0 10px #00ffff;
            `;
            diagram.appendChild(particle);
            
            animateParticle(particle, diagram);
        }
    };

    const animateParticle = (particle, container) => {
        const animate = () => {
            const startX = Math.random() * container.offsetWidth;
            const startY = Math.random() * container.offsetHeight;
            const endX = Math.random() * container.offsetWidth;
            const endY = Math.random() * container.offsetHeight;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.opacity = '1';
            
            particle.animate([
                {
                    left: startX + 'px',
                    top: startY + 'px',
                    opacity: 1
                },
                {
                    left: endX + 'px',
                    top: endY + 'px',
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                setTimeout(animate, Math.random() * 1000);
            };
        };
        
        setTimeout(animate, Math.random() * 2000);
    };

    // Initialize particles
    createParticles();

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        const opacity = Math.min(0.95, 0.5 + (currentScrollY / 500));
        
        header.style.background = `rgba(10, 10, 15, ${opacity})`;
        
        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateHeader);

    // Interactive tech cards
    const techCards = document.querySelectorAll('.tech-card, .solution-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 255, 0.1)';
            this.style.borderColor = '#00ffff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.borderColor = 'rgba(0, 255, 255, 0.2)';
        });
    });

    // CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Scroll to technology section
            document.getElementById('technology').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .data-particle {
            z-index: 1;
        }
        
        .header {
            transition: transform 0.3s ease, background 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Terminal-style typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Neural network pulse effect
    const neuralNetwork = document.querySelector('.neural-network');
    if (neuralNetwork) {
        setInterval(() => {
            neuralNetwork.style.animation = 'none';
            neuralNetwork.offsetHeight; // Trigger reflow
            neuralNetwork.style.animation = 'neural-pulse 4s ease-in-out infinite';
        }, 8000);
    }

    // Performance optimization: throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
            setTimeout(() => ticking = false, 16);
        }
    };

    window.removeEventListener('scroll', updateHeader);
    window.addEventListener('scroll', throttledScroll);
});