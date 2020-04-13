import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTransitionDirective } from './ng-transition.directive';
import { AnimationFrameRef, GetComputedStyleRef, TimeoutRef } from 'ng-refs';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTransitionDirective],
  providers: [AnimationFrameRef, GetComputedStyleRef, TimeoutRef],
  exports: [NgTransitionDirective]
})
export class NgTransitionModule {}
