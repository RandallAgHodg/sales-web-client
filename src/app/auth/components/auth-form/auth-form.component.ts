import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements OnInit {
  @Input()
  isRegisterForm: boolean = false;
  submitButtonText: string = '';
  formTitleText: string = '';
  linkText!: { route: string; text: string };
  authForm!: FormGroup;
  errors: string[] = [];

  constructor(
    private readonly _userService: UserService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    [this.formTitleText, this.submitButtonText, this.linkText] =
      this.setAuthFormText();
    this.authForm = this.initForm();
  }

  submit(): void {
    console.log(this.authForm.value, String(this.isInvalidForm()));

    if (this.isRegisterForm) {
      this._userService.register(this.authForm.value).subscribe((ok) => {
        if (ok === true) {
          console.log('salio bien');
        } else {
          this.errors = ok;
        }
      });
    } else {
    }
  }

  isInvalidForm(): boolean {
    return this.authForm.invalid;
  }

  isUnvalidField(name: string): boolean | null {
    return (
      this.authForm.controls[name].errors &&
      this.authForm.controls[name].touched
    );
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      email: ['correo@correo.com', [Validators.required, Validators.email]],
      password: ['facil123', [Validators.required]],
    });
  }

  setAuthFormText(): [string, string, { route: string; text: string }] {
    return this.isRegisterForm === true
      ? [
          'Create a new account',
          'Register',
          {
            route: '/auth/login',
            text: 'Or log in with an existing account',
          },
        ]
      : [
          'Log in to your account',
          'Login',
          {
            route: '/auth/register',
            text: 'Or create a new account',
          },
        ];
  }
}
