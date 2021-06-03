import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockAvailabilityComponent } from './stock-availability/stock-availability.component';
import { StockInitialisationComponent } from './stock-initialisation/stock-initialisation.component';
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
    path: 'stockAvailability',
    component: StockAvailabilityComponent
  },
  {
    path: 'stockInitialisation',
    component: StockInitialisationComponent
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