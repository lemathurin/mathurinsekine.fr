import EleventyPluginOgImage from "eleventy-plugin-og-image";
import markdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItFootnote from "markdown-it-footnote";
import fs from "fs";
import path from "path";
import i18n from "eleventy-plugin-i18n/i18n.js";

/** @param { import('@11ty/eleventy/src/UserConfig').default } eleventyConfig */
export default async function (eleventyConfig) {
  // Add environment variable as global data
  eleventyConfig.addGlobalData(
    "isProduction",
    process.env.NODE_ENV === "production",
  );

  // Create data URL for OG avatar image for Satori
  const avatarPath = new URL("public/og-avatar.png", import.meta.url).pathname;
  const avatarData = fs.readFileSync(avatarPath);
  const ogAvatarDataUrl = `data:image/png;base64,${avatarData.toString("base64")}`;
  eleventyConfig.addGlobalData("ogAvatarPath", ogAvatarDataUrl);

  // Truncate helper for OG image text
  eleventyConfig.addFilter("truncateWords", function (text, wordCount = 20) {
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  });

  eleventyConfig.addFilter("rawMarkdown", function (inputPath) {
    if (!inputPath) return "";
    const fullPath = path.resolve(".", inputPath);
    try {
      const content = fs.readFileSync(fullPath, "utf-8");
      const match = content.match(/^---[\s\S]*?---\s*([\s\S]*)$/);
      return match ? match[1].trim() : content;
    } catch {
      return "";
    }
  });

  eleventyConfig.addFilter("toMdPath", function (url) {
    if (!url || url === "/") return false;
    const clean = url.replace(/\/$/, "").replace(/^\//, "");
    return clean ? `/${clean}.md` : false;
  });

  // Add the OG Image plugin
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    previewMode: false,
    satoriOptions: {
      fonts: [
        {
          name: "Inter",
          data: fs.readFileSync("src/assets/fonts/Inter/Inter-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    },
  });

  eleventyConfig.addPlugin(i18n, {
    locales: ["en", "fr"],
    defaultLocale: "en",
    directory: "src",
    fallbackLocales: {
      "*": "en",
    },
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("_redirects");

  // Enable HTML inside Markdown with link attributes
  let markdownLib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItLinkAttributes, {
      matcher(href) {
        return href.startsWith("http");
      },
      attrs: {
        target: "_blank",
        rel: "noopener noreferrer",
      },
    })
    .use(markdownItFootnote);

  // Remove footnote brackets
  markdownLib.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString();
    if (tokens[idx].meta.subId > 0) {
      n += ":" + tokens[idx].meta.subId;
    }
    return n;
  };

  // Change backref icon to up arrow
  markdownLib.renderer.rules.footnote_anchor = (
    tokens,
    idx,
    options,
    env,
    slf,
  ) => {
    let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

    if (tokens[idx].meta.subId > 0) {
      id += `:${tokens[idx].meta.subId}`;
    }

    return ` <a href="#fnref${id}" class="footnote-backref">↑</a>`;
  };

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addCollection("projects_en", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/en/projects/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date)),
  );
  eleventyConfig.addCollection("projects_fr", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/fr/projects/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date)),
  );

  eleventyConfig.addCollection("experiences_en", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/en/experiences/*.md"),
  );
  eleventyConfig.addCollection("experiences_fr", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/fr/experiences/*.md"),
  );

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
