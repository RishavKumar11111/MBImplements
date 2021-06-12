import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddModifyImplementTargetComponent } from './add-modify-implement-target/add-modify-implement-target.component';
import { AddModifyImplementPriceComponent } from './add-modify-implement-price/add-modify-implement-price.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddModifyImplementTargetComponent,
    AddModifyImplementPriceComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }