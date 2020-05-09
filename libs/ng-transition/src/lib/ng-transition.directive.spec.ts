import { NgTransitionDirective } from './ng-transition.directive';

describe('NgTransitionDirective', () => {
  it('should create an instance', () => {
    const directive = new NgTransitionDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
