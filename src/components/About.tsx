// src/components/About.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 2, About the Studio.
// A quiet, editorial pause after the hero:
// - Tall photograph on one side, text on the other (asymmetrical).
// - A large italic pull quote that overlaps the photo on desktop.
// - Gentle fade-and-rise reveals when each part scrolls into view.
// - Motion is switched off for visitors who prefer reduced motion.
// Styles live in About.css (created in the next step).
// ---------------------------------------------------------------

import { motion, useReducedMotion } from "framer-motion";
import { about } from "../data/content";
import { aboutImage, sized, srcSetFor } from "../data/images";
import "./About.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function About() {
  const reduceMotion = useReducedMotion();

  // Reusable fade-and-rise. `delay` staggers the elements slightly.
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
      id="about"
      className="section about"
      aria-labelledby="about-heading"
    >
      <div className="about__inner container">
        {/* Photograph */}
        <motion.figure
          className="about__figure"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: EASE }}
        >
          <div
            className="img-frame about__frame"
            style={{ aspectRatio: `${aboutImage.width} / ${aboutImage.height}` }}
          >
            <motion.img
              className="about__image"
              src={sized(aboutImage.src, 1000)}
              srcSet={srcSetFor(aboutImage.src, [480, 800, 1000, 1400])}
              sizes="(min-width: 960px) 42vw, 100vw"
              width={aboutImage.width}
              height={aboutImage.height}
              alt={aboutImage.alt}
              loading="lazy"
              decoding="async"
              initial={reduceMotion ? false : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: reduceMotion ? 0 : 1.8, ease: EASE }}
            />
          </div>
        </motion.figure>

        {/* Text */}
        <div className="about__text">
          <motion.p className="eyebrow" {...reveal(0)}>
            {about.eyebrow}
          </motion.p>

          <motion.h2 id="about-heading" className="about__heading" {...reveal(0.1)}>
            {about.heading}
          </motion.h2>

          <div className="about__body">
            {about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="lead"
                {...reveal(0.2 + index * 0.1)}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.p className="about__detail" {...reveal(0.4)}>
            {about.detail}
          </motion.p>
        </div>

        {/* Pull quote */}
        <motion.blockquote className="about__quote" {...reveal(0.1)}>
          <p>{about.pullQuote}</p>
        </motion.blockquote>
      </div>
    </section>
  );
}