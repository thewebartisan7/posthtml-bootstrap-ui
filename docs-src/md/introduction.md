$<toc{"containerId":"header-toc"}>

## Installation

```bash
npm i -D posthtml-bootstrap-ui
```

If you want to publish all Boostrap UI components in your project, so without using the `ui` namespace then run below command.

```bash
npm explore posthtml-bootstrap-ui -- npm run publish
```

All components will be copied inside `src/components` and `src/layouts` without the `ui` namespace.

See also the [starter template here](https://github.com/thewebartisan7/posthtml-bootstrap-ui-starter).

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

**NOTE**

The components documentation show always the code example without the `ui` namespace.
If you didn't publish the ui as explained in installation, then you have to use the `ui` namespace.
For example the alert component would be:

```html
<x-ui::alert type="danger">
  Hi, there! I'm an alert type danger component.
</x-ui::alert>
```
