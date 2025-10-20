import EleventyPluginOgImage from "eleventy-plugin-og-image";
import markdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import fs from "fs";
import i18n from "eleventy-plugin-i18n/i18n.js";

/** @param { import('@11ty/eleventy/src/UserConfig').default } eleventyConfig */
export default async function (eleventyConfig) {
  // Add environment variable as global data
  eleventyConfig.addGlobalData("isProduction", process.env.NODE_ENV === 'production');
  
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
        {
          name: "Instrument",
          data: fs.readFileSync(
            "src/assets/fonts/Instrument/InstrumentSerif-Regular.ttf",
          ),
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
  }).use(markdownItLinkAttributes, {
    matcher(href) {
      return href.startsWith("http");
    },
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  });

  eleventyConfig.setLibrary("md", markdownLib);

  // Truncate helper for OG image text
  eleventyConfig.addFilter("ogTruncate", (value, max = 104) => {
    if (!value) return "";
    const s = String(value).replace(/\s+/g, " ").trim();
    if (s.length <= max) return s;
    return s.slice(0, max).replace(/\s+\S*$/, "") + "…";
  });

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
