import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddStockSupplyDataComponent } from './add-stock-supply-data/add-stock-supply-data.component';
import { DeliverStockComponent } from './deliver-stock/deliver-stock.component';

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
    path: 'addStockSupplyData',
    component: AddStockSupplyDataComponent
  },
  {
    path: 'deliverStock',
    component: DeliverStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OaicRoutingModule { }