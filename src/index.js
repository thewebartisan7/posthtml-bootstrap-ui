const {readdirSync, readFileSync, writeFileSync} = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const components = require('posthtml-component');
const beautify = require('posthtml-beautify');
const anchor = require('markdown-it-anchor');
const markdownIt = require('posthtml-markdownit');
const markdownItToc = require('markdown-it-toc-done-right');

const src = './src/pages/';
const dist = './docs/';
const md = './src/md';

const plugins = [
  components({
    root: './src',
    folders: ['components', 'layouts'],
    strict: true,
    expressions: {
      locals: {
        title: 'PostHTML UI'
      }
    }
  }),

  markdownIt({
    root: md,
    plugins: [
      {
        plugin: anchor,
        options: {
          level: [1, 2, 3],
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'before'
          })
        }
      },
      {
        plugin: markdownItToc,
        options: {
          level: [1, 2, 3],
          containerClass: 'h-100 flex-column align-items-stretch ps-4 p-3 bg-white rounded-3 doc-shadow',
          containerId: 'header-toc',
          listClass: 'nav flex-column',
          itemClass: 'nav-item',
          linkClass: 'nav-link',
          listType: 'ul'
        }
      }
    ]
  }),

  beautify({
    rules: {
      indent: 2,
      blankLines: false,
      sortAttr: false
    }
  }),

  processCodeTags()
];

const options = {};

readdirSync(src).forEach(file => {
  const html = readFileSync(path.resolve(`${src}${file}`), 'utf-8');

  posthtml(plugins)
    .process(html, options)
    .then(result => {
      writeFileSync(path.resolve(`${dist}${file}`), result.html, 'utf-8');
    });
});

function processCodeTags() {
  return function (tree) {
    tree.match({tag: 'pre'}, node => {
      if (!Array.isArray(node.content)) {
        return node;
      }

      node.content = node.content.map(contentNode => {
        if (typeof contentNode === 'string') {
          contentNode = '';
        } else if (contentNode.tag === 'code' && contentNode.attrs?.class?.startsWith('language-') && Array.isArray(contentNode.content)) {
          contentNode.content.forEach((c, i) => {
            contentNode.content[i] = c.trim();
          });
        }

        return contentNode;
      });

      return node;
    });
  };
}
