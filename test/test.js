'use strict';

const test = require('ava');
const posthtml = require('posthtml');
const components = require('posthtml-component');
const clean = html => html.replace(/(\n|\t)/g, '').trim();

const options = {
  root: './src',
  folders: ['components', 'layouts']
};

test('Must process modal', async t => {
  const actual = `<div>Modal</div>`;
  const expected = `<div>Modal</div>`;

  const html = await posthtml([components(options)])
    .process(actual)
    .then(result => clean(result.html));

  t.is(html, expected);
});
