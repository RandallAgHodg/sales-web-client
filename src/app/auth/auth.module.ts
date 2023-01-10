import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AuthFormComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
