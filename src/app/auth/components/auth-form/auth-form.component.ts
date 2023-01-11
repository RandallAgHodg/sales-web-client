import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  isLoading: boolean = false;
  passwordOptions: {
    isPasswordField: boolean;
    passwordFieldType: 'text' | 'password';
    passwordIcon:
      | 'pi pi-eye cursor-pointer font-bold'
      | 'pi pi-eye-slash cursor-pointer font-bold';
  } = {
    isPasswordField: true,
    passwordFieldType: 'password',
    passwordIcon: 'pi pi-eye cursor-pointer font-bold',
  };

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
    this.isLoading = true;
    if (this.isRegisterForm) {
      this._userService.register(this.authForm.value).subscribe((res) => {
        if (res === true) {
          console.log('salio bien');
        } else {
          this.errors = res;
        }
      });
    } else {
      this._userService.login(this.authForm.value).subscribe((res) => {
        console.log(res);
        if (res === true) {
          console.log('Salio bien');
        } else {
          this.errors = res;
        }
      });
    }
    this.isLoading = false;
  }

  isInvalidForm(): boolean {
    return this.authForm.invalid;
  }

  setPasswordField() {
    this.passwordOptions.isPasswordField =
      !this.passwordOptions.isPasswordField;
    if (this.passwordOptions.isPasswordField) {
      this.passwordOptions.passwordIcon = 'pi pi-eye cursor-pointer font-bold';
      this.passwordOptions.passwordFieldType = 'password';
    } else {
      this.passwordOptions.passwordIcon =
        'pi pi-eye-slash cursor-pointer font-bold';
      this.passwordOptions.passwordFieldType = 'text';
    }
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
