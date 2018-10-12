import {Attribute, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, SimpleChange} from '@angular/core';
import {Product} from './product.model';


@Directive({
  selector: '[pa-attr]'
})
export class PaAttrDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.addEventListener('click', e => {
      if (this.product != null) {
        this.click.emit(this.product.category);
      }
    });
  }

  @Input('pa-attr')
  @HostBinding('class')
  bgClass: string;
  @Input('pa-product')
  product: Product;
  @Output('pa-category')
  click = new EventEmitter<string>();

  @HostListener('click')
  triggerCustomEvent() {
    if (this.product != null) {
      this.click.emit(this.product.category);
    }
  }

  // ngOnInit() {
  //   this.element.nativeElement.classList.add(this.bgClass || 'bg-success');
  // }

  // ngOnChanges(changes: { [property: string]: SimpleChange }) {
  //   let change = changes['bgClass'];
  //   let classList = this.element.nativeElement.classList;
  //   if (!change.isFirstChange() && classList.contains(change.previousValue)) {
  //     classList.remove(change.previousValue);
  //   }
  //   if (!classList.contains(change.currentValue)) {
  //     classList.add(change.currentValue);
  //   }
  // }

}
