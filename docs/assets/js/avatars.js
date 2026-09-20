// Inicializar todos los carruseles
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    const imageModal = document.querySelector('.image-modal');
    const modalImage = imageModal.querySelector('img');
    const closeModalButton = imageModal.querySelector('.image-modal-close');

    function closeImageModal() {
      imageModal.hidden = true;
      document.body.style.overflow = '';
    }

    function openImageModal(image) {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      imageModal.hidden = false;
      document.body.style.overflow = 'hidden';
      closeModalButton.focus();
    }

    imageModal.addEventListener('click', (event) => {
      if (event.target === imageModal) closeImageModal();
    });

    closeModalButton.addEventListener('click', closeImageModal);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !imageModal.hidden) closeImageModal();
    });
    
    carouselContainers.forEach((container, containerIndex) => {
      const track = container.querySelector('.carousel-track');
      const slides = container.querySelectorAll('.carousel-slide');
      const prevBtn = container.querySelector('.prev');
      const nextBtn = container.querySelector('.next');
      const dotsContainer = container.querySelector('.carousel-dots');
      
      let currentSlide = 0;
      const totalSlides = slides.length;

      slides.forEach((slide) => {
        slide.querySelector('img')?.addEventListener('click', (event) => {
          openImageModal(event.currentTarget);
        });
      });
      
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