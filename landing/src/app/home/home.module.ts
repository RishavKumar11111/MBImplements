import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { FarmerBookingComponent } from './farmer-booking/farmer-booking.component';
import { ManufacturerRegistrationComponent } from './manufacturer-registration/manufacturer-registration.component';

@NgModule({
  declarations: [
    HomeComponent,
    FarmerBookingComponent,
    ManufacturerRegistrationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }