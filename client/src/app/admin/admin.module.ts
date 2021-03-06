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

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddModifyImplementTargetComponent } from './add-modify-implement-target/add-modify-implement-target.component';
import { ApproveRejectManufacturerComponent } from './approve-reject-manufacturer/approve-reject-manufacturer.component';
import { AddModifyImplementPriceComponent } from './add-modify-implement-price/add-modify-implement-price.component';
import { ActivateImplementComponent } from './activate-implement/activate-implement.component';
import { DetailsDialogComponent } from './approve-reject-manufacturer/details-dialog/details-dialog.component';
import { RejectionReasonDialogComponent } from './approve-reject-manufacturer/rejection-reason-dialog/rejection-reason-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChangePasswordComponent,
    AddModifyImplementTargetComponent,
    ApproveRejectManufacturerComponent,
    AddModifyImplementPriceComponent,
    ActivateImplementComponent,
    DetailsDialogComponent,
    RejectionReasonDialogComponent
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
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }