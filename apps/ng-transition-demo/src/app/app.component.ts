import { Component } from '@angular/core';
import { TimeoutRef } from 'ng-refs';

@Component({
  selector: 'ng-transition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public opened = true;

  constructor(private readonly timeoutRef: TimeoutRef) {
  }

  public closeModal(): void {
    this.opened = false;
    this.timeoutRef.nativeSet(() => (this.opened = true), 1000);
  }
}
