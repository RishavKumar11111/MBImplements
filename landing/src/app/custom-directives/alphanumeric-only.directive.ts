import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumericOnly]'
})
export class AlphanumericOnlyDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete', 'Enter'];

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    if (this.specialKeys.indexOf(event.key) !== -1) { return; }
    const initialValue1 = this._el.nativeElement.value;
    const initialValue = initialValue1.replace(/\s+/g, ' ');
    this._el.nativeElement.value = initialValue.replace(/^[^\w\s@%()\-,.]+$/g, '');
    if (initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}