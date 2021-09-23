import { ElementRef } from '@angular/core';
import { UniqueFarmIdOnlyDirective } from './unique-farm-id-only.directive';

describe('UniqueFarmIdOnlyDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new UniqueFarmIdOnlyDirective(_el);
    expect(directive).toBeTruthy();
  });
});