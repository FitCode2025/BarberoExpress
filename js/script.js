  window.addEventListener('load', () => {
            const loadingScreen = document.querySelector('.loading-screen');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1500);
        });

        // ===== PARTICLES.JS CONFIGURATION =====
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#D4AF37'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8B0000',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });

        // ===== CUSTOM CURSOR =====
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(2)';
                cursorOutline.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
            });
        });

        // ===== HERO SLIDER =====
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        setInterval(nextSlide, 5000);

        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));

        // ===== SCROLL TO TOP BUTTON =====
        const scrollTopBtn = document.querySelector('.scroll-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ===== SMOOTH SCROLLING =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // ===== NAVBAR BACKGROUND ON SCROLL =====
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(44, 44, 44, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(44, 44, 44, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        });

        // ===== SERVICE BUTTONS =====
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceName = this.parentElement.querySelector('h3').textContent;
                window.open('https://wa.me/5491112345678?text=¡Hola!%20Me%20gustaría%20reservar%20el%20servicio%20de%20' + encodeURIComponent(serviceName), '_blank');
            });
        });

        // ===== GALLERY LIGHTBOX EFFECT =====
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                    animation: fadeIn 0.3s ease;
                `;
                
                const imgClone = img.cloneNode();
                imgClone.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 10px;
                    box-shadow: 0 10px 50px rgba(212, 175, 55, 0.3);
                `;
                
                lightbox.appendChild(imgClone);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', () => {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => lightbox.remove(), 300);
                });
            });
        });

        // ===== PARALLAX EFFECT ON SCROLL =====
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.services, .about, .testimonials, .cta-final');
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                el.style.backgroundPositionY = yPos + 'px';
            });
        });

        // ===== NUMBER COUNTER ANIMATION =====
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target.toLocaleString('es-AR');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start).toLocaleString('es-AR');
                }
            }, 16);
        }

        // ===== ADD RIPPLE EFFECT TO BUTTONS =====
        document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // ===== WHATSAPP FLOAT ANIMATION =====
        const whatsappBtn = document.querySelector('.whatsapp-float');
        setInterval(() => {
            whatsappBtn.style.animation = 'none';
            setTimeout(() => {
                whatsappBtn.style.animation = 'pulse 1s ease';
            }, 10);
        }, 3000);

    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Import the functions you need from the SDKs you need
