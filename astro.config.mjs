import { parse as parseJs } from "acorn";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { parse as parsePath, resolve } from "node:path";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

const mdxAutoImports = [
  "@/shortcodes/Button",
  "@/shortcodes/Accordion",
  "@/shortcodes/Notice",
  "@/shortcodes/Video",
  "@/shortcodes/Tabs",
  "@/shortcodes/Tab",
];

const resolveModulePath = (importPath) => {
  if (importPath.startsWith(".")) {
    return resolve(importPath);
  }

  return importPath;
};

const getDefaultImportName = (importPath) => parsePath(importPath).name.replaceAll(/[^\w\d]/g, "");

const formatImport = (imported, modulePath) => `import ${imported} from ${JSON.stringify(modulePath)};`;

const processImportsConfig = (importsConfig) => {
  const imports = [];

  for (const option of importsConfig) {
    if (typeof option === "string") {
      imports.push(formatImport(getDefaultImportName(option), resolveModulePath(option)));
      continue;
    }

    for (const modulePath in option) {
      const namedImportsOrNamespace = option[modulePath];

      if (typeof namedImportsOrNamespace === "string") {
        imports.push(formatImport(`* as ${namedImportsOrNamespace}`, resolveModulePath(modulePath)));
      } else {
        const names = namedImportsOrNamespace.map((imp) =>
          typeof imp === "string" ? imp : `${imp[0]} as ${imp[1]}`,
        );
        imports.push(formatImport(`{ ${names.join(", ")} }`, resolveModulePath(modulePath)));
      }
    }
  }

  return imports;
};

const createMdxImportsNode = (importsConfig) => {
  const js = processImportsConfig(importsConfig).join("\n");

  return {
    type: "mdxjsEsm",
    value: "",
    data: {
      estree: {
        body: [],
        ...parseJs(js, { ecmaVersion: "latest", sourceType: "module" }),
        type: "Program",
        sourceType: "module",
      },
    },
  };
};

const remarkInjectMdxImports = (importsConfig) => {
  const importsNode = createMdxImportsNode(importsConfig);

  return function injectMdxImports() {
    return function transform(tree, vfile) {
      if (!vfile.basename?.endsWith(".md")) {
        tree.children.unshift(importsNode);
      }
    };
  };
};

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
        page !== 'https://alpinedata.de/authors/paul-springer/' &&
        page !== 'https://alpinedata.de/data-assessment/' &&
        page !== 'https://alpinedata.de/data-assessment/assess/' &&
        page !== 'https://alpinedata.de/data-assessment/thank-you/' &&
        page !== 'https://alpinedata.de/bestaetigung/' &&
        page !== 'https://alpinedata.de/contact/'
    }),
    mdx(),
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
        remarkInjectMdxImports(mdxAutoImports),
      ],
    }),
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
});
