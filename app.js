// Define a function to fetch the Markdown file
function fetchMarkdownFile() {
  return fetch('https://raw.githubusercontent.com/paulomorais1981/paulomorais1981.github.io/main/blog-post.md')
    .then(response => response.text())
    .then(text => parseMarkdownFile(text));
}

// Define a function to parse the YAML front matter and content of the Markdown file
function parseMarkdownFile(text) {
  const parts = text.split('---');
  const frontMatter = parts[1].trim();
  const content = parts.slice(2).join('---').trim();
  const data = YAML.parse(frontMatter);
  return { data, content };
}

// Define a function to render the Markdown content
function renderMarkdownContent({ data, content }) {
  const markdown = new markdownit();
  const html = markdown.render(content);
  const title = data.title || 'Untitled';
  const date = data.date || 'Unknown Date';
  const author = data.author || 'Unknown Author';
  const template = `
    <h1>${title}</h1>
    <p>${date} by ${author}</p>
    ${html}
  `;
  document.getElementById('content').innerHTML = template;
}

// Fetch the Markdown file and render the content
fetchMarkdownFile().then(renderMarkdownContent);
