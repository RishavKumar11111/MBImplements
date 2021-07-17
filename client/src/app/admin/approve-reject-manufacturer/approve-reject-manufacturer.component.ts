import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { LayoutService } from '../../services/layout.service';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { RejectionReasonDialogComponent } from './rejection-reason-dialog/rejection-reason-dialog.component';

@Component({
  selector: 'app-approve-reject-manufacturer',
  templateUrl: './approve-reject-manufacturer.component.html',
  styleUrls: ['./approve-reject-manufacturer.component.css']
})
export class ApproveRejectManufacturerComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  manufacturerDetailsList: Array<any>;
  isMasterSelected: boolean;
  checkedList: Array<any>;
  submitObj: { RejectionReason: any, Status: any };

  constructor(
    private adminService: AdminService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.title = 'Approve or Reject Manufacturers';
    this.breadcrumbs = ['Approve or Reject Manufacturers', 'View Manufacturer details and Approve or Reject Manufacturers'];
    this.manufacturerDetailsList = [];
    this.checkedList = [];
    this.isMasterSelected = false;
    this.submitObj = {
      RejectionReason: null, Status: null
    };
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadAllManufacturerDetails();
  }

  loadAllManufacturerDetails() {
    this.adminService.getAllManufacturerDetails().subscribe((result: any) => {
      this.manufacturerDetailsList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  openDetailsDialog(obj: any, event: any) {
    const eventData = event.target.firstChild.data || event.target.firstChild.firstChild.data || event.target.id;
    let height;
    let width;
    if (eventData.includes('View Details')) {
      height = '550px';
      width = '1100px';
    } else if (eventData.includes('View Documents')) {
      height = '625px';
      width = '1250px';
    }
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      height,
      width,
      data: {
        obj, targetElement: event.target.firstChild.data || event.target.firstChild.firstChild.data || event.target.id
      }
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  openRejectionReasonDialog() {
    const dialogRef = this.dialog.open(RejectionReasonDialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        enteredRejectionReason: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== null && result !== '') {
        this.submitObj.RejectionReason = result;
        const event = {
          target: {
            id: 'reject'
          }
        };
        this.onSubmit(event);
      }
    });
  }

  checkUncheckAll() {
    this.manufacturerDetailsList.forEach((i: any) => { i.isSelected = this.isMasterSelected; });
    this.getCheckedItemList();
  }

  isAllSelected(obj: any) {
    this.isMasterSelected = this.manufacturerDetailsList.every((i: any) => i.isSelected);
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    this.manufacturerDetailsList.forEach((i: any) => {
      if (i.isSelected) {
        this.checkedList.push({
          UserID: i.ManufacturerEmailID
        });
      }
    });
  }

  onSubmit(event: any) {
    if (this.checkedList.length > 0) {
      if (event.target.id === 'approve') {
        this.submitObj.RejectionReason = null;
        this.submitObj.Status = 1;
      } else {
        this.submitObj.Status = 2;
      }
      const data = {
        obj: this.submitObj,
        array: this.checkedList
      };
      this.adminService.approveRejectManufacturerRecords(data).subscribe((result: any) => {
        if (result.length === this.checkedList.length) {
          if (data.obj.Status === 1) {
            this.toastr.success(`The selected manufacturer's records are aprroved and their User IDs as well as Passwords are generated.`);
          } else {
            this.toastr.success(`The selected manufacturer's records are rejected.`);
          }
          this.loadAllManufacturerDetails();
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    } else {
      this.toastr.warning(`Please select a manufacturer's record to approve or reject it.`);
    }
  }
}