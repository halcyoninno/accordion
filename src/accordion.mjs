

/**
 * list of trigger --> accordion target mappings
 */
let relations;

let options = {
    activationMediaQuery: undefined, 
    startCollapsed: false,
    transitionDuration: '.5s',
    easingFunction: 'ease',
    preventDefault: true
  }

export function accordionEffect(config) {
  relations = config.relations;

  if (config.options) {
      options = {
          ...options,
          ...config.options
      };
  }

  if(options.activationMediaQuery) {
  
    // Conditionally activate based on media query 
    const mq = window.matchMedia(options.activationMediaQuery);
    if (mq.matches) {
      activate();
    }
    mq.addEventListener('change', () => {
      if (mq.matches) {
        activate();
      } else {
        deactivate();
      }
    })
  } else {
    activate();
  }
}

function activate() {
  installCSS();

  const doActivation = () => {
    relations.forEach(({targetId, triggerId}) => {
      const targetEl = document.getElementById(targetId);
      const triggerEl = document.getElementById(triggerId);
      bindToggleAction(targetEl, triggerEl);
      if (options.startCollapsed) {
        targetEl.style.height = "0px";
      }
    });
  }  

  if (document.readyState === "loading") {   
    
    // If DOM still loading, defer
    var interimStyleEl = options.startCollapsed? installInterimCSS() : null; 
    document.addEventListener('DOMContentLoaded', () => {
      doActivation();
      interimStyleEl?.remove();
    })

  } else {
    doActivation();
  }
}

/**
 * Installs interim CSS so the accordion targets initialize to the correct state,
 * before we have time to find them and apply element-level styling (if collapsed)
 * 
 * @returns a <style> element the caller is responsible for cleaning up.
 */
function installInterimCSS() {
  return addStyleElementToHead(
      `
        ${targetsSelector(relations)} {
            height: 0;
        }
      `
    );
}

function installCSS() {
  addStyleElementToHead(
    `
      ${targetsSelector()} {
        overflow: clip;
        transition: 
          height ${options.transitionDuration} ${options.easingFunction}; 
      }
    `
  );
}

function targetsSelector() {
  return relations.map(r => "#" + r.targetId).join(",");
}

function addStyleElementToHead(css) {
  const styleEl = document.createElement('style');
  styleEl.dataset.accordionCss = "";
  if (options.activationMediaQuery) {
    css = `@media ${options.activationMediaQuery} {
      ${css}
    }`
  }
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  return styleEl;
}

function bindToggleAction(target, trigger) {
  if (!target._accordion) {

    const accordion = {  
      trigger,
      toggle(e) {
        if(options.preventDefault) {
          e?.preventDefault();
        }      
        if (target.classList.contains("collapsed")) {
          expand(target);
        } else {
          collapse(target);
        }
      },
      unbind() {
        trigger.removeEventListener('click', target._accordion.toggle);
        delete target._accordion;
      },
      addClass(c) {
        target.classList.add(c);
        trigger.classList.add(c);
      },
      removeClass(c) {
        target.classList.remove(c);
        trigger.classList.remove(c);
      }
    }
    target._accordion = accordion;
    trigger._accordion = accordion;
    trigger.addEventListener('click', target._accordion.toggle);
    target.classList.add(options.startCollapsed? "collapsed" : "expanded");
  }
}

function expand(target){

  target._accordion.removeClass('collapsed');

  // Temporarily style as expanded, and trigger layout flush, 
  // to measure expanded height
  target.style.height = 'auto';
  const expandedHeight = target.offsetHeight + "px"; /* flush */
  target.style.height = "0px";  // revert

  // Traverse separation boundary to trigger transition
  requestAnimationFrame(() => {
    target.style.height = expandedHeight;
  });

  target.addEventListener('transitionend', function te(){
    target.style.height = ''; // revert back to `auto`
    target._accordion.addClass('expanded');
    target.removeEventListener('transitionend', te);
  });
}

function collapse(target){
  target._accordion.removeClass('expanded');
  target.style.height = target.offsetHeight + 'px';
  requestAnimationFrame(() => target.style.height = '0px');
  target.addEventListener('transitionend', function te(){
    target._accordion.addClass('collapsed');
    target.removeEventListener('transitionend', te);
  });
}

function deactivate() {
  relations.forEach(r => {
    const target = document.getElementById(r.targetId);
    target.style.height = "";
    target._accordion?.unbind();
  })
  document.querySelectorAll('style[data-accordion-css]').forEach(e => e.remove());
}



