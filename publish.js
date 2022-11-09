/**
 * Publish components in the project by removing the "ui" namespace.
 *
 * Run using:
 * npm run publish
 *
 * or from a project:
 * npm explore posthtml-bootstrap-ui -- npm run publish
 */

const {existsSync, readFileSync, writeFileSync, mkdirSync, promises} = require('fs');
const path = require('path');
const posthtml = require('posthtml');

const src = path.resolve('./src/');
const dist = path.resolve('../../src/');

if (!existsSync(dist)) {
  mkdirSync(dist);
}

readdirRecursive(src).then(files => {
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const html = readFileSync(path.resolve(file), 'utf-8');

      posthtml([
        removeNamespaces()
      ])
        .process(html)
        .then(result => {
          const filePath = file.replace(src, dist);

          promises.mkdir(path.dirname(filePath), {recursive: true}).then(() => {
            writeFileSync(filePath, result.html, 'utf-8');
          });
        });
    }
  });
});

function removeNamespaces() {
  return function (tree) {
    tree.match({tag: new RegExp(`^x-ui::`, 'i')}, node => {
      if (node.tag) {
        node.tag = node.tag.replace('x-ui::', 'x-');
      }

      return node;
    });
  };
}

async function readdirRecursive(dir) {
  const files = await promises.readdir(dir, {withFileTypes: true});

  const paths = files.map(async file => {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      return readdirRecursive(filePath);
    }

    return filePath;
  });

  return (await Promise.all(paths)).flat(Number.POSITIVE_INFINITY);
}
