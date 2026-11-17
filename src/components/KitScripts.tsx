"use client";

import { useEffect } from "react";

// The kit's scripts (system.js, motion.js, layout.js) rewrite the nav, the hero and the moments in place.
// They must run after React has hydrated the page, or React throws their changes away, so they are
// added from an effect, once per document.
const KIT = ["/assets/system.js", "/assets/motion/motion.js", "/assets/layout/layout.js"];

export default function KitScripts() {
  useEffect(() => {
    for (const src of KIT) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      const s = document.createElement("script");
      s.type = "module";
      s.src = src;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}
