import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') toolTipText: string = '';

  toolTipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    //logic to display tooltip

    this.el.nativeElement.style.position = 'relative';

    this.toolTipElement = this.renderer2.createElement('span');

    const text = this.renderer2.createText(this.toolTipText);

    this.renderer2.appendChild(this.toolTipElement, text);

    this.renderer2.appendChild(this.el.nativeElement, this.toolTipElement);

    this.renderer2.setStyle(this.toolTipElement, 'position', 'absolute');
    this.renderer2.setStyle(this.toolTipElement, 'background', '#333');
    this.renderer2.setStyle(this.toolTipElement, 'color', '#fff');
    this.renderer2.setStyle(this.toolTipElement, 'padding', '4px 8px');
    this.renderer2.setStyle(this.toolTipElement, 'borderRadius', '4px');
    this.renderer2.setStyle(this.toolTipElement, 'top', '100%');
    this.renderer2.setStyle(this.toolTipElement, 'left', '100%');
    this.renderer2.setStyle(this.toolTipElement, 'zIndex', '10000');
  }

  @HostListener('mouseleave') mouseLeave() {
    this.renderer2.removeChild(this.el.nativeElement, this.toolTipElement);
  }
}
