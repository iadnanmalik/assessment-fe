import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Portal component to render content outside its parent component hierarchy
export default function Portal({ children, selector }: any) {

  const ref = useRef<any>();
  
  // State to track if the component is mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Find the target element by ID
    ref.current = document.getElementById(selector);
    
    // Update the mounted state to true
    setMounted(true);
  }, [selector]);

  // Render the children inside the target DOM element using createPortal
  return mounted ? createPortal(children, ref.current) : null;
}
