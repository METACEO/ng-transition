import { Component } from '@angular/core';

@Component({
  selector: 'ng-transition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public opened = true;

  public closeModal(): void {
    this.opened = false;
    setTimeout(() => this.opened = true, 1000);
  }
}
