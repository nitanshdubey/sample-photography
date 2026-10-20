// src/components/Footer.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: footer.
// Studio name, tagline, section links, concept disclosure and
// copyright. Sits outside <main> (see App.tsx).
// Text comes from `studio`, `navLinks` and `concept` in
// src/data/content.ts.
// Styles live in Footer.css (created in the next step).
// ---------------------------------------------------------------

import { concept, contact, navLinks, studio } from "../data/content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* Brand */}
        <div className="footer__brand">
          <a
            href="#home"
            className="footer__wordmark"
            aria-label={`${studio.name}, back to top`}
          >
            {studio.name}
          </a>
          <p className="footer__tagline">{studio.tagline}</p>
        </div>

        {/* Section links */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="footer__link link-underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Instagram */}
        <a
          className="footer__social link-underline"
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {/* Bottom line */}
      <div className="footer__bottom container">
        <p className="footer__copy">
          &copy; {studio.year} {studio.name}. All rights reserved.
        </p>
        <p className="footer__concept">
          {concept.footerNote}{" "}
          <a
            className="link-underline"
            href={studio.builtBy.url}
            target={studio.builtBy.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {studio.builtBy.name}
          </a>
        </p>
      </div>
    </footer>
  );
}