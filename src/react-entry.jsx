import React from 'react'
import { createRoot } from 'react-dom/client'
import MonComposant from './components/MonComposant'

// Montez React dans un élément existant de votre HTML
 function isMobileDevice() {
  const mobileKeywords =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const userAgent = navigator.userAgent;
  const isMobile = mobileKeywords.test(userAgent);

  // On ajoute une classe au body pour pouvoir styler en fonction
  // document.body.classList.toggle("is-mobile", isMobile);

  return isMobile;
}

const isMobile=isMobileDevice();
const container = window.innerWidth<768?document.getElementById('react-root2'):document.getElementById('react-root1');
if (container) {
  const root = createRoot(container)
  root.render(<MonComposant />)
}

