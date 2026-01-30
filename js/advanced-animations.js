// GENERADOR DINÁMICO DE BURBUJAS
class BeerBubbleGenerator {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.bubbles = [];
    this.maxBubbles = 15;
    this.init();
  }
  
  init() {
    // Crear burbujas iniciales
    for (let i = 0; i < 5; i++) {
      this.createBubble();
    }
    
    // Crear burbujas periódicamente
    setInterval(() => {
      if (this.bubbles.length < this.maxBubbles) {
        this.createBubble();
      }
    }, 2000);
    
    // Limpiar burbujas antiguas
    setInterval(() => {
      this.cleanupBubbles();
    }, 5000);
  }
  
  createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Posición aleatoria
    const leftPos = Math.random() * 100;
    bubble.style.left = `${leftPos}%`;
    
    // Tamaño aleatorio
    const size = Math.random() * 10 + 5;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Retraso aleatorio para la animación
    const delay = Math.random() * 5;
    bubble.style.animationDelay = `${delay}s`;
    
    // Color de burbuja con transparencia
    const opacity = Math.random() * 0.4 + 0.3;
    bubble.style.background = `rgba(255, 251, 240, ${opacity})`;
    
    this.container.appendChild(bubble);
    this.bubbles.push(bubble);
    
    // Remover burbuja cuando termine la animación
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
        this.bubbles = this.bubbles.filter(b => b !== bubble);
      }
    }, 10000); // Duración de la animación
  }
  
  cleanupBubbles() {
    // Remover burbujas que ya no están en el DOM
    this.bubbles = this.bubbles.filter(bubble => {
      if (!bubble.parentNode) {
        return false;
      }
      return true;
    });
  }
}

// CONTROL DE ANIMACIONES POR SCROLL
class ScrollAnimationController {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.lastScrollTop = 0;
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
    
    // Aplicar efectos basados en la dirección del scroll
    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        // Aumentar la intensidad de las animaciones en la sección visible
        section.style.setProperty('--intensity', '1');
      } else {
        section.style.setProperty('--intensity', '0.5');
      }
    });
    
    this.lastScrollTop = scrollTop;
  }
}

// OPTIMIZACIÓN PARA MOBILE
class MobileOptimizer {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }
  
  init() {
    if (this.isMobile) {
      // Reducir la cantidad de burbujas en dispositivos móviles
      this.reduceBubbleCount();
      
      // Deshabilitar animaciones complejas si el dispositivo es lento
      this.checkDevicePerformance();
    }
  }
  
  reduceBubbleCount() {
    // Ajustar la cantidad máxima de burbujas para móviles
    document.documentElement.style.setProperty('--max-bubbles', '8');
  }
  
  checkDevicePerformance() {
    // Detectar dispositivos de baja gama y reducir animaciones
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType.includes('slow')) {
        document.body.classList.add('low-performance-mode');
      }
    }
  }
}

// INICIALIZACIÓN DE EFECTOS
document.addEventListener('DOMContentLoaded', () => {
  // Iniciar generador de burbujas si el contenedor existe
  if (document.querySelector('.bubble-container')) {
    new BeerBubbleGenerator('.bubble-container');
  }
  
  // Iniciar controlador de scroll
  new ScrollAnimationController();
  
  // Iniciar optimizador para móviles
  new MobileOptimizer();
  
  // Añadir clase para indicar que JS está habilitado
  document.body.classList.add('js-enabled');
});

// FUNCIONES DE UTILIDAD PARA ANIMACIONES
const AnimationUtils = {
  // Función para pausar animaciones si el usuario prefiere menos movimiento
  setupReducedMotionHandler() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };
    
    mediaQuery.addListener(handleReducedMotion);
    handleReducedMotion(mediaQuery);
  },
  
  // Función para calcular la intensidad de animación basada en visibilidad
  calculateVisibilityIntensity(rect) {
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    // Calcular cuánto del elemento es visible
    const visibleHeight = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop);
    const elementHeight = rect.height;
    
    return Math.min(1, Math.max(0, visibleHeight / elementHeight));
  }
};

// Iniciar utilidades de animación
AnimationUtils.setupReducedMotionHandler();

// FUNCIONES DE CONTRASTE PARA ACCESIBILIDAD
const AccessibilityUtils = {
  // Asegurar contraste suficiente
  ensureContrast() {
    // Verificar relación de contraste para elementos importantes
    const importantElements = document.querySelectorAll('h1, h2, h3, .btn, p');
    
    importantElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      const bgColor = this.getBackgroundColor(el);
      const textColor = computedStyle.color;
      
      // Aquí podríamos implementar lógica para verificar contraste
      // y ajustar colores si es necesario
    });
  },
  
  getBackgroundColor(element) {
    const style = window.getComputedStyle(element);
    const bgColor = style.backgroundColor;
    
    // Si el color de fondo es transparente, buscar el ancestro con fondo
    if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
      let parent = element.parentElement;
      while (parent) {
        const parentBg = window.getComputedStyle(parent).backgroundColor;
        if (parentBg !== 'transparent' && parentBg !== 'rgba(0, 0, 0, 0)') {
          return parentBg;
        }
        parent = parent.parentElement;
      }
    }
    
    return bgColor;
  }
};