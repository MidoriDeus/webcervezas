// Funcionalidad para el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.navigation ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Animar el botón hamburguesa
            mobileMenuBtn.classList.toggle('open');
        });
    }

    // Validación y envío de formularios
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar la reserva
            // Por ahora, solo mostraremos un mensaje de éxito
            alert('¡Gracias por tu reserva! Te contactaremos pronto para confirmar.');
            bookingForm.reset();
        });
    }

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll effects - Parallax suave en fondos
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Aparición progresiva del contenido al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Dejar de observar para que la animación no se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones de aparición
    document.querySelectorAll('.beer-card, .experience-item, .event-item').forEach(el => {
        observer.observe(el);
    });
});

// Función para detectar scroll y aplicar efectos
function handleScrollEffects() {
    let ticking = false;

    function updateEffects() {
        const scrollTop = window.pageYOffset;
        
        // Efecto de profundidad en secciones según posición de scroll
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const windowHeight = window.innerHeight;
            
            // Calcular la posición relativa de la sección
            const positionRatio = (windowHeight - sectionTop) / windowHeight;
            
            // Aplicar efectos basados en la posición
            if (positionRatio > 0 && positionRatio < 2) {
                // Podríamos ajustar efectos aquí según la posición
                // Por ejemplo, aumentar la intensidad de las animaciones
            }
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Inicializar los efectos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    handleScrollEffects();
});