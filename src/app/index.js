import * as THREE from "three";
import GSAP from "gsap";
// Import du curseur personnalisé
 import "./animations/cursor.js"; 
// import './lazyLoader.js';

import Animations from "./Animations";
import SmoothScroll from "./SmoothScroll";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";


// document.querySelectorAll(".frame")[1].addEventListener("click", () => {
//   document.querySelectorAll(".frame__links")[1].classList.toggle("active");
//   // alert("ok");
// });
// import { initBlindsEffect } from "./animations/blindsEffect.js";

// Empêcher la restauration automatique de la position de scroll
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Forcer le scroll vers le haut immédiatement
window.scrollTo(0, 0);

class ScrollStage {
  constructor() {
    // Masquer le curseur de la souris
    // document.body.style.cursor = 'none';
   
    this.isMobile = window.innerWidth <= 768;
    // if (this.isMobile) {
      document.body.style.cursor = 'none';
    // }
    this.index = this.isMobile ? 1 : 0;
    this.element = document.querySelectorAll(".content")[this.index];
    this.contaienrcanvas2 = document.querySelector("#canvas-container2");
    this.elements = {
      line: document.querySelector(".layout__line"),
    };
    this.canvasHasRendered = false;
    this.tanFOV = "init";
    this.windowHeight = 0;

    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.mouse = {
      x: 0,
      y: 0
    };

    this.scroll = {
      height: 0,
      limit: 0,
      hard: 0,
      soft: 0,
      ease: 0.05,
      normalized: 0,
      running: false,
    };

    this.settings = {
      // vertex
      uFrequency: {
        start: 0,
        end: 4,
      },
      uAmplitude: {
        start: 4,
        end: 4,
      },
      uDensity: {
        start: 1,
        end: 1,
      },
      uStrength: {
        start: 0,
        end: 1.1,
      },
      // fragment
      uDeepPurple: {
        // max 1
        start: 1,
        end: 0,
      },
      uOpacity: {
        // max 1
        start: 0.1,
        end: 0.66,
      },
    };

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // !this.isMobile

    this.canvas = this.renderer.domElement;

    if (this.isMobile) {
      this.renderer.setPixelRatio(1);
    } else {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.viewport.width / this.viewport.height,
      0.1,
      10
    );

    this.clock = new THREE.Clock();

    this.smoothScroll = new SmoothScroll({
      element: this.element,
      viewport: this.viewport,
      scroll: this.scroll,
    });

    GSAP.defaults({
      ease: "power2",
      duration: 6.6,
      overwrite: true,
    });

    this.updateScrollAnimations = this.updateScrollAnimations.bind(this);
    this.update = this.update.bind(this);

    this.init();
  }

  init() {
    this.addCanvas();
    this.addCamera();
    this.addMesh();
    this.addEventListeners();
    if (this.tanFOV=="init"){
      this.tanFOV = Math.tan( ( ( Math.PI / 180 ) * this.camera.fov / 2 ) );
      this.windowHeight = window.innerHeight;
    }
    this.onResize();
    this.update();
  }

  /**
   * STAGE
   */
  addCanvas() {
    this.canvas.classList.add("webgl");
    document.body.appendChild(this.canvas);
  }

  addCamera() {
    this.camera.position.set(0, 0, 2.5);
    this.scene.add(this.camera);
  }

  /**
   * OBJECT
   */
  addMesh() {
    this.geometry = new THREE.IcosahedronGeometry(1, 64);

    this.material = new THREE.ShaderMaterial({
      wireframe: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uFrequency: { value: this.settings.uFrequency.start },
        uAmplitude: { value: this.settings.uAmplitude.start },
        uDensity: { value: this.settings.uDensity.start },
        uStrength: { value: this.settings.uStrength.start },
        uDeepPurple: { value: this.settings.uDeepPurple.start },
        uOpacity: { value: this.settings.uOpacity.start },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);
  }

  /**
   * SCROLL BASED ANIMATIONS
   */
  updateScrollAnimations() {
    // const element = document.querySelector("#canvas-container2");

    if (this.contaienrcanvas2) {
      if (this.smoothScroll.scroll.soft / window.innerHeight > 3) {
        return;
      }
    }
    this.scroll.running = false;
    this.scroll.normalized = (this.scroll.hard / this.scroll.limit).toFixed(1);

    // if (this.clock.getElapsedTime() > 1000) {
    //   return;
    // }

    GSAP.to(this.elements.line, {
      scaleX: this.scroll.normalized,
      transformOrigin: "left",
      duration: 1.5,
      ease: "ease",
    });

    // if (!(this.isMobile && this.clock.getElapsedTime() > 2)) {
    // console.log("ok");
    GSAP.to(this.mesh.rotation, {
      x: this.scroll.normalized * Math.PI,
    });

    for (const key in this.settings) {
      if (this.settings[key].start !== this.settings[key].end) {
        GSAP.to(this.mesh.material.uniforms[key], {
          value:
            this.settings[key].start +
            this.scroll.normalized *
              (this.settings[key].end - this.settings[key].start),
        });
      }
    }
    // }
  }

  /**
   * EVENTS
   */
  addEventListeners() {
    window.addEventListener("load", this.onLoad.bind(this));

    // window.addEventListener('mousemove', this.onMouseMove.bind(this))  // enable for soundcheck (→ console)

    window.addEventListener("scroll", this.onScroll.bind(this));

    window.addEventListener("resize", this.onResize.bind(this));
  }

  onLoad() {
    document.body.classList.remove("loading");
    // alert(window.innerWidth);
    //360
    this.animations = new Animations(this.element, this.camera);
    
    // S'assurer que la page commence en haut après le chargement complet
    setTimeout(() => {
      window.scrollTo(0, 0);
      // Réinitialiser les valeurs de scroll
      this.scroll.hard = 0;
      this.scroll.soft = 0;
    }, 100);
  }

  onMouseMove(event) {
    // play with it!
    // enable / disable / change x, y, multiplier …

    // console.log(this.clock.getElapsedTime());
    if (!(this.isMobile && this.clock.getElapsedTime() > 2)) {
      this.mouse.x = (event.clientX / this.viewport.width).toFixed(2) * 4;
      this.mouse.y = (event.clientY / this.viewport.height).toFixed(2) * 2;
      GSAP.to(this.mesh.material.uniforms.uFrequency, { value: this.mouse.x });
      GSAP.to(this.mesh.material.uniforms.uAmplitude, { value: this.mouse.x });
      GSAP.to(this.mesh.material.uniforms.uDensity, { value: this.mouse.y });
      GSAP.to(this.mesh.material.uniforms.uStrength, { value: this.mouse.y });
    }

    // GSAP.to(this.mesh.material.uniforms.uDeepPurple, { value: this.mouse.x })
    // GSAP.to(this.mesh.material.uniforms.uOpacity, { value: this.mouse.y })
  }

  onScroll() {
    if (!this.scroll.running) {
      window.requestAnimationFrame(this.updateScrollAnimations);

      this.scroll.running = true;
    }
  }

  onResize() {
    const isMobile = isMobileDevice();
    // const previousWidth = this.viewport.width;
    // const previousHeight = this.viewport.height;
    // const isHeightOnlyResize = previousWidth === window.innerWidth;
    
    // Mettre à jour l'historique des hauteurs
    if (window.updateHeightHistory) {
      // window.updateHeightHistory(previousHeight, window.innerHeight);
    }

    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    // console.log("ee",this.tanFOV);
    // if (this.tanFOV!="init"){
      console.log(( 360 / Math.PI ) * Math.atan( this.tanFOV * ( window.innerHeight / this.windowHeight ) ));
      this.camera.fov = ( 360 / Math.PI ) * Math.atan( this.tanFOV * ( window.innerHeight / this.windowHeight ) );
    // }

    // this.camera.lookAt( new THREE.Vector3(0, 0, 0) );
    // this.camera.updateProjectionMatrix();

    // Calcul du facteur d'échelle pour maintenir le ratio
    // const widthRatio = this.viewport.width / previousWidth;
    // const heightRatio = this.viewport.height / previousHeight;
    // const scaleFactor = Math.min(widthRatio, -1);
    // const scaleFactor = heightRatio;
    const scaleFactor = 1;

    // if (isHeightOnlyResize) {
      // console.log('Redimensionnement de la hauteur uniquement');
      if (isMobile) {
        this.mesh.scale.set(0.75 * scaleFactor, 0.75 * scaleFactor, 0.75 * scaleFactor);
      } else {
        this.mesh.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);
      }
    // }

    this.smoothScroll.onResize();

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * LOOP
   */
  update() {
    const elapsedTime = this.clock.getElapsedTime();

    if (!(this.isMobile && elapsedTime > 2)) {
      this.mesh.rotation.y = elapsedTime * 0.05;
    }

    this.smoothScroll.update();

    this.render();
    

    window.requestAnimationFrame(this.update);
  }

  /**
   * RENDER
   */
  render() {
    // if (!this.isMobile) {
    // if (1==0) {
    this.renderer.render(this.scene, this.camera);
    this.canvasHasRendered = true;
    // }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

new ScrollStage();

// Initialiser l'effet des stores
// document.addEventListener("DOMContentLoaded", () => {
// if (window.innerWidth > 768) {
// initBlindsEffect("#blindsEffectContainer");
// }

// Gestion de la position left dynamique
// const updateDynamicLeft = () => {
// const container = document.querySelector(".dynamic-left");
// if (container) {
// const leftValue =
// window.innerWidth <= 360 ? "10px" : `${window.innerWidth / 5}px`;
// container.style.left = `-${leftValue}`;
// }
// };

// Appel initial
// updateDynamicLeft();

// Mise à jour lors du redimensionnement
// window.addEventListener("resize", updateDynamicLeft);
// });

function isMobileDevice() {
  const mobileKeywords =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const userAgent = navigator.userAgent;
  const isMobile = mobileKeywords.test(userAgent);

  // On ajoute une classe au body pour pouvoir styler en fonction
  document.body.classList.toggle("is-mobile", isMobile);

  return isMobile;
}
