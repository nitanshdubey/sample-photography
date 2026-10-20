// src/components/Navbar.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: fixed navigation bar.
// - Plain anchor links (href="#id"), so navigation works without JS.
// - Transparent over the hero, ivory background after scrolling.
// - Mobile menu: open/close button, Escape key, closes after a link
//   is chosen, locks page scroll while open.
// Styles live in Navbar.css (created in the next step).
// ---------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navCta, navLinks, studio } from "../data/content";
import "./Navbar.css";

// Page must be scrolled this many pixels before the bar gets a background
const SCROLL_THRESHOLD = 40;
// Must match the breakpoint in Navbar.css where the desktop menu appears
const DESKTOP_QUERY = "(min-width: 960px)";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // 1. Switch the bar style after scrolling.
  //    One passive listener; state only changes when the value changes.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. While the mobile menu is open: lock page scroll and listen for Escape.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.classList.add("no-scroll");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus(); // return focus to the menu button
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // 3. If the window grows to desktop size, close the mobile menu.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const headerClass = [
    "navbar",
    scrolled ? "navbar--scrolled" : "",
    menuOpen ? "navbar--open" : "",
  ]
    .join(" ")
    .trim();

  // On desktop the CTA button already leads to Contact,
  // so the text link list skips it.
  const desktopLinks = navLinks.filter((link) => link.id !== navCta.target);

  return (
    <motion.header
      className={headerClass}
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
    >
      <div className="navbar__inner container">
        {/* Wordmark */}
        <a
          href="#home"
          className="navbar__brand"
          onClick={closeMenu}
          aria-label={`${studio.name}, back to top`}
        >
          {studio.name}
        </a>

        {/* Desktop navigation */}
        <nav className="navbar__desktop" aria-label="Main navigation">
          <ul className="navbar__links">
            {desktopLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="navbar__link link-underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`#${navCta.target}`} className="navbar__cta">
            {navCta.label}
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="mobile-menu__list">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 0.61, 0.36, 1],
                      delay: reduceMotion ? 0 : 0.08 + index * 0.05,
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      className="mobile-menu__link"
                      onClick={closeMenu}
                    >
                      <span className="mobile-menu__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <a
              href={`#${navCta.target}`}
              className="btn btn--light mobile-menu__cta"
              onClick={closeMenu}
            >
              {navCta.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}