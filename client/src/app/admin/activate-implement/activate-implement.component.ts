import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { LayoutService } from '../../services/layout.service';
import { Implement } from '../../models/admin/implement.model';

@Component({
  selector: 'app-activate-implement',
  templateUrl: './activate-implement.component.html',
  styleUrls: ['./activate-implement.component.css']
})
export class ActivateImplementComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  implementPriceListFinancialYearWise: Array<any>;
  checkedList: Array<any>;

  @ViewChild('activateImplementForm') ariForm: any;

  constructor(
    private adminService: AdminService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Activate Implements';
    this.breadcrumbs = ['Activate Implements', 'Activation - De-activation or Removal of Implements'];
    this.implementPriceListFinancialYearWise = [];
    this.checkedList = [];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadAllImplementPrices();
  }

  loadAllImplementPrices() {
    this.adminService.getAllImplementPrices().subscribe((result: any) => {
      const filteredFinancialYears = result.filter((x: any) => x.Status === false || x.Status === null).map((x: any) => ({
        FinancialYear: x.FinancialYear
      }));
      this.implementPriceListFinancialYearWise = result.reduce((acc: any, curr: any) => {
        const found = acc.find((x: any) => x.FinancialYear === curr.FinancialYear);
        const implementDetails = {
          ImplementID: curr.ImplementID, ImplementName: curr.ImplementName, Cost: curr.Cost, isSelected: curr.Status === null ? false : curr.Status
        };
        if (!found) {
          const foundIndex = filteredFinancialYears.findIndex((x: any) => x.FinancialYear === curr.FinancialYear);
          acc.push({
            FinancialYear: curr.FinancialYear, Year: parseInt(curr.FinancialYear.substring(0, 4), 10), isMasterSelected: foundIndex === -1, ImplementDetails: [implementDetails]
          });
        } else {
          found.ImplementDetails.push(implementDetails);
        }
        return acc;
      }, []).sort((a: any, b: any) => b.Year - a.Year);
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  checkUncheckAll(obj: any) {
    this.implementPriceListFinancialYearWise.filter((x: any) => x.FinancialYear === obj.FinancialYear).map((i: any) => i.ImplementDetails.forEach((j: any) => { j.isSelected = obj.isMasterSelected; }));
    this.getCheckedItemList();
  }

  isAllSelected(obj: any) {
    obj.isMasterSelected = this.implementPriceListFinancialYearWise.filter((x: any) => x.FinancialYear === obj.FinancialYear).reduce((acc: any, curr: any) => {
      const res = curr.ImplementDetails.every((j: any) => j.isSelected);
      acc.push(res);
      return acc;
    }, []).every((x: any) => x === true);
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    this.implementPriceListFinancialYearWise.map((i: any) => i.ImplementDetails.forEach((j: any) => {
      if (j.isSelected) {
        this.checkedList.push({
          ImplementID: j.ImplementID, Status: true
        });
      } else {
        this.checkedList.push({
          ImplementID: j.ImplementID, Status: false
        });
      }
    }));
  }

  onSubmit() {
    if (this.checkedList.length > 0) {
      this.adminService.submitActivatedImplements(this.checkedList).subscribe((result: any) => {
        if (result.length === this.checkedList.length) {
          this.toastr.success(`The selected implements are activated and the rest are de-activated.`);
          this.loadAllImplementPrices();
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    } else {
      this.toastr.warning(`Please select or de-select an implement to activate or deactivate it respectively.`);
    }
  }
}