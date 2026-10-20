// src/data/content.ts
// ---------------------------------------------------------------
// MAISON AUBADE — central content & configuration
// Edit this file to change text, contact details, and links.
// Image URLs live separately in src/data/images.ts
// ---------------------------------------------------------------

// ---------- CONCEPT DISCLOSURE ----------
export const concept = {
    isConcept: true,
    badge: "Concept Project",
    footerNote:
      "Maison Aubade is a fictional studio. This website is a concept design by ChangeIt Labs.",
    testimonialNote:
      "Illustrative sample content — to be replaced with verified client testimonials before launch.",
  };
  
  // ---------- STUDIO IDENTITY ----------
  export const studio = {
    name: "Maison Aubade",
    shortName: "Aubade",
    tagline: "Photographs made in the first light of a feeling.",
    year: new Date().getFullYear(),
    builtBy: {
      name: "ChangeIt Labs",
      url: "#", // TODO: replace with the ChangeIt Labs website URL
    },
  };
  
  // ---------- CONTACT CONFIG ----------
  // WhatsApp number: international format, digits only.
  // No "+", no spaces, no dashes. Example (India): 919876543210
  export const contact = {
    whatsappNumber: "910000000000", // TODO: replace with the real number
    whatsappMessage:
      "Hello Maison Aubade, I would like to enquire about a photography session.",
    email: "hello@example.com", // TODO: replace with the real email address
    instagramHandle: "maisonaubade", // TODO: replace with the real handle
    instagramUrl: "https://instagram.com/maisonaubade", // TODO: replace
    // Contact form: set this to a real form-service endpoint (e.g. Formspree)
    // before launch. While it is empty, the form falls back to WhatsApp.
    formEndpoint: "",
  };
  
  // ---------- LINK HELPERS ----------
  export const whatsappLink = (customMessage?: string): string => {
    const text = encodeURIComponent(customMessage ?? contact.whatsappMessage);
    return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
  };
  
  export const mailtoLink = (subject = "Enquiry — Maison Aubade"): string =>
    `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
  
  // ---------- NAVIGATION ----------
  // Each `id` MUST match the id of its <section> exactly.
  export const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "Studio" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Work" },
    { id: "testimonials", label: "Words" },
    { id: "founder", label: "Photographer" },
    { id: "contact", label: "Contact" },
  ] as const;
  
  export type SectionId = (typeof navLinks)[number]["id"];
  
  export const navCta = {
    label: "Enquire",
    target: "contact" as SectionId,
  };
  
  // ---------- 1. HERO ----------
  export const hero = {
    eyebrow: "Wedding · Portrait · Editorial",
    headlineLines: ["We photograph", "the hour", "before you remember."],
    supporting:
      "Quiet, unhurried photography for people who would rather feel a picture than pose for it.",
    primaryCta: { label: "Explore the Work", target: "gallery" as SectionId },
    secondaryCta: { label: "Enquire About Your Date", target: "contact" as SectionId },
    scrollLabel: "Scroll",
  };
  
  // ---------- 2. ABOUT ----------
  export const about = {
    eyebrow: "The Studio",
    heading: "Light first. Everything else follows.",
    paragraphs: [
      "Maison Aubade is a small studio built around one belief: the most lasting photographs are made when nobody is performing. We arrive early, work quietly, and wait for the moment that is actually yours.",
      "There are no rigid shot lists and no loud direction. Just natural light, patient observation, and a considered edit that gives each story room to breathe.",
    ],
    pullQuote: "A photograph should feel like remembering, not like posing.",
    detail: "Intimate by design — a limited number of commissions each season.",
  };
  
  // ---------- 3. SERVICES (exactly three) ----------
  export const services = [
    {
      number: "01",
      title: "Weddings",
      description:
        "Full-day, documentary-led coverage with an editorial eye. Candid, composed, and never staged for the sake of it.",
      detail: "Local & destination",
      enquiryMessage:
        "Hello Maison Aubade, I would like to enquire about wedding photography.",
    },
    {
      number: "02",
      title: "Portraits",
      description:
        "Considered portrait sessions for individuals, couples, and families. Relaxed direction, honest expressions, and a slow pace.",
      detail: "Studio & location",
      enquiryMessage:
        "Hello Maison Aubade, I would like to enquire about a portrait session.",
    },
    {
      number: "03",
      title: "Editorial",
      description:
        "Story-driven imagery for designers, hospitality brands, and independent labels who want their work seen with atmosphere.",
      detail: "Campaigns & lookbooks",
      enquiryMessage:
        "Hello Maison Aubade, I would like to enquire about editorial photography.",
    },
  ];
  
  // ---------- 4. GALLERY (text only; image URLs are in images.ts) ----------
  export const galleryIntro = {
    eyebrow: "Selected Work",
    heading: "A few quiet frames.",
    caption: "Sample imagery shown for concept purposes.",
  };
  
  // ---------- 5. TESTIMONIALS (illustrative placeholders) ----------
  export const testimonials = [
    {
      quote:
        "We barely noticed the camera, yet every picture feels exactly like that day did.",
      author: "Sample Client A",
      context: "Wedding — illustrative placeholder",
    },
    {
      quote:
        "Calm, thoughtful, and entirely unforced. I finally have portraits that look like me.",
      author: "Sample Client B",
      context: "Portrait — illustrative placeholder",
    },
    {
      quote:
        "The imagery gave our collection the atmosphere we had been struggling to describe.",
      author: "Sample Client C",
      context: "Editorial — illustrative placeholder",
    },
  ];
  
  // ---------- 6. FOUNDER ----------
  export const founder = {
    eyebrow: "The Photographer",
    name: "Isabelle Verne",
    role: "Founder & Lead Photographer",
    intro:
      "Isabelle trained her eye on slow mornings and borrowed film cameras long before photography became her work. She still prefers the minutes just before an event begins, when people are most themselves.",
    philosophy:
      "I am not looking for the perfect smile. I am looking for the second after it.",
    signature: "— Isabelle Verne",
    socials: [
      { label: "Instagram", url: "https://instagram.com/maisonaubade" }, // TODO: replace
      { label: "Pinterest", url: "https://pinterest.com/" }, // TODO: replace
    ],
  };
  
  // ---------- 7. CONTACT ----------
  export const contactSection = {
    eyebrow: "Enquiries",
    heading: "Tell us about your day.",
    supporting:
      "Share a date, a place, and a feeling. We reply personally within two working days.",
    whatsappLabel: "Enquire on WhatsApp",
    emailLabel: "Write to us",
    instagramLabel: "Follow on Instagram",
    form: {
      nameLabel: "Your name",
      emailLabel: "Email address",
      typeLabel: "Type of session",
      typeOptions: ["Wedding", "Portrait", "Editorial", "Something else"],
      messageLabel: "Tell us a little",
      submitLabel: "Send enquiry",
      notConfiguredNote:
        "Form service not connected yet — submitting will open a prefilled WhatsApp message instead.",
      successMessage: "Thank you — your enquiry has been sent.",
      errorMessage:
        "Something went wrong. Please try WhatsApp or email instead.",
    },
  };
  
  // ---------- DESIGN TOKENS (reference for index.css) ----------
  // ivory   #F5F0E8   page background
  // paper   #EDE6DA   alternate surface
  // ink     #151412   text / dark sections
  // stone   #8C8479   muted text
  // bronze  #A9825A   single accent
  // Display: "Cormorant Garamond"   Body: "Inter"