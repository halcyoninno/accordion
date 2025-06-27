  

function listenOnce(target, event, handler) {
  target.addEventListener(event, function _handler(e) {
    handler(e)
    target.removeEventListener(event, _handler);
  });
}

/**
 * Make a clickable trigger element toggle the vertical
 * collapse and expansion of a visible DOM element target
 */
function createAccordion(trigger, target) {

  // Target starts hidden via 'display: none' however we want
  // to switch to hiding via `max-height`
  target.style.display = 'block'
  target.style.maxHeight = '0px'
  
  trigger.classList.add('accordion-collapsed')
  target.classList.add('accordion-collapsed')

  trigger.addEventListener('click', () => {

    const currentHeight = target.offsetHeight
    const isCollapsed = currentHeight == 0

    if (isCollapsed) {
      trigger.classList.replace('accordion-collapsed', 'accordion-expanded')
      target.classList.replace('accordion-collapsed', 'accordion-expanded')

      // Set max-height aligned with fully displayed height
      // (scrollHeight)
      target.style.maxHeight = `${target.scrollHeight}px`

      // Once transition finished, remove max-height to facilitate
      // further expansion due to child resizing 
      listenOnce(target, 'transitionend', () => {
        target.style.maxHeight = '';
      })

    } else {
      trigger.classList.replace('accordion-expanded', 'accordion-collapsed')
      target.classList.replace('accordion-expanded', 'accordion-collapsed')

      // Lock the max-height again before commencing reverse
      // transition
      target.style.maxHeight = `${currentHeight}px`

      requestAnimationFrame(() => {
        target.style.maxHeight = '0px'
      })
    }
  });
}

// Automatically install accordions
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-accordion-trigger]').forEach(target => {
    const triggerId = target.dataset.accordionTrigger;
    const trigger = document.getElementById(triggerId)
    createAccordion(trigger, target);
  });
});
