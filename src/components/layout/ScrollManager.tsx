import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// SPA navigation keeps the previous page's scroll position, so a link clicked
// near the bottom of one page would land near the bottom of the next. On every
// forward navigation, jump to the #hash target if there is one, otherwise to
// the top. Back/forward (POP) is left to the browser's own scroll restoration.
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') return;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // Wait a frame so the new page has laid out before measuring the target.
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key, navigationType]);

  return null;
};

export default ScrollManager;
