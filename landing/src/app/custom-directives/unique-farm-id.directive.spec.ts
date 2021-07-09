import { ElementRef } from '@angular/core';
import { UniqueFarmIdDirective } from './unique-farm-id.directive';

describe('UniqueFarmIdDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new UniqueFarmIdDirective(_el);
    expect(directive).toBeTruthy();
  });
});