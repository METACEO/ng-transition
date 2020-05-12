# ng-transition

> Transition elements via classes like you would in the Vue and Alpine.js libraries.

Click [here](https://ng-transition.herokuapp.com/) for a demo app, via Heroku. You can also find the code of this demo in the `apps/ng-transition-demo` folder of this repository.

## Install

Download `ng-transition` into your Angular project via [NPM](https://www.npmjs.com/package/ng-transition) or [Yarn](https://yarnpkg.com/package/ng-transition):

```shell script
# NPM
npm install ng-transition

# Yarn
yarn add ng-transition
```

## Basic Use

Similar to the modal example found in this repository's demo app, an example modal in your code may look something like the below snippet.

The below is a mixture of custom classes and TailwindCSS utilities. Your transition classes can be totally customized in your CSS or SCSS files, or they can be utility functions like our example.

```html
<!-- We want the entire container to wait to hide before leaving,  -->
<!-- therefore we will specify a `ngTransitionLeave` value that is -->
<!-- also tied to the `openedModal` value.                         -->
<div
  class="modal-container"
  [ngTransition]="openedModal"
  ngTransitionEnter="duration-300"
  ngTransitionLeave="duration-200"
>
  <div
    class="modal-backdrop"
    [ngTransition]="openedModal"
    ngTransitionEnter="ease-out duration-300"
    ngTransitionEnterStart="opacity-0"
    ngTransitionEnterEnd="opacity-100"
    ngTransitionLeave="ease-in duration-200"
    ngTransitionLeaveStart="opacity-100"
    ngTransitionLeaveEnd="opacity-0"
  >
    <div class="modal-backdrop-mask"></div>
  </div>

  <div
    class="modal-content"
    [ngTransition]="openedModal"
    ngTransitionEnter="ease-out duration-300"
    ngTransitionEnterStart="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    ngTransitionEnterEnd="opacity-100 translate-y-0 sm:scale-100"
    ngTransitionLeave="ease-in duration-200"
    ngTransitionLeaveStart="opacity-100 translate-y-0 sm:scale-100"
    ngTransitionLeaveEnd="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    ...
  </div>
</div>
```

## Angular Universal

Depending on the Alpine.js source directly resulted in errors when rendering Angular server-side. Find the example server module in the `apps/ng-transition-demo/src/app` folder to see how we replace problematic browser APIs with server-side friendly implementations via the `ng-refs` package.

**If you see the below error when rendering Angular server-side, find our Dependency Injection solution in the aforementioned folder.**

![Angular Universal error with requestAnimationFrame](https://raw.githubusercontent.com/METACEO/ng-transition/master/README-ssr-browser-api-errors.jpg)
