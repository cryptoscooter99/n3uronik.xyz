import type { MetadataRoute } from "next";

/**
 * /sitemap.xml — it returned 404 before this file existed.
 *
 * Three routes, listed by hand rather than crawled, because that is the whole
 * route table: the catalog, the CLM page, and its docs. If a route is added,
 * add it here — a sitemap that silently omits pages is worse than none, since
 * it reads as a complete statement of what the site contains.
 *
 * Same host rule as robots.ts and layout.tsx: www, because the apex has no
 * certificate covering it.
 */
const SITE = "https://www.n3uronik.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/clm`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/clm/docs`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
