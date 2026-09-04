import type { MetadataRoute } from "next";

/**
 * /robots.txt — it returned 404 before this file existed.
 *
 * A missing robots.txt is not fatal (crawlers assume "allow"), but it also
 * means nothing points them at the sitemap, so discovery of /clm and /clm/docs
 * was left entirely to link-following.
 *
 * The host must be the one that actually serves a valid certificate. The apex
 * n3uronik.xyz currently has no certificate covering it, so naming it here
 * would hand crawlers a host they cannot open — see the note in layout.tsx.
 */
const SITE = "https://www.n3uronik.xyz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
