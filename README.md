# Accordion Module

## Usage (Astro)

### Include source

In front matter:
```
import path from 'path'
import fs from 'fs'

// Accordion module JS and CSS
const accordionCss = fs.readFileSync(
  path.resolve('src/browser-js/accordion/accordion.css'), 'utf-8');
const accordionJs = fs.readFileSync(
  path.resolve('src/browser-js/accordion/accordion.js'), 'utf-8');

```

In `<head>`:
```
const accordionCss = fs.readFileSync(
  path.resolve('src/browser-js/accordion/accordion.css'), 'utf-8');
const accordionJs = fs.readFileSync(
  path.resolve('src/browser-js/accordion/accordion.js'), 'utf-8');
```

## Apply to elements:

Specify a trigger element with `data-accordion='#foo-target-id'` attribute, then
add `accordion-target` class to to the target
```
<button data-accordion="#foo-target">Toggle</button>
<div id="foo-target" class='accordion-target'>...</div>
```