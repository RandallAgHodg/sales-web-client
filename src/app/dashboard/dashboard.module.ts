import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products/products.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { SalesComponent } from './sales/sales/sales.component';
import { AuthModule } from '../auth/auth.module';
import { FABComponent } from './products/components/fab/fab.component';
import { ModalProductFormComponent } from './products/components/modal-product-form/modal-product-form.component';
import { ModalSalesFormComponent } from './sales/components/modal-sales-form/modal-sales-form.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    SalesComponent,
    MainComponent,
    ProfileComponent,
    ModalProductFormComponent,
    FABComponent,
    ModalSalesFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    AuthModule,
  ],
})
export class DashboardModule {}
