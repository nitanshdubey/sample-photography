// src/components/Founder.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 6, Founder / Photographer.
// A darker, more personal composition than the sections around it:
// - Large portrait with the signature statement set over a dark panel.
// - Name and role, short introduction, and social links.
// - The portrait is a sample placeholder (see founderImage in
//   src/data/images.ts) and Isabelle Verne is a fictional photographer.
// - Fade-and-rise reveals; all motion is off for reduced motion.
// Text comes from `founder` in src/data/content.ts.
// Styles live in Founder.css (created in the next step).
// ---------------------------------------------------------------

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { founder } from "../data/content";
import { founderImage, sized, srcSetFor } from "../data/images";
import "./Founder.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Founder() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -12% 0px" },
    transition: {
      duration: reduceMotion ? 0 : 0.9,
      ease: EASE,
      delay: reduceMotion ? 0 : delay,
    },
  });

  return (
    <section
      id="founder"
      className="section section--dark founder"
      aria-labelledby="founder-heading"
    >
      <div className="founder__inner container">
        {/* Portrait */}
        <motion.figure
          className="founder__figure"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: EASE }}
        >
          <div
            className="img-frame founder__frame"
            style={{ aspectRatio: `${founderImage.width} / ${founderImage.height}` }}
          >
            <motion.img
              className="founder__image"
              src={sized(founderImage.src, 1000)}
              srcSet={srcSetFor(founderImage.src, [480, 800, 1000, 1400])}
              sizes="(min-width: 960px) 40vw, 100vw"
              width={founderImage.width}
              height={founderImage.height}
              alt={founderImage.alt}
              loading="lazy"
              decoding="async"
              initial={reduceMotion ? false : { scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: reduceMotion ? 0 : 1.8, ease: EASE }}
            />
          </div>
        </motion.figure>

        {/* Text */}
        <div className="founder__text">
          <motion.p className="eyebrow" {...reveal(0)}>
            {founder.eyebrow}
          </motion.p>

          <motion.h2
            id="founder-heading"
            className="founder__name"
            {...reveal(0.1)}
          >
            {founder.name}
          </motion.h2>

          <motion.p className="founder__role" {...reveal(0.15)}>
            {founder.role}
          </motion.p>

          <motion.p className="founder__intro lead" {...reveal(0.25)}>
            {founder.intro}
          </motion.p>

          <motion.blockquote className="founder__philosophy" {...reveal(0.35)}>
            <p>{founder.philosophy}</p>
            <footer className="founder__signature">{founder.signature}</footer>
          </motion.blockquote>

          <motion.ul
            className="founder__socials"
            aria-label="Social media"
            {...reveal(0.45)}
          >
            {founder.socials.map((social) => (
              <li key={social.label}>
                <a
                  className="founder__social link-underline"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}