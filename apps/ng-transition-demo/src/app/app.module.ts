import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgTransitionModule } from 'ng-transition';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgTransitionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
