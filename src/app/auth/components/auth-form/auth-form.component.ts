import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements OnInit {
  @Input()
  isRegisterForm: boolean = false;
  submitButtonText: string = '';
  formTitleText: string = '';
  constructor() {}

  ngOnInit(): void {
    [this.formTitleText, this.submitButtonText] = this.setAuthFormText();
  }

  setAuthFormText(): string[] {
    return this.isRegisterForm === true
      ? ['Create a new account', 'Register']
      : ['Log in to your account', 'Login'];
  }
}
