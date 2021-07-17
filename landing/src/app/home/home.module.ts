import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { FarmerBookingComponent } from './farmer-booking/farmer-booking.component';
import { ManufacturerRegistrationComponent } from './manufacturer-registration/manufacturer-registration.component';

@NgModule({
  declarations: [
    HomeComponent,
    CaptchaComponent,
    FarmerBookingComponent,
    ManufacturerRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }