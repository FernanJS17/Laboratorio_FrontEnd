import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnChanges {

  @Input('appLoading') isLoading = false;

  constructor(private el: ElementRef<HTMLButtonElement>) {}

  ngOnChanges(): void {
    if (this.isLoading) {
      this.el.nativeElement.setAttribute('disabled', 'true');
      this.el.nativeElement.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      this.el.nativeElement.removeAttribute('disabled');
      this.el.nativeElement.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}
