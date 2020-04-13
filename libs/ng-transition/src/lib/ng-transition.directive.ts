import { NgIfContext } from '@angular/common';
import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngTransition]'
})
export class NgTransitionDirective<T = unknown> {
  private _context: NgIfContext<T> = new NgIfContext<T>();
  private _thenTemplateRef: TemplateRef<NgIfContext<T>> | null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<T>> | null = null;

  constructor(private readonly _viewContainer: ViewContainerRef,
              private readonly templateRef: TemplateRef<NgIfContext<T>>) {
    this._thenTemplateRef = templateRef;
  }

  @Input()
  set ngTransition(condition: T) {
    this._context.$implicit = this._context.ngIf = condition;
    this._updateView();
  }

  private _updateView() {
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
    this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
  }


  private hide(): void {
    if (!this._thenViewRef) {
      return;
    }
    this._viewContainer.clear()
  }
}
