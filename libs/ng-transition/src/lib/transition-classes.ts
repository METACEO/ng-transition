//
// Original source/logic comes from the `utils.js` file of the Alpine.js project:
// https://github.com/alpinejs/alpine/blob/master/src/utils.js
//

interface Stages {
  start: () => void;
  during: () => void;
  show: () => void;
  end: () => void;
  hide: () => void;
  cleanup: () => void;
}

export function transitionClasses(el: HTMLElement,
                                  classesDuring: string[],
                                  classesStart: string[],
                                  classesEnd: string[],
                                  hook1: (...unknown) => unknown,
                                  hook2: (...unknown) => unknown) {
  transition(el, {
    start() {
      el.classList.add(...classesStart);
    },
    during() {
      el.classList.add(...classesDuring);
    },
    show() {
      hook1();
    },
    end() {
      el.classList.remove(...classesStart);
      el.classList.add(...classesEnd);
    },
    hide() {
      hook2();
    },
    cleanup() {
      el.classList.remove(...classesDuring);
      el.classList.remove(...classesEnd);
    }
  });
}

export function transition(el: HTMLElement,
                           stages: Stages) {
  stages.start();
  stages.during();

  requestAnimationFrame(() => {
    // Note: Safari's transitionDuration property will list out comma separated
    // transition durations for every single transition property. Let's grab the
    // first one and call it a day.
    const { transitionDuration } = getComputedStyle(el);
    const durationString = transitionDuration.replace(/,.*/, '').replace('s', '');
    const duration = Number(durationString) * 1000;

    stages.show();

    requestAnimationFrame(() => {
      stages.end();

      setTimeout(() => {
        stages.hide();

        // Adding an "isConnected" check, in case the callback
        // removed the element from the DOM.
        if (el.isConnected) {
          stages.cleanup();
        }
      }, duration);
    });
  });
}
