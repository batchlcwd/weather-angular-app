import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input('appHighlight') backgroundColor: string = 'yellow';

  constructor(private el: ElementRef) {
    // console.log('app directive');
    // console.log(el.nativeElement);
    // el.nativeElement.style.backgroundColor = 'yellow';
    // el.nativeElement.style.padding = '10px';
    // el.nativeElement.style.borderRadius = '5px';
    //el mein current ref: jispe directive ko use kar rhe hai.
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.backgroundColor;
    this.el.nativeElement.style.padding = '10px';
    this.el.nativeElement.style.borderRadius = '10px';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.padding = '0px';
    this.el.nativeElement.style.borderRadius = '0px';
  }
}

// ng generate directive highlight
