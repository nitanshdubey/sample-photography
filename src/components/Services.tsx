// src/components/Services.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 3, Services.
// Three services shown as an editorial list, not as cards:
// - Large understated number, title, short description, enquiry link.
// - One photograph per service. On desktop the rows alternate sides.
// - Each enquiry link opens a prefilled WhatsApp message
//   (see whatsappLink in src/data/content.ts).
// - Fade-and-rise reveals; all motion is off for reduced motion.
// Styles live in Services.css (created in the next step).
// ---------------------------------------------------------------

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, whatsappLink } from "../data/content";
import { serviceImages, sized, srcSetFor } from "../data/images";
import "./Services.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Services() {
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
      id="services"
      className="section section--paper services"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <motion.header className="services__intro" {...reveal(0)}>
          <p className="eyebrow">Services</p>
          <h2 id="services-heading" className="services__heading">
            Three ways to work together.
          </h2>
        </motion.header>

        <ol className="services__list">
          {services.map((service, index) => {
            const image = serviceImages[index];
            const flipped = index % 2 === 1;

            return (
              <motion.li
                key={service.number}
                className={`service${flipped ? " service--flipped" : ""}`}
                {...reveal(0.05)}
              >
                {/* Photograph */}
                <div
                  className="img-frame service__frame"
                  style={{
                    aspectRatio: image
                      ? `${image.width} / ${image.height}`
                      : "3 / 4",
                  }}
                >
                  {image && (
                    <img
                      className="service__image"
                      src={sized(image.src, 900)}
                      srcSet={srcSetFor(image.src, [480, 700, 900, 1200])}
                      sizes="(min-width: 960px) 36vw, 100vw"
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>

                {/* Text */}
                <div className="service__text">
                  <span className="service__number" aria-hidden="true">
                    {service.number}
                  </span>
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__description">{service.description}</p>
                  <p className="service__detail">{service.detail}</p>
                  <a
                    className="service__link link-underline"
                    href={whatsappLink(service.enquiryMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enquire about {service.title.toLowerCase()}
                    <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                  </a>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}