import { async, TestBed } from '@angular/core/testing';
import { NgTransitionModule } from './ng-transition.module';

describe('NgTransitionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgTransitionModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgTransitionModule).toBeDefined();
  });
});
