import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { LayoutService } from '../../services/layout.service';
import { ImplementPrice } from '../../models/admin/implement-price.model';

@Component({
  selector: 'app-add-modify-implement-price',
  templateUrl: './add-modify-implement-price.component.html',
  styleUrls: ['./add-modify-implement-price.component.css']
})
export class AddModifyImplementPriceComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  financialYears: Array<string>;
  idl: Array<any>;
  implementDetailsList: Array<any>;
  implementPriceListFinancialYearWise: Array<any>;
  btnID: string;
  showImplementText: boolean;

  addModifyImplementPriceForm: any;
  @ViewChild('addModifyImplementPriceFormID') amipFormID: any;

  constructor(
    private adminService: AdminService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.idl = [];
    this.implementDetailsList = [];
    this.implementPriceListFinancialYearWise = [];
    this.btnID = '';
    this.title = 'Add / Modify Implement\'s Price';
    this.breadcrumbs = ['Add / Modify Implement\'s Price', 'Price entry of Implements Financial Year-wise'];
    this.financialYears = [];
    this.showImplementText = false;

    this.addModifyImplementPriceForm = this.fb.group({
      selectedImplement: ['', Validators.required],
      enteredImplement: [''],
      selectedFinancialYear: ['', Validators.required],
      enteredPrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadFinancialYear();
    this.loadAllImplementPrices();
  }

  get f() { return this.addModifyImplementPriceForm.controls; }
  get selectedImplement() { return this.addModifyImplementPriceForm.get('selectedImplement'); }
  get enteredImplement() { return this.addModifyImplementPriceForm.get('enteredImplement'); }
  get selectedFinancialYear() { return this.addModifyImplementPriceForm.get('selectedFinancialYear'); }
  get enteredPrice() { return this.addModifyImplementPriceForm.get('enteredPrice'); }

  implementConditionalValidation(msg: string) {
    if (msg === 'add') {
      this.showImplementText = true;
      this.enteredImplement.setValidators([Validators.required, Validators.pattern('^[\\w\\s@%&*()\\-+/<,>.]+$')]);
      this.selectedImplement.clearValidators();
    } else {
      this.showImplementText = false;
      this.selectedImplement.setValidators([Validators.required]);
      this.enteredImplement.clearValidators();
    }
    this.selectedImplement.updateValueAndValidity();
    this.enteredImplement.updateValueAndValidity();
    this.addModifyImplementPriceForm.reset();
    setTimeout(() => {
      this.addModifyImplementPriceForm.patchValue({
        selectedImplement: '',
        enteredImplement: '',
        selectedFinancialYear: '',
        enteredPrice: ''
      });
    }, 1);
  }

  loadFinancialYear() {
    this.adminService.getFinancialYear().subscribe((result: any) => {
      this.financialYears = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadAllImplementPrices() {
    this.adminService.getAllImplementPrices().subscribe((result: any) => {
      this.idl = result;
      this.implementPriceListFinancialYearWise = result.reduce((acc: any, curr: any) => {
        const found = acc.find((x: any) => x.FinancialYear === curr.FinancialYear);
        const implementDetails = {
          ImplementID: curr.ImplementID, ImplementName: curr.ImplementName, Cost: curr.Cost
        };
        if (!found) {
          acc.push({
            FinancialYear: curr.FinancialYear, Year: parseInt(curr.FinancialYear.substring(0, 4), 10), ImplementDetails: [implementDetails]
          });
        } else {
          found.ImplementDetails.push(implementDetails);
        }
        return acc;
      }, []).sort((a: any, b: any) => b.Year - a.Year);
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  populateImplements() {
    if (this.selectedFinancialYear.value !== '' && this.selectedFinancialYear.value !== null && this.selectedFinancialYear.value !== undefined) {
      this.implementDetailsList = this.idl.filter((i: any) => i.FinancialYear === this.selectedFinancialYear.value);
      this.addModifyImplementPriceForm.patchValue({
        selectedImplement: '',
        enteredPrice: ''
      });
    }
  }

  populateImplementCost() {
    if (this.selectedImplement.value !== '' && this.selectedImplement.value !== null && this.selectedImplement.value !== undefined && this.selectedFinancialYear.value !== '' && this.selectedFinancialYear.value !== null && this.selectedFinancialYear.value !== undefined) {
      const ep = this.implementDetailsList.filter((e: any) => e.ImplementID === this.selectedImplement.value.ImplementID);
      if (ep.length > 0) {
        this.addModifyImplementPriceForm.patchValue({
          enteredPrice: ep[0].Cost
        });
      } else {
        this.toastr.warning(`Price for the implement: "<b>${this.selectedImplement.value.ImplementName}</b>" and financial year: "<b>${this.selectedFinancialYear.value}</b>" is not entered.`);
        this.addModifyImplementPriceForm.reset();
        setTimeout(() => {
          this.addModifyImplementPriceForm.patchValue({
            selectedImplement: '',
            selectedFinancialYear: '',
            enteredPrice: ''
          });
        }, 1);
      }
    }
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (document.getElementById('submit')) {
        this.btnID = document.getElementById('submit')!.id;
        return this.btnID;
      } if (document.getElementById('update')) {
        this.btnID = document.getElementById('update')!.id;
        return this.btnID;
      }
    }
    this.btnID = '';
    return this.btnID;
  }

  onSubmit() {
    if (this.addModifyImplementPriceForm.valid) {
      if ((this.btnID === 'submit') || document.activeElement!.id === 'submit') {
        this.adminService.submitImplementPrice(this.addModifyImplementPriceForm.value).subscribe((result: any) => {
          if (result.length === 1) {
            this.toastr.success(`Price for the implement: "<b>${this.enteredImplement.value}</b>" has been entered successfully for the financial year: "<b>${this.selectedFinancialYear.value}</b>".`);
          } else {
            this.toastr.warning(`The implement: "<b>${this.enteredImplement.value}</b>" is already entered for the financial year: "<b>${this.selectedFinancialYear.value}</b>".`);
          }
          this.addModifyImplementPriceForm.reset();
          setTimeout(() => {
            this.addModifyImplementPriceForm.patchValue({
              enteredImplement: '',
              selectedFinancialYear: '',
              enteredPrice: ''
            });
          }, 1);
          this.loadAllImplementPrices();
        }, (error) => this.toastr.error(error.statusText, error.status));
      } else if ((this.btnID === 'update') || document.activeElement!.id === 'update') {
        if (this.enteredPrice.value !== this.selectedImplement.value.Cost) {
          this.adminService.updateImplementPrice(this.addModifyImplementPriceForm.value).subscribe((result: any) => {
            this.toastr.success(`Price for the implement: "<b>${this.selectedImplement.value.ImplementName}</b>" has been modified successfully for the financial year: "<b>${this.selectedFinancialYear.value}</b>".`);
            this.addModifyImplementPriceForm.reset();
            setTimeout(() => {
              this.addModifyImplementPriceForm.patchValue({
                selectedImplement: '',
                selectedFinancialYear: '',
                enteredPrice: ''
              });
            }, 1);
            this.loadAllImplementPrices();
          }, (error) => this.toastr.error(error.statusText, error.status));
        } else {
          this.toastr.info(`Please change the implement's price before updating it.`);
        }
      }
    } else {
      this.toastr.warning(`Please select / enter the Implement, Financial Year and price.`);
    }
  }
}