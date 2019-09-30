import { Directive, ElementRef,  HostListener, Input, OnInit } from '@angular/core';
declare var M: any;

@Directive({
  selector: '[card]'
})
export class CardDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transform = "scale(1.1)";
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = "none";
  }
}
