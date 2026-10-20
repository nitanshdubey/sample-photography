// src/components/Hero.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 1, Home / Hero.
// - Full-screen photograph, loaded immediately (not lazy) so it
//   appears fast.
// - Cinematic entrance: image settles from a slight zoom, headline
//   lines rise out of a mask one after another.
// - Gentle parallax on the photo while scrolling (Framer Motion's
//   useScroll, so there is no hand-written scroll listener).
// - All motion is switched off for visitors who prefer reduced motion.
// Styles live in Hero.css (created in the next step).
// ---------------------------------------------------------------

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { concept, hero } from "../data/content";
import { heroImage, sized, srcSetFor } from "../data/images";
import "./Hero.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax: while the hero scrolls out of view, the photo drifts down
  // slightly. The photo layer is taller than the hero (see Hero.css),
  // so no empty edges ever show.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  // Staggered entrance for the text block
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.14,
        delayChildren: reduceMotion ? 0 : 0.45,
      },
    },
  };

  const lineReveal: Variants = {
    hidden: { y: reduceMotion ? "0%" : "105%" },
    visible: {
      y: "0%",
      transition: { duration: reduceMotion ? 0 : 1, ease: EASE },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.9, ease: EASE },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero"
      aria-labelledby="hero-heading"
    >
      {/* Photograph layer */}
      <motion.div
        className="hero__media"
        style={reduceMotion ? undefined : { y: imageY }}
        aria-hidden="true"
      >
        <motion.img
          className="hero__image"
          src={sized(heroImage.src, 1800, 72)}
          srcSet={srcSetFor(heroImage.src, [800, 1200, 1800, 2400])}
          sizes="100vw"
          width={heroImage.width}
          height={heroImage.height}
          alt=""
          loading="eager"
          decoding="async"
          initial={reduceMotion ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.2, ease: EASE }}
        />
      </motion.div>

      {/* Dark gradient for text contrast */}
      <div className="hero__shade" aria-hidden="true" />

      {/* Text content */}
      <motion.div
        className="hero__content container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__eyebrow eyebrow" variants={fadeUp}>
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-heading" className="hero__title">
          {hero.headlineLines.map((line, index) => (
            <span className="hero__line" key={line}>
              <motion.span
                className={`hero__line-inner${
                  index === 1 ? " hero__line-inner--italic" : ""
                }`}
                variants={lineReveal}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero__supporting" variants={fadeUp}>
          {hero.supporting}
        </motion.p>

        <motion.div className="hero__actions" variants={fadeUp}>
          <a
            href={`#${hero.primaryCta.target}`}
            className="btn btn--light"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={`#${hero.secondaryCta.target}`}
            className="btn btn--ghost-light"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </motion.div>

      {/* Concept label (project is a fictional concept) */}
      <p className="hero__concept">{concept.badge}</p>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to the studio introduction"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.9 }}
      >
        <span className="hero__scroll-label">{hero.scrollLabel}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>
    </section>
  );
}