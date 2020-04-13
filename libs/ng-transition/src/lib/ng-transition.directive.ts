import { NgIfContext } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { transitionClasses } from './transition-classes';

const NOOP = () => void 0;

@Directive({
  selector: '[ngTransition]'
})
export class NgTransitionDirective<T = unknown> implements OnInit {
  private _context: NgIfContext<T> = new NgIfContext<T>();
  private _init = false;
  private _thenTemplateRef: TemplateRef<NgIfContext<T>> | null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<T>> | null = null;

  private _ngTransitionEnter: string[] = [];
  private _ngTransitionEnterStart: string[] = [];
  private _ngTransitionEnterEnd: string[] = [];
  private _ngTransitionLeave: string[] = [];
  private _ngTransitionLeaveStart: string[] = [];
  private _ngTransitionLeaveEnd: string[] = [];

  constructor(
    private readonly _viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<NgIfContext<T>>
  ) {
    this._thenTemplateRef = templateRef;
  }

  ngOnInit(): void {
    this._init = true;
    this._updateView();
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

  private _updateView() {
    if (!this._init) {
      return;
    }
    if (this._context.$implicit) {
      this.show();
    } else {
      this.hide();
    }
  }

  private show(): void {
    if (!this._thenTemplateRef) {
      return;
    }
    if (this._thenViewRef) {
      this._thenViewRef.destroy();
      this._thenViewRef = null;
    }
    this._thenViewRef = this._viewContainer.createEmbeddedView(
      this._thenTemplateRef,
      this._context
    );
    transitionClasses(
      this._thenViewRef.rootNodes[0],
      this._ngTransitionEnter,
      this._ngTransitionEnterStart,
      this._ngTransitionEnterEnd,
      NOOP,
      NOOP
    );
  }

  private hide(): void {
    if (!this._thenViewRef) {
      return;
    }
    transitionClasses(
      this._thenViewRef.rootNodes[0],
      this._ngTransitionLeave,
      this._ngTransitionLeaveStart,
      this._ngTransitionLeaveEnd,
      NOOP,
      () => this._viewContainer.clear()
    );
  }
}
