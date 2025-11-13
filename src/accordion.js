
function listenOnce(target, event, handler) {
  target.addEventListener(event, function _handler(e) {
    handler(e)
    target.removeEventListener(event, _handler);
  });
}

function collapse(target){
  console.log("expand");
  target.style.height = target.offsetHeight + 'px'; // lock current height
  target.classList.add('anim');
  requestAnimationFrame(() => target.style.height = '0px');
  target.addEventListener('transitionend', function te(){
    target.hidden = true;
    target.classList.remove('anim');
    target.style.height = '';
    target.removeEventListener('transitionend', te);
  });
}

function expand(target){
  console.log("collapse");
  target.hidden = false;
  const h = target.offsetHeight;           // measure
  target.style.height = '0px';
  target.classList.add('anim');
  requestAnimationFrame(() => {
    target.style.height = h + 'px';            // animate to measured height
  });
  target.addEventListener('transitionend', function te(){
    target.classList.remove('anim');
    target.style.height = '';                  // cleanup → back to auto
    target.removeEventListener('transitionend', te);
  });
}

function bindToggleAction(trigger, target) {

  // responsive CSS can disable accordion via --accordion-disabled 
  // applied to target
  // TODO: check if necessary
  const enabled = getComputedStyle(target)
    .getPropertyValue("--accordion-disabled") !== "true";

  if (!enabled) {
    console.log("disabled via CSS rule", target);
  }

  // Add accordion methods to element instance
  if (!target._accordionActions) {

    target._accordionActions = {
      "state" : "collapsed",
      toggle() {
        console.log("toggle");
        if (this.state === "collapsed") {
          expand(target);
          this.state = "expanded";
        } else {
          collapse(target);
          this.state = "collapsed";
        }
      }
    }

    trigger.addEventListener('click', () => target._accordionActions.toggle());
  }
}

// Automatically install accordions

function createAccordions() {
  document.querySelectorAll('[data-accordion]').forEach(accordion => {
    const triggerId = accordion.dataset.trigger;
    let triggerEl;
    if (triggerId && 
      (triggerEl = document.getElementById(triggerId))) {
      console.log("wiring accordion to trigger", accordion, triggerEl)
      bindToggleAction(triggerEl, accordion);
    } 
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createAccordions();
});

window.addEventListener('resize', () => {
  createAccordions();
});

const style = document.createElement('style');
style.textContent = `
  [data-accordion].collapsed {
    overflow: clip;
  }
  [data-accordion].anim {
    transition: height .25s ease; 
  }
`;
document.head.appendChild(style);

