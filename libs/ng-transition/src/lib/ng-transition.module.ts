import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTransitionDirective } from './ng-transition.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTransitionDirective],
  exports: [NgTransitionDirective]
})
export class NgTransitionModule {}
