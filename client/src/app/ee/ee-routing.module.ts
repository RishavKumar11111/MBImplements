import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddAvailableStockComponent } from './add-available-stock/add-available-stock.component';
import { InitialiseStockComponent } from './initialise-stock/initialise-stock.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

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
    path: 'addAvailableStock',
    component: AddAvailableStockComponent
  },
  {
    path: 'initialiseStock',
    component: InitialiseStockComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EeRoutingModule { }