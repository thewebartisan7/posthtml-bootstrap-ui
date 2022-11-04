const {readdirSync, readFileSync, writeFileSync} = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const components = require('posthtml-component');
const markdownIt = require('posthtml-markdownit');
const anchor = require('markdown-it-anchor');
const markdownItToc = require('markdown-it-toc-done-right');
const beautify = require('posthtml-beautify');

// Lodash
const each = require('lodash/each');
const defaults = require('lodash/defaults');
const assignWith = require('lodash/assignWith');
const mergeWith = require('lodash/mergeWith');
const template = require('lodash/template');
const get = require('lodash/get');
const has = require('lodash/has');
const isObjectLike = require('lodash/isObjectLike');
const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const isBoolean = require('lodash/isBoolean');
const isUndefined = require('lodash/isUndefined'); // value === undefined
const isNull = require('lodash/isNull'); // value === null
const isNil = require('lodash/isNil'); // value == null
const uniqueId = require('lodash/uniqueId');
// end

const src = './docs-src/pages/';
const dist = './docs/';
const md = './docs-src';

const markdownPlugins = [
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
];

const options = {};

readdirSync(src).forEach(file => {
  if (file.endsWith('.html')) {
    const html = readFileSync(path.resolve(`${src}${file}`), 'utf-8');

    posthtml([
        markdownIt({
          root: md,
          plugins: markdownPlugins
        }),

        components({
          root: './docs-src',
          folders: ['components', 'layouts'],
          namespaces: {
            name: 'ui',
            root: './src'
          },
          strict: true,
          expressions: {
            locals: {
              title: 'PostHTML UI'
            }
          },
          utilities: {
            each,
            defaults,
            assign: assignWith,
            merge: mergeWith,
            template,
            get,
            has,
            isObject: isObjectLike,
            isArray,
            isEmpty,
            isBoolean,
            isUndefined,
            isNull,
            isNil,
            uniqueId
          }
        }),

        markdownIt({
          root: md,
          plugins: markdownPlugins
        }),

        beautify({
          rules: {
            indent: 2,
            blankLines: false,
            sortAttr: false
          }
        }),

        processCodeTags()
      ])
      .process(html, options)
      .then(result => {
        writeFileSync(path.resolve(`${dist}${file}`), result.html, 'utf-8');
      });
  }
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
            contentNode.content[i] = c.trim()
              // .replace(/(\r\n|\r|\n){2}/g, '$1') // Remove double new lines
              .replace(/(=&quot;&quot;)/g, ''); // Remove all empty attributes, e.g. primary="" => primary in x-tag
          });
        }

        return contentNode;
      });

      return node;
    });
  };
}
