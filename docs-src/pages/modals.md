## Default

```html
<x-modal id="myModal">
  <x-modal.header>
    <h5 class="modal-title" id="myModalLabel">Modal title</h5>
  </x-modal.header>

  <x-modal.body>
    Modal body text goes here.
  </x-modal.body>

  <x-modal.footer></x-modal.footer>
</x-modal>
```

## Customize with props

```html
<x-modal
  id="myModal"
  backdrop="true"
  keyboard="true"
  scrollable="false"
  centered="true"
  size="lg"
  fullscreen="lg"
  aware:close="false"
>
  <x-modal.header>
    <h5 class="modal-title" id="myModalLabel">Modal title</h5>
  </x-modal.header>

  <x-modal.body>
    ...
  </x-modal.body>

  <x-modal.footer></x-modal.footer>
</x-modal>
```

## Using slots

```html
<x-modal id="myModal">
  <fill:header>
    <h5 class="modal-title" id="myModalLabel">Modal title</h5>
  </fill:header>

  <fill:body>
    Modal body text goes here.
  </fill:body>

  <fill:footer></fill:footer>
</x-modal>
```
