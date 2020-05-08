import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TimeoutRef } from 'ng-refs';

@Component({
  selector: 'ng-transition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = true;
  openedLeftNav = false;
  openedProfile = false;

  @ViewChild('Profile')
  public $profile: ElementRef<HTMLDivElement>;

  constructor(private readonly timeoutRef: TimeoutRef) {}

  @HostListener('click', ['$event'])
  public handleAutomaticUserPopoutClose($event) {
    const $target = $event?.target;
    const $profile = this.$profile?.nativeElement;
    // If there's no good input or we're
    // not even open, short-circuit.
    if (!$target || !$profile || !this.openedProfile) {
      return;
    }
    // Otherwise close the popout if the
    // click is outside our container.
    if (!$profile.contains($target)) {
      this.openedProfile = false;
    }
  }

  public closeModal(): void {
    this.opened = false;
    // this.timeoutRef.nativeSet(() => (this.opened = true), 1000);
  }
  public toggleLeftNav(): void {
    this.openedLeftNav = !this.openedLeftNav;
  }
  public toggleProfile(): void {
    this.openedProfile = !this.openedProfile;
  }
}
