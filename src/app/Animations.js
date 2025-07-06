import GSAP from 'gsap'



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
        ease: 'power2.out'
      }
    })

    const cursor = document.querySelector(".custom-cursor");
    const canvas = document.querySelector(".webgl");
    
    animateIn
      .from(this.camera.position, {
        z: 4,
        duration: 2.5,
        ease: 'power3.out'
      })
      
      .from(this.elements.number, {
        y: -50,
        autoAlpha: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1.5')
      
      .from(this.elements.title, {
        y: -50,
        autoAlpha: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8')
      
      .from(this.elements.paragraph, {
        y: -30,
        autoAlpha: 0,
        opacity: 0,
        duration: 1.0,
        ease: 'power2.out'
      }, '-=0.6')
      
      .from(this.elements.arrows, {
        y: -20,
        autoAlpha: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4')
      
      .to(canvas, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=1.0')
      
      .to(cursor, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
  }
}

