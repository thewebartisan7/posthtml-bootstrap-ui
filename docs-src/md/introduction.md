$<toc{"containerId":"header-toc"}>

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
