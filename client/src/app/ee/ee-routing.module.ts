import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddAvailableStockComponent } from './add-available-stock/add-available-stock.component';
import { InitialiseStockComponent } from './initialise-stock/initialise-stock.component';
import { AddStockSupplyDataComponent } from './add-stock-supply-data/add-stock-supply-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'addAvailableStock',
    component: AddAvailableStockComponent
  },
  {
    path: 'initialiseStock',
    component: InitialiseStockComponent
  },
  {
    path: 'addStockSupplyData',
    component: AddStockSupplyDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EeRoutingModule { }