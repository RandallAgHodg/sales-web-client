import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,
  ],
})
export class ProductsModule {}
