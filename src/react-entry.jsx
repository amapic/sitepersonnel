import React, { useState, useEffect, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
const MonComposant = React.lazy(() => import('./components/MonComposant'))  

function isMobileDevice() {
  const mobileKeywords =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const userAgent = navigator.userAgent;
  const isMobile = mobileKeywords.test(userAgent);
  return isMobile;
}

function App() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShow(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return show ? (
    <Suspense fallback={null}>
      <MonComposant />
    </Suspense>
  ) : null
}

const isMobile = isMobileDevice();
const container = window.innerWidth < 768
  ? document.getElementById('react-root2')
  : document.getElementById('react-root1');
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}

