class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.imageObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px', // Commence à charger 50px avant que l'image soit visible
        threshold: 0.01
      });

      this.images.forEach(img => {
        this.imageObserver.observe(img);
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Intersection Observer
      this.loadAllImages();
    }
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    }
  }

  loadAllImages() {
    this.images.forEach(img => {
      this.loadImage(img);
    });
  }
}

// Initialiser le lazy loader quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new LazyLoader();
}); 