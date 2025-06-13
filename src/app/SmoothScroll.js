import GSAP from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  playProjectAnimation,
  playProjectAnimation2,
} from "./animations/projectAnimations";
GSAP.registerPlugin(SplitText);
export default class {
  constructor({ element, viewport, scroll }) {
    this.element = element;
    this.viewport = viewport;
    this.scroll = scroll;
    this.animationPlayed = false;
    this.animationPlayed2 = false;
    this.easedScroll = this.scroll.soft;
    this.isMobile = window.innerWidth <= 768;
    this.ticking = false;
    this.lastScrollTime = Date.now();
    this.scrollThreshold = 16; // ~60fps

    // Si c'est un mobile, on désactive le smooth scroll
    // if (this.isMobile) {
    //   this.element.style.position = "relative";
    //   this.element.style.transform = "none";
    //   return;
    // }

    // Cache des éléments DOM fréquemment utilisés
    this.cachedElements = {
      scrollContent: this.element.querySelector(".scroll__content"),
      movingSquares: {
        square1: document.querySelector("#movingsquareprojet1"),
        square2: document.querySelector("#movingsquareprojet2"),
        square3: document.querySelector("#movingsquareprojet3")
      },
      reactRoot:window.innerWidth <= 768?document.querySelector("#react-root2"):document.querySelector("#react-root1")
    };

    const sectionDroite1 = document.getElementById("sectiondroite1");
    const circle = sectionDroite1.querySelector(".arrow-circle");
    const fillCircle = sectionDroite1.querySelector(".fill-circle");
    const arrow = sectionDroite1.querySelector(".arrow-path");

    // Animation au hover
    // sectionDroite1.addEventListener("mouseenter", () => {
      // GSAP.to(fillCircle, {
        // attr: { r: 19 },
        // duration: 0.3,
        // ease: "power2.out",
      // });
      // GSAP.to(arrow, {
        // scale: 0,
        // fill: "black",
        // transformOrigin: "center",
        // duration: 0.3,
        // ease: "power2.out",
      // })
        // .then(() => {
          // GSAP.to(arrow, {
            // x: -10,
            // y: 10,
            // scale: 1,
            // duration: 0.0,
            // ease: "power2.out",
          // });
        // })
        // .then(() => {
          // GSAP.to(arrow, {
            // x: 0,
            // y: 0,
            // duration: 0.3,
            // ease: "power2.out",
          // });
        // });
    // });

    // Animation au unhover
    // sectionDroite1.addEventListener("mouseleave", () => {
      // GSAP.to(fillCircle, {
        // attr: { r: 0 },
        // duration: 0.5,
        // ease: "power2.in",
      // });

      // GSAP.to(arrow, {
        // scale: 1,
        // transformOrigin: "center",
        // fill: "white",
        // duration: 0.3,
        // ease: "power2.in",
      // });
    // });

    // const sectionDroite2 = document.getElementById("sectiondroite2");
    // const circle2 = sectionDroite2.querySelector(".arrow-circle");
    // const fillCircle2 = sectionDroite2.querySelector(".fill-circle");
    // const arrow2 = sectionDroite2.querySelector(".arrow-path");

    // Animation au hover
    // sectionDroite2.addEventListener("mouseenter", () => {
      // GSAP.to(fillCircle2, {
        // attr: { r: 19 },
        // duration: 0.3,
        // ease: "power2.out",
      // });
      // GSAP.to(arrow2, {
        // scale: 0,
        // fill: "black",
        // transformOrigin: "center",
        // duration: 0.3,
        // ease: "power2.out",
      // })
        // .then(() => {
          // GSAP.to(arrow2, {
            // x: -10,
            // y: 10,
            // scale: 1,
            // duration: 0.0,
            // ease: "power2.out",
          // });
        // })
        // .then(() => {
          // GSAP.to(arrow2, {
            // x: 0,
            // y: 0,
            // duration: 0.3,
            // ease: "power2.out",
          // });
        // });
    // });

    // Animation au unhover
    // sectionDroite2.addEventListener("mouseleave", () => {
      // GSAP.to(fillCircle2, {
        // attr: { r: 0 },
        // duration: 0.5,
        // ease: "power2.in",
      // });

      // GSAP.to(arrow2, {
        // scale: 1,
        // transformOrigin: "center",
        // fill: "white",
        // duration: 0.3,
        // ease: "power2.in",
      // });
    // });

    const image = document.querySelector(".grid-image");

    // Attendre que l'image soit chargée pour avoir ses dimensions réelles
    image.addEventListener("load", () => {
      const imageWidth = image.offsetWidth;
      const imageHeight = image.offsetHeight;

      // Taille des points et espacement
      const pointSize = 15;
      const spacing = 30;

      // Calculer le décalage pour centrer le motif
      const offsetX = (imageWidth % spacing) / 2;
      const offsetY = (imageHeight % spacing) / 2;

      // Appliquer le masque avec le décalage calculé
      // image.style.webkitMaskImage = `repeating-linear-gradient(0deg, #000, #000 ${pointSize}px, transparent ${pointSize}px, transparent ${spacing}px),
      //                               repeating-linear-gradient(90deg, #000, #000 ${pointSize}px, transparent ${pointSize}px, transparent ${spacing}px)`;
      // image.style.webkitMaskSize = `${spacing}px ${spacing}px`;
      // image.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;

      // // Pour les navigateurs non-webkit
      // image.style.maskImage = image.style.webkitMaskImage;
      // image.style.maskSize = image.style.webkitMaskSize;
      // image.style.maskPosition = image.style.webkitMaskPosition;
    });

    // Pré-calcul des valeurs fréquemment utilisées
    this.constants = {
      decalMax: this.viewport.width <= 360 ? 10 : this.viewport.width / 5,
      halfWidth: this.viewport.width / 2,
      viewportMultipliers: {
        height2x: this.viewport.height * 2,
        height3x: this.viewport.height * 3,
        height4x: this.viewport.height * 4
      }
    };

    // Définition des plages de scroll et leurs actions associées
    this.scrollRanges = [
      {
        min: 0,
        max: this.viewport.height,
        action: () => {
          const progress = (this.scroll.soft - 0) / (1 * this.viewport.height);
          return `translateY(${-this.scroll.soft}px)`;
        },
      },
      {
        min: this.viewport.height,
        max: 1.5 * this.viewport.height,
        action: () => {
          const progress = (this.scroll.soft - this.viewport.height) / (0.5 * this.viewport.height);
          return `translateX(${-progress * this.constants.halfWidth}px) translateY(${-this.viewport.height}px)`;
        },
      },
      {
        min: 1.5 * this.viewport.height,
        max: 2 * this.viewport.height,
        action: (scrollValue) => {
          const div = this.cachedElements.movingSquares.square1;
          const progress =
            (scrollValue - 1.5 * this.viewport.height) /
            (0.5 * this.viewport.height);
          const decalMax = this.constants.decalMax;
          // console.log(decalMax)
          const backgroundX = progress * decalMax;

          if (div) {
            div.style.left = `${-backgroundX}px`;
          }

          const translateX = -this.constants.halfWidth;
          // const translateX = 0;
          const translateY = -this.viewport.height;
          // console.log("2",div.style.left)
          return `translateX(${translateX}px) translateY(${translateY}px)`;
        },
      },
      {
        min: 2 * this.viewport.height,
        max: 3 * this.viewport.height,
        action: () => {
          this.updateMovingSquares([this.cachedElements.movingSquares.square1, this.cachedElements.movingSquares.square2]);
          return this.getTransform(
            -this.constants.halfWidth,
            -this.viewport.height - this.scroll.soft + 2 * this.viewport.height
          );
        },
      },
      {
        min: 3 * this.viewport.height,
        max: 4 * this.viewport.height,
        action: () => {
          this.updateMovingSquares([
            this.cachedElements.movingSquares.square1,
            this.cachedElements.movingSquares.square2,
            this.cachedElements.movingSquares.square3
          ]);
          
          const translateX = -this.constants.halfWidth;
          // const translateX = 0;
          const translateY = -this.viewport.height - this.scroll.soft + 2 * this.viewport.height;
          return `translateX(${translateX}px) translateY(${translateY}px)`;
        },
      },
      {
        min: 4 * this.viewport.height,
        max:Infinity,
        // max: 5.1 * this.viewport.height,
        action: () => {
          const decalMax = this.constants.decalMax;
          const div1 = this.cachedElements.movingSquares.square1;
          if (div1) {
            div1.style.left = `${-decalMax}px`;
          }
          const div2 = this.cachedElements.movingSquares.square2;
          if (div2) {
            div2.style.left = `${-decalMax}px`;
          }
          const div3 = this.cachedElements.movingSquares.square3;
          if (div3) {
            div3.style.left = `${-decalMax}px`;
          }

          const div = this.cachedElements.reactRoot;

          if (div) {
            const position = window.getComputedStyle(div).position;
            // console.log(4 * this.viewport.height,-this.scroll.soft)
            // if (position !== "absolute") {
              // div.style.position = "fixed";
              div.style.top = `${8 * this.viewport.height - this.scroll.soft}px`;
              div.style.left = `${this.viewport.width/2}px`;
              div.style.width = `${this.viewport.width}px`;
              div.style.height = `${this.viewport.height}px`;
            // }
          }
          // console.log("5",-this.viewport.height,this.viewport.height-this.scroll.soft)
          // absolute top-0 left-0 w-full h-full
          return `translateX(${-this.constants.halfWidth}px) translateY(${
            // -this.viewport.height - this.scroll.soft + 2 * this.viewport.height
            -3 * this.viewport.height 
          }px)`;
        },
      },
    ];

    // Optimisation des calculs de scroll
    this.scrollRanges = this.scrollRanges.map(range => ({
      ...range,
      heightMin: range.min * this.viewport.height,
      heightMax: range.max * this.viewport.height
    }));
  }

  setSizes() {
	
	  this.scroll.height =this.isMobile?6.1* this.viewport.height:
	  this.cachedElements.scrollContent.getBoundingClientRect().height +
      4 * this.viewport.height +
      0.1 * this.viewport.height;
    this.scroll.limit =this.isMobile?5.1* this.viewport.height:5.1 * this.viewport.height;
 
    document.body.style.height = `${this.scroll.height}px`;
  }

  // Fonction d'easing
  ease(current, target, factor = 0.1) {
    return current + (target - current) * factor;
  }

  update() {
    const now = Date.now();
    if (!this.ticking && (now - this.lastScrollTime) >= this.scrollThreshold) {
      requestAnimationFrame(() => {
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

        // Trouve la plage correspondante
        const currentRange = this.scrollRanges.find(
          (range) => this.scroll.soft > range.min && this.scroll.soft <= range.max
        );

        // Applique la transformation correspondante
        if (currentRange && !this.isMobile) {
          const action = currentRange.action.bind(this);
          this.cachedElements.scrollContent.style.transform = action(this.scroll.soft);
        }else{
          this.cachedElements.scrollContent.style.transform = `translateY(${-this.scroll.soft}px)`
        }

        //ajout perso

        if (this.scroll.soft > 1.1 * this.viewport.height) {
          const voici = document.querySelector("#voici");
          GSAP.to(voici, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (this.scroll.soft < 1.1 * this.viewport.height) {
          const voici = document.querySelector("#voici");
          GSAP.to(voici, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (this.scroll.soft > 1.2 * this.viewport.height && !this.animationPlayed) {
          this.animationPlayed = true;
          playProjectAnimation();
        }

        if (this.scroll.soft > 2.2 * this.viewport.height && !this.animationPlayed2) {
          this.animationPlayed2 = true;
          playProjectAnimation2();
        }

        this.ticking = false;
        this.lastScrollTime = now;
      });
      this.ticking = true;
    }
  }

  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.constants = {
      decalMax: this.viewport.width <= 360 ? 10 : this.viewport.width / 5,
      halfWidth: this.viewport.width / 2
    };

    this.setSizes();
  }

  // Créer une fonction utilitaire pour les carrés mobiles
  updateMovingSquares(squares) {
    const decalMax = this.constants.decalMax;
    squares.forEach(square => {
      if (square) square.style.left = `${-decalMax}px`;
    });
  }

  // Créer une fonction utilitaire pour générer la transformation
  getTransform(x, y) {
    return `translateX(${x}px) translateY(${y}px)`;
  }
}
