// src/data/images.ts
// ---------------------------------------------------------------
// MAISON AUBADE — central image configuration
// To use the client's real photographs later, change ONLY this file:
//   - Replace the `photo` ids below with your own Unsplash ids, OR
//   - Put files in /public/images/ and set `src` to "/images/name.jpg"
//     (see `local()` helper at the bottom).
// ---------------------------------------------------------------

export type ImageAsset = {
    src: string; // base URL (no width parameter)
    alt: string;
    width: number; // intrinsic ratio, used to prevent layout shift
    height: number;
  };
  
  export type GalleryImage = ImageAsset & {
    id: string;
    caption: string;
    // Layout hint used by Gallery.tsx
    shape: "feature" | "tall" | "wide" | "square";
  };
  
  // ---------- HELPERS ----------
  // Builds an Unsplash URL from a photo id at a given width.
  const unsplash = (photoId: string): string =>
    `https://images.unsplash.com/${photoId}`;
  
  // For files you add yourself inside the /public folder.
  export const local = (fileName: string): string => `/images/${fileName}`;
  
  // Returns a URL sized for the browser (works for Unsplash URLs).
  export const sized = (src: string, width: number, quality = 75): string =>
    `${src}?auto=format&fit=crop&w=${width}&q=${quality}`;
  
  // Returns a srcSet string so phones download smaller files.
  export const srcSetFor = (
    src: string,
    widths: number[] = [480, 800, 1200, 1800]
  ): string => widths.map((w) => `${sized(src, w)} ${w}w`).join(", ");
  
  // ---------- HERO ----------
  export const heroImage: ImageAsset = {
    src: unsplash("photo-1519741497674-611481863552"),
    alt: "A bride and groom sharing a quiet moment in soft natural light",
    width: 1800,
    height: 1200,
  };
  
  // ---------- ABOUT ----------
  export const aboutImage: ImageAsset = {
    src: unsplash("photo-1511285560929-80b456fea0bc"),
    alt: "Wedding details and soft light captured in a candid, unposed frame",
    width: 1000,
    height: 1250,
  };
  
  // ---------- SERVICES (same order as `services` in content.ts) ----------
  export const serviceImages: ImageAsset[] = [
    {
      src: unsplash("photo-1465495976277-4387d4b0b4c6"),
      alt: "Wedding couple walking together during a documentary-style ceremony",
      width: 900,
      height: 1200,
    },
    {
      src: unsplash("photo-1494790108377-be9c29b29330"),
      alt: "Relaxed portrait of a woman in warm window light",
      width: 900,
      height: 1200,
    },
    {
      src: unsplash("photo-1469334031218-e382a71b716b"),
      alt: "Editorial fashion image with atmospheric styling",
      width: 900,
      height: 1200,
    },
  ];
  
  // ---------- GALLERY (10 images) ----------
  export const galleryImages: GalleryImage[] = [
    {
      id: "g1",
      src: unsplash("photo-1519741497674-611481863552"),
      alt: "Newlyweds embracing in gentle morning light",
      caption: "First light, Lisbon",
      width: 1600,
      height: 1067,
      shape: "feature",
    },
    {
      id: "g2",
      src: unsplash("photo-1529626455594-4ff0802cfb7e"),
      alt: "Close portrait of a woman looking away from the camera",
      caption: "Portrait, studio",
      width: 900,
      height: 1200,
      shape: "tall",
    },
    {
      id: "g3",
      src: unsplash("photo-1583939003579-730e3918a45a"),
      alt: "Bride and groom laughing together during their wedding day",
      caption: "The second after",
      width: 1200,
      height: 800,
      shape: "wide",
    },
    {
      id: "g4",
      src: unsplash("photo-1515886657613-9f3515b0c78f"),
      alt: "Editorial portrait with soft styling and muted tones",
      caption: "Editorial, autumn",
      width: 900,
      height: 1200,
      shape: "tall",
    },
    {
      id: "g5",
      src: unsplash("photo-1534528741775-53994a69daeb"),
      alt: "Natural-light portrait of a woman with wind in her hair",
      caption: "Open air",
      width: 1000,
      height: 1000,
      shape: "square",
    },
    {
      id: "g6",
      src: unsplash("photo-1606216794074-735e91aa2c92"),
      alt: "Couple standing close together at a quiet outdoor ceremony",
      caption: "Vows, dusk",
      width: 1200,
      height: 800,
      shape: "wide",
    },
    {
      id: "g7",
      src: unsplash("photo-1509631179647-0177331693ae"),
      alt: "Fashion editorial image with a flowing garment",
      caption: "Lookbook, spring",
      width: 900,
      height: 1200,
      shape: "tall",
    },
    {
      id: "g8",
      src: unsplash("photo-1524504388940-b1c1722653e1"),
      alt: "Calm studio portrait with directional light",
      caption: "Still",
      width: 1000,
      height: 1000,
      shape: "square",
    },
    {
      id: "g9",
      src: unsplash("photo-1496747611176-843222e1e57c"),
      alt: "Editorial image of a model in an elegant dress",
      caption: "Atelier",
      width: 900,
      height: 1200,
      shape: "tall",
    },
    {
      id: "g10",
      src: unsplash("photo-1511285560929-80b456fea0bc"),
      alt: "Quiet wedding details arranged in soft daylight",
      caption: "Details",
      width: 1200,
      height: 800,
      shape: "wide",
    },
  ];
  
  // ---------- FOUNDER PORTRAIT ----------
  export const founderImage: ImageAsset = {
    src: unsplash("photo-1507003211169-0a1dd7228f2d"),
    alt: "Portrait of Isabelle Verne, founder of Maison Aubade (sample placeholder image)",
    width: 1000,
    height: 1300,
  };
  
  // ---------- CONTACT BACKDROP ----------
  export const contactImage: ImageAsset = {
    src: unsplash("photo-1537633552985-df8429e8048b"),
    alt: "Soft, atmospheric portrait used as a backdrop for the contact section",
    width: 1800,
    height: 1200,
  };