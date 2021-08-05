import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[specialIsLatLng]'
})
export class SpecialIsLatLngDirective {

  constructor(private el: ElementRef) { }

  @Input('min') min = -180;
  @Input('max') max = 180;
  @Input('precision') precision = 6;

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    this.validateFields(event);
    return new RegExp(/^[0-9.]+/g).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  private validateFields(event: KeyboardEvent) {
    setTimeout(() => {
      event.preventDefault();
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/\.(?=.*\.)|[^\d\.-]/g, '');
      this.el.nativeElement.value = this.el.nativeElement.value.substring(0, this.el.nativeElement.value.indexOf('.') + +this.precision + 1);
      this.el.nativeElement.value = +this.el.nativeElement.value < +this.min ? 
          this.min : (+this.el.nativeElement.value > +this.max ? this.max : this.el.nativeElement.value);
    })
  }

}