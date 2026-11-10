import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * React Router keeps the window's scroll position across page changes, so following a link
 * from low down the landing page opened the next page near its bottom. On every forward
 * navigation (link click / redirect) jump to the top of the new page, or to #anchor if the
 * link has one. Back/forward (POP) is left alone so the browser can restore the position.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    if (navType === "POP") return;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, search, hash, navType]);

  return null;
};

export default ScrollToTop;
