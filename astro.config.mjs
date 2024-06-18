import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://alpinedata.de",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: squooshImageService(),
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      filter: (page) =>
        page !== 'https://alpinedata.de/about' &&
        page !== 'https://alpinedata.de/authors' &&
        page !== 'https://alpinedata.de/authors/john-doe' &&
        page !== 'https://alpinedata.de/authors/sam-wilson' &&
        page !== 'https://alpinedata.de/authors/william-jacob' &&
        page !== 'https://alpinedata.de/blog' &&
        page !== 'https://alpinedata.de/blog/page/2' &&
        page !== 'https://alpinedata.de/blog/post-1' &&
        page !== 'https://alpinedata.de/blog/post-2' &&
        page !== 'https://alpinedata.de/blog/post-3' &&
        page !== 'https://alpinedata.de/blog/post-4' &&
        page !== 'https://alpinedata.de/categories' &&
        page !== 'https://alpinedata.de/categories/application' &&
        page !== 'https://alpinedata.de/categories/architecture' &&
        page !== 'https://alpinedata.de/categories/data' &&
        page !== 'https://alpinedata.de/categories/software' &&
        page !== 'https://alpinedata.de/categories/technology' &&
        page !== 'https://alpinedata.de/contact' &&
        page !== 'https://alpinedata.de/elements' &&
        page !== 'https://alpinedata.de/tags' &&
        page !== 'https://alpinedata.de/tags/nextjs' &&
        page !== 'https://alpinedata.de/tags/silicon' &&
        page !== 'https://alpinedata.de/tags/software' &&
        page !== 'https://alpinedata.de/tags/tailwind' &&
        page !== 'https://alpinedata.de/tags/technology',
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
