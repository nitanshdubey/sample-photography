// src/components/Contact.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: Section 7, Contact / Enquiries.
// The final scene: a dark, calm closing with a photographic backdrop.
// - Primary WhatsApp button (number and message come from content.ts).
// - Email link (mailto) and Instagram link.
// - Enquiry form:
//     * If `contact.formEndpoint` in content.ts is filled in, the form
//       is sent to that service (for example Formspree) as JSON.
//     * If it is empty, nothing is faked: submitting opens a prefilled
//       WhatsApp message instead, and the form says so openly.
// - Fade-and-rise reveals; all motion is off for reduced motion.
// Styles live in Contact.css (created in the next step).
// ---------------------------------------------------------------

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import {
  contact,
  contactSection,
  mailtoLink,
  studio,
  whatsappLink,
} from "../data/content";
import { contactImage, sized, srcSetFor } from "../data/images";
import "./Contact.css";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Status = "idle" | "sending" | "success" | "error" | "whatsapp";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");

  const form = contactSection.form;
  const formConnected = contact.formEndpoint.trim() !== "";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // No form service connected: open WhatsApp with everything prefilled
    if (!formConnected) {
      const text =
        `Hello ${studio.name}, my name is ${name}. ` +
        `I would like to enquire about: ${type}.\n\n` +
        `${message}\n\nMy email: ${email}`;
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
      return;
    }

    // Form service connected: send the enquiry as JSON
    setStatus("sending");
    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, type, message }),
      });

      if (!response.ok) throw new Error("Form request failed");

      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="section section--dark contact"
      aria-labelledby="contact-heading"
    >
      {/* Decorative backdrop */}
      <div className="contact__media" aria-hidden="true">
        <img
          className="contact__image"
          src={sized(contactImage.src, 1800, 70)}
          srcSet={srcSetFor(contactImage.src, [800, 1200, 1800])}
          sizes="100vw"
          width={contactImage.width}
          height={contactImage.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="contact__shade" aria-hidden="true" />

      <div className="contact__inner container">
        {/* Closing statement and direct contact options */}
        <div className="contact__intro">
          <motion.p className="eyebrow" {...reveal(0)}>
            {contactSection.eyebrow}
          </motion.p>

          <motion.h2
            id="contact-heading"
            className="contact__heading"
            {...reveal(0.1)}
          >
            {contactSection.heading}
          </motion.h2>

          <motion.p className="contact__supporting lead" {...reveal(0.2)}>
            {contactSection.supporting}
          </motion.p>

          <motion.div className="contact__actions" {...reveal(0.3)}>
            <a
              className="btn btn--light"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
              {contactSection.whatsappLabel}
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
          </motion.div>

          <motion.ul className="contact__links" {...reveal(0.4)}>
            <li>
              <a className="contact__link link-underline" href={mailtoLink()}>
                {contactSection.emailLabel}
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <span className="contact__address">{contact.email}</span>
            </li>
            <li>
              <a
                className="contact__link link-underline"
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactSection.instagramLabel}
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="contact__address">@{contact.instagramHandle}</span>
            </li>
          </motion.ul>
        </div>

        {/* Enquiry form */}
        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          aria-label="Enquiry form"
          {...reveal(0.2)}
        >
          <div className="field">
            <label htmlFor="enquiry-name">{form.nameLabel}</label>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="enquiry-email">{form.emailLabel}</label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="enquiry-type">{form.typeLabel}</label>
            <select
              id="enquiry-type"
              name="type"
              defaultValue={form.typeOptions[0]}
              required
            >
              {form.typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="enquiry-message">{form.messageLabel}</label>
            <textarea id="enquiry-message" name="message" rows={4} required />
          </div>

          <button
            type="submit"
            className="btn btn--light contact__submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : form.submitLabel}
          </button>

          {/* Honest note while no form service is connected */}
          {!formConnected && (
            <p className="contact__note">{form.notConfiguredNote}</p>
          )}

          {/* Result messages are announced to screen readers */}
          <p className="contact__status" role="status" aria-live="polite">
            {status === "success" && form.successMessage}
            {status === "whatsapp" &&
              "WhatsApp has opened with your enquiry. Press send there to complete it."}
            {status === "error" && form.errorMessage}
          </p>
        </motion.form>
      </div>
    </section>
  );
}