import { Directive, ElementRef,  HostListener, Input, OnInit } from '@angular/core';
declare var M: any;

@Directive({
  selector: '[valido]'
})
export class ValidoDirective implements OnInit {
  @Input() estatus: Boolean;

  constructor(private el: ElementRef) { }

  ngOnInit() { }

  @HostListener('document:keyup', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    this.highlight(this.estatus);
  }

  private highlight(status: Boolean): void {
    if(status){
      this.el.nativeElement.classList.add('invalid');
      M.toast({html: 'Nombre no disponible'})
    }else{
      this.el.nativeElement.classList.remove('invalid');
      this.el.nativeElement.classList.add('valid');
    }
  }

}
