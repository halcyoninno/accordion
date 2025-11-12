# Basic JS Accordion

A lean (2KB) no-dependency JS accordion feature.

Supports nested accordions, for example, to build an expanding menu with expanding submenus.

Accordion target initializes in collapsed state. I built this to handle a specific menu feature but happy to offer additional customizations. Submit an issue.

## Usage

1. Include sources.

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

2. Define a trigger element (i.e. button) to toggle collapse / expansion of target (i.e. menu) add to the trigger attribute `data-accordion='#foo-target-id'`
```
<button data-accordion="#foo-target">Toggle</button>
```

3. Specify target by adding `accordion-target` class.

```
<div id="foo-target" class='accordion-target'>...</div>
```
  

---

`accordion.js` will self-initialize on load, applying accordion behavior between trigger and target, adding additional classes `accordion-collapsed` and `accordion-expanded` to both target and trigger.

You can control activation of accordion logic from CSS, for example to constrain it to a media query, via CSS variable `--accordion-state` set to `active` or `inactive`. Note, the package only checks this state on viewport change.