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

import { VaccineRoutingModule } from './vaccine-routing.module';

import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './search/search.component';
import { SearchByDistrictComponent } from './search-by-district/search-by-district.component';
import { SearchByPinComponent } from './search-by-pin/search-by-pin.component';
import { SlotAvailabilityComponent } from './slot-availability/slot-availability.component';
import { SlotAvailabilityByDatesComponent } from './slot-availability-by-dates/slot-availability-by-dates.component';
import { SlotAvailabilityByCentresComponent } from './slot-availability-by-centres/slot-availability-by-centres.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchByDistrictComponent,
    SearchByPinComponent,
    SlotAvailabilityComponent,
    SlotAvailabilityByDatesComponent,
    SlotAvailabilityByCentresComponent
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
    VaccineRoutingModule,
    SharedModule
  ]
})
export class VaccineModule { }