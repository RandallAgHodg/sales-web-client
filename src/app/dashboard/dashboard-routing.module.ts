import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesComponent } from './sales/sales/sales.component';
import { SaleComponent } from './sales/sale/sale.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'sale/:id', component: SaleComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: '**', redirectTo: 'products' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
