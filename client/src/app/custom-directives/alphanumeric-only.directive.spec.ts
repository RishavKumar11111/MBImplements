import { ElementRef } from '@angular/core';
import { AlphanumericOnlyDirective } from './alphanumeric-only.directive';

describe('AlphanumericOnlyDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new AlphanumericOnlyDirective(_el);
    expect(directive).toBeTruthy();
  });
});