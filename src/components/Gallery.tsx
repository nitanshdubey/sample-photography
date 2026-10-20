// src/components/Gallery.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 4, Gallery / Selected Work.
// - Asymmetrical editorial grid. Each image has a `shape`
//   ("feature" | "tall" | "wide" | "square") set in src/data/images.ts.
// - Every image is a real <button> that opens a full-screen viewer.
// - Lightbox: close button, previous/next buttons, Escape key,
//   left/right arrow keys, swipe on touch screens, focus kept inside
//   the viewer while open, and focus returned to the image afterwards.
// - Page scroll is locked only while the viewer is open.
// - Captions are always visible (nothing essential depends on hover).
// Styles live in Gallery.css (created in the next step).
// ---------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryIntro } from "../data/content";
import { galleryImages, sized, srcSetFor } from "../data/images";
import "./Gallery.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const TOTAL = galleryImages.length;

export default function Gallery() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const triggerRef = useRef<HTMLElement | null>(null); // image that opened the viewer
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = activeIndex !== null;

  const openAt = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActiveIndex(null);
    // Give focus back to the image the visitor clicked
    triggerRef.current?.focus();
  }, []);

  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % TOTAL)),
    []
  );

  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + TOTAL) % TOTAL)),
    []
  );

  // While the viewer is open: lock scroll, move focus inside, handle keys.
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("no-scroll");
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        showNext();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "Tab" && dialogRef.current) {
        // Keep Tab inside the viewer so focus never falls behind it
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement;

        if (event.shiftKey && current === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && current === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, showNext, showPrev]);

  // Swipe support for phones
  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) showNext();
    else showPrev();
  };

  const active = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="section section--dark gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        {/* Intro */}
        <motion.header
          className="gallery__intro"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
        >
          <p className="eyebrow">{galleryIntro.eyebrow}</p>
          <h2 id="gallery-heading" className="gallery__heading">
            {galleryIntro.heading}
          </h2>
        </motion.header>

        {/* Grid */}
        <ul className="gallery__grid">
          {galleryImages.map((image, index) => (
            <motion.li
              key={image.id}
              className={`gallery__item gallery__item--${image.shape}`}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
            >
              <button
                type="button"
                className="gallery__button"
                aria-haspopup="dialog"
                aria-label={`View larger: ${image.alt}`}
                onClick={(event) => openAt(index, event.currentTarget)}
              >
                <span
                  className="img-frame gallery__frame"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                >
                  <img
                    className="gallery__image"
                    src={sized(image.src, 900)}
                    srcSet={srcSetFor(image.src, [480, 700, 900, 1200])}
                    sizes="(min-width: 960px) 40vw, 100vw"
                    width={image.width}
                    height={image.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="gallery__caption">
                  <span className="gallery__caption-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {image.caption}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="gallery__note">{galleryIntro.caption}</p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            ref={dialogRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            onClick={(event) => {
              // Clicking the dark area (not the image or buttons) closes the viewer
              if (event.target === event.currentTarget) close();
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              ref={closeRef}
              type="button"
              className="lightbox__btn lightbox__close"
              aria-label="Close image viewer"
              onClick={close}
            >
              <X size={26} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="lightbox__btn lightbox__prev"
              aria-label="Previous image"
              onClick={showPrev}
            >
              <ChevronLeft size={30} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="lightbox__btn lightbox__next"
              aria-label="Next image"
              onClick={showNext}
            >
              <ChevronRight size={30} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <figure className="lightbox__figure">
              <motion.img
                key={active.id}
                className="lightbox__image"
                src={sized(active.src, 1800, 80)}
                srcSet={srcSetFor(active.src, [800, 1200, 1800])}
                sizes="100vw"
                alt={active.alt}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
              />
              <figcaption className="lightbox__caption">
                <span>{active.caption}</span>
                <span aria-live="polite">
                  {(activeIndex ?? 0) + 1} / {TOTAL}
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}