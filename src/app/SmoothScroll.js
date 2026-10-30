import GSAP from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  animateIn1,
  animateIn2,
  animateIn3,
  animateIn2_bis,
} from "./animations/projectAnimations";
GSAP.registerPlugin(SplitText);
export default class {
  constructor({ element, viewport, scroll }) {
    this.element = element;
    this.viewport = viewport;
    this.scroll = scroll;
    this.animationPlayed = false;
    this.animationPlayed2 = false;
    this.animationPlayed3 = false;
    this.easedScroll = this.scroll.soft;
    this.isMobile = window.innerWidth <= 768;
    this.decalpx = 1 * this.viewport.height;
    this.decal_nbecran = 2;
    // Sur mobile (Chrome/Safari), la barre d'URL fait varier window.innerHeight.
    // On conserve une hauteur stable (la plus grande observée) pour éviter les
    // sauts en bas de page et les recalculs aberrants de body height / scroll limit.
    this.maxViewportHeight = Math.max(
      window.innerHeight,
      window.visualViewport ? Math.round(window.visualViewport.height) : 0,
    );
    this.lastUpdate = 0;
    this.updateThreshold = 16; // Minimum 16ms entre les updates (60fps max)

    this.config = {
      maxScrollHeight: 10, // Hauteur maximale de scroll (en multiples de viewport.height)
      totalScrollHeight: 7.1, // Hauteur totale du scroll pour mobile
      scrollLimit: 6.1, // Limite de scroll
    };

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
        square2_bis: document.querySelector("#movingsquareprojet2_bis"),
        square3: document.querySelector("#movingsquareprojet3"),
      },
      reactRoot:
        window.innerWidth <= 768
          ? document.querySelector("#react-root2")
          : document.querySelector("#react-root1"),
      voici: document.querySelector("#voici"),
    };

    // Cache des valeurs pour les animations GSAP
    this.gsapAnimations = {
      voici: null,
    };

    // Pré-créer les animations GSAP statiques
    if (this.cachedElements.voici) {
      this.gsapAnimations.voiciFadeOut = GSAP.to(this.cachedElements.voici, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        paused: true,
      });
      this.gsapAnimations.voiciFadeIn = GSAP.to(this.cachedElements.voici, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        paused: true,
      });
    }

    // État pour éviter les animations répétées
    this.voiciState = 1; // 1 = visible, 0 = hidden

    // const sectionDroite1 = document.getElementById("sectiondroite1");
    // const circle = sectionDroite1.querySelector(".arrow-circle");
    // const fillCircle = sectionDroite1.querySelector(".fill-circle");
    // const arrow = sectionDroite1.querySelector(".arrow-path");

    // const image = document.querySelector(".grid-image");

    // Attendre que l'image soit chargée pour avoir ses dimensions réelles
    // image.addEventListener("load", () => {
    //   const imageWidth = image.offsetWidth;
    //   const imageHeight = image.offsetHeight;

    //   // Taille des points et espacement
    //   const pointSize = 15;
    //   const spacing = 30;

    //   // Calculer le décalage pour centrer le motif
    //   const offsetX = (imageWidth % spacing) / 2;
    //   const offsetY = (imageHeight % spacing) / 2;

    //   // Appliquer le masque avec le décalage calculé
    //   // image.style.webkitMaskImage = `repeating-linear-gradient(0deg, #000, #000 ${pointSize}px, transparent ${pointSize}px, transparent ${spacing}px),
    //   //                               repeating-linear-gradient(90deg, #000, #000 ${pointSize}px, transparent ${pointSize}px, transparent ${spacing}px)`;
    //   // image.style.webkitMaskSize = `${spacing}px ${spacing}px`;
    //   // image.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;

    //   // // Pour les navigateurs non-webkit
    //   // image.style.maskImage = image.style.webkitMaskImage;
    //   // image.style.maskSize = image.style.webkitMaskSize;
    //   // image.style.maskPosition = image.style.webkitMaskPosition;
    // });

    // Pré-calcul des valeurs fréquemment utilisées
    this.constants = {
      decalMax: this.viewport.width <= 360 ? 10 : this.viewport.width / 5,
      halfWidth: this.viewport.width / 2,
      viewportMultipliers: {
        height2x: this.viewport.height * 2,
        height3x: this.viewport.height * 3,
        height4x: this.viewport.height * 4,
      },
    };

    // Définition des plages de scroll et leurs actions associées
    this.scrollRanges = [
      {
        min: 0,
        max: this.viewport.height + this.viewport.height,
        action: () => {
          // console.log("-1", this.scroll.soft);
          if (this.cachedElements.movingSquares.square1) {
            this.cachedElements.movingSquares.square1.style.left = `0px`;
          }
          const progress = (this.scroll.soft - 0) / (1 * this.viewport.height);
          return `translateY(${-this.scroll.soft}px)`;
        },
      },
      {
        min: this.viewport.height + this.viewport.height,
        max: 1.5 * this.viewport.height + this.viewport.height,
        action: () => {
          // console.log("0", this.scroll.soft);
          const progress =
            (this.scroll.soft - 2 * this.viewport.height) /
            (0.5 * this.viewport.height);
          return `translateX(${-progress * this.constants.halfWidth}px) translateY(${-2 * this.viewport.height}px)`;
        },
      },
      {
        min: 2.5 * this.viewport.height,
        max: 3 * this.viewport.height,
        action: (scrollValue) => {
          // console.log("1", this.scroll.soft);
          const div = this.cachedElements.movingSquares.square1;
          const progress =
            (scrollValue - 2.5 * this.viewport.height) /
            (0.5 * this.viewport.height);
          const decalMax = this.constants.decalMax;
          // console.log(decalMax)
          const backgroundX = progress * decalMax;

          if (div) {
            div.style.left = `${-backgroundX}px`;
          }

          const translateX = -this.constants.halfWidth;
          // const translateX = 0;
          const translateY = -2 * this.viewport.height;
          // console.log("2",div.style.left)
          return `translateX(${translateX}px) translateY(${translateY}px)`;
        },
      },
      {
        min: 3 * this.viewport.height,
        max: (3 + this.decal_nbecran) * this.viewport.height,
        action: () => {
          // console.log("2", this.scroll.soft);
          this.updateMovingSquares([
            this.cachedElements.movingSquares.square1,
            this.cachedElements.movingSquares.square2,
            this.cachedElements.movingSquares.square2_bis,
            this.cachedElements.movingSquares.square3,
          ]);
          return this.getTransform(
            -this.constants.halfWidth,
            -this.viewport.height - this.scroll.soft + 2 * this.viewport.height,
          );
        },
      },
      {
        min: (3 + this.decal_nbecran) * this.viewport.height,
        max: (5 + this.decal_nbecran) * this.viewport.height,
        action: () => {
          // console.log("3", this.scroll.soft);
          this.updateMovingSquares([
            this.cachedElements.movingSquares.square1,
            this.cachedElements.movingSquares.square2,
            this.cachedElements.movingSquares.square2_bis,
            this.cachedElements.movingSquares.square3,
          ]);

          const div = this.cachedElements.reactRoot;
          if (div) {
            div.style.top = `${6 * this.viewport.height}px`;
          }

          const translateX = -this.constants.halfWidth;
          // const translateX = 0;
          const translateY =
            -this.viewport.height - this.scroll.soft + 2 * this.viewport.height;
          return `translateX(${translateX}px) translateY(${translateY}px)`;
        },
      },
      {
        min: (5 + this.decal_nbecran) * this.viewport.height,
        max: Infinity,
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
          const div2_bis = this.cachedElements.movingSquares.square2_bis;
          if (div2_bis) {
            div2_bis.style.left = `${-decalMax}px`;
          }
          const div3 = this.cachedElements.movingSquares.square3;
          if (div3) {
            div3.style.left = `${-decalMax}px`;
          }
          // console.log("4", this.scroll.soft);

          const div = this.cachedElements.reactRoot;

          if (div) {
            // const position = window.getComputedStyle(div).position;
            // console.log(4 * this.viewport.height,-this.scroll.soft)
            // if (position !== "absolute") {
            // div.style.position = "fixed";
            //   div.style.top = `${
            //   this.config.maxScrollHeight * this.viewport.height -
            //   this.scroll.soft +
            //   this.decal
            // }px`;
            ///ça doit passer de 6 à 5
            div.style.top = `${11 * this.viewport.height - this.scroll.soft}px`;
            div.style.left = `${this.viewport.width / 2}px`;
            div.style.width = `${this.viewport.width}px`;
            div.style.height = `${this.viewport.height}px`;
            // }
          }
          // console.log("5",-this.viewport.height,this.viewport.height-this.scroll.soft)
          // absolute top-0 left-0 w-full h-full
          return `translateX(${-this.constants.halfWidth}px) translateY(${
            // -this.viewport.height - this.scroll.soft + 2 * this.viewport.height
            // -(4 + this.decal_nbecran) * this.viewport.height
            -4 * this.viewport.height
          }px)`;
        },
      },
    ];

    // Optimisation des calculs de scroll
    this.scrollRanges = this.scrollRanges.map((range) => ({
      ...range,
      heightMin: range.min * this.viewport.height,
      heightMax: range.max * this.viewport.height,
    }));
  }

  setSizes() {
    this.scroll.height = this.isMobile
      ? this.config.totalScrollHeight * this.viewport.height
      : this.cachedElements.scrollContent.getBoundingClientRect().height +
        4 * this.viewport.height +
        0.1 * this.viewport.height;
    this.scroll.limit = this.isMobile
      ? 5.1 * this.viewport.height
      : (5.1 + this.decal_nbecran) * this.viewport.height; //attention s'initialise apres

    document.body.style.height = `${this.scroll.height}px`;
  }

  // Fonction d'easing
  ease(current, target, factor = 0.1) {
    return current + (target - current) * factor;
  }

  // OPTIMISÉ: Throttle léger pour éviter les calculs inutiles
  update() {
    const now = performance.now();
    
    // Skip si appelé trop fréquemment (throttle à 60fps)
    if (now - this.lastUpdate < this.updateThreshold) {
      return;
    }
    this.lastUpdate = now;
    
    this.scroll.hard = window.scrollY;
    this.scroll.hard = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.hard,
    );
    this.scroll.soft = GSAP.utils.interpolate(
      this.scroll.soft,
      this.scroll.hard,
      this.scroll.ease,
    );

    if (this.scroll.soft < 0.01) {
      this.scroll.soft = 0;
    }

    // Trouve la plage correspondante
    const currentRange = this.scrollRanges.find(
      (range) =>
        this.scroll.soft > range.min && this.scroll.soft <= range.max,
    );

    // Applique la transformation correspondante
    if (currentRange && !this.isMobile) {
      const action = currentRange.action.bind(this);
      this.cachedElements.scrollContent.style.transform = action(
        this.scroll.soft,
      );
    } else {
      // console.log("mobile scroll", this.scroll.soft);
      this.cachedElements.scrollContent.style.transform = `translateY(${-this.scroll.soft}px)`;
    }

    //ajout perso - optimisé pour éviter les animations répétées
    const shouldBeHidden = this.scroll.soft > 1.3 * this.viewport.height;
    
    if (shouldBeHidden && this.voiciState === 1) {
      this.voiciState = 0;
      if (this.gsapAnimations.voiciFadeIn) this.gsapAnimations.voiciFadeIn.pause();
      if (this.gsapAnimations.voiceFadeOut) this.gsapAnimations.voiceFadeOut.restart();
    } else if (!shouldBeHidden && this.voiciState === 0) {
      this.voiciState = 1;
      if (this.gsapAnimations.voiceFadeOut) this.gsapAnimations.voiceFadeOut.pause();
      if (this.gsapAnimations.voiceFadeIn) this.gsapAnimations.voiceFadeIn.restart();
    }

    if (
      this.scroll.soft > 1.2 * this.viewport.height &&
      !this.animationPlayed
    ) {
      this.animationPlayed = true;
      animateIn1();
    }

    if (
      this.scroll.soft > 2.2 * this.viewport.height &&
      !this.animationPlayed2
    ) {
      this.animationPlayed2 = true;
      // playProjectAnimation2();
      animateIn2();
    }

    if (
      this.scroll.soft >
        (2.2 + this.decal_nbecran) * this.viewport.height &&
      !this.animationPlayed2_bis
    ) {
      this.animationPlayed2_bis = true;
      // playProjectAnimation2();
      animateIn2_bis();
    }

    if (
      this.scroll.soft >
        (3.2 + this.decal_nbecran) * this.viewport.height &&
      !this.animationPlayed3
    ) {
      this.animationPlayed3 = true;
      // playProjectAnimation2();
      animateIn3();
    }
  }

  onResize() {
    const nextWidth = window.innerWidth;
    const nextHeight = Math.max(
      window.innerHeight,
      window.visualViewport ? Math.round(window.visualViewport.height) : 0,
    );

    // Si la largeur change fortement, on considère que c'est une rotation / vrai resize
    // et on reset la hauteur stable.
    const widthDelta = Math.abs(nextWidth - this.viewport.width);
    if (this.isMobile && widthDelta > 80) {
      this.maxViewportHeight = nextHeight;
    }

    if (this.isMobile) {
      this.maxViewportHeight = Math.max(this.maxViewportHeight, nextHeight);
    }

    this.viewport = {
      width: nextWidth,
      height: this.isMobile ? this.maxViewportHeight : nextHeight,
    };

    this.constants = {
      decalMax: this.viewport.width <= 360 ? 10 : this.viewport.width / 5,
      halfWidth: this.viewport.width / 2,
    };

    this.setSizes();
  }

  // Créer une fonction utilitaire pour les carrés mobiles
  updateMovingSquares(squares) {
    const decalMax = this.constants.decalMax;
    squares.forEach((square) => {
      if (square) square.style.left = `${-decalMax}px`;
    });
  }

  // Créer une fonction utilitaire pour générer la transformation
  getTransform(x, y) {
    return `translateX(${x}px) translateY(${y}px)`;
  }
}
