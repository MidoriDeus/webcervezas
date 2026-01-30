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

    // Funcionalidad para las FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.classList.contains('open');
            
            // Cerrar todas las respuestas
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('open');
            });
            
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Abrir la seleccionada si estaba cerrada
            if (!isOpen) {
                answer.classList.add('open');
                question.classList.add('active');
            }
        });
    });

    // Filtrado de cervezas
    const styleFilter = document.getElementById('style-filter');
    const abvFilter = document.getElementById('abv-filter');
    const breweryFilter = document.getElementById('brewery-filter');
    const beerCards = document.querySelectorAll('.beer-card');

    function filterBeers() {
        const selectedStyle = styleFilter.value.toLowerCase();
        const selectedAbv = abvFilter.value;
        const selectedBrewery = breweryFilter.value;

        beerCards.forEach(card => {
            const style = card.getAttribute('data-style');
            const abv = card.getAttribute('data-abv');
            const brewery = card.getAttribute('data-brewery');

            const matchesStyle = !selectedStyle || style.includes(selectedStyle);
            const matchesAbv = !selectedAbv || abv === selectedAbv;
            const matchesBrewery = !selectedBrewery || brewery === selectedBrewery;

            if (matchesStyle && matchesAbv && matchesBrewery) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (styleFilter) styleFilter.addEventListener('change', filterBeers);
    if (abvFilter) abvFilter.addEventListener('change', filterBeers);
    if (breweryFilter) breweryFilter.addEventListener('change', filterBeers);

    // Validación y envío de formularios
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar la reserva
            // Por ahora, solo mostraremos un mensaje de éxito
            alert('¡Gracias por tu reserva! Te contactaremos pronto para confirmar.');
            bookingForm.reset();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el contacto
            // Por ahora, solo mostraremos un mensaje de éxito
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
            contactForm.reset();
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

    // Animaciones al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // No dejar de observar para que funcione en múltiples entradas/salidas
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.beer-card, .review, .experience-item').forEach(el => {
        observer.observe(el);
    });

    // Observar secciones para animaciones de entrada
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        observer.observe(section);
    });

    // Funcionalidad para la galería (lightbox simple)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            // Crear overlay
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = `
                <div class="gallery-lightbox">
                    <span class="close-btn">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                </div>
            `;
            
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            // Cerrar al hacer clic en la x o fuera de la imagen
            overlay.querySelector('.close-btn').addEventListener('click', closeOverlay);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeOverlay();
                }
            });
            
            function closeOverlay() {
                document.body.removeChild(overlay);
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Función para inicializar el mapa (cuando se carga completamente)
function initMap() {
    // Esta función se llamaría si usáramos el API de Google Maps directamente
    // En este caso, estamos usando el iframe embed, así que no es necesaria
    // a menos que queramos más control sobre el mapa
}

// Agregar estilos para la galería lightbox si no están en CSS
const lightboxStyles = `
.gallery-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.gallery-lightbox {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.gallery-lightbox img {
    max-width: 100%;
    max-height: 80vh;
    display: block;
}

.close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    line-height: 1;
}
`;

// Inyectar estilos para la galería si no existen
if (!document.querySelector('#lightbox-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'lightbox-styles';
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);
}