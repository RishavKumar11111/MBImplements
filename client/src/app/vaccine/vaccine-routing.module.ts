import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SlotAvailabilityComponent } from './slot-availability/slot-availability.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'slotAvailability',
    component: SlotAvailabilityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule { }