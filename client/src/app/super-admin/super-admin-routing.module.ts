import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityLogReportComponent } from './activity-log-report/activity-log-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'activityLogReport',
    pathMatch: 'full'
  },
  {
    path: 'activityLogReport',
    component: ActivityLogReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }