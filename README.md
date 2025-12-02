# Basic JS Accordion

A pure-JS, media-query activated accordion feature.

No need to clutter your html with semantically-irrelevant markup; express the accordion effect in JS.

Useful for nav components that should compress into an accordion at a media-query threshold.

## Usage

```
<html>
  <head>
    <title>Accordion example</title>
    <script src="./src/accordion.js">
    </script>
    <script>
      
      accordionEffect({
        relations: [
          {
            targetId: "menu-items",
            triggerId: "toggle-button"
          }
        ]
      });
```

### Pass media-query and other options
```
      accordionEffect({
        relations: [
          {
            targetId: "menu-items",
            triggerId: "toggle-button"
          }
        ]
      });
```

## Note on border and padding

It is not trivial to implement accordion effect on a target having border and padding without adding a wrapper element to the DOM (it would require separately animating border and padding in sequence with the main content -- costly and brittle).

**If the target box has padding, this package relies on the user to wrap it in a zero-padding div** to avoid potentially breaking caller's CSS rules with an unexpected dynamically added wrapper. 