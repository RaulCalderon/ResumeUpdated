// Inicializar todos los carruseles
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach((container, containerIndex) => {
      const track = container.querySelector('.carousel-track');
      const slides = container.querySelectorAll('.carousel-slide');
      const prevBtn = container.querySelector('.prev');
      const nextBtn = container.querySelector('.next');
      const dotsContainer = container.querySelector('.carousel-dots');
      
      let currentSlide = 0;
      const totalSlides = slides.length;
      
      // Crear puntos indicadores
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      
      // Función para actualizar el carrusel
      function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
        });
      }
      
      // Función para ir a un slide específico
      function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
      }
      
      // Botón siguiente
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      });
      
      // Botón anterior
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
      
      // Autoplay opcional (descomentar para activar)
      // setInterval(() => {
      //   currentSlide = (currentSlide + 1) % totalSlides;
      //   updateCarousel();
      // }, 5000);
    });
});