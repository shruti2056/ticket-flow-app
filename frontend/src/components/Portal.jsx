import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, id = 'portal-root' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create portal container if it doesn't exist
    let portalRoot = document.getElementById(id);
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', id);
      portalRoot.style.position = 'fixed';
      portalRoot.style.zIndex = '999999';
      portalRoot.style.top = '0';
      portalRoot.style.left = '0';
      portalRoot.style.width = '100%';
      portalRoot.style.height = '100%';
      portalRoot.style.pointerEvents = 'none';
      document.body.appendChild(portalRoot);
    }

    return () => setMounted(false);
  }, [id]);

  if (!mounted) return null;

  return createPortal(
    <div style={{ pointerEvents: 'auto' }}>
      {children}
    </div>,
    document.getElementById(id)
  );
};

export default Portal;
