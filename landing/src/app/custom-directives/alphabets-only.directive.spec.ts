import { ElementRef } from '@angular/core';
import { AlphabetsOnlyDirective } from './alphabets-only.directive';

describe('AlphabetsOnlyDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new AlphabetsOnlyDirective(_el);
    expect(directive).toBeTruthy();
  });
});