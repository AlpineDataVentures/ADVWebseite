/* eslint-env node */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import sharp from "sharp";

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./.json";
const BLOG_FOLDER = "src/content/blog";
const PRODUCTS_FOLDER = "src/content/products";
const SEARCH_THUMBNAIL_FOLDER = "/images/search-thumbnails";
const SEARCH_THUMBNAIL_WIDTH = 200;
const SEARCH_THUMBNAIL_HEIGHT = 200;
const SEARCH_THUMBNAIL_QUALITY = 68;

const getAbsolutePathFromPublic = (publicPath) =>
  path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));

const ensureFolderForFile = (filePath) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
};

const shouldGenerateThumbnail = (sourcePath, targetPath) => {
  if (!fs.existsSync(sourcePath)) return false;
  if (!fs.existsSync(targetPath)) return true;
  return fs.statSync(sourcePath).mtimeMs > fs.statSync(targetPath).mtimeMs;
};

const getThumbnailPath = (item) => {
  const safeSlug = item.slug
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();
  return `${SEARCH_THUMBNAIL_FOLDER}/${item.group}/${safeSlug}.webp`;
};

const addSearchThumbnail = async (item) => {
  const imagePath = item?.frontmatter?.image;
  if (typeof imagePath !== "string" || !imagePath.startsWith("/")) {
    return item;
  }

  const sourceImagePath = getAbsolutePathFromPublic(imagePath);
  if (!fs.existsSync(sourceImagePath)) {
    return item;
  }

  const thumbnailPublicPath = getThumbnailPath(item);
  const thumbnailAbsolutePath = getAbsolutePathFromPublic(thumbnailPublicPath);

  try {
    if (shouldGenerateThumbnail(sourceImagePath, thumbnailAbsolutePath)) {
      ensureFolderForFile(thumbnailAbsolutePath);
      await sharp(sourceImagePath)
        .rotate()
        .resize(SEARCH_THUMBNAIL_WIDTH, SEARCH_THUMBNAIL_HEIGHT, {
          fit: "cover",
          position: "entropy",
        })
        .webp({ quality: SEARCH_THUMBNAIL_QUALITY })
        .toFile(thumbnailAbsolutePath);
    }

    return {
      ...item,
      frontmatter: {
        ...item.frontmatter,
        search_image: thumbnailPublicPath,
      },
    };
  } catch {
    return item;
  }
};

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("-"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      const group = pathParts[groupDepth];

      return {
        group: group,
        slug: slug,
        frontmatter: data,
        content: content,
      };
    } else {
      return [];
    }
  });

  return getPaths.filter((page) => !page.frontmatter?.draft && page);
};

const run = async () => {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  const posts = await Promise.all(getData(BLOG_FOLDER, 2).map(addSearchThumbnail));
  const products = await Promise.all(
    getData(PRODUCTS_FOLDER, 2).map(addSearchThumbnail),
  );

  // create json files
  fs.writeFileSync(`${JSON_FOLDER}/posts.json`, JSON.stringify(posts));
  fs.writeFileSync(`${JSON_FOLDER}/products.json`, JSON.stringify(products));

  // merge json files for search (products first)
  const search = [...products, ...posts];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
};

run().catch((err) => {
  globalThis.console.error(err);
  process.exitCode = 1;
});
