import { getModalMessage } from '../support/app.po';

describe('ng-transition-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a modal message', () => {
    getModalMessage().contains('Are you sure you want to deactivate your account?');
  });
});
