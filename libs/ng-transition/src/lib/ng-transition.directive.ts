import { NgIfContext } from '@angular/common';
import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AnimationFrameRef, GetComputedStyleRef, TimeoutRef } from 'ng-refs';

import { transitionClasses } from './transition-classes';

@Directive({
  selector: '[ngTransition]'
})
export class NgTransitionDirective<T = unknown> implements OnInit {
  private _context: NgIfContext<T> = new NgIfContext<T>();
  private _init = false;
  private _transitioning = false;

  private _ngTransitionEnter: string[] = [];
  private _ngTransitionEnterStart: string[] = [];
  private _ngTransitionEnterEnd: string[] = [];
  private _ngTransitionLeave: string[] = [];
  private _ngTransitionLeaveStart: string[] = [];
  private _ngTransitionLeaveEnd: string[] = [];

  constructor(
    private readonly animationFrameRef: AnimationFrameRef,
    private readonly getComputedStyleRef: GetComputedStyleRef,
    private readonly timeoutRef: TimeoutRef,
    private readonly _viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this._init = true;
    this._updateView(true);
  }

  @Input()
  set ngTransition(condition: T) {
    this._context.$implicit = this._context.ngIf = condition;
    this._updateView();
  }

  @Input()
  set ngTransitionEnter(ngTransitionEnter: string) {
    this._ngTransitionEnter = ngTransitionEnter.split(' ');
  }

  @Input()
  set ngTransitionEnterStart(ngTransitionEnterStart: string) {
    this._ngTransitionEnterStart = ngTransitionEnterStart.split(' ');
  }

  @Input()
  set ngTransitionEnterEnd(ngTransitionEnterEnd: string) {
    this._ngTransitionEnterEnd = ngTransitionEnterEnd.split(' ');
  }

  @Input()
  set ngTransitionLeave(ngTransitionLeave: string) {
    this._ngTransitionLeave = ngTransitionLeave.split(' ');
  }

  @Input()
  set ngTransitionLeaveStart(ngTransitionLeaveStart: string) {
    this._ngTransitionLeaveStart = ngTransitionLeaveStart.split(' ');
  }

  @Input()
  set ngTransitionLeaveEnd(ngTransitionLeaveEnd: string) {
    this._ngTransitionLeaveEnd = ngTransitionLeaveEnd.split(' ');
  }

  private _updateView(isFirst = false) {
    if (!this._init) {
      return;
    }
    if (this._transitioning) {
      return;
    }
    const show = this._context.$implicit;
    if (isFirst) {
      this.setTargetElementDisplay(show ? '' : 'none');
    } else if (show) {
      this.show();
    } else {
      this.hide();
    }
  }

  private show(): void {
    this._transitioning = true;
    this.setTargetElementDisplay('');
    transitionClasses(
      this.animationFrameRef,
      this.getComputedStyleRef,
      this.timeoutRef,
      this.getTargetElement(),
      this._ngTransitionEnter,
      this._ngTransitionEnterStart,
      this._ngTransitionEnterEnd,
      () => {
        if (this._context.$implicit) {
          this._transitioning = false;
        } else {
          this.hide();
        }
      }
    );
  }

  private hide(): void {
    this._transitioning = true;
    transitionClasses(
      this.animationFrameRef,
      this.getComputedStyleRef,
      this.timeoutRef,
      this.getTargetElement(),
      this._ngTransitionLeave,
      this._ngTransitionLeaveStart,
      this._ngTransitionLeaveEnd,
      () => {
        this.setTargetElementDisplay('none');
        if (this._context.$implicit) {
          this.show();
        } else {
          this._transitioning = false;
        }
      }
    );
  }

  private getTargetElement(): HTMLElement {
    return this._viewContainer?.element?.nativeElement ?? null;
  }

  private setTargetElementDisplay(value: string): void {
    const targetElement = this.getTargetElement();
    if (targetElement?.style) {
      targetElement.style.display = value;
    }
  }
}
