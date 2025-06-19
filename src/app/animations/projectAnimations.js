import GSAP from "gsap";
// import { SplitText } from "gsap/SplitText";

// export const playProjectAnimation = () => {
//   GSAP.to(document.getElementsByClassName("ligneProjet1"), {
//     color: "red",
//     scaleX: 1,
//     transformOrigin: "left",
//     duration: 1.5,
//     ease: "ease",
//   });

//   const text = new SplitText(document.getElementById("titreprojet1"), {
//     type: "chars",
//     charsClass: "char",
//   });

//   GSAP.from(text.chars, {
//     y: 100,
//     opacity: 0,
//     duration: 0.8,
//     stagger: {
//       amount: 1.0,
//       from: "start",
//     },
//     ease: "power4.out",
//   });

//   GSAP.from(
//     document.getElementById("texteprojet1"),
//     {
//       y: 100,
//       opacity: 0,
//       autoAlpha: 0,
//       stagger: 0.2,
//       duration: 1.6,
//     },
//     "<.3"
//   );

//   GSAP.from(
//     document.getElementById("visitezleprojet1"),
//     {
//       y: 100,
//       opacity: 0,
//       autoAlpha: 0,
//       stagger: 0.2,
//       duration: 1.6,
//     },
//     "<.3"
//   );
// };

// export const playProjectAnimation2 = () => {
//   GSAP.to(document.getElementsByClassName("ligneProjet2"), {
//     color: "red",
//     scaleX: 1,
//     transformOrigin: "left",
//     duration: 1.5,
//     ease: "ease",
//   });

//   const text = new SplitText(document.getElementById("titreprojet2"), {
//     type: "chars",
//     charsClass: "char",
//   });

//   GSAP.from(text.chars, {
//     y: 100,
//     opacity: 0,
//     duration: 0.8,
//     stagger: {
//       amount: 1.0,
//       from: "start",
//     },
//     ease: "power4.out",
//   });

//   GSAP.from(
//     document.getElementById("texteprojet2"),
//     {
//       y: 100,
//       opacity: 0,
//       autoAlpha: 0,
//       stagger: 0.2,
//       duration: 1.6,
//     },
//     "<.3"
//   );

//   GSAP.from(
//     document.getElementById("visitezleprojet2"),
//     {
//       y: 100,
//       opacity: 0,
//       autoAlpha: 0,
//       stagger: 0.2,
//       duration: 1.6,
//     },
//     "<.3"
//   );
// };

export function animateIn1() {
  const animateIn = GSAP.timeline({
    defaults: {
      ease: "expo",
    },
  });
  const divArray = [
    document.getElementById("titreprojet1"),
    document.getElementById("texteprojet1"),
    document.getElementById("visitezleprojet1"),
    document.getElementById("image1"),
    document.getElementById("ensembletexteetfleche1"),
  ];

  animateIn.fromTo(
    divArray,
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1.6,
    },
    "<.3"
  );
}

export function animateIn2() {
  const animateIn = GSAP.timeline({
    defaults: {
      ease: "expo",
    },
  });
  const divArray = [
    document.getElementById("titreprojet2"),
    document.getElementById("texteprojet2"),
    document.getElementById("visitezleprojet2"),
    document.getElementById("image2"),
    document.getElementById("ensembletexteetfleche2"),
  ];

  animateIn.fromTo(
    divArray,
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1.6,
    },
    "<.3"
  );
}

export function animateIn3() {
  const animateIn = GSAP.timeline({
    defaults: {
      ease: "expo",
    },
  });
  const divArray = [
    document.getElementById("projet31"),
    document.getElementById("projet41"),
    document.getElementById("projet51"),
  ];

  animateIn.fromTo(
    divArray,
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1.6,
    },
    "<.3"
  );
}
