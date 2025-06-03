import GSAP from "gsap";
import { SplitText } from "gsap/SplitText";
GSAP.registerPlugin(SplitText);
export default class {
  constructor({ element, viewport, scroll }) {
    this.element = element;
    this.viewport = viewport;
    this.scroll = scroll;
    this.animationPlayed = false;

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
  }

  setSizes() {
    this.scroll.height =
      this.elements.scrollContent.getBoundingClientRect().height +
      2 * window.innerHeight;
    this.scroll.limit =
      this.elements.scrollContent.clientHeight -
      this.viewport.height +
      3 * window.innerHeight;

    document.body.style.height = `${this.scroll.height}px`;
  }

  update() {
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
    if (
      this.scroll.soft > window.innerHeight &&
      this.scroll.soft < 1.5 * window.innerHeight
    ) {
      const progress =
        (this.scroll.soft - window.innerHeight) / (0.5 * window.innerHeight);
      const translateX = -progress * window.innerHeight;
      this.elements.scrollContent.style.transform = `translateX(${translateX}px) translateY(${-window.innerHeight}px)`;
    } else if (
      this.scroll.soft > 1.5 * window.innerHeight &&
      this.scroll.soft < 2 * window.innerHeight
    ) {
      const progress =
        (this.scroll.soft - 1.5 * window.innerHeight) /
        (0.5 * window.innerHeight);
      const translateX = -(1 - progress) * window.innerHeight;
      this.elements.scrollContent.style.transform = `translateX(${translateX}px) translateY(${-window.innerHeight}px)`;
    } else if (this.scroll.soft > 2 * window.innerHeight) {
      this.elements.scrollContent.style.transform = `translateY(${
        -this.scroll.soft + window.innerHeight
      }px)`;
    } else {
      this.elements.scrollContent.style.transform = `translateY(${-this.scroll
        .soft}px)`;
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
