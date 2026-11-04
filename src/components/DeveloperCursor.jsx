import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./UI.jsx";

const supportQuery = "(hover: hover) and (pointer: fine) and (min-width: 781px) and (prefers-reduced-motion: no-preference) and (forced-colors: none)";
const preferenceKey = "nirmik-developer-cursor";
const nativeTargets = "input, textarea, select, option, label, [contenteditable], [disabled], [aria-disabled='true'], [data-native-cursor], dialog[open]";

export default function DeveloperCursor() {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(preferenceKey) !== "off"; }
    catch { return true; }
  });
  const layer = useRef(null);
  const tip = useRef(null);
  const trail = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const media = window.matchMedia(supportQuery);
    const root = layer.current;
    const html = document.documentElement;
    let frame = 0, previousTime = 0, visible = false;
    let x = 0, y = 0, ringX = 0, ringY = 0;
    let previousTarget = null;
    let modalOpen = !!document.querySelector("dialog[open]");

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      visible = false;
      previousTarget = null;
      root.dataset.visible = "false";
      html.classList.remove("developer-cursor-active");
    };
    const paint = (time) => {
      frame = 0;
      if (!visible) return;
      const delta = Math.min(previousTime ? time - previousTime : 16.67, 64);
      previousTime = time;
      const follow = 1 - Math.exp(-delta / 58);
      ringX += (x - ringX) * follow;
      ringY += (y - ringY) * follow;
      tip.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      trail.current.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      root.dataset.visible = "true";
      html.classList.add("developer-cursor-active");
      // Sleep when settled: pointer movement restarts a single animation loop.
      if (Math.abs(x - ringX) + Math.abs(y - ringY) > 0.08) frame = requestAnimationFrame(paint);
      else previousTime = 0;
    };
    const move = (event) => {
      if (!media.matches || modalOpen || event.pointerType !== "mouse" || event.buttons) {
        hide();
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest(nativeTargets)) { hide(); return; }
      if (target !== previousTarget) {
        const interactive = target.closest("a[href], button, summary, [role='button']");
        // Native text selection and editing always take priority over decoration.
        if (!interactive && target.closest("p, h1, h2, h3, h4, li, blockquote, pre, code")) {
          hide(); return;
        }
        const mode = interactive ? "interactive" : target.closest("img, .portrait-card") ? "image" : target.closest(".project-card, .skill-card, .service-card") ? "card" : "default";
        root.dataset.mode = mode;
        previousTarget = target;
      }
      x = event.clientX;
      y = event.clientY;
      if (!visible) { ringX = x; ringY = y; previousTime = 0; }
      visible = true;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = (event) => { if (!event.relatedTarget) hide(); };
    const press = () => { hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const checkModal = () => {
      modalOpen = !!document.querySelector("dialog[open]");
      if (modalOpen) hide();
    };
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", move, { passive: true });
    window.addEventListener("keydown", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true, capture: true });
    window.addEventListener("resize", hide);
    window.addEventListener("pointercancel", hide);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", hide);
    return () => {
      hide();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", move);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
      window.removeEventListener("pointercancel", hide);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", hide);
    };
  }, [enabled]);

  const toggle = () => {
    setEnabled((current) => {
      try { localStorage.setItem(preferenceKey, current ? "off" : "on"); } catch { /* Session toggle still works. */ }
      return !current;
    });
  };
  return <>
    <button type="button" className="icon-button cursor-toggle" data-native-cursor
      aria-label={enabled ? "Use standard cursor" : "Enable developer cursor"}
      aria-pressed={enabled} title={enabled ? "Use standard cursor" : "Enable developer cursor"}
      onClick={toggle}><Icon name="code" size={18} /></button>
    {createPortal(<div ref={layer} className="developer-cursor" aria-hidden="true" data-visible="false" data-mode="default">
      <div ref={trail} className="developer-cursor-trail"><span className="cursor-aura"/><span className="cursor-ring"/></div>
      <div ref={tip} className="developer-cursor-tip"><span className="cursor-point"/><span className="cursor-code">&lt;/&gt;</span></div>
    </div>, document.body)}
  </>;
}
