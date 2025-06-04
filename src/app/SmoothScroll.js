import GSAP from "gsap";
import { SplitText } from "gsap/SplitText";
GSAP.registerPlugin(SplitText);
export default class {
  constructor({ element, viewport, scroll }) {
    this.element = element;
    this.viewport = viewport;
    this.scroll = scroll;
    this.animationPlayed = false;
    this.easedScroll = this.scroll.soft;
    this.isMobile = window.innerWidth <= 768;

    // Si c'est un mobile, on désactive le smooth scroll
    if (this.isMobile) {
      this.element.style.position = 'relative';
      this.element.style.transform = 'none';
      return;
    }

    this.elements = {
      scrollContent: this.element.querySelector(".scroll__content"),
    };

    const sectionDroite1 = document.getElementById("sectiondroite1");
    const circle = sectionDroite1.querySelector(".arrow-circle");
    const fillCircle = sectionDroite1.querySelector(".fill-circle");
    const arrow = sectionDroite1.querySelector(".arrow-path");

    // Animation au hover
    sectionDroite1.addEventListener("mouseenter", () => {
      GSAP.to(fillCircle, {
        attr: { r: 19 },
        duration: 0.3,
        ease: "power2.out",
      });
      GSAP.to(arrow, {
        scale: 0,
        fill: "black",
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      })
        .then(() => {
          GSAP.to(arrow, {
            x: -10,
            y: 10,
            scale: 1,
            duration: 0.0,
            ease: "power2.out",
          });
        })
        .then(() => {
          GSAP.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
    });

    // Animation au unhover
    sectionDroite1.addEventListener("mouseleave", () => {
      GSAP.to(fillCircle, {
        attr: { r: 0 },
        duration: 0.5,
        ease: "power2.in",
      });

      GSAP.to(arrow, {
        scale: 1,
        transformOrigin: "center",
        fill: "white",
        duration: 0.3,
        ease: "power2.in",
      });
    });

    const image = document.querySelector('.grid-image');

    // Attendre que l'image soit chargée pour avoir ses dimensions réelles
    image.addEventListener('load', () => {
      const imageWidth = image.offsetWidth;
      const imageHeight = image.offsetHeight;
      
      // Taille des points et espacement
      const pointSize = 15;
      const spacing = 30;
      
      // Calculer le décalage pour centrer le motif
      const offsetX = (imageWidth % spacing) / 2;
      const offsetY = (imageHeight % spacing) / 2;
      
      // Appliquer le masque avec le décalage calculé
      image.style.webkitMaskImage = `repeating-linear-gradient(0deg, #000, #000 ${pointSize}px, transparent ${pointSize}px, transparent ${spacing}px), 
                                    repeating-linear-gradient(90deg, #000, #000 ${pointSize}px, transparent ${pointSize}px, transparent ${spacing}px)`;
      image.style.webkitMaskSize = `${spacing}px ${spacing}px`;
      image.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
      
      // Pour les navigateurs non-webkit
      image.style.maskImage = image.style.webkitMaskImage;
      image.style.maskSize = image.style.webkitMaskSize;
      image.style.maskPosition = image.style.webkitMaskPosition;
    });

    // Définition des plages de scroll et leurs actions associées
    this.scrollRanges = [
      {
        min: 0,
        max: window.innerHeight,
        action: () => {
          return `translateY(${-this.scroll.soft}px)`;
        }
      },
      {
        min: window.innerHeight,
        max: 1.5 * window.innerHeight,
        action: () => {
          
          const progress = (this.scroll.soft - window.innerHeight) / (0.5 * window.innerHeight);
          const translateX = -progress * window.innerHeight;
          // console.log("1",translateX,window.innerHeight)
          return `translateX(${translateX}px) translateY(${-window.innerHeight}px)`;
        }
      },
      {
        min: 1.5 * window.innerHeight,
        max: 2 * window.innerHeight,
        action: (scrollValue) => {
          const div = document.querySelector('#movingsquareprojet1');
          const progress = (scrollValue - 1.5 * window.innerHeight) / (0.5 * window.innerHeight);
          const backgroundX = progress * 500;
          
          if (div) {
            div.style.left = `${-backgroundX}px`;
          }
          
          const translateX = -window.innerHeight;
          const translateY = -window.innerHeight;
          // console.log("2",translateX,window.innerHeight)
          return `translateX(${translateX}px) translateY(${translateY}px)`;
        }
      },
      {
        min: 2 * window.innerHeight,
        max: 2.5 * window.innerHeight,
        action: (scrollValue) => {
          
          // Progress normal pour backgroundX (sur toute la section)
          const progress = (scrollValue - 2 * window.innerHeight) / (0.5 * window.innerHeight);
          const div = document.querySelector('#movingsquareprojet1');
          const backgroundX = 500 * (1 - progress);
          
          // Progress modifié pour translateX (uniquement sur la dernière moitié)
          const translateProgress = Math.max(0, (scrollValue - 2.4 * window.innerHeight) / (0.1 * window.innerHeight));
          const translateX = -window.innerHeight * (1 - translateProgress);
          
          const sectiondroite1 = document.querySelector('#sectiondroite1');
          const translateY = -window.innerHeight * (1 - translateProgress);
          
          if (sectiondroite1) {
            // Crée une courbe en cloche pour translateX
            const translateXProgress = Math.sin(translateProgress * Math.PI); // Crée une courbe qui va de 0 à 1 puis retourne à 0
            const maxTranslateX = -10 * window.innerHeight / 100; // -10vh converti en px
            const translateX = maxTranslateX * translateXProgress;
            
            // sectiondroite1.style.transform = `translate(${translateX}px)`;
          }
          
          if (div) {
            div.style.left = `${-backgroundX}px`;
          }
          // console.log("3",-this.scroll.soft)
          return `translateX(${translateX}px) translateY(${-window.innerHeight}px)`;
        }
      },
      {
        min: 2.5 * window.innerHeight,
        max: Infinity,
        action: () => {
          // console.log("4",-this.scroll.soft + 0.5*window.innerHeight)
          return `translateY(${-this.scroll.soft +1.5* window.innerHeight}px)`;
        }
      }
    ];
  }

  setSizes() {
    this.scroll.height =
      this.elements.scrollContent.getBoundingClientRect().height +
      2.5 * window.innerHeight + 0.1*window.innerHeight;
    this.scroll.limit =
      this.elements.scrollContent.clientHeight -
      this.viewport.height +
      3.5 * window.innerHeight + 0.1*window.innerHeight;

    document.body.style.height = `${this.scroll.height}px`;
  }

  // Fonction d'easing
  ease(current, target, factor = 0.1) {
    return current + (target - current) * factor;
  }

  update() {
    // Si c'est un mobile, on ne fait pas d'update
    if (this.isMobile) {
      return;
    }

    this.scroll.hard = window.scrollY;
    this.scroll.hard = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.hard);
    this.scroll.soft = GSAP.utils.interpolate(
      this.scroll.soft,
      this.scroll.hard,
      this.scroll.ease
    );

    if (this.scroll.soft < 0.01) {
      this.scroll.soft = 0;
    }
    // console.log(this.scroll.soft,window.scrollY,window.innerHeight)
    
    // Lisse la valeur de scroll autour de la transition
    const transitionPoint = 2 * window.innerHeight;
    const transitionRange = 0.3 * window.innerHeight; // Zone de transition

    if (Math.abs(this.scroll.soft - transitionPoint) < transitionRange) {
      this.easedScroll = this.ease(this.easedScroll, this.scroll.soft);
    } else {
      this.easedScroll = this.scroll.soft;
    }

    // Trouve la plage correspondante
    const currentRange = this.scrollRanges.find(
      range => this.easedScroll > range.min && this.easedScroll <= range.max
    );

    // Applique la transformation correspondante
    if (currentRange) {
      const action = currentRange.action.bind(this);
      this.elements.scrollContent.style.transform = action(this.easedScroll);
    }

    //ajout perso
    if (this.scroll.soft > 1.2 * window.innerHeight && !this.animationPlayed) {
      this.animationPlayed = true;

      GSAP.to(document.getElementsByClassName("ligneProjet1"), {
        color: "red",
        scaleX: 1,
        transformOrigin: "left",
        duration: 1.5,
        ease: "ease",
      });

      const text = new SplitText(document.getElementById("titreprojet1"), {
        type: "chars",
        charsClass: "char",
      });

      // const text2 = new SplitText(document.getElementById("texteprojet1"), {
      //   type: "chars",
      //   charsClass: "char"
      // });

      GSAP.from(text.chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 1.0,
          from: "start",
        },
        ease: "power4.out",
      });

      GSAP.from(document.getElementById("texteprojet1"), {
        y: 100,
        opacity: 0,
        autoAlpha: 0,
        stagger: 0.2,
        duration: 1.6,
      },'<.3');

      GSAP.from(document.getElementById("visitezleprojet1"), {
        y: 100,
        opacity: 0,
        autoAlpha: 0,
        stagger: 0.2,
        duration: 1.6,
      },'<.3');


    }
  }

  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.setSizes();
  }
}
