import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddModifyImplementTargetComponent } from './add-modify-implement-target/add-modify-implement-target.component';
import { ApproveRejectManufacturerComponent } from './approve-reject-manufacturer/approve-reject-manufacturer.component';
import { AddModifyImplementPriceComponent } from './add-modify-implement-price/add-modify-implement-price.component';
import { ActivateImplementComponent } from './activate-implement/activate-implement.component';

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
    path: 'addModifyImplementTarget',
    component: AddModifyImplementTargetComponent
  },
  {
    path: 'approveRejectManufacturer',
    component: ApproveRejectManufacturerComponent
  },
  {
    path: 'addModifyImplementPrice',
    component: AddModifyImplementPriceComponent
  },
  {
    path: 'activateImplement',
    component: ActivateImplementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }