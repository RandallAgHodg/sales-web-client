import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule],
  exports: [ButtonModule, InputTextModule, ErrorMessageComponent],
})
export class SharedModule {}
