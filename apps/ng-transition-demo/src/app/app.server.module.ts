import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AnimationFrameRef } from 'ng-refs';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    {
      provide: AnimationFrameRef,
      useValue: {
        nativeCancel: () => void 0,
        nativeRequest: () => void 0
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
