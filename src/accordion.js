


function declareAccordions({relations, options}) {

  initializeCSS(relations, options);

  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded; binding accordion elements")
    relations.forEach(({targetId, triggerId}) => {
        console.log(`attempting to bind ${targetId} to ${triggerId}`)
        const targetEl = document.getElementById(targetId);
        if (!targetEl) {
          console.error(`target id ${targetId} not found`);
          return;
        }
        const triggerEl = document.getElementById(triggerId);
        if (!triggerEl) {
          console.error(`trigger id ${triggerId} not found`);
          return;
        } 
        bindToggleAction(targetEl, triggerEl, options.initialState);
      });
  });
}

function initializeCSS(
  relations, 
  {
    activationMediaQuery, 
    initialState = "expanded",
    transitionDuration = '.25s',
    easingFunction = 'ease'
  }
) {

  const targetsSelector = relations.map(r => "#" + r.targetId).join(",");

  addStyleElementToHead(
    `
      ${targetsSelector} {
        overflow: clip;
        transition: 
          height ${transitionDuration} ${easingFunction},
          padding-block ${transitionDuration} ${easingFunction},
          border-block-width ${transitionDuration} ${easingFunction}
          ; 
      }
    `,
    activationMediaQuery
  );

  // To avoid a potential flash of visibility on page load,
  // if targets initialized in collapsed state, we must install
  // temporary interim style before elements instantiated, then
  // replace with per-element styling once they exist.
  if (initialState === "collapsed") {
    const interimStyle = addStyleElementToHead(
      `
        ${targetsSelector} {
            height: 0;
            padding-block: 0;
            border-block-width: 0;
        }
      `,
      activationMediaQuery
    );
    document.addEventListener('DOMContentLoaded', () => {

      relations.forEach(r => {
        const target = document.getElementById(r.targetId);
        setCollapsedStyle(target);
      })

      interimStyle.remove();
    })
  }

}

function setCollapsedStyle(target) {
  target.style.height = "0px";
  target.style.paddingBlock = "0px";
  target.style.borderBlockWidth = "0px";
}

function addStyleElementToHead(css, activationMediaQuery) {
  const styleEl = document.createElement('style');
  if (activationMediaQuery) {
    css = `${activationMediaQuery} {
      ${css}
    }`
  }
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  return styleEl;
}



function bindToggleAction(target, trigger, initialState) {

  if (!target._accordionActions) {

    target._accordionActions = {
      "state" : initialState,
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

  target.classList.add(initialState);

}


function expand(target){
  console.log("starting expand");
  target.classList.remove('collapsed');

  // Temporarily style as expanded, and trigger layout flush, 
  // to measure expanded height
  target.style.height = 'auto';
  const expandedHeight = target.offsetHeight + "px"; /* flush */
  console.log(`measured expanded height as ${expandedHeight}`)

  // Revert to collapsed style, still in same render frame
  setCollapsedStyle(target);

  // Traverse separation boundary to trigger transition
  requestAnimationFrame(() => {

    // Animation requires explicit numerical height value; can't transition
    // height from 0 --> auto
    target.style.height = expandedHeight;

    // Since `auto` doesn't apply to these, can merely clear to generate new
    // numerical value
    target.style.paddingBlock = '';
    target.style.borderBlockWidth = '';
  });

  // When animation complete clear element-level to re-enable the consumer's
  // rule.
  //
  // TODO: we may wish to backup a previous element-level value to support that
  // edge case.
  target.addEventListener('transitionend', function te(){
    // target.style.height = '';
    target.removeEventListener('transitionend', te);
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

    // TODO: added expanded, collapsed

    target.removeEventListener('transitionend', te);
  });
}



