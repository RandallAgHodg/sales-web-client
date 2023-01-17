import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesComponent } from './sales/pages/sales/sales.component';
import { SaleComponent } from './sales/pages/sale/sale.component';
import { MainComponent } from './main/main.component';

const childRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'sale/:id', component: SaleComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
