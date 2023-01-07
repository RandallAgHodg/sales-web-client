import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[isRegisterForm]',
})
export class IsRegisterFormDirective {
  constructor() {}

  @Input()
  set isRegisterForm(isRegisterForm: boolean) {
    if (isRegisterForm) {
    }
  }
}
