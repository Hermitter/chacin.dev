const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

// Convert a string to a valid CSS name for Ids and Classes
function stringToCssString(text) {
  return text.replace(/[^a-z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    // " " -> "-"
    if (c == 32) return '-';
    // "A" -> "a"
    if (c >= 65 && c <= 90) return s.toLowerCase();
    // non-alphanumeric -> _Hexadecimal_
    return "";
  });
}

module.exports = ({ markdownAST }, pluginOptions) => {
  let ids = new Map();

  visit(markdownAST, "heading", node => {
    let { depth } = node

    // Specify targeted header tags
    if (depth !== 1 && depth !== 2) return

    // Grab the innerText of the heading node
    let text = toString(node);
    let text_id = stringToCssString(text);

    // Add counter to duplicate IDs
    if (ids.has(text)) {
      let count = ids.get(text) + 1;
      ids.set(text, count);
      text_id += `-${count}`;
    }
    else {
      ids.set(text, 0);
    }

    // Add header anchor
    const html = `
        <h${depth} id="${text_id}">
          <a href="#${text_id}">${text}</a>
        </h${depth}>
      `

    node.type = "html"
    node.children = undefined
    node.value = html
  });

  return markdownAST
}