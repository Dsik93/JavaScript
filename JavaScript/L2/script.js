document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    let isPaused = false;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const dotsContainer = document.querySelector('.dots');
    let autoSlideInterval;

    function createDots() {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
          goToSlide(i);
          restartAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
    }
  
    function updateDots() {
      const dots = document.querySelectorAll('.dots .dot');
      dots.forEach((dot, index) => {
        if(index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    function goToSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
      });
      currentIndex = index;
      updateDots();
    }

    function autoSlide() {
      if (!isPaused) {
        if (currentIndex === totalSlides - 1) {
          goToSlide(0);
        } else {
          goToSlide(currentIndex + 1);
        }
      }
    }

    function togglePause() {
      isPaused = !isPaused;
      if (!isPaused) {
        restartAutoSlide();
      }
    }

    function restartAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(autoSlide, 3000); // Co 3 sekundy
    }

    nextButton.addEventListener('click', () => {
      goToSlide(currentIndex + 1 >= totalSlides ? 0 : currentIndex + 1);
      restartAutoSlide();
    });

    prevButton.addEventListener('click', () => {
      goToSlide(currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1);
      restartAutoSlide();
    });

    // Możesz dodać przycisk pauzy lub obsługiwać pauzę na kliknięcie slajdu, np.:
    // document.getElementById('slider').addEventListener('click', togglePause);

    createDots();
    goToSlide(0); // Ustawia początkowy slajd
    restartAutoSlide(); // Rozpoczęcie automatycznego przewijania
});
