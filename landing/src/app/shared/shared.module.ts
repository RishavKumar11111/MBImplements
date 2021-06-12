import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlphabetsOnlyDirective } from '../custom-directives/alphabets-only.directive';
import { AlphanumericOnlyDirective } from '../custom-directives/alphanumeric-only.directive';
import { DecimalOnlyUptoTwoDigitsDirective } from '../custom-directives/decimal-only-upto-two-digits.directive';
import { NumbersOnlyDirective } from '../custom-directives/numbers-only.directive';

@NgModule({
  declarations: [
    AlphabetsOnlyDirective,
    AlphanumericOnlyDirective,
    DecimalOnlyUptoTwoDigitsDirective,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlphabetsOnlyDirective,
    AlphanumericOnlyDirective,
    DecimalOnlyUptoTwoDigitsDirective,
    NumbersOnlyDirective
  ]
})
export class SharedModule { }