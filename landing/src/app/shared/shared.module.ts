import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlphabetsOnlyDirective } from '../custom-directives/alphabets-only.directive';
import { AlphanumericOnlyDirective } from '../custom-directives/alphanumeric-only.directive';
import { DecimalOnlyUptoTwoDigitsDirective } from '../custom-directives/decimal-only-upto-two-digits.directive';
import { FarmerIdOnlyDirective } from '../custom-directives/farmer-id-only.directive';
import { NumbersOnlyDirective } from '../custom-directives/numbers-only.directive';
import { StockSerialNoOnlyDirective } from '../custom-directives/stock-serial-no-only.directive';
import { UniqueFarmIdOnlyDirective } from '../custom-directives/unique-farm-id-only.directive';

@NgModule({
  declarations: [
    AlphabetsOnlyDirective,
    AlphanumericOnlyDirective,
    DecimalOnlyUptoTwoDigitsDirective,
    FarmerIdOnlyDirective,
    NumbersOnlyDirective,
    StockSerialNoOnlyDirective,
    UniqueFarmIdOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlphabetsOnlyDirective,
    AlphanumericOnlyDirective,
    DecimalOnlyUptoTwoDigitsDirective,
    FarmerIdOnlyDirective,
    NumbersOnlyDirective,
    StockSerialNoOnlyDirective,
    UniqueFarmIdOnlyDirective
  ]
})
export class SharedModule { }