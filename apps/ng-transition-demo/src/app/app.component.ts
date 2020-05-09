import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';

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

  public openModal(): void {
    this.opened = true;
  }
  public closeModal(): void {
    this.opened = false;
  }
  public toggleLeftNav(): void {
    this.openedLeftNav = !this.openedLeftNav;
  }
  public toggleProfile(): void {
    this.openedProfile = !this.openedProfile;
  }
}
