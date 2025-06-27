# Basic JS Accordion

Offers a lean (2KB) no-dependency JS accordion feature.

Supports nested accordions, for the use case of an expanding menu, with expanding submenus.

Accordion target initializes in collapsed state.


## Usage


1. To define a trigger element (i.e. button) to toggle collapse / expansion of target (i.e. menu) add to the trigger attribute `data-accordion='#foo-target-id'`
```
<button data-accordion="#foo-target">Toggle</button>
```

2.  To the id-referenced target add `accordion-target` class.

```
<div id="foo-target" class='accordion-target'>...</div>
```

3. Include sources.

Install from NPM:

```
npm i halcyoninno/accordion
```

Include CSS and JS in project:
```
<script>
  import "@halcyoninno/accordion/src/accordion.js";
</script>
<style is:global>
  @import "@halcyoninno/accordion/src/accordion.css";
</style>
```

`accordion.js` will self-initialize on load, applying accordion behavior between trigger and target, adding additional classes `accordion-collapsed` and `accordion-expanded` to both the target and trigger elements.
