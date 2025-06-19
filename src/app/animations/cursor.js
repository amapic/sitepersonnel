// On exécute la détection au chargement
import gsap from "gsap";
const cursor = document.querySelector(".custom-cursor");
const cursorGoText = document.querySelector(".cursor-go-text");
const cursorArrow = document.querySelector(".cursor-arrow");
const cursorWidth = 80;
const cursorHeight = 80;

// fleche1,fleche2
document.getElementById("fleche1").addEventListener("mouseenter", (event) => {
  cursorArrow.style.opacity = 0;
  // const cursor = document.querySelector(".custom-cursor");
  gsap.to(cursorGoText, {
    scaleX: 2,
    scaleY: 10,
    duration: 0.0,
    ease: "power2.inOut",
  });
  gsap.killTweensOf(cursor);

  gsap.to(cursor, {
    scale: 3,
    duration: 0.3,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(cursor, {
            scale: 3,
            duration: 0.1,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(cursor, {
                scale: 1.5,
                duration: 0.1,
                ease: "power2.inOut",
                onComplete: () => {
                  
                  gsap.to(cursor, {
                    scaleX: 2,
                    scaleY: 1.3,
                    duration: 0.3,
                    ease: "power2.inOut",
                  });
                },
              });
            },
          });
        },
      });
    },
  });
});

document.getElementById("fleche1").addEventListener("mouseleave", (event) => {
  // const cursor = document.querySelector(".custom-cursor");
  // cursorArrow.style.opacity = 1;
  gsap.killTweensOf(cursor);
  gsap.killTweensOf(cursorGoText);
  gsap.to(cursorGoText, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.0,
    ease: "power2.inOut",
  });
  gsap.to(cursor, {
    scaleX: 1.5,
    scaleY: 1.5,
    duration: 0.3,
    ease: "power2.inOut",
  });
});

document.getElementById("fleche2").addEventListener("mouseenter", (event) => {
  // const cursor = document.querySelector(".custom-cursor");
  // cursorArrow.style.opacity = 0;
  gsap.killTweensOf(cursor);
  // const tl = gsap.timeline();
  // tl.to(cursor, { scale: 10, duration: 10 })
  // .to(cursor, { scale: 0.5, duration: 3 }, "+=0");
  // tl.fromTo(cursor, { scale: 1 }, { scale: 10, duration: 1,immediateRender:true })
  // .fromTo(cursor, { scale: 10,immediateRender:false }, { scale: 0.5, duration: 3,immediateRender:false })
  // .fromTo(cursor, { scale: 0.5,immediateRender:false }, { scale: 3, duration: 3,immediateRender:false });

  gsap.to(cursor, {
    scale: 3,
    duration: 0.3,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(cursor, {
            scale: 3,
            duration: 0.1,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(cursor, {
                scale: 1.5,
                duration: 0.1,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.to(cursorGoText, {
                    scaleX: 2,
                    scaleY: 3,
                    duration: 0.0,
                    ease: "power2.inOut",
                  });
                  gsap.to(cursor, {
                    scaleX: 2,
                    scaleY: 1.3,
                    duration: 0.3,
                    ease: "power2.inOut",
                  });
                },
              });
            },
          });
        },
      });
    },
  });
});

document.getElementById("fleche2").addEventListener("mouseleave", (event) => {
  // const cursor = document.querySelector(".custom-cursor");
  // cursorArrow.style.opacity = 1;
  gsap.killTweensOf(cursor);
  // gsap.killTweensOf(cursorGoText);
  gsap.to(cursorGoText, {
    scaleX: 1,
    scaleY: 10,
    duration: 0.0,
    ease: "power2.inOut",
  });
  gsap.to(cursor, {
    scaleX: 1.5,
    scaleY: 1.5,
    duration: 0.3,
    ease: "power2.inOut",
  });
});

document
  .getElementById("react-root1")
  .addEventListener("mouseenter", (event) => {
    // const cursor = document.querySelector(".custom-cursor");
    const circle = document.querySelector(".cursor-circle");

    // alert(circle.getAttribute("fill"));

    gsap.to(cursor, { scale: 0.1, duration: 0.5 });
    gsap.to(circle, { fill: "white", duration: 0.5 });
  });

document
  .getElementById("react-root1")
  .addEventListener("mouseleave", (event) => {
    // const cursor = document.querySelector(".custom-cursor");
    const circle = document.querySelector(".cursor-circle");
    gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    gsap.to(circle, { fill: null, duration: 0.5 });
  });

document
  .getElementById("sectionprojet3")
  .addEventListener("mouseenter", (event) => {
    // const cursor = document.querySelector(".custom-cursor");
    const circle = document.querySelector(".cursor-circle");
    gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    gsap.to(circle, { fill: null, duration: 0.5 });
  });

document
  .getElementById("sectionprojet1")
  .addEventListener("mouseenter", (event) => {
    // const cursor = document.querySelector(".custom-cursor");
    const circle = document.querySelector(".cursor-circle");
    gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    gsap.to(circle, { fill: null, duration: 0.5 });
  });

class CustomCursor {
  constructor() {
    this.isMobile = this.isMobileDevice();
    this.init();
    this.cursorWidth = cursorWidth;
    this.cursorHeight = cursorHeight;
    // this.distance=-1;
    this.isAnimating = false;
    this.closeTargetTimeout = null;
  }

  isMobileDevice() {
    const mobileKeywords =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const userAgent = navigator.userAgent;
    const isMobile = mobileKeywords.test(userAgent);

    document.body.classList.toggle("is-mobile", isMobile);
    return isMobile;
  }

  init() {
    if (this.isMobile) {

      let cursor = document.querySelector(".custom-cursor");
      cursor.style.display = "none";
      return;
    }

    // Set viewport height
    // document.documentElement.style.setProperty(
    //   "--real-viewport-height",
    //   `${window.innerHeight}px`
    // );

    // Hide default cursor
    // document.body.style.cursor = 'none';

    // Initialize elements
    this.cursor = document.querySelector(".custom-cursor");
    this.cursorArrow = this.cursor.querySelector(".cursor-arrow");
    this.cursorGoText = this.cursor.querySelector(".cursor-go-text");
    this.hoverAreas = document.querySelectorAll(".cursor-hover-area");
    this.firstSection = document.querySelector(".section:first-child");
    this.reactRoot = document.querySelector("#react-root1");
    this.textcursor1 = document.querySelector("#textcursor1");
    this.arrowcursor1 = document.querySelector("#arrowcursor1");
    this.fpsCounter = document.getElementById("fps-counter");

    // this.cursor.classList.remove("opacity-0");

    // Initialize sections
    this.sections = {
      sectionprojet1: {
        element: document.querySelector("#sectionprojet1"),
        target: document.querySelector("#fleche1"),
      },
      sectionprojet2: {
        element: document.querySelector("#sectionprojet2"),
        target: document.querySelector("#fleche2"),
      },
      sectionprojet3: {
        element: document.querySelector("#sectionprojet3"),
        targets: [
          document.querySelector("#image3"),
          document.querySelector("#image4"),
          document.querySelector("#image5"),
        ],
      },
    };

    // Bind event listeners
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.hoverAreas.forEach((area) => {
      area.addEventListener("mouseenter", this.handleHoverEnter.bind(this));
    });
  }

  handleMouseMove(e) {
    this.updateCursorPosition(e);
    this.updateCursorVisibility(e);
    this.updateCursorTarget(e);
  }

  updateCursorPosition(e) {
    this.cursor.style.left = e.clientX - this.cursor.offsetWidth / 2 + "px";
    this.cursor.style.top = e.clientY - this.cursor.offsetHeight / 2 + "px";
    // const left = parseFloat(this.cursor.style.left) || 0;
    // const top = parseFloat(this.cursor.style.top) || 0;
    // let targetLeft, targetTop;

    // if (targetCenterX !== undefined && targetCenterY !== undefined) {
    //   // Toujours viser le centre du target si défini
    //   targetLeft = targetCenterX - this.cursor.offsetWidth / 2;
    //   targetTop = targetCenterY - this.cursor.offsetHeight / 2;
    // } else {
    //   // Mouvement fluide vers la souris
    //   const targetLeft = e.clientX - this.cursor.offsetWidth / 2;
    //   const targetTop = e.clientY - this.cursor.offsetHeight / 2;
    //   const dxMouse = targetLeft - left;
    //   const dyMouse = targetTop - top;
    //   const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    //   const lerp = Math.min(0.1 + distMouse / 300, 1);
    //   const newLeft = left + dxMouse * lerp;
    //   const newTop = top + dyMouse * lerp;

    // }
  }

  updateCursorVisibility(e) {
    if (
      this.firstSection.contains(e.target) ||
      (this.reactRoot && this.reactRoot.contains(e.target))
    ) {
      this.textcursor1.style.opacity = "0";
      this.arrowcursor1.style.opacity = "0";
      this.cursor.classList.add("blend-mode");
    } else {
      this.textcursor1.style.opacity = "1";
      this.arrowcursor1.style.opacity = "1";
      this.cursor.classList.remove("blend-mode");
    }
  }

  updateCursorTarget(e) {
    let currentSection = null;
    let currentTarget = null;

    for (const [id, section] of Object.entries(this.sections)) {
      if (section.element && section.element.contains(e.target)) {
        currentSection = section.element;
        if (id === "sectionprojet3") {
          currentTarget = this.findNearestTarget(section.targets, e);
        } else {
          currentTarget = section.target;
        }
        break;
      }
    }

    if (currentSection && currentTarget) {
      this.handleTargetInteraction(currentTarget, e);
    } else {
      this.resetCursorState();
    }
  }

  findNearestTarget(targets, e) {
    let nearestDistance = Infinity;
    let nearestTarget = null;

    targets.forEach((target) => {
      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestTarget = target;
        }
      }
    });

    return nearestTarget;
  }

  handleTargetInteraction(target, e) {
    const targetRect = target.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const dx = targetCenterX - e.clientX;
    const dy = targetCenterY - e.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // console.log(distance);

    // Stocker la cible actuelle
    this.currentTarget = target;

    if (distance < 100) {
      this.handleCloseTarget(
        targetCenterX,
        targetCenterY,
        e.clientX,
        e.clientY,
        distance
      );
    } else {
      // this.updateCursorPosition(e,distance);
      this.handleDistantTarget(dx, dy);
    }
  }

  handleCloseTarget(targetCenterX, targetCenterY, clientX, clientY, distance) {
    this.cursorArrow.classList.remove("active", "pointing");
    
    // Annuler le timeout précédent s'il existe
    if (this.closeTargetTimeout) {
      clearTimeout(this.closeTargetTimeout);
    }
    
    this.closeTargetTimeout = setTimeout(() => {
      this.cursorGoText.classList.add("active");
    }, 500);
    
    this.textcursor1.style.opacity = "0";
    this.arrowcursor1.style.opacity = "0";
  }

  handleDistantTarget(dx, dy) {
    // Annuler le timeout s'il existe
    if (this.closeTargetTimeout) {
      clearTimeout(this.closeTargetTimeout);
      this.closeTargetTimeout = null;
    }
    
    // this.cursor.classList.remove("anim");
    // this.cursor.style.scaleX = 1.5;
    // this.cursor.style.scaleY = 1.5;
    // this.cursor.style.width = cursorWidth*3+"px";
    // this.cursor.style.height = cursorHeight*3+"px";
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    this.cursorArrow.style.setProperty("--arrow-rotation", `${angle + 90}deg`);
    this.cursorArrow.classList.add("active", "pointing");
    this.cursorGoText.classList.remove("active");
    this.textcursor1.style.opacity = "1";
    this.arrowcursor1.style.opacity = "1";
  }

  //si le curseur est sur la premiere ou la derniere section, on le cache
  resetCursorState() {
    this.cursorArrow.classList.remove("active", "pointing");
    this.cursorGoText.classList.remove("active");
    // this.cursor.style.scale = 1;
  }

  handleHoverEnter() {
    // Implement hover effect if needed
  }
}

// Initialize cursor when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CustomCursor();
});
