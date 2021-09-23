import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AeeService } from '../../services/aee.service';
import { LayoutService } from '../../services/layout.service';
import { RejectionReasonDialogComponent } from './rejection-reason-dialog/rejection-reason-dialog.component';

@Component({
  selector: 'app-pre-delivery-inspection',
  templateUrl: './pre-delivery-inspection.component.html',
  styleUrls: ['./pre-delivery-inspection.component.css']
})
export class PreDeliveryInspectionComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  manufacturerStockSerialNoList: Array<any>;
  checkedList: Array<any>;
  submitObj: { RejectionReason: any, Status: any };

  @ViewChild('preDeliveryInspectionForm') prediForm: any;

  constructor(
    private aeeService: AeeService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.title = 'Pre-delivery Inspection';
    this.breadcrumbs = ['Pre-delivery Inspection', 'Approve / Reject the Stock Serial Nos. of Implements after Pre-delivery Inspection'];
    this.manufacturerStockSerialNoList = [];
    this.checkedList = [];
    this.submitObj = {
      RejectionReason: null, Status: null
    };
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadManufacturerStockSerialNos();
  }

  loadManufacturerStockSerialNos() {
    this.aeeService.getManufacturerStockSerialNos().subscribe((result: any) => {
      if (result.length > 0) {
        this.manufacturerStockSerialNoList = result.reduce((acc: any, curr: any) => {
          const found1 = acc.find((x: any) => x.BlockCode === curr.BlockCode && x.BlockName === curr.BlockName);
          const found2 = (found1) ? found1.manufacturerUserIDs.find((x: any) => x.ManufacturerUserID === curr.ManufacturerUserID) : found1;
          const found3 = (found2) ? found2.implementDetails.find((x: any) => x.ImplementID === curr.ImplementID && x.ImplementName === curr.ImplementName) : found2;
          const found4 = (found3) ? found3.stockSerialNos.find((x: any) => x.BlockCode === curr.BlockCode && x.ManufacturerUserID === curr.ManufacturerUserID && x.ImplementID === curr.ImplementID && x.StockSerialNo === curr.StockSerialNo && x.MSEFinancialYear === curr.MSEFinancialYear) : found3;
          const stockSerialNos = {
            BlockCode: curr.BlockCode, ManufacturerUserID: curr.ManufacturerUserID, ImplementID: curr.ImplementID, StockSerialNo: curr.StockSerialNo, MSEFinancialYear: curr.MSEFinancialYear
          };
          const implementDetails = {
            ImplementID: curr.ImplementID,
            ImplementName: curr.ImplementName,
            stockSerialNos: [stockSerialNos]
          };
          const manufacturerUserIDs = {
            ManufacturerUserID: curr.ManufacturerUserID,
            ...(!found3 && {
              implementDetails: [implementDetails]
            })
          };
          if (!found1) {
            acc.push({
              BlockCode: curr.BlockCode,
              BlockName: curr.BlockName,
              ...(!found2 && {
                manufacturerUserIDs: [manufacturerUserIDs]
              })
            });
          } else if (!found2) {
            found1.manufacturerUserIDs.push(manufacturerUserIDs);
          } else if (!found3) {
            found2.implementDetails.push(implementDetails);
          } else if (!found4) {
            found3.stockSerialNos.push(stockSerialNos);
          }
          return acc;
        }, []);
      } else {
        this.manufacturerStockSerialNoList = [];
        this.toastr.info(`Either the Stocks have not been made available by Manufacturers or their Pre-delivery Inspection has already been done.`);
      }
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  checkUncheckAll(blockCode: number, isMasterSelected: boolean, manufacturerUserID: string, implementID: number) {
    this.manufacturerStockSerialNoList.filter((x: any) => x.BlockCode === blockCode).map((i: any) => i.manufacturerUserIDs.filter((y: any) => y.ManufacturerUserID === manufacturerUserID).map((j: any) => j.implementDetails.filter((z: any) => z.ImplementID === implementID).map((w: any) => w.stockSerialNos.forEach((k: any) => { k.isSelected = isMasterSelected; }))));
    this.getCheckedItemList();
  }

  isAllSelected(blockCode: number, obj: any, manufacturerUserID: string, implementID: number) {
    obj.isMasterSelected = this.manufacturerStockSerialNoList.filter((x: any) => x.BlockCode === blockCode).map((i: any) => i.manufacturerUserIDs.filter((y: any) => y.ManufacturerUserID === manufacturerUserID).map((j: any) => j.implementDetails.filter((z: any) => z.ImplementID === implementID).reduce((acc: any, curr: any) => {
      const res = curr.stockSerialNos.every((k: any) => k.isSelected);
      acc.push(res);
      return acc;
    }, []))).flat(2).every((w: any) => w === true);
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    this.manufacturerStockSerialNoList.map((i: any) => i.manufacturerUserIDs.map((j: any) => j.implementDetails.map((k: any) => k.stockSerialNos.forEach((l: any) => {
      if (l.isSelected) {
        this.checkedList.push({
          ImplementID: l.ImplementID, StockSerialNo: l.StockSerialNo, MSEFinancialYear: l.MSEFinancialYear, ManufacturerUserID: l.ManufacturerUserID
        });
      }
    }))));
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
      this.aeeService.approveRejectStockSerialNos(data).subscribe((result: any) => {
        if (result.length === this.checkedList.length) {
          if (data.obj.Status === 1) {
            this.toastr.success(`The selected Stock Serial Nos. are approved.`);
          } else {
            this.toastr.success(`The selected Stock Serial Nos. are rejected.`);
          }
          this.loadManufacturerStockSerialNos();
          this.submitObj.Status = null;
          this.submitObj.RejectionReason = null;
          this.checkedList = [];
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    } else {
      this.toastr.warning(`Please select a Stock Serial No. to approve or reject it.`);
    }
  }
}