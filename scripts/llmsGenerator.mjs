// Adapted from Astroplate's MIT-licensed llmsGenerator.js:
// https://github.com/zeon-studio/astroplate/blob/main/scripts/llmsGenerator.js
import { glob } from "glob";
import { parse } from "node-html-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(SCRIPT_DIR, "..");
const CONFIG_PATH = path.join(PROJECT_DIR, "src", "config", "config.json");
const DIST_DIR = path.join(PROJECT_DIR, "dist");
const DEFAULT_EXCLUDES = [
  "node_modules",
  "_astro",
  "404",
  "404.html",
  "**/*.xml",
  "**/*.txt",
];

const readConfig = () => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  if (!config.llms) {
    throw new Error("Missing llms configuration in src/config/config.json");
  }
  return config;
};

const toGlobPath = (filePath) => filePath.split(path.sep).join("/");

const getClientDir = () => {
  const clientDir = path.join(DIST_DIR, "client");
  return fs.existsSync(clientDir) ? clientDir : DIST_DIR;
};

const normalizePattern = (baseDir, pattern) => {
  const fullPath = path.join(baseDir, pattern.replace(/^[/\\]+/, ""));
  try {
    if (fs.statSync(fullPath).isDirectory()) {
      return toGlobPath(path.join(fullPath, "**", "*.html"));
    }
  } catch {
    // Glob patterns do not resolve to an existing path before expansion.
  }
  return toGlobPath(fullPath);
};

const discoverHtmlFiles = async (clientDir, llmsConfig) => {
  const includePatterns =
    llmsConfig.include?.length > 0
      ? llmsConfig.include.map((pattern) =>
          normalizePattern(clientDir, pattern),
        )
      : [toGlobPath(path.join(clientDir, "**", "*.html"))];
  const excludePatterns = [
    ...DEFAULT_EXCLUDES,
    ...(llmsConfig.exclude ?? []),
  ].map((pattern) => normalizePattern(clientDir, pattern));

  const files = await glob(includePatterns, {
    absolute: true,
    ignore: excludePatterns,
  });

  return files
    .filter((file) => fs.statSync(file).isFile() && file.endsWith(".html"))
    .sort();
};

const fileToUrlPath = (filePath, clientDir) => {
  let urlPath = path.relative(clientDir, filePath).split(path.sep).join("/");
  urlPath = urlPath.replace(/\.html$/, "");
  if (urlPath === "index") {
    urlPath = "";
  } else {
    urlPath = urlPath.replace(/\/index$/, "");
  }
  return `/${urlPath}`;
};

const processHtmlFile = (filePath, llmsConfig) => {
  const root = parse(fs.readFileSync(filePath, "utf8"));
  let title = llmsConfig.title_selector
    ? root.querySelector(llmsConfig.title_selector)?.text.trim()
    : "";
  if (!title) {
    title =
      root.querySelector("h1")?.text.trim() ||
      root.querySelector("h2")?.text.trim() ||
      root.querySelector("h3")?.text.trim() ||
      root.querySelector("title")?.text.trim() ||
      "";
  }

  const description =
    root
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim() ?? "";
  const contentElement = llmsConfig.content_selector
    ? root.querySelector(llmsConfig.content_selector)
    : null;
  const mainContent = contentElement ?? root.querySelector("main") ?? root;
  mainContent
    .querySelectorAll("script, style, noscript, iframe, svg")
    .forEach((element) => element.remove());

  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  turndown.addRule("removeChrome", {
    filter: ["nav", "footer", "header", "aside"],
    replacement: () => "",
  });

  return {
    title,
    description,
    content: turndown.turndown(mainContent.innerHTML).trim(),
  };
};

const getPageUrl = (page, siteUrl, trailingSlash) => {
  let route = page.urlPath;
  if (trailingSlash && route !== "/" && !route.endsWith("/")) {
    route += "/";
  } else if (!trailingSlash && route !== "/") {
    route = route.replace(/\/+$/, "");
  }
  return new URL(route, `${siteUrl}/`).toString();
};

const yamlString = (value) => JSON.stringify(value);

const generateMarkdownFile = (page, siteUrl, trailingSlash) => {
  const lines = [
    "---",
    `title: ${yamlString(page.title)}`,
    `url: ${yamlString(getPageUrl(page, siteUrl, trailingSlash))}`,
  ];
  if (page.description) {
    lines.push(`description: ${yamlString(page.description)}`);
  }
  return `${lines.join("\n")}\n---\n\n${page.content}\n`;
};

const generateLlmsTxt = (
  pages,
  siteUrl,
  siteName,
  siteDescription,
  generateIndividualMd,
  trailingSlash,
) => {
  const groups = new Map();
  for (const page of pages) {
    const firstSegment = page.urlPath.split("/").filter(Boolean)[0];
    const group = firstSegment || "Home";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(page);
  }

  const sortedGroups = [...groups.keys()].sort((a, b) => {
    if (a === "Home") return -1;
    if (b === "Home") return 1;
    return a.localeCompare(b);
  });
  const output = [`# ${siteName}`, ""];
  if (siteDescription) output.push(`> ${siteDescription}`, "");
  output.push(
    "This file helps language models discover the most useful content on this site.",
    "",
  );

  for (const group of sortedGroups) {
    output.push(
      `## ${group === "Home" ? group : group[0].toUpperCase() + group.slice(1)}`,
      "",
    );
    for (const page of groups.get(group)) {
      const mdPath =
        page.urlPath === "/"
          ? "/index.md"
          : `${page.urlPath.replace(/\/+$/, "")}.md`;
      const url = generateIndividualMd
        ? new URL(mdPath, `${siteUrl}/`).toString()
        : getPageUrl(page, siteUrl, trailingSlash);
      const description = page.description ? `: ${page.description}` : "";
      output.push(`- [${page.title || page.urlPath}](${url})${description}`);
    }
    output.push("");
  }

  return `${output.join("\n").trimEnd()}\n`;
};

const generateLlmsFullTxt = (pages, siteUrl, siteName, trailingSlash) => {
  const output = [`# ${siteName}`, "", `URL: ${siteUrl}`, ""];
  pages.forEach((page, index) => {
    output.push(
      `## ${page.title}`,
      "",
      `URL: ${getPageUrl(page, siteUrl, trailingSlash)}`,
      "",
    );
    if (page.description) output.push(page.description, "");
    output.push(page.content);
    if (index < pages.length - 1) output.push("", "---", "");
  });
  return `${output.join("\n").trimEnd()}\n`;
};

const removeExistingMarkdownFiles = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeExistingMarkdownFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      fs.unlinkSync(fullPath);
    }
  }
};

const writeIndividualMarkdownFiles = (
  pages,
  clientDir,
  siteUrl,
  trailingSlash,
) => {
  removeExistingMarkdownFiles(clientDir);
  for (const page of pages) {
    const relativePath =
      page.urlPath === "/" ? "index.md" : `${page.urlPath.slice(1)}.md`;
    const outputPath = path.join(clientDir, relativePath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
      outputPath,
      generateMarkdownFile(page, siteUrl, trailingSlash),
      "utf8",
    );
  }
};

const generateLlmsFiles = async () => {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error("dist/ does not exist. Run astro build first.");
  }

  const config = readConfig();
  const llmsConfig = config.llms;
  const clientDir = getClientDir();
  const siteUrl = config.site.base_url.replace(/\/+$/, "");
  const siteName = config.site.title;
  const siteDescription = config.metadata?.meta_description ?? "";
  const trailingSlash = config.site.trailing_slash === true;
  const htmlFiles = await discoverHtmlFiles(clientDir, llmsConfig);
  const pages = [];

  console.log(`Found ${htmlFiles.length} rendered HTML files.`);
  for (const file of htmlFiles) {
    const urlPath = fileToUrlPath(file, clientDir);
    try {
      const page = processHtmlFile(file, llmsConfig);
      if (!page.title) {
        console.warn(`Skipping ${urlPath}: no page title found.`);
        continue;
      }
      pages.push({ urlPath, ...page });
    } catch (error) {
      console.error(`Could not process ${file}:`, error);
    }
  }

  pages.sort((a, b) => {
    if (a.urlPath === "/") return -1;
    if (b.urlPath === "/") return 1;
    return a.urlPath.localeCompare(b.urlPath);
  });
  console.log(`Processed ${pages.length} pages.`);

  if (llmsConfig.generate_individual_md) {
    writeIndividualMarkdownFiles(pages, clientDir, siteUrl, trailingSlash);
    console.log(`Generated ${pages.length} individual Markdown files.`);
  }

  if (llmsConfig.generate_llms_txt) {
    fs.writeFileSync(
      path.join(clientDir, "llms.txt"),
      generateLlmsTxt(
        pages,
        siteUrl,
        siteName,
        siteDescription,
        llmsConfig.generate_individual_md,
        trailingSlash,
      ),
      "utf8",
    );
    console.log("Generated llms.txt.");
  }

  if (llmsConfig.generate_llms_full_txt) {
    fs.writeFileSync(
      path.join(clientDir, "llms-full.txt"),
      generateLlmsFullTxt(pages, siteUrl, siteName, trailingSlash),
      "utf8",
    );
    console.log("Generated llms-full.txt.");
  }
};

generateLlmsFiles().catch((error) => {
  console.error("LLMS generation failed:", error);
  process.exitCode = 1;
});
