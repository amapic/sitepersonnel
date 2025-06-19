import GSAP from 'gsap'
function loadScript(src) {
  
  const script = document.createElement('script')
  script.src = src
  script.onload = () => {
    console.log('Script chargé avec succès:', src)
    alert(src)
    // Le script est maintenant chargé et exécuté
  }
  script.onerror = () => {
    console.error('Erreur lors du chargement du script:', src)
  }
  document.head.appendChild(script)
}


export default class {
  constructor(element, camera) {
    this.element = element

    this.elements = {
      number: element.querySelector('.section__title-number'),
      title: element.querySelector('.section__title-text'),
      arrows: element.querySelectorAll('.section__title-arrow span'),
      paragraph: element.querySelector('.section__paragraph'),
      button: element.querySelector('.section__button'),
    }

    this.camera = camera

    this.animateIn()
  }

  animateIn() {
    const animateIn = GSAP.timeline({ 
      defaults: {
        ease: 'expo'
      }
    })

    const cursor = document.querySelector(".custom-cursor");
    
	
    
    animateIn
      .from(this.camera.position, {
        z: 4,
        duration: 3
      })
      
      .from([ 
        this.elements.number, 
        this.elements.title, 
        this.elements.text,  
        this.elements.paragraph, 
        this.elements.button,
        this.elements.arrows
      ], {
          y: -100,
          autoAlpha: 0,
          stagger: .2,
          duration: 1.6
      }, '<.3').to(cursor, {
        opacity: 1,
        duration: 1.6
      },"<")


    }
}

