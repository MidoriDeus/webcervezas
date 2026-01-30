// Efecto de cambio de gradiente en el fondo al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  // Crear el elemento de gradiente de fondo
  const gradientElement = document.createElement('div');
  gradientElement.className = 'scrolling-gradient';
  gradientElement.id = 'scrollingGradient';
  document.body.insertBefore(gradientElement, document.body.firstChild);

  // Variables para controlar el efecto
  let ticking = false;

  // Función para actualizar el gradiente según la posición de scroll
  function updateGradient() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    
    // Calcular el porcentaje de scroll
    const scrollPercentage = Math.min(1, scrollPosition / maxScroll);
    
    // Definir los colores base para el gradiente
    const colors = [
      { top: '#8B4513', mid: '#A0522D', bot: '#CD853F' }, // Marrón oscuro
      { top: '#A0522D', mid: '#CD853F', bot: '#D2B48C' }, // Marrón medio
      { top: '#CD853F', mid: '#D2B48C', bot: '#F5DEB3' }, // Marrón claro
      { top: '#D2B48C', mid: '#F5DEB3', bot: '#DEB887' }, // Beige
      { top: '#F5DEB3', mid: '#DEB887', bot: '#D2B48C' }, // De regreso
      { top: '#DEB887', mid: '#CD853F', bot: '#A0522D' }, // Otro punto
    ];
    
    // Determinar el índice de color basado en el porcentaje de scroll
    const colorIndex = Math.floor(scrollPercentage * (colors.length - 1));
    const remainder = (scrollPercentage * (colors.length - 1)) % 1;
    
    // Interpolación entre dos colores
    const currentColors = colors[colorIndex];
    const nextColors = colors[Math.min(colorIndex + 1, colors.length - 1)];
    
    // Interpolar los colores
    const interpolatedTop = interpolateColor(currentColors.top, nextColors.top, remainder);
    const interpolatedMid = interpolateColor(currentColors.mid, nextColors.mid, remainder);
    const interpolatedBot = interpolateColor(currentColors.bot, nextColors.bot, remainder);
    
    // Aplicar el gradiente interpolado
    gradientElement.style.background = `linear-gradient(
      180deg,
      ${interpolatedTop} 0%,
      ${interpolatedMid} 50%,
      ${interpolatedBot} 100%
    )`;
    
    ticking = false;
  }

  // Función para interpolar colores hexadecimales
  function interpolateColor(color1, color2, factor) {
    // Convertir colores hex a RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Interpolar
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    
    // Convertir de vuelta a hex
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Función para solicitar la actualización del gradiente
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateGradient);
      ticking = true;
    }
  }

  // Añadir listener para el evento de scroll
  window.addEventListener('scroll', requestTick);

  // Inicializar el gradiente
  updateGradient();
});

// Función para añadir efecto de profundidad a secciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  
  function handleSectionDepth() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPercentage = (windowHeight - rect.top) / windowHeight;
      
      // Limitar entre 0 y 1
      const depthFactor = Math.max(0, Math.min(1, scrollPercentage));
      
      // Aplicar efecto de profundidad basado en la posición
      section.style.setProperty('--depth-factor', depthFactor);
    });
  }
  
  // Añadir listener para scroll
  window.addEventListener('scroll', handleSectionDepth);
  
  // Inicializar
  handleSectionDepth();
});