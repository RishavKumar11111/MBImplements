import { ElementRef } from '@angular/core';
import { NumbersOnlyDirective } from './numbers-only.directive';

describe('NumbersOnlyDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new NumbersOnlyDirective(_el);
    expect(directive).toBeTruthy();
  });
});