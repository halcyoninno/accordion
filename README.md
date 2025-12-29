# Accordion effect (vanilla JS)

Minimal, dependency-free accordion behavior for any element pair you describe in JavaScript. The library attaches click handlers to your triggers, applies height transitions to the targets, and cleans itself up when a media query stops matching.

## Features
- Pure JavaScript, no markup requirements beyond element `id`s
- Optional media-query activation with automatic deactivation
- Supports nested accordions (menu/submenu scenarios)
- Starts expanded or collapsed per option
- Adds `expanded` / `collapsed` classes to both trigger and target for easy styling
- Customizable transition duration, easing, and click `preventDefault`

## Installation
```bash
npm install @halcyoninno/accordion
```

The source ships as an ES module. Import the module directly:
```js
import { accordionEffect } from '@halcyoninno/accordion/src/accordion.mjs';
```

Or load it with a module script tag in plain HTML:
```html
<script type="module">
  import { accordionEffect } from './src/accordion.mjs';
  // ... call accordionEffect below ...
</script>
```

## Quick start
Attach each trigger to a target element by `id` inside `relations`.
```html
<div id="faq-answer">
  <p>This panel expands and collapses.</p>
</div>
<button id="faq-toggle">Toggle FAQ</button>

<script type="module">
  import { accordionEffect } from './src/accordion.mjs';

  accordionEffect({
    relations: [
      { targetId: 'faq-answer', triggerId: 'faq-toggle' }
    ]
  });
</script>
```

## Media-query activated accordion
Only enable the accordion effect when a media query matches (for example, compress a nav on small screens). When the query stops matching, event listeners and inline styles are removed.
```js
accordionEffect({
  relations: [
    { targetId: 'nav-links', triggerId: 'nav-toggle' }
  ],
  options: {
    activationMediaQuery: '(max-width: 700px)',
    startCollapsed: true
  }
});
```

## Nested accordion example
```html
<div id="outer-panel">
  <p>Outer content</p>
  <div id="inner-panel">
    <p>Inner content</p>
  </div>
  <button id="inner-trigger">Toggle inner</button>
</div>
<button id="outer-trigger">Toggle outer</button>

<script type="module">
  import { accordionEffect } from './src/accordion.mjs';

  accordionEffect({
    relations: [
      { targetId: 'outer-panel', triggerId: 'outer-trigger' },
      { targetId: 'inner-panel', triggerId: 'inner-trigger' }
    ],
    options: {
      startCollapsed: true,
      transitionDuration: '.3s',
      easingFunction: 'ease-in-out'
    }
  });
</script>
```

## Options
All options are optional. Defaults are shown in parentheses.
- `activationMediaQuery` (`undefined`): CSS media query string. Only runs while it matches, removing listeners and styles when it does not.
- `startCollapsed` (`false`): Start all targets collapsed on initialization.
- `transitionDuration` (`'.5s'`): CSS duration for the height transition.
- `easingFunction` (`'ease'`): CSS timing function for the transition.
- `preventDefault` (`true`): Call `event.preventDefault()` on trigger clicks.

Each target and trigger receives `expanded`/`collapsed` classes as the accordion animates, so you can style them as needed.

## Notes on borders and padding
Animating height on an element with padding or borders can look off without a wrapper. If your target has padding, wrap it in a zero-padding container before applying the accordion effect to avoid layout surprises.
