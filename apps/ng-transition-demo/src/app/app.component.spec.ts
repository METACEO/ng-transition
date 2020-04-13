import { TestBed, async } from '@angular/core/testing';
import { TimeoutRef } from 'ng-refs';
import { NgTransitionModule } from 'ng-transition';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgTransitionModule],
      providers: [
        {
          provide: TimeoutRef,
          useValue: {
            nativeSet: () => void 0
          }
        }
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
