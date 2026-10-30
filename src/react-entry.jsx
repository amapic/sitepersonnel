import React from 'react'
import { createRoot } from 'react-dom/client'
import MonComposant from './components/MonComposant'

function isMobileDevice() {
  const mobileKeywords =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const userAgent = navigator.userAgent;
  const isMobile = mobileKeywords.test(userAgent);
  return isMobile;
}

const isMobile = isMobileDevice();
const container = window.innerWidth < 768
  ? document.getElementById('react-root2')
  : document.getElementById('react-root1');
if (container) {
  const root = createRoot(container)
  root.render(<MonComposant />)
}

