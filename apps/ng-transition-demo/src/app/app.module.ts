import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TimeoutRef } from 'ng-refs';
import { NgTransitionModule } from 'ng-transition';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgTransitionModule
  ],
  providers: [TimeoutRef],
  bootstrap: [AppComponent]
})
export class AppModule {}
