import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EeRoutingModule } from './ee-routing.module';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StockInitialisationComponent } from './stock-initialisation/stock-initialisation.component';
import { StockAvailabilityComponent } from './stock-availability/stock-availability.component';

@NgModule({
  declarations: [
    StockInitialisationComponent,
    DashboardComponent,
    ChangePasswordComponent,
    StockAvailabilityComponent
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