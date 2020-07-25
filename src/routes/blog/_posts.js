const fs = require("fs");
const cwd = process.cwd();
const path = require("path");
const hljs = require("highlight.js");
const formatDate = require("date-fns/format");
const matter = require("gray-matter");
const readingTime = require("reading-time");
const { Remarkable } = require("remarkable");

let md = new Remarkable({
  html: true,

  // Code Blocks Highlighting
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return "";
  },
});

// Post vars
let posts = [];
const POSTS_DIR = path.join(cwd, "posts/");
const EXCERPT_SEPARATOR = "<!-- more -->";

// Populate posts
posts = fs
  .readdirSync(POSTS_DIR)
  // Only accept folder
  .filter((fileName) => fs.lstatSync(POSTS_DIR + "/" + fileName).isDirectory())
  // Read .md file from each folder
  .map((dirName) => {
    const postDirPath = POSTS_DIR + dirName;
    const mdFileName = fs
      .readdirSync(postDirPath)
      .find((fileName) => fileName === "post.md");
    const mdContent = fs.readFileSync(
      path.join(POSTS_DIR, dirName, mdFileName),
      "utf8"
    );

    // Get post's information
    const { data, content: rawContent } = matter(mdContent);
    const { title, poster, keywords, frontCover, date, description } = data;
    const slug = dirName;
    let content = rawContent;
    let excerpt = "";

    if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
      const splittedContent = rawContent.split(EXCERPT_SEPARATOR);
      excerpt = splittedContent[0];
      content = splittedContent[1];
    }

    // Set remaining metadata
    const finalPoster = poster
      ? "posts/" + dirName + "/" + poster
      : "default-poster.png";
    const finalFrontCover = frontCover
      ? "../posts/" + dirName + "/" + frontCover
      : undefined;
    const finalKeywords = keywords;
    const html = md.render(content);
    const readingStats = readingTime(content);
    const printReadingTime = readingStats.text;
    const printDate = formatDate(new Date(date), "MMMM d, yyyy");

    return {
      title: title || slug,
      poster: finalPoster,
      frontCover: finalFrontCover,
      keywords,
      description,
      slug,
      html,
      date,
      excerpt,
      printDate,
      printReadingTime,
    };
  });

posts.forEach((post) => {
  post.html = post.html.replace(/^\t{3}/gm, "");
});

// sort posts by newest release
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default posts;
