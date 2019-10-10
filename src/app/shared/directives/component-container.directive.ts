import { Directive, OnInit,  ElementRef,  HostListener } from '@angular/core';

@Directive({
  selector: '[ComponentContainer]'
})
export class ComponentContainerDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit(){
    this.el.nativeElement.classList.add('col', 's12', 'm10', 'l8', 'xl6', 'offset-m1', 'offset-l2', 'offset-xl3');
    this.el.nativeElement.classList.add('z-depth-3');
    this.el.nativeElement.classList.add('container-component');
  }
}
