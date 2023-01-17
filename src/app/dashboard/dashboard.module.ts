import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { MainComponent } from './main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products/products.component';
import { RouterModule } from '@angular/router';
import { ModalProductFormComponent } from './components/modal-product-form/modal-product-form.component';
import { FABComponent } from './components/fab/fab.component';
import { ProductComponent } from './products/product/product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    SalesComponent,
    MainComponent,
    ProfileComponent,
    ModalProductFormComponent,
    FABComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
})
export class DashboardModule {}
