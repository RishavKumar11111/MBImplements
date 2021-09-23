import { ElementRef } from '@angular/core';
import { StockSerialNoOnlyDirective } from './stock-serial-no-only.directive';

describe('StockSerialNoOnlyDirective', () => {
  let _el: ElementRef;
  it('should create an instance', () => {
    const directive = new StockSerialNoOnlyDirective(_el);
    expect(directive).toBeTruthy();
  });
});