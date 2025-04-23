import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "https://alpinedata.de",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  vite: { plugins: [tailwindcss()] },

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/tags/') &&
        !page.includes('/categories/') &&
        !page.includes('/page/') &&
        page !== 'https://alpinedata.de/authors/' &&
        page !== 'https://alpinedata.de/data-assessment/' &&
        page !== 'https://alpinedata.de/data-assessment/assess/' &&
        page !== 'https://alpinedata.de/contact/'
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },

  adapter: netlify({
    imageCDN: false,
  }),
  image: {
    service: sharpImageService(), // Aktiviert Astro's statische Bildverarbeitung
  },
});
