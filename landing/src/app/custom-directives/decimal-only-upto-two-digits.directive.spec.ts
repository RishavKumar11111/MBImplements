import { ElementRef } from '@angular/core';
import { DecimalOnlyUptoTwoDigitsDirective } from './decimal-only-upto-two-digits.directive';

describe('DecimalOnlyUptoTwoDigitsDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new DecimalOnlyUptoTwoDigitsDirective(_el);
    expect(directive).toBeTruthy();
  });
});