import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerBookingComponent } from './farmer-booking/farmer-booking.component';
import { HomeComponent } from './home/home.component';
import { ManufacturerRegistrationComponent } from './manufacturer-registration/manufacturer-registration.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'farmerBooking',
    component: FarmerBookingComponent
  },
  {
    path: 'manufacturerRegistration',
    component: ManufacturerRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }