import { useEffect } from 'react';

// Load Calendly script globally
export const useCalendly = () => {
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    if (head) head.appendChild(script);
    
    return () => {
      if (head && script.parentNode) {
        head.removeChild(script);
      }
    };
  }, []);
};

// Calendly popup widget function
export const openCalendlyPopup = (url: string = 'https://calendly.com/mukprabhakar/30min') => {
  console.log('Attempting to open Calendly popup with URL:', url);
  console.log('window.Calendly exists:', !!(window as any).Calendly);
  
  // @ts-ignore - Calendly widget
  if (window.Calendly) {
    console.log('Calendly widget found, opening popup...');
    // @ts-ignore - Calendly widget
    window.Calendly.initPopupWidget({ url });
  } else {
    console.warn('Calendly widget not loaded, opening in new tab instead');
    // Fallback to opening in new tab if Calendly not loaded
    window.open(url, '_blank');
  }
};
