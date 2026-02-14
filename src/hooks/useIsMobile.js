import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Detectar por tamaño de pantalla y touch capability
      const mobile = window.innerWidth < 768 || 
                    ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}