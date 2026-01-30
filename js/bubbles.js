// Función para crear burbujas de cerveza dinámicas
function createBeerBubbles() {
    // Crear contenedor para las burbujas
    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'dynamic-bubbles';
    bubblesContainer.style.position = 'fixed';
    bubblesContainer.style.top = '0';
    bubblesContainer.style.left = '0';
    bubblesContainer.style.width = '100%';
    bubblesContainer.style.height = '100%';
    bubblesContainer.style.pointerEvents = 'none';
    bubblesContainer.style.zIndex = '0';
    bubblesContainer.style.overflow = 'hidden';
    bubblesContainer.style.opacity = '0.7'; // Reducir la opacidad general
    document.body.appendChild(bubblesContainer);

    // Determinar la cantidad de burbujas según el tamaño de pantalla
    const isMobile = window.innerWidth <= 768;
    const bubbleCreationInterval = isMobile ? 600 : 300; // Menos burbujas en móviles
    const bubbleCreationChance = isMobile ? 0.5 : 0.7; // Menor probabilidad en móviles

    // Función para crear una burbuja individual
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // Tamaño aleatorio (ajustado para mejor visualización)
        const size = Math.random() * 15 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Posición inicial aleatoria
        const startX = Math.random() * window.innerWidth;
        bubble.style.left = `${startX}px`;
        bubble.style.bottom = '-20px'; // Comienza desde abajo

        // Color de burbuja similar al de la espuma de cerveza
        const opacity = Math.random() * 0.3 + 0.1;
        bubble.style.backgroundColor = `rgba(255, 251, 240, ${opacity})`;

        // Añadir borde negro para que se noten mejor
        bubble.style.border = '1px solid #000';

        bubblesContainer.appendChild(bubble);

        // Movimiento de la burbuja
        let pos = -20;
        const speed = Math.random() * 1.5 + 0.5; // Velocidad ajustada
        const swayAmount = Math.random() * 60 - 30; // Oscilación lateral reducida

        function animate() {
            pos += speed;
            const sway = Math.sin(pos / 20) * swayAmount; // Frecuencia ajustada
            const currentLeft = startX + sway;

            bubble.style.bottom = `${pos}px`;
            bubble.style.left = `${currentLeft}px`;

            if (pos < window.innerHeight + 50) {
                requestAnimationFrame(animate);
            } else {
                bubble.remove();
            }
        }

        animate();
    }

    // Crear burbujas periódicamente
    setInterval(() => {
        if (Math.random() > bubbleCreationChance) { // Ajustar la probabilidad según dispositivo
            createBubble();
        }
    }, bubbleCreationInterval);
}

// Función para detectar scroll y activar efectos
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
                // Ajustar opacidad o efectos según la posición en pantalla
                const adjustedPosition = Math.min(1, Math.max(0, positionRatio));
                
                // Podríamos ajustar efectos aquí según la posición
                // Por ejemplo, aumentar la intensidad de las burbujas
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
    createBeerBubbles();
    handleScrollEffects();
    
    // Añadir clases CSS a secciones específicas para efectos de olas
    const beerSection = document.querySelector('.beers');
    if (beerSection) {
        beerSection.classList.add('beer-waves', 'bubbles');
    }
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('foam-effect');
    }
});