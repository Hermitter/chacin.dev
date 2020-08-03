const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/carlos/Desktop/personal/chacin.dev/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/carlos/Desktop/personal/chacin.dev/src/pages/404.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("/home/carlos/Desktop/personal/chacin.dev/src/pages/about.js"))),
  "component---src-pages-blog-js": hot(preferDefault(require("/home/carlos/Desktop/personal/chacin.dev/src/pages/blog.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/carlos/Desktop/personal/chacin.dev/src/pages/index.js"))),
  "component---src-templates-blog-template-js": hot(preferDefault(require("/home/carlos/Desktop/personal/chacin.dev/src/templates/blog_template.js")))
}

