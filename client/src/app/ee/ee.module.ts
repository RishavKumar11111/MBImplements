import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EeRoutingModule } from './ee-routing.module';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddAvailableStockComponent } from './add-available-stock/add-available-stock.component';
import { InitialiseStockComponent } from './initialise-stock/initialise-stock.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChangePasswordComponent,
    AddAvailableStockComponent,
    InitialiseStockComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EeRoutingModule,
    SharedModule
  ]
})
export class EeModule { }