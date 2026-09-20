// Inicializar todos los carruseles
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    const imageModal = document.querySelector('.image-modal');
    const modalImage = imageModal.querySelector('.image-modal-image');
    const modalClose = imageModal.querySelector('.image-modal-close');
    const modalPrevious = imageModal.querySelector('.image-modal-previous');
    const modalNext = imageModal.querySelector('.image-modal-next');
    let modalImages = [];
    let modalIndex = 0;

    function showModalImage(index) {
      modalIndex = (index + modalImages.length) % modalImages.length;
      const image = modalImages[modalIndex];
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
    }

    function closeImageModal() {
      imageModal.hidden = true;
      document.body.style.overflow = '';
    }

    function openImageModal(images, index) {
      modalImages = images;
      showModalImage(index);
      imageModal.hidden = false;
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    modalClose.addEventListener('click', closeImageModal);
    modalPrevious.addEventListener('click', () => showModalImage(modalIndex - 1));
    modalNext.addEventListener('click', () => showModalImage(modalIndex + 1));

    imageModal.addEventListener('click', (event) => {
      if (event.target === imageModal) closeImageModal();
    });

    document.addEventListener('keydown', (event) => {
      if (imageModal.hidden) return;
      if (event.key === 'Escape') closeImageModal();
      if (event.key === 'ArrowLeft') showModalImage(modalIndex - 1);
      if (event.key === 'ArrowRight') showModalImage(modalIndex + 1);
    });
    
    carouselContainers.forEach((container) => {
      const track = container.querySelector('.carousel-track');
      const slides = container.querySelectorAll('.carousel-slide');
      const prevBtn = container.querySelector('.prev');
      const nextBtn = container.querySelector('.next');
      const dotsContainer = container.querySelector('.carousel-dots');
      const galleryImages = Array.from(container.querySelectorAll('.carousel-slide img'));
      
      let currentSlide = 0;
      const totalSlides = slides.length;

      galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => openImageModal(galleryImages, index));
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