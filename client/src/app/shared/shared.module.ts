import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from '../custom-directives/numbers-only.directive';
import { TwoDigitDecimaNumberDirective } from '../custom-directives/decimal-only-upto-two-digits.directive';

@NgModule({
  declarations: [NumberDirective, TwoDigitDecimaNumberDirective],
  imports: [
    CommonModule
  ],
  exports: [NumberDirective, TwoDigitDecimaNumberDirective]
})
export class SharedModule { }