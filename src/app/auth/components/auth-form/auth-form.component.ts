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

  ngOnInit() {
    [this.formTitleText, this.submitButtonText, this.linkText] =
      this.setAuthFormText();
    this.authForm = this.initForm();
  }

  submit() {
    if (this.isRegisterForm) {
      this.isLoading = true;
      this._userService.register(this.authForm.value).subscribe((res) => {
        this.handleAuth(res);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
    } else {
      this.isLoading = true;
      this._userService.login(this.authForm.value).subscribe((res) => {
        this.handleAuth(res);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
    }
  }

  isInvalidForm(): boolean {
    return this.authForm.invalid;
  }

  handleAuth(res: unknown) {
    if (res === true) {
      this._router.navigate(['/dashboard/products']);
    } else {
      this.errors = res as string[];
    }
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
      password: ['Facil123*', [Validators.required]],
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
          'Log into your account',
          'Login',
          {
            route: '/auth/register',
            text: 'Or create a new account',
          },
        ];
  }
}
