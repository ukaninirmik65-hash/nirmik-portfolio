import BrandLogo from "./BrandLogo.jsx";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navigation } from "../data/portfolio.js";
import { Icon } from "./UI.jsx";
import useTheme from "../hooks/useTheme.js";
import DeveloperCursor from "./DeveloperCursor.jsx";
import { isOutsidePointer, lockBodyScroll } from "../utils/interactions.js";
import useActiveSection from "../hooks/useActiveSection.js";

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const { active: section, scrolled } = useActiveSection();
  const active = { skills: "about", process: "services" }[section] || section;
  const header = useRef(null);
  const menuButton = useRef(null),
    menu = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const unlockScroll = lockBodyScroll();
    menu.current?.querySelector("a")?.focus();
    const keydown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          menuButton.current,
          ...(menu.current?.querySelectorAll("a") || []),
        ].filter((item) => item?.isConnected);
        if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault();
          items.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
          event.preventDefault();
          items[0]?.focus();
        }
      }
    };
    const resize = () => {
      if (innerWidth > 780) setOpen(false);
    };
    document.addEventListener("keydown", keydown);
    window.addEventListener("resize", resize);
    const outside = (event) => {
      if (event.button === 0 && isOutsidePointer(event, header.current))
        setOpen(false);
    };
    document.addEventListener("pointerdown", outside, true);
    return () => {
      unlockScroll();
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <motion.header
      ref={header}
      className={`header ${scrolled ? "is-scrolled" : ""}`}
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="wrap header-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Nirmik Ukani home"
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation
            .filter((link) =>
              [
                "about",
                "projects",
                "services",
                "experience",
                "contact",
              ].includes(link.id),
            )
            .map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? "active" : ""}
                aria-current={active === link.id ? "location" : undefined}
              >
                {active === link.id && (
                  <motion.span
                    className="nav-indicator"
                    layoutId="active-navigation"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span className="nav-label">{link.name}</span>
              </a>
            ))}
        </nav>
        <div className="header-actions">
          <DeveloperCursor />
          <button
            type="button"
            className="icon-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            onClick={toggleTheme}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
          </button>
          <a className="header-cta" href="#contact">
            Let’s talk <Icon name="arrow" size={17} />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menu}
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: {
                height: 0,
                opacity: 0,
                transition: { duration: reduce ? 0 : 0.18 },
              },
              open: {
                height: "auto",
                opacity: 1,
                transition: {
                  duration: reduce ? 0 : 0.24,
                  staggerChildren: reduce ? 0 : 0.035,
                },
              },
            }}
          >
            {navigation.map((link) => (
              <motion.a
                href={`#${link.id}`}
                key={link.id}
                onClick={() => setOpen(false)}
                variants={{
                  closed: { opacity: 0, y: reduce ? 0 : 7 },
                  open: { opacity: 1, y: 0 },
                }}
                aria-current={section === link.id ? "location" : undefined}
              >
                {link.name}
                <Icon name="arrow" size={18} />
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
