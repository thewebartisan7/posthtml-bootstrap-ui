[![NPM][npm]][npm-url]
[![Coverage][cover]][cover-badge]
[![XO code style][style]][style-url]

<div align="center">
  <img width="300" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  <h1>PostHTML UI </h1>
  <p>A PostHTML UI using X Components plugin and Bootstrap. For now just for testing and demo purpose of X Components plugin, in future maybe something more.</p>
</div>

## Installation

```bash
npm i -D posthtml-bootstrap-ui
```

## Introduction

The PostHTML Bootstrap UI is a set of components made with [PostHTML X Components plugin](https://github.com/thewebartisan7/posthtml-components).

The components are designed to render Bootstrap components out-of-the-box, meaning you just write x-components syntax by passing props and it will be processed to a fully working HTML markup for Boostrap.

To give you a practical introduction example, let's look at the way how a few Bootstrap component can be rendered.

```html
<x-alert type="danger">
  Hi, there! I'm an alert type danger component.
</x-alert>
```

Output:

```html
<div class="alert alert-danger" role="alert">
    Hi, there! I'm an alert type danger component.     
</div>
```

## Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

[npm]: https://img.shields.io/npm/v/posthtml-ui.svg
[npm-url]: https://www.npmjs.com/package/posthtml-ui

[style]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[style-url]: https://github.com/sindresorhus/xo

[cover]: https://coveralls.io/repos/thewebartisan7/posthtml-ui/badge.svg?branch=main
[cover-badge]: https://coveralls.io/r/thewebartisan7/posthtml-ui?branch=main
