// src/components/Testimonials.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 5, Testimonials.
// Three short quotes shown together (no carousel, nothing hidden):
// - Large italic quotation typography with thin separators.
// - Each quote is marked as illustrative sample content, as the
//   brief requires. Replace with verified testimonials before launch.
// - Fade-and-rise reveals; all motion is off for reduced motion.
// Text comes from `testimonials` and `concept` in src/data/content.ts.
// Styles live in Testimonials.css (created in the next step).
// ---------------------------------------------------------------

import { motion, useReducedMotion } from "framer-motion";
import { concept, testimonials } from "../data/content";
import "./Testimonials.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Testimonials() {
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
      id="testimonials"
      className="section testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <motion.header className="testimonials__intro" {...reveal(0)}>
          <p className="eyebrow">Kind Words</p>
          <h2 id="testimonials-heading" className="testimonials__heading">
            Remembered, not performed.
          </h2>
        </motion.header>

        <ul className="testimonials__list">
          {testimonials.map((item, index) => (
            <motion.li
              key={item.author}
              className="testimonial"
              {...reveal(0.05)}
            >
              <span className="testimonial__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="testimonial__quote">
                <p>{item.quote}</p>
              </blockquote>
              <footer className="testimonial__meta">
                <span className="testimonial__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="testimonial__author">{item.author}</span>
                <span className="testimonial__context">{item.context}</span>
              </footer>
            </motion.li>
          ))}
        </ul>

        <p className="testimonials__note">{concept.testimonialNote}</p>
      </div>
    </section>
  );
}