import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
