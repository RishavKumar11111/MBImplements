import { ElementRef } from '@angular/core';
import { FarmerIdOnlyDirective } from './farmer-id-only.directive';

describe('FarmerIdOnlyDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new FarmerIdOnlyDirective(_el);
    expect(directive).toBeTruthy();
  });
});