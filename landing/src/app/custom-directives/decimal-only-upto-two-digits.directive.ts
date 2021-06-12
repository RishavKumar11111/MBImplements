import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalOnlyUptoTwoDigits]'
})
export class DecimalOnlyUptoTwoDigitsDirective {
  private regex: RegExp = new RegExp(/^([1-9]\d*|0)(\.\d{0,2})?$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete', 'Enter'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) { return; }
    const current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key === 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}