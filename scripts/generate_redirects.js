/*
  Generate HTML redirect pages for every file in /files so that:
  - /r/<basename> -> /files/<filename>
  - /r/<filename> -> /files/<filename>

  Outputs files into /r as Jekyll-processed HTML with front matter permalinks.
*/

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const filesDir = path.join(repoRoot, 'files');
const redirectsDir = path.join(repoRoot, 'r');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function makeRedirectHtml({ permalink, targetUrl, title = 'Redirecting…' }) {
  return `---\nlayout: default\ntitle: ${title}\npermalink: ${permalink}\n---\n\n<meta http-equiv="refresh" content="0; url=${targetUrl}">\n<script>setTimeout(function(){ location.href='${targetUrl}'; }, 150);</script>\n<p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>…</p>\n`;
}

function main() {
  ensureDir(redirectsDir);

  if (!fs.existsSync(filesDir)) {
    console.error('files/ directory not found at', filesDir);
    process.exit(1);
  }

  const entries = fs.readdirSync(filesDir, { withFileTypes: true });
  const files = entries.filter(e => e.isFile());

  let count = 0;
  for (const f of files) {
    const filename = f.name; // e.g., teslapolicy.pdf
    const basename = filename.replace(/\.[^.]+$/, '');
    const targetUrl = `/files/${filename}`;

    // /r/<basename>
    const noExtOutPath = path.join(redirectsDir, `${basename}.html`);
    const noExtPermalink = `/r/${basename}`; // no trailing slash
    const noExtHtml = makeRedirectHtml({ permalink: noExtPermalink, targetUrl });
    fs.writeFileSync(noExtOutPath, noExtHtml, 'utf8');
    count++;

    // /r/<filename>
    const withExtOutPath = path.join(redirectsDir, `${filename}.html`);
    const withExtPermalink = `/r/${filename}`; // exact filename alias
    const withExtHtml = makeRedirectHtml({ permalink: withExtPermalink, targetUrl });
    fs.writeFileSync(withExtOutPath, withExtHtml, 'utf8');
    count++;
  }

  console.log(`Generated ${count} redirect pages in /r for ${files.length} files.`);
}

main();


