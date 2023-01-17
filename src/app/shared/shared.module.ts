import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [ErrorMessageComponent, MenuHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    ButtonModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    ErrorMessageComponent,
    MenuHeaderComponent,
    InputNumberModule,
    SliderModule,
  ],
})
export class SharedModule {}
