var tagsToReplace = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "\n": "<br />;"
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safeReplaceTag(str) {
    return str.replace(/[&<>]/g, replaceTag);
}
